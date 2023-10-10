"use client";
import dynamic from "next/dynamic";
import { S3 } from 'aws-sdk';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsLogIn, selectUser } from "@/redux/slice/signSlice";
import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Fetch from "@/util/fetch";
import "./style.css";
// const Editor = dynamic(() => import("@components/editor/editor"), {
//   ssr: false,
// });

export default function WritePage({ params }) {
  const router = useRouter();
  const isUpdate = params?.id && true;
  const user = useSelector(selectUser);
  const isLogIn = useSelector(selectIsLogIn);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");

  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          loader.file.then((file) => {
            formData.append("file", file);

            axios
              .post("http://localhost:8080/board/s3/upload", formData)
              .then((res) => {
                resolve({
                  default: res.data.data.uri,
                });
              })
              .catch((err) => reject(err));
          });
        });
      },
    };
  };

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

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }

  const handleImageUpload = async (file, callback) => {
    const s3 = new S3({
      accessKeyId: 'AKIA2PBNMT4WDBYXO2PL',
      secretAccessKey: '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',
    });

    const params = {
      Bucket: 'front-server',
      Key: `images/${file.name}`,
      Body: file,
      ContentType: file.type,
      ACL: 'public-read',
    };

    try {
      const data = await s3.upload(params).promise();
      const imageUrl = data.Location;
      callback(imageUrl);
    } catch (error) {
      console.error(error);
    }
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
        {/* <Editor onChange={setBody} handleImageUpload={handleImageUpload}/> */}
        <CKEditor
          ref={{ssr:false}}
          editor={ClassicEditor}
          config={{
            placeholder: "내용을 입력하세요.",
            extraPlugins: [uploadPlugin]
          }}
          data=""
          onChange={(event, editor) => {
            const data = editor.getData();
            setBody(data);
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
