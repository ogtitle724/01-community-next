"use client";
import { useState } from "react";
import "./style.css";

export default function Mypage() {
  const [focus, setFocus] = useState("개인정보");

  const handleClkBtn = (e) => {
    e.preventDefault();
    setFocus(e.target.value);
  };

  return (
    <div className="mypage">
      <button
        className="mypage__btn"
        onClick={handleClkBtn}
        value="개인정보"
      ></button>
      <button
        className="mypage__btn"
        onClick={handleClkBtn}
        value="작성한 게시물"
      ></button>
      <button
        className="mypage__btn"
        onClick={handleClkBtn}
        value="작성한 댓글"
      ></button>
      <button
        className="mypage__btn"
        onClick={handleClkBtn}
        value="스토어"
      ></button>
      <div className="mypage__content"></div>
    </div>
  );
}
