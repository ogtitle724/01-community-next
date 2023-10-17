"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ImgReceiver from "@/app/_components/img_receiver/ImgReceiver";
import Fetch from "@/util/fetch";
import "./style.css";
import { dataURLtoBlob } from "@/util/img_process";
const Editor = dynamic(() => import("@components/editor/editor"), {
  ssr: false,
});

export default function ItemUpload() {
  const [imgs, setImgs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleClkBtnUpload = async () => {
    try {
      /* let res = await fetch("http://localhost:3000", {
        method: "POST",
        body: JSON.stringify(imgs),
      });
      const rres = await res.json();
      console.log(rres); */
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
      <Editor onChange={setContent} isImg={false} />
      <button className="item-upload__btn-submit" onClick={handleClkBtnUpload}>
        완료
      </button>
    </section>
  );
}
