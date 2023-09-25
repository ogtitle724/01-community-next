"use client";
import { useSelector } from "react-redux";
import { selectWidth } from "@/redux/slice/pageSlice";
import ThemeToggle from "@/components//themetoggle/ThemeToggle";
import Fetch from "@/util/fetch";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "./style.css";

export default function ChatNav() {
  const [searchTerm, setSearchTerm] = useState();
  const [isShowNav, setIsShowNav] = useState(true);
  const nav = useRef();
  const width = useSelector(selectWidth);

  useEffect(() => {
    if (isShowNav) nav.current.style = "left: 0px";
    else nav.current.style = "left: -300px";
  }, [isShowNav]);

  const handleClkChat = async (roomId) => {
    try {
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
          <li className="chatitem" onClick={handleClkChat}>
            <div className="chatitem__img-wrapper">
              <div className="chatitem__img"></div>
              <div className="chatitem__img"></div>
            </div>
            <div className="chatitem__info">
              <span className="chatitem__nick">돌돔</span>
              <span className="chatitem__time">1시간전</span>
            </div>
            <span className="chatitem__preview">ㅇㅇ</span>
          </li>
          <li className="chatitem chatitem--active" onClick={handleClkChat}>
            <div className="chatitem__img-wrapper">
              <div className="chatitem__img"></div>
              <div className="chatitem__img"></div>
            </div>
            <div className="chatitem__info">
              <span className="chatitem__nick">JOHN</span>
              <span className="chatitem__time">1시간전</span>
            </div>
            <span className="chatitem__preview">
              Hellow there! can i ask u someting?
            </span>
          </li>
          <li className="chatitem" onClick={handleClkChat}>
            <div className="chatitem__img-wrapper">
              <div className="chatitem__img"></div>
              <div className="chatitem__img"></div>
            </div>
            <div className="chatitem__info">
              <span className="chatitem__nick">후라이팬</span>
              <span className="chatitem__time">1시간전</span>
            </div>
            <span className="chatitem__preview">네고 가능한가요?</span>
          </li>
          <li className="chatitem" onClick={handleClkChat}>
            <div className="chatitem__img-wrapper">
              <div className="chatitem__img"></div>
              <div className="chatitem__img"></div>
            </div>
            <div className="chatitem__info">
              <span className="chatitem__nick">famous</span>
              <span className="chatitem__time">1시간전</span>
            </div>
            <span className="chatitem__preview">
              가나다라마바사아자차카타파하아야어여우유오요
            </span>
          </li>
        </ul>
        <h2 className="chatlist__title">clip-chat</h2>
      </nav>
    </>
  );
}
