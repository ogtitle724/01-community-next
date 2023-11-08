"use client";
import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImgReceiver from "@/app/_components/img_receiver/ImgReceiver";
import Fetch from "@/util/fetch";
import "./style.css";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slice/signSlice";

const Editor = dynamic(() => import("@components/editor/editor"), {
  ssr: false,
});

export default function ItemUpload({ params }) {
  const [imgs, setImgs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const user = useSelector(selectUser);
  const router = useRouter();
  const intialImgs = useRef();

  //prevent "resizeobserver loop limit exceeded" error appearing
  useEffect(() => {
    const getUpdateData = async () => {
      const postId = params?.id;
      try {
        const res = await Fetch.get(
          process.env.NEXT_PUBLIC_PATH_ITEM + `/${postId}`,
          { next: { revalidate: 0 } }
        );
        const itemDetail = await res.json();
        return itemDetail;
      } catch (err) {
        alert("서버와 연결이 불안정합니다 :(");
        console.error(err);
        return router.back();
      }
    };

    const fetchDataAndUpdate = async () => {
      try {
        const itemDetail = await getUpdateData();
        console.log(itemDetail, user);

        if (itemDetail.user_id !== user.id) throw new Error("No permission");

        setTitle(itemDetail.title);
        setContent(itemDetail.content);
        setImgs(itemDetail.img_src);
        intialImgs.current = itemDetail.img_src.slice();
      } catch (err) {
        console.error(err);
        alert("넌 수정 안되는거 알지???");
        router.back();
      }
    };

    fetchDataAndUpdate();
  }, [params?.id, router, user]);

  const handleClkBtnUpload = async () => {
    //TODO: 수정시 S3에서 기존 데이터 삭제
    try {
      if (!title.length) {
        alert("제목을 작성을 주세요!");
        return;
      } else if (!content.length) {
        alert("내용을 작성해 주세요!");
        return;
      }

      //TODO: 여기서 현재 imgs랑 비교해서 삭제 하면될듯(initialImgs)

      //aws createPreSignedPost를 이용해 클라이언트 사이드에서 s3업로드
      const preSignedArgs = [];
      const preSignedUrl = [];

      //next api로 이미지의 key, type 전달
      for (let i = 0; i < imgs.length; i++) {
        preSignedArgs.push({ key: imgs[i].name, contentType: imgs[i].type });
      }

      const res = await fetch(
        process.env.NEXT_PUBLIC_URL_CLI + process.env.NEXT_PUBLIC_API_IMG,
        {
          body: JSON.stringify(preSignedArgs),
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      const response = await res.json();

      //res로 받은 presigned posts를 promise.all을 통해 순차적으로 fetch
      await Promise.all(
        response.map(({ url, fields }, idx) => {
          //할당된 url에는 formdata를 body에 담아 전송하며 각 formData는 아래와 같은 순서로 key-value를 할당
          const formData = new FormData();
          formData.append("key", fields.key);
          formData.append("Content-Type", imgs[idx].type);

          Object.entries(fields).forEach(([key, value]) => {
            if (key !== "key") {
              formData.append(key, value);
            }
          });

          formData.append("file", imgs[idx]);
          preSignedUrl.push(url + fields.key);
          return fetch(url, { method: "POST", body: formData });
        })
      );

      const option = { headers: { "Content-Type": "application/json" } };
      const body = JSON.stringify({
        title,
        content,
        thumbnail: preSignedUrl[0],
        imgSrc: preSignedUrl,
      });

      await Fetch.patch(
        process.env.NEXT_PUBLIC_PATH_ITEM + `/${params.id}`,
        body,
        option
      );
      router.refresh();
      router.back();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="item-upload">
      <ImgReceiver setImgs={setImgs} imgs={imgs} />
      <input
        type="text"
        className="item-upload__title"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <Editor onChange={setContent} data={content} isImg={false} />
      <button className="item-upload__btn-submit" onClick={handleClkBtnUpload}>
        완료
      </button>
    </section>
  );
}
