"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import socket from "@/util/socket";
import "./style.css";

export default function BtnSug({ itemDetail }) {
  const [isSug, setIsSug] = useState(false);
  const handleClkBtnSug = () => {
    socket.send({
      action: "suggest",
      senderId: String(user.id),
      receiverId: String(itemDetail.user_id),
      receiverNick: itemDetail.user_nick,
      sugItemId: itemDetail.id,
      thumbnail: itemDeteail.imgs[0],
      //썸네일도 보내는게 나을까? => 어차피 아이템 조회할때 src 받아오니까
      //첫번째거 보내자 이걸 제안시작하는 채팅에 보내고 아이템 아이디도
      //같이 보내서 채팅 누르면 제안받은 아이템 디테일 페이지로 이동할 수
      //있도록 하면 될 듯
    });

    setIsSug((isSug) => !isSug);
  };

  return (
    <>
      <button className="item-detail__btn-ask" onClick={handleClkBtnSug}>
        제안하기
      </button>
      {isSug && <SugForm setIsSug={setIsSug} />}
    </>
  );
}

function SugForm({ setIsSug }) {
  const [selecteItemId, setSelectedItemId] = useState(null);
  const [isCreate, setIsCreate] = useState(false);
  const router = useRouter();

  const handleClkBtnSubmit = (e) => {
    e.preventDefault();
    if (selecteItemId) {
      setIsSug(false);
    } else {
      alert("품목을 선택해주세요");
    }
  };

  const handleClkBtnCancel = (e) => {
    e.preventDefault();
    if (isCreate) {
      setIsCreate(false);
      setImgs([]);
    } else {
      setIsSug(false);
      setSelectedItemId(null);
    }
  };

  const handleClkRadio = (e) => {
    setSelectedItemId(e.target.value);
  };

  const handleClkBtnCreate = (e) => {
    e.preventDefault();
    router.push(process.env.NEXT_PUBLIC_ROUTE_ADD_ITEM);
  };

  return (
    <form
      className="sug-form"
      onSubmit={handleClkBtnSubmit}
      onScroll={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
    >
      <ul className="sug-form__items">
        <button className="sug-from__btn-new" onClick={handleClkBtnCreate}>
          + 새로 만들기
        </button>
        <li>
          <label htmlFor="sub-form__radio-id" className="sug-form__item">
            <input
              type="radio"
              name="sug-from__radio"
              id="sub-form__radio-id"
              className="sug-form__radio-btn"
              value="id1"
              onChange={handleClkRadio}
            ></input>
            <div className="sug-form__item-img"></div>
            <span className="sug-form__item-title">샘플 데이터 타이틀</span>
            <span className="sug-form__item-nick">유저123</span>
          </label>
        </li>
      </ul>
      <div className="sug-form__btn-wrapper">
        <button className="sug-form__btn" onClick={handleClkBtnCancel}>
          취 소
        </button>
        <button className="sug-form__btn">확 인</button>
      </div>
    </form>
  );
}
