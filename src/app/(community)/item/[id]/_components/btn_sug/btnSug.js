"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { selectUser } from "@/redux/slice/signSlice";
import Fetch from "@/util/fetch";
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
  const [contents, setContents] = useState([]);
  const router = useRouter();
  const user = useSelector(selectUser);

  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        const res = await Fetch.get(process.env.NEXT_PUBLIC_PATH_USER_ITEMS);
        const data = await res.json();
        setContents(data.content);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserItems();
  }, []);
  const handleClkBtnSubmit = (e) => {
    e.preventDefault();

    if (selectedItem) {
      socket.send({
        action: "suggest",
        senderId: JSON.stringify(user.id),
        senderNick: user.nick,
        itemId: JSON.stringify(itemDetail.id),
        receiverId: JSON.stringify(itemDetail.user_id),
        receiverNick: itemDetail.user_nick,
        sugItemId: JSON.stringify(selectedItem.id),
        sugItemImg: null,
        date: new Date().getTime(),
      });
      console.log({
        action: "suggest",
        senderId: JSON.stringify(user.id),
        senderNick: user.nick,
        itemId: JSON.stringify(itemDetail.id),
        receiverId: JSON.stringify(itemDetail.user_id),
        receiverNick: itemDetail.user_nick,
        sugItemId: JSON.stringify(selectedItem.id),
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

  const handleClkItem = (sugedItem) => {
    setSelectedItem(sugedItem);
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
        {contents.length &&
          contents.map((sugedItem, idx) => {
            return (
              <ItemList
                key={"sug-item_" + idx}
                handleClkItem={handleClkItem}
                sugedItem={sugedItem}
                setSelectedItem={setSelectedItem}
              />
            );
          })}
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

function ItemList({ handleClkItem, sugedItem }) {
  return (
    <li>
      <label htmlFor="sub-form__radio-id" className="sug-form__item">
        <input
          type="radio"
          name="sug-from__radio"
          id="sub-form__radio-id"
          className="sug-form__radio-btn"
          value="id1"
          onChange={(e) => handleClkItem(sugedItem)}
        ></input>
        <i className="sug-form__item-img"></i>
        <span className="sug-form__item-title">{sugedItem.title}</span>
        <span className="sug-form__item-nick">{sugedItem.nick}</span>
      </label>
    </li>
  );
}
