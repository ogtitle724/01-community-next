"use client";
import { useRouter } from "next/navigation";
import { memo, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectWidth } from "@/redux/slice/pageSlice";
import { selectIsLogIn } from "@/redux/slice/signSlice";
import Gnb from "./components/gnb/Gnb";
import SearchBar from "../search_bar/SearchBar";
import Sign from "./components/sign/Sign";
import UserBoard from "./components/user_board/UserBoard";
import MenuBtn from "./components/menu/Menu";
import GnbGroup from "./components/gnb_group/GnbGroup";
import { useParams } from "next/navigation";
import "./style.css";

function Header() {
  console.log("HAEDER");
  const isLogIn = useSelector(selectIsLogIn);
  const width = useSelector(selectWidth);
  const params = useParams();
  const header = useRef();
  const router = useRouter();

  useEffect(() => {
    if (header && header.current) {
      const wheelEvent = (e) => {
        if (e.deltaY >= 0) {
          header.current.style.top = `-${header.current.offsetHeight}px`;
        } else {
          header.current.style.top = "0px";
        }
      };

      window.addEventListener("wheel", wheelEvent);

      return () => window.removeEventListener("wheel", wheelEvent);
    }
  }, []);

  const handleClkLogo = () => {
    router.refresh();
    router.push("/");
  };

  return (
    <>
      <header ref={header} className="header">
        <section className="header__interface">
          <a
            className="header__logo text--t"
            href={process.env.NEXT_PUBLIC_ROUTE_HOME}
            onClick={handleClkLogo}
          >
            {process.env.NEXT_PUBLIC_TITLE}
          </a>
          {width > 1024 ? (
            <>
              <SearchBar />
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
      {params.topic && <GnbGroup />}
    </>
  );
}

export default memo(Header);
