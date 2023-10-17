"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { selectUser } from "@/redux/slice/signSlice";
import socket from "@/util/socket";
import "./style.css";

export default function BtnSug({ itemDetail }) {
  const [isSug, setIsSug] = useState(false);
  const handleClkBtnSug = () => setIsSug(true);

  return (
    <>
      <button className="item-detail__btn-ask" onClick={handleClkBtnSug}>
        제안하기
      </button>
      {isSug && <SugForm setIsSug={setIsSug} itemDetail={itemDetail} />}
    </>
  );
}

function SugForm({ setIsSug, itemDetail }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCreate, setIsCreate] = useState(false);
  const router = useRouter();
  const user = useSelector(selectUser);

  useEffect(() => {
    /**
     * 로그인한 유저가 올린 아이템 페이징
     * 각 객체는 itemId, thumbnail, user_nick, title을 기본적으로 포함해야됨
     */
  }, []);
  const handleClkBtnSubmit = (e) => {
    e.preventDefault();
    if (selectedItem) {
      socket.send({
        action: "suggest",
        senderId: JSON.stringify(user.id),
        senderNick: JSON.stringify(user.nick),
        itemId: JSON.stringify(itemDetail.id),
        receiverId: JSON.stringify(itemDetail.user_id),
        receiverNick: JSON.stringify(itemDetail.user_nick),
        sugItemId: selectedItem.id,
        sugItemImg: null,
        date: new Date().getTime(),
      });
      setIsSug(false);
    } else {
      alert("제안할 물건을 선택해주세요");
    }
  };

  const handleClkBtnCancel = (e) => {
    e.preventDefault();
    if (isCreate) {
      setIsCreate(false);
      setImgs([]);
    } else {
      setIsSug(false);
      setSelectedItem(null);
    }
  };

  const handleClkRadio = (e) => {
    setSelectedItem(e.target.value);
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
