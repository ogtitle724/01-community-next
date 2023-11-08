"use client";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ImgReceiver from "@/app/_components/img_receiver/ImgReceiver";
import Fetch from "@/util/fetch";
import "./style.css";

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
      if (!title.length) {
        alert("제목을 작성을 주세요!");
        return;
      } else if (!content.length) {
        alert("내용을 작성해 주세요!");
        return;
      }

      const b = [];

      for (let i = 0; i < imgs.length; i++) {
        b.push({ key: imgs[i].name, contentType: imgs[i].type });
        //formData.append("item", imgs[i]);
      }

      const res = await fetch(
        process.env.NEXT_PUBLIC_URL_CLI + process.env.NEXT_PUBLIC_API_IMG,
        {
          body: JSON.stringify(b),
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      const response = await res.json();
      console.log(response);

      const formData = new FormData();
      console.log(response[0].fields.key);
      formData.append("key", response[0].fields.key);
      formData.append("Content-Type", imgs[0].type);
      Object.entries(response[0].fields).forEach(([key, value]) => {
        if (key !== "key") {
          formData.append(key, value);
        }
      });
      console.log(formData);
      formData.append("file", imgs[0]);
      const uploadRes = await fetch(response[0].url, {
        method: "POST",
        body: formData,
      });
      console.log(uploadRes);
      /* await Promise.all(
        response.map(({ url, fields }, idx) => {
          const formData = new FormData();
          formData.append("file", imgs[idx]);

          Object.entries(fields).forEach(([key, value]) => {
            formData.append(key, value);
          });

          return fetch(url, { method: "POST", body: formData });
        })
      ); */

      /* const res = await fetch(
        process.env.NEXT_PUBLIC_URL_CLI + process.env.NEXT_PUBLIC_API_IMG,
        {
          body: {formData},
          method: "POST",
        }
      );

      const payload = await res.json();
      const imgSrc = payload.data;

      const option = { headers: { "Content-Type": "application/json" } };
      const body = JSON.stringify({
        title,
        content,
        thumbnail: imgSrc[0],
        imgSrc,
      });

      await Fetch.post(process.env.NEXT_PUBLIC_PATH_ITEM, body, option);
      router.refresh();
      router.push(process.env.NEXT_PUBLIC_ROUTE_BARTER);*/
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
      <Editor onChange={setContent} isImg={false} />
      <button className="item-upload__btn-submit" onClick={handleClkBtnUpload}>
        완료
      </button>
    </section>
  );
}
