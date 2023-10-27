"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectWidth } from "@/redux/slice/pageSlice";
import "./style.css";
import { useEffect, useRef, useState } from "react";

export default function Slider() {
  const width = useSelector(selectWidth);
  const [focusIdx, setFocusIdx] = useState(0);
  const slider = useRef();
  const container = useRef();
  const params = useRef();
  params.current = {
    sliderWidth: null,
    imgHeight: null,
    imgWidth: null,
    foldWidth: null,
  };

  console.log(focusIdx);

  useEffect(() => {
    if (slider.current && container.current) {
      const p = params.current;
      p.sliderWidth = slider.current.offsetWidth;
      p.foldWidth = p.sliderWidth * 0.06;
      p.imgWidth = p.sliderWidth - (p.foldWidth + 20) * 3;
      p.imgHeight = p.imgWidth * (3 / 4);

      Object.values(container.current.children).forEach((ele, idx) => {
        if (idx === focusIdx) {
          ele.style.width = p.imgWidth + "px";
          ele.style.height = p.imgHeight + "px";
        } else {
          ele.style.width = p.foldWidth + "px";
          ele.style.height = p.imgHeight + "px";
        }

        ele.children[0].style.width = p.imgWidth + "px";
        ele.children[0].style.height = p.imgHeight + "px";
      });
    }
  }, [focusIdx, width]);

  const handleClkImg = (e) => {
    setFocusIdx(+e.target.dataset.value);
  };

  return (
    <section ref={slider} className="slider">
      <div ref={container} className="slider__container">
        <div className="slider__item">
          <div className="slider__img-wrapper">
            <Image
              className="slider__img"
              src={"/image/sample1.jpeg"}
              layout="fill"
              alt="today best"
            />
            <div
              className="slider__cover"
              data-value={0}
              onClick={handleClkImg}
            >
              <span
                className="slider__title"
                data-value={0}
                onClick={handleClkImg}
              >
                4K 울트라 HD 리퀴드 메탈릭 월페이퍼
              </span>
            </div>
          </div>
        </div>
        <div className="slider__item">
          <div className="slider__img-wrapper">
            <Image
              className="slider__img"
              src={"/image/sample2.jpg"}
              layout="fill"
              alt="today best"
            />
            <div
              className="slider__cover"
              data-value={1}
              onClick={handleClkImg}
            >
              <span
                className="slider__title"
                data-value={1}
                onClick={handleClkImg}
              >
                I'm pretty much fucked.
              </span>
            </div>
          </div>
        </div>
        <div className="slider__item">
          <div className="slider__img-wrapper">
            <Image
              className="slider__img"
              src={"/image/sample3.jpeg"}
              layout="fill"
              alt="today best"
            />
            <div
              className="slider__cover"
              data-value={2}
              onClick={handleClkImg}
            >
              <span
                className="slider__title"
                data-value={2}
                onClick={handleClkImg}
              >
                로스 산토스는 찬란한 햇빛을 받으며 거대하게 뻗은 대도시입니다.
              </span>
            </div>
          </div>
        </div>
        <div className="slider__item">
          <div className="slider__img-wrapper">
            <Image
              className="slider__img"
              src={"/image/sample4.jpg"}
              layout="fill"
              alt="today best"
            />
            <div
              className="slider__cover"
              data-value={3}
              onClick={handleClkImg}
            >
              <span
                className="slider__title"
                data-value={3}
                onClick={handleClkImg}
              >
                세계 자연경관 10선
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
