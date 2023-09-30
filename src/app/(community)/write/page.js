"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectIsLogIn, selectUser } from "@/redux/slice/signSlice";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";
import Fetch from "@/util/fetch";
import "./style.css";

export default function WritePage({ params }) {
  const router = useRouter();
  const isUpdate = params?.id && true;
  const user = useSelector(selectUser);
  const isLogIn = useSelector(selectIsLogIn);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  //이미지 저장처리할때 썸네일관련 설정
  const [thumbnail, setThumbnail] = useState("");

  //prevent "resizeobserver loop limit exceeded" error appearing
  useEffect(() => {
    const getUpdateData = async () => {
      const postId = params?.id;
      try {
        const res = await Fetch.get(
          process.env.NEXT_PUBLIC_PATH_POST + `/${postId}`
        );
        const temp = await res.json();
        return temp;
      } catch (err) {
        alert("서버와 연결이 불안정합니다 :(");
        console.error(err);
        return router.back();
      }
    };

    if (!isLogIn) {
      alert("글 작성을 위해선 로그인이 필요합니다 :)");
      router.back();
    }

    if (isUpdate) {
      const postDetail = getUpdateData();

      if (postDetail.user_id !== user.id) {
        alert("글 수정 권한이 없습니다.");
        router.back();
      }

      setTitle(postDetail.title);
      setCategory(postDetail.category);
      setBody(postDetail.content);
    }

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

    let payload = {
      title,
      category,
      content: body,
      thumbnail,
    };

    try {
      if (isUpdate) {
        const path = process.env.NEXT_PUBLIC_PATH_POST + `/${postId}`;

        await Fetch.patch(path, payload);
      } else {
        const path = process.env.NEXT_PUBLIC_PATH_POST;
        await Fetch.post(path, payload);
      }

      router.back();
    } catch (err) {
      console.log(err);
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
        <CKEditor
          editor={ClassicEditor}
          config={{
            placeholder: "내용을 입력하세요.",
          }}
          data=""
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
            if (isUpdate && ogData) {
              editor.setData(ogData);
            }
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setBody(data);
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            /* console.log("Blur.", editor); */
          }}
          onFocus={(event, editor) => {
            /* console.log("Focus.", editor); */
          }}
        />
        <section className="write-page__board">
          <select
            name="category"
            className="write-page__select"
            onChange={(e) => handleSelectCategory(e)}
          >
            <option value="없음">카테고리</option>
            <option value="유머">유머</option>
            <option value="게임/스포츠">게임/스포츠</option>
            <option value="연예/방송">연예/방송</option>
            <option value="여행">여행</option>
            <option value="취미">취미</option>
            <option value="경제/금융">경제/금융</option>
            <option value="시사/이슈">시사/이슈</option>
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