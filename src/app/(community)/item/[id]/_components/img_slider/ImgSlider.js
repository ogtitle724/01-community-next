"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectWidth } from "@/redux/slice/pageSlice";
import { useEffect, useRef, useState } from "react";
import "./style.css";

export default function ImgSlider({ itemDetail }) {
  const slider = useRef();
  const container = useRef();
  const width = useSelector(selectWidth);
  const [btnFoucs, setBtnFoucs] = useState(0);
  const btns = [];

  useEffect(() => {
    if (itemDetail.img_src[0]) {
      const leftOffset = slider.current.offsetWidth * -1 * btnFoucs;
      container.current.style.left = `${leftOffset}px`;
    }
  }, [btnFoucs, itemDetail.img_src, width]);

  const handleClkBtn = (e) => {
    e.preventDefault();
    setBtnFoucs(e.target.value);
  };

  return (
    <>
      <div
        ref={slider}
        className={
          "img-slider" + (itemDetail.img_src[0] ? "" : " img-slider__no-img")
        }
      >
        {itemDetail.img_src[0] && (
          <div ref={container} className="img-slider__container">
            {itemDetail.img_src.map((src, idx) => {
              btns.push(
                <button
                  key={"img-slider-" + idx}
                  className={
                    "img-slider__btn" +
                    (btnFoucs == idx ? " img-slider__btn--focus" : "")
                  }
                  value={idx}
                  onClick={handleClkBtn}
                  aria-label={`${idx}번째 이미지 보이기`}
                ></button>
              );
              return (
                <div
                  key={"img-slider__" + idx}
                  className={"img-slider__img-wrapper"}
                >
                  <Image alt="item-img" src={src} fill={true} />
                </div>
              );
            })}
          </div>
        )}
      </div>
      {itemDetail.img_src[0] && (
        <div className="img-slider__btn-wrapper">{btns}</div>
      )}
    </>
  );
}
