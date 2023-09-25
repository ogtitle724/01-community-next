"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectIsLogIn } from "@/redux/slice/signSlice";
import Sign from "../sign/Sign";
import UserBoard from "../user_board/UserBoard";
import SearchBar from "../../../search_bar/SearchBar";
import ThemeToggle from "../../../../../_components/themetoggle/ThemeToggle";
import "./style.css";

export default function MenuBtn() {
  const [showMenu, setShowMenu] = useState(false);
  const isLogIn = useSelector(selectIsLogIn);

  return (
    <>
      <button className="btn-menu" onClick={() => setShowMenu(true)}></button>
      {showMenu && (
        <section className="popup-menu">
          <h3 hidden>mobile menu</h3>
          <button
            className="btn-close icon"
            onClick={() => setShowMenu(false)}
          ></button>
          {isLogIn ? <UserBoard /> : <Sign />}
          <ThemeToggle />
          <SearchBar />
        </section>
      )}
    </>
  );
}
