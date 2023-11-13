"use client";
import dynamic from "next/dynamic";
import Fetch from "@/util/fetch";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLogIn, selectUser } from "@/redux/slice/signSlice";
import { categories, categoryKO2EN } from "@/config/category";
import "./style.css";

const Editor = dynamic(() => import("@components/editor/editor"), {
  ssr: false,
});

export default function WritePage({ params }) {
  const router = useRouter();
  const isUpdate = params?.id && true;
  const user = useSelector(selectUser);
  const isLogIn = useSelector(selectIsLogIn);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("유머");
  const [group, setGroup] = useState("");
  const dispatch = useDispatch();

  //prevent "resizeobserver loop limit exceeded" error appearing
  useEffect(() => {
    window.addEventListener("error", (e) => {
      if (e.message === "ResizeObserver loop limit exceeded") {
        const resizeObserverErrDiv = document.getElementById(
          "webpack-dev-server-client-overlay-div"
        );
        const resizeObserverErr = document.getElementById(
          "webpack-dev-server-client-overlay"
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute("style", "display: none");
        }
      }
    });
  }, [isLogIn, isUpdate, params?.id, router, user.id]);

  const handleSelectCategory = (e) => setCategory(e.target.value);
  const handleSelectGroup = (e) => setGroup(e.target.value);

  const handleClickBtnComplete = async () => {
    if (!title) {
      alert("제목을 입력해주세요");
      return;
    } else if (!body) {
      alert("내용을 입력해주세요");
      return;
    } else if (!category) {
      alert("카테고리를 정해주세요");
      return;
    }
    const option = {
      headers: { "Content-Type": "application/json" },
    };
    const payload = JSON.stringify({
      title,
      table: category,
      group,
      content: body,
    });

    try {
      const path = process.env.NEXT_PUBLIC_PATH_POST;
      await Fetch.post(path, payload, option);

      dispatch(setCategory(category));
      if (group) dispatch(setGroup(group));

      router.push(
        `/${categoryKO2EN[category] + group ? `?group=${group}` : ""}`
      );
    } catch (err) {
      console.error(err);
      alert("게시글 작성 혹은 수정을 완료하지 못했습니다.");
    }
  };

  return (
    <>
      <main className="write-page">
        <input
          className="write-page__title"
          type="text"
          placeholder="제목을 입력하세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <Editor onChange={setBody} isImg={true} />
        <section className="write-page__board">
          <select
            name="category"
            className="write-page__select"
            onChange={(e) => handleSelectCategory(e)}
          >
            {Object.keys(categories).map((category, idx) => {
              return (
                <option key={"select-opt-" + idx} value={category}>
                  {category}
                </option>
              );
            })}
          </select>
          <select
            name="category-grp"
            className="write-page__select"
            onChange={(e) => handleSelectGroup(e)}
          >
            <option value={""}>{"카테고리"}</option>
            {categories[category].map((group, idx) => {
              return (
                <option key={"select-opt-category-grp" + idx} value={group}>
                  {group}
                </option>
              );
            })}
          </select>
          <button
            className="write-page__btn-complete"
            onClick={handleClickBtnComplete}
          >
            완료
          </button>
        </section>
      </main>
    </>
  );
}
