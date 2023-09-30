"use client";
import socket from "@/util/socket";
import { useEffect, useInsertionEffect, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";
import "./style.css";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slice/signSlice";
import timeConverter from "@/util/time_converter";
import { sanitize } from "@/util/secure";

export default function ChatDetail({
  chats,
  setChats,
  opponentId,
  curChatRoom,
  tempId,
}) {
  const [inputData, setInputData] = useState("");
  const chatWrapper = useRef();
  const user = useSelector(selectUser);
  const ckeditor = useRef();

  useEffect(() => {
    const offsetHeight = chatWrapper.current.offsetHeight;
    const scrollHeight = chatWrapper.current.scrollHeight;

    chatWrapper.current.scrollTo({
      top: scrollHeight - offsetHeight,
      behavior: "auto",
    });
  }, [chats]);
  1;
  const handleClkBtnSubmit = (e) => {
    e.preventDefault();
    if (!inputData) return;

    const message = {
      content: inputData,
      timestamp: new Date().getTime(),
      receiver_id: opponentId,
      sender_id: tempId,
    };
    console.log(curChatRoom, message);
    try {
      socket.send({
        action: "message",
        roomId: curChatRoom,
        message,
      });

      setChats((chat) => [...chat, message]);
      setInputData("");
      ckeditor.current.editor.setData("");
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
        {chats.map((chat, idx) => {
          return (
            <li key={"chat_" + idx} className="chat-wrapper">
              <p
                className={
                  "chat" +
                  (chat.sender_id === tempId ? " chat--me" : " chat--opponent")
                }
                dangerouslySetInnerHTML={{ __html: sanitize(chat.content) }}
              ></p>
              <span
                className={
                  "chat__date" +
                  (chat.sender_id === tempId
                    ? " chat__date--me"
                    : " chat__date--opponent")
                }
              >
                {timeConverter(chat.timestamp)}
              </span>
            </li>
          );
        })}
      </ul>
      <section className="chat-detail__keyboard">
        <CKEditor
          ref={ckeditor}
          editor={ClassicEditor}
          config={{
            placeholder: "내용을 입력하세요.",
          }}
          data=""
          onChange={(event, editor) => {
            const data = editor.getData();
            setInputData(data);
          }}
          onBlur={(event, editor) => {}}
          onFocus={(event, editor) => {}}
        />
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
