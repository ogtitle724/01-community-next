"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectUser } from "@/redux/slice/signSlice";
import Fetch from "@/util/fetch";
import socket from "@/util/socket";
import Modal from "@/app/(community)/_components/modal/Modal";
import "./style.css";

export default function BtnSug({ itemDetail }) {
  const [isWriter, setIsWriter] = useState(false);
  const user = useSelector(selectUser);
  const router = useRouter();
  const dialogRef = useRef();

  useEffect(() => {
    if (user && user.id === itemDetail.user_id) setIsWriter(true);
    console.log(isWriter);
  }, [isWriter, itemDetail.user_id, user]);

  const handleClkBtnSug = () => dialogRef.current.showModal();

  const handleClkBtnUpdate = async (e) => {
    e.preventDefault();
    router.push(process.env.NEXT_PUBLIC_ROUTE_ADD_ITEM + `/${itemDetail.id}`);
  };

  const handleClkBtnDelete = async (e) => {
    e.preventDefault();
    try {
      const ans = confirm("게시물을 삭제하시겠습니까?");

      if (!ans) return;
      await Fetch.delete(
        process.env.NEXT_PUBLIC_PATH_ITEM + `/${itemDetail.id}`
      );

      router.refresh();
      router.back();
    } catch (err) {
      alert("게시물을 삭제할 수 없습니다 :(");
      console.error(err);
    }
  };
  return (
    <>
      <div className="item-detail__btn-ud">
        {user &&
          (isWriter ? (
            <>
              <button className="item-detail__btn" onClick={handleClkBtnUpdate}>
                수정
              </button>
              <button className="item-detail__btn" onClick={handleClkBtnDelete}>
                삭제
              </button>
            </>
          ) : (
            <button className="item-detail__btn" onClick={handleClkBtnSug}>
              제안하기
            </button>
          ))}
      </div>
      <SugForm dialogRef={dialogRef} itemDetail={itemDetail} />
    </>
  );
}

function SugForm({ dialogRef, itemDetail }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [contents, setContents] = useState([]);
  const router = useRouter();
  const user = useSelector(selectUser);

  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        const res = await Fetch.get(process.env.NEXT_PUBLIC_PATH_USER_ITEMS, {
          next: { revalidate: 0 },
        });
        const data = await res.json();
        setContents(data.content);
      } catch (err) {
        console.error(err);
      }
    };

    if (user) fetchUserItems();
  }, [user]);

  const handleClkBtnSubmit = async (e) => {
    e.preventDefault();

    if (selectedItem) {
      try {
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

        await Fetch.post(
          process.env.NEXT_PUBLIC_PATH_ITEM +
            `/${itemDetail.id}/suggest/${selectedItem.id}`
        );
        dialogRef.current.close();
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("제안할 물건을 선택해주세요");
    }
  };

  const handleClkBtnCancel = (e) => {
    e.preventDefault();
    setSelectedItem(null);
    dialogRef.current.close();
  };

  const handleClkItem = (sugedItem) => {
    setSelectedItem(sugedItem);
    console.log(sugedItem);
  };

  const handleClkBtnCreate = (e) => {
    e.preventDefault();
    dialogRef.current.close();
    router.push(process.env.NEXT_PUBLIC_ROUTE_ADD_ITEM);
  };

  return (
    <Modal dialogRef={dialogRef}>
      <div className="sug-form">
        <button className="sug-form__btn-new" onClick={handleClkBtnCreate}>
          + 새로 만들기
        </button>
        <ul className="sug-form__items">
          {contents.length ? (
            contents.map((sugedItem, idx) => {
              return (
                <ItemList
                  key={"sug-item_" + idx}
                  handleClkItem={handleClkItem}
                  sugedItem={sugedItem}
                  setSelectedItem={setSelectedItem}
                  idx={idx}
                />
              );
            })
          ) : (
            <p className="sug-form__no-item">제안할 물건을 생성해주세요!</p>
          )}
        </ul>
        <div className="sug-form__btn-wrapper">
          <button className="sug-form__btn" onClick={handleClkBtnCancel}>
            취 소
          </button>
          <button className="sug-form__btn" onClick={handleClkBtnSubmit}>
            확 인
          </button>
        </div>
      </div>
    </Modal>
  );
}

function ItemList({ handleClkItem, sugedItem, idx }) {
  return (
    <li>
      <label
        htmlFor={"sub-form__radio-id-" + idx}
        className="sug-form__item"
        onChange={(e) => handleClkItem(sugedItem)}
      >
        <input
          type="radio"
          name="sug-from__radio"
          id={"sub-form__radio-id-" + idx}
          className="sug-form__radio-btn"
          value="id1"
        ></input>
        <i className="sug-form__item-img"></i>
        <span className="sug-form__item-title">{sugedItem.title}</span>
        <span className="sug-form__item-nick">{sugedItem.nick}</span>
      </label>
    </li>
  );
}
