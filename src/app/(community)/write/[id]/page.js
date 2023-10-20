"use client";
import dynamic from "next/dynamic";
import Fetch from "@/util/fetch";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { tablesKO2EN } from "@/config/config";
import { selectIsLogIn, selectUser } from "@/redux/slice/signSlice";
import "./style.css";

const Editor = dynamic(() => import("@components/editor/editor"), {
  ssr: false,
});

export default function WritePage({ params }) {
  const router = useRouter();
  const user = useSelector(selectUser);
  const isLogIn = useSelector(selectIsLogIn);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [table, setTable] = useState("");

  //prevent "resizeobserver loop limit exceeded" error appearing
  useEffect(() => {
    const getUpdateData = async () => {
      const postId = params?.id;
      try {
        const res = await Fetch.get(
          process.env.NEXT_PUBLIC_PATH_POST + `/${postId}`,
          { next: { revalidate: 0 } }
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
      try {
        const postDetail = await getUpdateData();

        if (postDetail.user_id !== user.id) throw new Error("No permission");

        setTitle(postDetail.title);
        setTable(postDetail.table);
        setBody(postDetail.content);
      } catch (err) {
        console.error(err);
        alert("넌 수정 안되는거 알지???");
        router.back();
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
  }, [isLogIn, params?.id, router, user.id]);

  const handleSelectTable = (e) => {
    setTable(e.target.value);
  };

  const handleClickBtnComplete = async () => {
    if (!title) {
      alert("제목을 입력해주세요");
      return;
    } else if (!body) {
      alert("내용을 입력해주세요");
      return;
    } else if (!table) {
      alert("카테고리를 정해주세요");
      return;
    }

    const option = {
      headers: { "Content-Type": "application/json" },
    };
    const payload = JSON.stringify({
      title,
      table,
      content: body,
    });

    try {
      const path = process.env.NEXT_PUBLIC_PATH_POST + `/${postId}`;
      await Fetch.patch(path, payload, option);
      router.back();
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
        <Editor onChange={setBody} data={body} isImg={true} />
        <section className="write-page__board">
          <select
            name="table"
            className="write-page__select"
            onChange={(e) => handleSelectTable(e)}
          >
            <option value="없음">카테고리</option>
            <option value="유머">유머</option>
            <option value="일상">일상</option>
            <option value="투자">투자</option>
            <option value="스포츠">스포츠</option>
            <option value="연예">연예</option>
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
