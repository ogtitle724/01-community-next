"use client";
import Image from "next/image";
import { useRef } from "react";
import "./style.css";

export default function ImgWrapper({ itemDetail }) {
  const itemWrapper = useRef();

  return (
    <div ref={itemWrapper} className="item-detail__img-wrapper">
      {itemDetail.img_src.map((src, idx) => {
        return (
          <Image
            key={"item-detail__" + idx}
            alt="item-img"
            src={src}
            width={100}
            height={100}
            className="item-detail__img"
          />
        );
      })}
    </div>
  );
}
