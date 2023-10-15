"use client";
import dynamic from "next/dynamic";
import Fetch from "@/util/fetch";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { categoriesKO2EN } from "@/config/config";
import { selectIsLogIn, selectUser } from "@/redux/slice/signSlice";
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
  const [category, setCategory] = useState("");

  //prevent "resizeobserver loop limit exceeded" error appearing
  useEffect(() => {
    const getUpdateData = async () => {
      const postId = params?.id;
      try {
        const res = await Fetch.get(
          process.env.NEXT_PUBLIC_PATH_POST + `/${postId}`
        );
        const postDetail = await res.json();
        return postDetail;
      } catch (err) {
        alert("서버와 연결이 불안정합니다 :(");
        console.error(err);
        return router.back();
      }
    };

    const fetchDataAndUpdate = async () => {
      if (isUpdate) {
        try {
          const postDetail = await getUpdateData();

          if (postDetail.user_id !== user.id) throw new Error("No permission");

          setTitle(postDetail.title);
          setCategory(postDetail.category);
          setBody(postDetail.content);
        } catch (err) {
          console.error(err);
          alert("넌 수정 안되는거 알지???");
          router.back();
        }
      }
    };

    fetchDataAndUpdate();

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
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute("style", "display: none");
        }
      }
    });
  }, [isLogIn, isUpdate, params?.id, router, user.id]);

  const handleSelectCategory = (e) => {
    setCategory(e.target.value);
  };

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
      next: { revalidate: 0 },
    };
    const payload = JSON.stringify({
      title,
      category,
      content: body,
    });

    try {
      const path = process.env.NEXT_PUBLIC_PATH_POST + `/${postId}`;
      await Fetch.patch(path, payload, option);
      router.push(`/${categoriesKO2EN[category]}`);
    } catch (err) {
      console.error(err);
      alert("게시글 수정을 완료하지 못했습니다.");
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
        <Editor onChange={setBody} data={isUpdate && body} />
        <section className="write-page__board">
          <select
            name="category"
            className="write-page__select"
            onChange={(e) => handleSelectCategory(e)}
          >
            <option value="없음">카테고리</option>
            <option value="유머">유머</option>
            <option value="게임·스포츠">게임·스포츠</option>
            <option value="연예·방송">연예·방송</option>
            <option value="여행">여행</option>
            <option value="취미">취미</option>
            <option value="경제·금융">경제·금융</option>
            <option value="시사·이슈">시사·이슈</option>
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