"use client";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectWidth } from "@/redux/slice/pageSlice";
import Link from "next/link";
import socket from "@/util/socket";
import ThemeToggle from "@/components//themetoggle/ThemeToggle";
import timeConverter from "@/util/time_converter";
import { sanitize } from "@/util/secure";
import "./style.css";

export default function ChatNav({
  rooms,
  curChatRoom,
  setCurChatRoom,
  setOpponentId,
  tempId,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isShowNav, setIsShowNav] = useState(true);
  const nav = useRef();
  const width = useSelector(selectWidth);

  useEffect(() => {
    if (isShowNav) nav.current.style = "left: 0px";
    else nav.current.style = "left: -300px";
  }, [isShowNav]);

  const handleClkChat = async (roomId, opponentId) => {
    try {
      setCurChatRoom(roomId);
      setOpponentId(opponentId);
      socket.send({
        action: "joinRoom",
        senderId: tempId,
        roomId,
      });
      //채팅 데이터 받아온 다음에 chatList에 세팅
    } catch (err) {
      console.error(err);
      alert("");
    }
  };

  const handleClkBtnShowNav = () => {
    setIsShowNav((isShowNav) => !isShowNav);
  };

  return (
    <>
      <nav ref={nav} className="chatnav">
        {width < 768 && (
          <button
            className="chatnav__btn-shownav"
            onClick={handleClkBtnShowNav}
          ></button>
        )}
        <nav className="chatnav__gnb">
          <Link href={process.env.NEXT_PUBLIC_ROUTE_HOME}>
            <button className="chatnav__btn-home"></button>
          </Link>
          <ThemeToggle />
          <input
            placeholder="검색"
            className="chatnav__search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </nav>
        <ul className="chatlist">
          {rooms &&
            Object.entries(rooms)
              .sort((a, b) => b[1]["re_date"] - a[1]["re_date"])
              .map((entry, idx) => {
                const roomId = entry[0];
                const isFocus = roomId === curChatRoom;

                return (
                  <ChatItem
                    key={"chatRoom_" + idx}
                    roomEntry={entry}
                    isFocus={isFocus}
                    handleClkChat={handleClkChat}
                  />
                );
              })}
        </ul>
        <h2 className="chatlist__title">clip-chat</h2>
      </nav>
    </>
  );
}

function ChatItem({ roomEntry, isFocus, handleClkChat }) {
  return (
    <li
      className={"chatitem" + (isFocus ? " chatitem--active" : "")}
      onClick={() => handleClkChat(roomEntry[0], roomEntry[1]["opponent_id"])}
    >
      <div className="chatitem__img-wrapper">
        <div className="chatitem__img"></div>
        <div className="chatitem__img"></div>
      </div>
      <div className="chatitem__info">
        <span className="chatitem__nick">{roomEntry[1]["opponent_nick"]}</span>
        <span className="chatitem__time">
          {timeConverter(roomEntry[1]["re_date"])}
        </span>
      </div>
      <span
        className="chatitem__preview"
        dangerouslySetInnerHTML={{ __html: sanitize(roomEntry[1]["preview"]) }}
      ></span>
      {roomEntry[1]["relay_cnt"] ? (
        <p className="chatitem__relay-cnt">{roomEntry[1]["relay_cnt"]}</p>
      ) : (
        ""
      )}
    </li>
  );
}
