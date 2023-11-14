"use client";
import dynamic from "next/dynamic";
import Fetch from "@/util/fetch";
import revalidate from "@/util/revalidate";
import ImgReceiver from "@/app/_components/img_receiver/ImgReceiver";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { district as Districts } from "@/config/district";
import "./style.css";

const Editor = dynamic(() => import("@components/editor/editor"), {
  ssr: false,
});

export default function ItemUpload() {
  const [imgs, setImgs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [city, setCity] = useState("");
  const [districts, setDistricts] = useState();
  const [district, setDistrict] = useState();
  const [dongs, setDongs] = useState();
  const [dong, setDong] = useState();
  const router = useRouter();

  useEffect(() => {
    const getDistrict = async () => {
      try {
        const res = await fetch(`/district/${city}.json`);
        setDistricts(await res.json());
      } catch (err) {
        console.error(err);
      }
    };

    if (city) {
      getDistrict();
    }
  }, [city]);

  useEffect(() => {
    if (district) {
      setDongs(Object.keys(districts[district]));
    }
  }, [district, districts]);

  const handleClkBtnUpload = async () => {
    try {
      if (!title.length) {
        alert("제목을 작성을 주세요!");
        return;
      } else if (!content.length) {
        alert("내용을 작성해 주세요!");
        return;
      }

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

      await Fetch.post(process.env.NEXT_PUBLIC_PATH_ITEM, body, option);
      revalidate();
      router.push(process.env.NEXT_PUBLIC_ROUTE_BARTER);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectCity = (e) => {
    setCity(e.target.value);
    setDistrict("");
    setDistricts("");
    setDong("");
    setDongs("");
  };

  const handleSelectDistrict = (e) => {
    setDistrict(e.target.value);
    setDong("");
    setDongs("");
  };

  const handleSelectDong = (e) => {
    setDong(e.target.value);
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
      <section className="item-upload__btn-wrapper">
        <select
          name="category-city"
          className="item-upload__select"
          onChange={(e) => handleSelectCity(e)}
        >
          <option value={""}>{"시/도"}</option>
          {Districts.map((group, idx) => {
            return (
              <option key={"select-opt-category-grp" + idx} value={group}>
                {group}
              </option>
            );
          })}
        </select>
        <select
          name="category-city"
          className="item-upload__select"
          onChange={(e) => handleSelectDistrict(e)}
        >
          <option value={""}>{"시/군/구"}</option>
          {districts &&
            Object.keys(districts).map((group, idx) => {
              return (
                <option key={"select-opt-category-grp" + idx} value={group}>
                  {group}
                </option>
              );
            })}
        </select>
        <select
          name="category-city"
          className="item-upload__select"
          onChange={(e) => handleSelectDong(e)}
        >
          <option value={""}>{"읍/면/동"}</option>
          {dongs &&
            dongs.map((group, idx) => {
              return (
                <option key={"select-opt-category-grp" + idx} value={group}>
                  {group}
                </option>
              );
            })}
        </select>
        <button
          className="item-upload__btn-submit"
          onClick={handleClkBtnUpload}
        >
          완료
        </button>
      </section>
    </section>
  );
}
