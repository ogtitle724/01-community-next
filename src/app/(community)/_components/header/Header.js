"use client";
import { memo } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  setPage,
  setCategory,
  setScrollY,
  selectWidth,
} from "@/redux/slice/pageSlice";
import { selectIsLogIn } from "@/redux/slice/signSlice";
import ThemeToggle from "@/components/themetoggle/ThemeToggle";
import SearchBar from "../search_bar/SearchBar";
import Sign from "./components/sign/Sign";
import UserBoard from "./components/user_board/UserBoard";
import MenuBtn from "./components/menu/menu";
import "./style.css";

function Header() {
  console.log("header rendered");
  const router = useRouter();
  const dispatch = useDispatch();
  const isLogIn = useSelector(selectIsLogIn);
  const width = useSelector(selectWidth);

  const handleClickLogo = (e) => {
    e.preventDefault();
    dispatch(setPage({ nextPage: 1 }));
    dispatch(setScrollY({ scrollY: 0 }));
    dispatch(setCategory({ category: "홈" }));
    router.push(process.env.NEXT_PUBLIC_ROUTE_HOME);
  };

  return (
    <>
      <header className="header">
        <a
          className="header__logo"
          href={process.env.NEXT_PUBLIC_ROUTE_HOME}
          onClick={(e) => handleClickLogo(e)}
        >
          {width < 480 ? <i className="header__logo-img"></i> : "CLiPmArKET"}
        </a>
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
