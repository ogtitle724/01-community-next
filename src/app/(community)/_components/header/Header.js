"use client";
import Link from "next/link";
import { memo } from "react";
import { useSelector } from "react-redux";
import { selectWidth } from "@/redux/slice/pageSlice";
import { selectIsLogIn } from "@/redux/slice/signSlice";
import ThemeToggle from "@/components/themetoggle/ThemeToggle";
import SearchBar from "../search_bar/SearchBar";
import Sign from "./components/sign/Sign";
import UserBoard from "./components/user_board/UserBoard";
import MenuBtn from "./components/menu/menu";
import "./style.css";

function Header() {
  console.log("header rendered");
  const isLogIn = useSelector(selectIsLogIn);
  const width = useSelector(selectWidth);

  return (
    <>
      <header className="header">
        <Link
          className="header__logo"
          href={process.env.NEXT_PUBLIC_ROUTE_HOME}
        >
          {width < 480 ? <i className="header__logo-img"></i> : "CLiPmArKET"}
        </Link>
        {width > 1024 ? (
          <>
            <SearchBar />
            <ThemeToggle />
            <div className="sign-pre">{isLogIn ? <UserBoard /> : <Sign />}</div>
          </>
        ) : (
          <MenuBtn />
        )}
      </header>
    </>
  );
}

export default memo(Header);
