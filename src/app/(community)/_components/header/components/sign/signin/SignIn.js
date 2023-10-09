"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  login,
  logout,
  chatConnect,
  setLoginDeadline,
  setUser,
} from "@/redux/slice/signSlice";
import socket from "@/util/socket";
import Fetch from "@/util/fetch";
import { blindInput, jwtDecode } from "@/util/secure";
import "./style.css";

export default function SignIn() {
  const dispatch = useDispatch();
  const [uid, setUid] = useState("");
  const [pwd, setPwd] = useState("");
  const [isFail, setIsFail] = useState(false);

  const handleClickBtnLogIn = async (e) => {
    e.preventDefault();

    try {
      const res = await Fetch.post(process.env.NEXT_PUBLIC_PATH_LOGIN, {
        uid,
        pwd,
      });
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

      socket.connect(String(user.id));
      socket.send({ action: "getConnectionData", senderId: String(user.id) });
      dispatch(chatConnect({ sign: true }));
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
      console.log("token regenerated(silent)");
    } catch (err) {
      dispatch(logout());
      dispatch(setUser({ user: null }));
      dispatch(setLoginDeadline({ deadline: null }));
      console.error(err);
    }
  };

  return (
    <form className={"signin" + (isFail ? " signin--fail" : "")}>
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

      <button className="signin__btn-submit" onClick={handleClickBtnLogIn}>
        ✔
      </button>
    </form>
  );
}
