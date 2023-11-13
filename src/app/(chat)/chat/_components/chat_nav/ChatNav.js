"use client";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectWidth } from "@/redux/slice/pageSlice";
import socket from "@/util/socket";
import timeConverter from "@/util/time_converter";
import { sanitize } from "@/util/secure";
import "./style.css";
import { selectUser } from "@/redux/slice/signSlice";
import { useRouter } from "next/navigation";

export default function ChatNav({
  rooms,
  curChatRoom,
  setCurChatRoom,
  setOpponentId,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isShowNav, setIsShowNav] = useState(true);
  const nav = useRef();
  const width = useSelector(selectWidth);
  const user = useSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (width >= 768) nav.current.style = "left: 0px;";
    else {
      if (isShowNav) {
        nav.current.style =
          "left: 0px; box-shadow: 0 0 0 100vw rgba(0,0,0,0.8)";
      } else {
        nav.current.style = "left: -250px";
      }
    }
  }, [isShowNav, width]);

  const handleClkBtnHome = (e) => {
    e.preventDefault();
    setCurChatRoom(null);
    setOpponentId(null);
    socket.send({ action: "quitRoom", senderId: JSON.stringify(user.id) });
    router.push(process.env.NEXT_PUBLIC_ROUTE_HOME);
  };

  const handleClkChat = async (roomId, opponentId) => {
    try {
      setCurChatRoom(roomId);
      setOpponentId(opponentId);
      socket.send({
        action: "joinRoom",
        senderId: String(user.id),
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
            className={
              "chatnav__btn" +
              (isShowNav ? " chatnav__btn--show" : " chatnav__btn--hide")
            }
            onClick={handleClkBtnShowNav}
            aria-label="채팅목록 펼치기/닫기"
          ></button>
        )}
        <nav className="chatnav__gnb">
          <button
            className="chatnav__btn-home"
            onClick={handleClkBtnHome}
            aria-label="홈 화면으로 이동"
          ></button>
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
              .sort((a, b) => b[1]["recent_active"] - a[1]["recent_active"])
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
          {timeConverter(roomEntry[1]["recent_active"])}
        </span>
      </div>
      <span
        className="chatitem__preview"
        dangerouslySetInnerHTML={{ __html: sanitize(roomEntry[1]["preview"]) }}
      ></span>
      {roomEntry[1]["alarm_cnt"] ? (
        <p className="chatitem__relay-cnt">{roomEntry[1]["alarm_cnt"]}</p>
      ) : (
        ""
      )}
    </li>
  );
}
