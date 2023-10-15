"use client";
import { useState } from "react";
import ImgReceiver from "@/app/_components/img_receiver/ImgReceiver";
import { s3upload } from "@/util/bucket";
import Fetch from "@/util/fetch";
import "./style.css";
import { useRouter } from "next/navigation";

const Editor = dynamic(() => import("@components/editor/editor"), {
  ssr: false,
});

export default function ItemUpload({ setIsSug }) {
  const [imgs, setImgs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleClkBtnUpload = async () => {
    try {
      const option = { headers: { "Content-Type": "application/json" } };
      const body = JSON.stringify({
        title,
        content,
      });

      await Fetch.post(process.env.NEXT_PUBLIC_PATH_ITEM, body, option);
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
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <Editor onChange={setContent} />
      <button className="item-upload__btn-submit" onClick={handleClkBtnUpload}>
        완료
      </button>
    </section>
  );
}
