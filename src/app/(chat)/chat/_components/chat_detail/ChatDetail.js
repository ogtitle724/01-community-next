"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import socket from "@/util/socket";
import timeConverter from "@/util/time_converter";
import { selectUser } from "@/redux/slice/signSlice";
import { sanitize } from "@/util/secure";
import "./style.css";
const Editor = dynamic(() => import("@components/editor/editor"), {
  ssr: false,
});

export default function ChatDetail({
  chats,
  setChats,
  opponentId,
  curChatRoom,
}) {
  const [inputData, setInputData] = useState("");
  const chatWrapper = useRef();
  const user = useSelector(selectUser);
  const ckRef = useRef();

  useEffect(() => {
    const offsetHeight = chatWrapper.current.offsetHeight;
    const scrollHeight = chatWrapper.current.scrollHeight;

    chatWrapper.current.scrollTo({
      top: scrollHeight - offsetHeight,
      behavior: "auto",
    });
  }, [chats]);

  const handleClkBtnSubmit = (e) => {
    e.preventDefault();
    if (!inputData) return;

    const message = {
      content: inputData,
      timestamp: new Date().getTime(),
      receiver_id: opponentId,
      sender_id: String(user.id),
    };

    try {
      socket.send({
        action: "message",
        roomId: curChatRoom,
        message,
      });

      setChats((chat) => [...chat, message]);
      setInputData("");
      ckRef.current.editor.setData("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleClkBtnToTop = (e) => {
    e.preventDefault();
    chatWrapper.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleClkBtnToBottom = (e) => {
    e.preventDefault();
    const offsetHeight = chatWrapper.current.offsetHeight;
    const scrollHeight = chatWrapper.current.scrollHeight;

    chatWrapper.current.scrollTo({
      top: scrollHeight - offsetHeight,
      behavior: "smooth",
    });
  };
  return (
    <main className="chat-detail">
      <ul ref={chatWrapper} className="chat-detail__contents">
        {curChatRoom ? (
          chats.map((chat, idx) => {
            return (
              <li key={"chat_" + idx} className="chat-wrapper">
                <p
                  className={
                    "chat" +
                    (chat.sender_id === String(user.id)
                      ? " chat--me"
                      : " chat--opponent")
                  }
                  dangerouslySetInnerHTML={{ __html: sanitize(chat.content) }}
                ></p>
                <span
                  className={
                    "chat__date" +
                    (chat.sender_id === String(user.id)
                      ? " chat__date--me"
                      : " chat__date--opponent")
                  }
                >
                  {timeConverter(chat.timestamp)}
                </span>
              </li>
            );
          })
        ) : (
          <div className="chat-detail__default"></div>
        )}
      </ul>
      <section className="chat-detail__keyboard">
        <Editor ckRef={ckRef} onChange={setInputData} isImg={false} />
        <label className="chat-detail__label-input-img">
          <input type="file" className="chat-detail__input-img"></input>
        </label>
        <div className="chat-detail__btn-wrapper-scroll">
          <button
            className="chat-detail__btn-scroll chat-detail__btn-top"
            onClick={handleClkBtnToTop}
          ></button>
          <button
            className="chat-detail__btn-scroll chat-detail__btn-bottom"
            onClick={handleClkBtnToBottom}
          ></button>
        </div>
        <button
          className="chat-detail__btn-submit"
          onClick={handleClkBtnSubmit}
        ></button>
      </section>
    </main>
  );
}
