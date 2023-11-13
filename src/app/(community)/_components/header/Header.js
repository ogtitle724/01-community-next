"use client";
import Link from "next/link";
import { memo, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectWidth, setGroup, setCategory } from "@/redux/slice/pageSlice";
import { selectIsLogIn } from "@/redux/slice/signSlice";
import Gnb from "./components/gnb/Gnb";
import SearchBar from "../search_bar/SearchBar";
import Sign from "./components/sign/Sign";
import UserBoard from "./components/user_board/UserBoard";
import MenuBtn from "./components/menu/Menu";
import GnbGroup from "./components/gnb_group/GnbGroup";
import { useParams, useRouter } from "next/navigation";
import "./style.css";

function Header() {
  console.log("HAEDER");
  const isLogIn = useSelector(selectIsLogIn);
  const width = useSelector(selectWidth);
  const params = useParams();
  const header = useRef();
  const router = useRouter();
  const dispatch = useDispatch();

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

  const handleClkLogo = (e) => {
    e.preventDefault();

    dispatch(setGroup(null));
    dispatch(setCategory("홈"));
    router.refresh();
    router.push(`/`);
  };

  return (
    <>
      <header ref={header} className="header">
        <section className="header__interface">
          <Link
            className="header__logo text--t"
            href={process.env.NEXT_PUBLIC_ROUTE_HOME}
            onClick={(e) => handleClkLogo(e)}
          >
            {"clipMK"}
          </Link>
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
