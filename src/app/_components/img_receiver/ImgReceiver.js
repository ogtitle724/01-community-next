"use client";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectWidth } from "@/redux/slice/pageSlice";
import "./style.css";

export default function ImgReceiver({ setImgs }) {
  const [imgContainer, setImgContainer] = useState(new Array(5));
  const width = useSelector(selectWidth);
  const imgWrapper = useRef();

  useEffect(() => {
    if (imgWrapper.current) {
      const wrapperWidth = imgWrapper.current.offsetWidth;
      const imgWidth = ~~((wrapperWidth - 40) / 5);
      const imgHeight = ~~(imgWidth * (3 / 4));
      const children = imgWrapper.current.children;

      for (let i = 1; i < 6; i++) {
        children[i].style.width = `${imgWidth}px`;
        children[i].style.height = `${imgHeight}px`;
      }
    }
  }, [imgWrapper, width]);

  useEffect(() => {
    setImgs(imgContainer);
  }, [imgContainer, setImgs]);

  const handleClickUploadBtn = (e) => {
    const files = e.target.files;
    console.log("file", files);
    let temp = [];

    const loadFile = (fileIndex) => {
      if (files[fileIndex] && fileIndex < 5) {
        const reader = new FileReader();

        reader.addEventListener("load", (event) => {
          temp.push(event.target.result);
          loadFile(fileIndex + 1);
        });
        reader.readAsDataURL(files[fileIndex]);
      } else {
        setImgContainer(temp);
      }
    };

    loadFile(0);
  };

  const handleClkBtnDel = (e, idx) => {
    e.preventDefault();
    let newImgContainer = imgContainer.slice();
    newImgContainer.splice(idx, 1);

    setImgContainer(newImgContainer);
  };

  const getImgs = (imgContainer) => {
    let eles = [];
    for (let i = 0; i < 5; i++) {
      if (imgContainer?.[i]) {
        eles.push(
          <div className="img-receiver__img-wrapper" key={i}>
            <img
              src={imgContainer[i]}
              alt="imgs"
              className="img-receiver__img"
            ></img>
            <button
              className="img-receiver__btn-delete"
              onClick={(e) => handleClkBtnDel(e, i)}
            >
              ✖
            </button>
          </div>
        );
      } else {
        eles.push(<div key={i} className="img-receiver__default-img"></div>);
      }
    }

    return eles;
  };

  return (
    <div ref={imgWrapper} className="img-receiver">
      <label className="img-receiver__label" htmlFor="img-receiver__input">
        <input
          id="img-receiver__input"
          className="img-receiver__input"
          type="file"
          multiple="multiple"
          capture="environment"
          ccept="image/*"
          onChange={handleClickUploadBtn}
        />
        <span className="img-receiver__count">{`${
          imgContainer.filter((ele) => ele).length
        }/5`}</span>
      </label>
      {getImgs(imgContainer)}
    </div>
  );
}
