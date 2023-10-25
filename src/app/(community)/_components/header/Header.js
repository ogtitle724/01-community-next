"use client";
import Link from "next/link";
import { memo } from "react";
import { useSelector } from "react-redux";
import { selectWidth } from "@/redux/slice/pageSlice";
import { selectIsLogIn } from "@/redux/slice/signSlice";
import ThemeToggle from "@components/theme_toggle/ThemeToggle";
import Gnb from "./components/gnb/Gnb";
import SearchBar from "../search_bar/SearchBar";
import Sign from "./components/sign/Sign";
import UserBoard from "./components/user_board/UserBoard";
import MenuBtn from "./components/menu/Menu";
import GnbGroup from "./components/gnb_group/GnbGroup";
import "./style.css";

function Header() {
  console.log("HAEDER");
  const isLogIn = useSelector(selectIsLogIn);
  const width = useSelector(selectWidth);

  return (
    <>
      <header className="header">
        <section className="header__interface">
          <Link
            className="header__logo"
            href={process.env.NEXT_PUBLIC_ROUTE_HOME}
          >
            {"CLiPmArKET"}
          </Link>
          {width > 1200 ? (
            <>
              <SearchBar />
              <ThemeToggle />
              <div className="sign-pre">
                {isLogIn ? <UserBoard /> : <Sign />}
              </div>
            </>
          ) : (
            <MenuBtn />
          )}
        </section>
        <Gnb />
      </header>
      <GnbGroup />
    </>
  );
}

export default memo(Header);
