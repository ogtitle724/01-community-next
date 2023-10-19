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
      } catch (err) {
        console.error(err);
        alert("넌 수정 안되는거 알지???");
        router.back();
      }
    };

    fetchDataAndUpdate();
  }, [params?.id, router, user]);

  const handleClkBtnUpload = async () => {
    try {
      if (!title.length) {
        alert("제목을 작성을 주세요!");
        return;
      } else if (!content.length) {
        alert("내용을 작성해 주세요!");
        return;
      }
      const option = { headers: { "Content-Type": "application/json" } };
      const body = JSON.stringify({
        title,
        content,
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
      <ImgReceiver setImgs={setImgs} />
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
