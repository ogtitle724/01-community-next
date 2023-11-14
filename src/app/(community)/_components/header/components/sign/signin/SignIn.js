"use client";
import { memo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  login,
  logout,
  setLoginDeadline,
  setUser,
} from "@/redux/slice/signSlice";
import Fetch from "@/util/fetch";
import { blindInput, jwtDecode } from "@/util/secure";
import "./style.css";

function SignIn() {
  console.log("SIGN-IN");
  const dispatch = useDispatch();
  const [uid, setUid] = useState("");
  const [pwd, setPwd] = useState("");
  const [isFail, setIsFail] = useState(false);
  const btn = useRef();

  const handleClickBtnLogIn = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const body = { uid, pwd };
      const res = await Fetch.post(
        process.env.NEXT_PUBLIC_PATH_LOGIN,
        JSON.stringify(body),
        { headers: { "Content-Type": "application/json" } }
      );
      const authHeader = res.headers.get("Authorization", {
        cache: "no-store",
      });
      const accessToken = authHeader && authHeader.split(" ")[1];
      const payload = jwtDecode(accessToken);
      const user = {
        id: +payload.sub,
        nick: payload.user_nick,
      };

      let now = new Date();
      let afterAWeek = new Date();
      afterAWeek.setDate(now.getUTCDate() + 7);

      dispatch(login());
      dispatch(setUser({ user }));
      dispatch(setLoginDeadline({ deadline: afterAWeek.toString() }));
      setTimeout(silentRenew, process.env.NEXT_PUBLIC_TOKEN_REGENERATE_TIME);
    } catch (err) {
      setIsFail(true);
      setTimeout(() => setIsFail(false), 3000);
      setUid("");
      setPwd("");
    }
  };

  const silentRenew = async () => {
    try {
      await Fetch.get(process.env.NEXT_PUBLIC_PATH_LOGIN_SILENCE);
      setTimeout(silentRenew, process.env.NEXT_PUBLIC_TOKEN_REGENERATE_TIME);
      console.log("silent refresh(token)");
    } catch (err) {
      dispatch(logout());
      dispatch(setUser({ user: null }));
      dispatch(setLoginDeadline({ deadline: null }));
      console.error(err);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      btn.current.click();
    }
  };

  return (
    <section
      onKeyDown={handleEnter}
      className={"signin" + (isFail ? " signin--fail" : "")}
    >
      <input
        value={uid}
        className="signin__input"
        name="uid"
        type="text"
        placeholder="아이디"
        autoComplete="off"
        onChange={(e) => {
          setUid(e.target.value);
        }}
      />
      <input
        value={blindInput(pwd)}
        className="signin__input"
        name="pwd"
        type="text"
        placeholder="비밀번호"
        autoComplete="off"
        onChange={(e) => {
          if (pwd.length < e.target.value.length) {
            setPwd(pwd + e.target.value.at(-1));
          } else {
            setPwd(pwd.slice(0, -1));
          }
        }}
      />

      <button
        ref={btn}
        className="signin__btn-submit"
        onClick={handleClickBtnLogIn}
        aria-label="로그인"
      >
        ✔
      </button>
    </section>
  );
}

export default memo(SignIn);
