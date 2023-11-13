"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectWidth } from "@/redux/slice/pageSlice";
import "./style.css";
import { useEffect, useRef, useState } from "react";

const imgData = [
  {
    src: "/image/sample1.jpeg",
    title: "4K 울트라 HD 리퀴드 메탈릭 월페이퍼",
  },
  {
    src: "/image/sample2.jpg",
    title: "I am pretty much fucked.",
  },
  {
    src: "/image/sample3.jpeg",
    title: " 로스 산토스는 찬란한 햇빛을 받으며 거대하게 뻗은 대도시입니다.",
  },
  {
    src: "/image/sample4.jpg",
    title: "세계 자연경관 10선",
  },
  {
    src: "/image/sample1.jpeg",
    title: "4K 울트라 HD 리퀴드 메탈릭 월페이퍼",
  },
];

export default function Slider() {
  const width = useSelector(selectWidth);
  const [imgs, setImgs] = useState();
  const [btns, setBtns] = useState();
  const [focusIdx, setFocusIdx] = useState(0);
  const slider = useRef();
  const container = useRef();
  const p = useRef();

  if (!p.current) {
    p.current = {
      length: imgData.length,
      foldedRatio: 0.08,
      gap: 5,
      sliderWidth: null,
      imgHeight: null,
      imgWidth: null,
      foldWidth: null,
    };
  }

  useEffect(() => {
    p.current.sliderWidth = slider.current.offsetWidth;
    p.current.foldWidth = p.current.sliderWidth * p.current.foldedRatio;
    p.current.imgWidth =
      p.current.sliderWidth -
      (p.current.foldWidth + p.current.gap) * (p.current.length - 1);
    p.current.imgHeight = p.current.imgWidth * (3 / 4);
    console.log(p.current.imgWidth, p.current.imgHeight);
  }, [width]);

  useEffect(() => {
    const tempImgs = [];
    const tempBtns = [];
    imgData.forEach((ele, idx) => {
      const width = focusIdx === idx ? p.current.imgWidth : p.current.foldWidth;
      const height = p.current.imgHeight;

      tempBtns.push(
        <button
          key={"slider-btn-" + idx}
          className={
            "slider__btn" + (focusIdx == idx ? " slider__btn--focus" : "")
          }
          data-value={idx}
          onClick={handleClkImg}
          aria-label={`${idx + 1}번째 배너 노출`}
        ></button>
      );
      tempImgs.push(
        <div
          key={"slider-item-" + idx}
          className="slider__item"
          style={{ width, height }}
        >
          <div
            className="slider__img-wrapper"
            style={{ width: p.current.imgWidth, height }}
          >
            <Image
              className="slider__img"
              src={ele.src}
              fill={true}
              alt="today best"
              quality={60}
              loading="eager"
            />
            <div
              className="slider__cover"
              data-value={idx}
              onClick={handleClkImg}
            >
              <span
                className="slider__title"
                data-value={idx}
                onClick={handleClkImg}
              >
                {ele.title}
              </span>
            </div>
          </div>
        </div>
      );
    });
    setBtns(tempBtns);
    setImgs(tempImgs);
  }, [focusIdx, width]);

  const handleClkImg = (e) => {
    setFocusIdx(+e.target.dataset.value);
  };

  return (
    <section ref={slider} className="slider">
      <h2 hidden>이미지 슬라이더</h2>
      <div ref={container} className="slider__container">
        {imgs}
      </div>
      <div className="slider__btn-wrapper center--x">{btns}</div>
    </section>
  );
}
