"use client";
import Fetch from "@/util/fetch";
import socket from "@/util/socket";
import { useCallback, useEffect, useState } from "react";
import { checkUid, checkNick, checkEmail, checkPwd } from "@/util/validation";
import "./style.css";

export default function SignUp({ setShowSignUpForm }) {
  const [uid, setUid] = useState("");
  const [nick, setNick] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [authCode, setAuthCode] = useState("");

  const [canUseUid, setCanUseUid] = useState(false);
  const [canUseNick, setCanUseNick] = useState(false);
  const [isPwdMatch, setIsPwdMatch] = useState(false);
  const [isCodeValid, setIsCodeVaild] = useState(false);

  const [isClickBtnAuth, setIsClickBtnAuth] = useState(false);
  const [count, setCount] = useState(null);
  const [isAuthBtnDisabled, setIsAuthBtnDisabled] = useState(false);
  const [isFail, setIsFail] = useState(false);

  useEffect(() => {
    if (isClickBtnAuth && count > 0) {
      setTimeout(() => setCount(count - 1), 1000);
    }
    if (count === 0) {
      setIsAuthBtnDisabled(false);
    }
  }, [count, isClickBtnAuth]);

  const handleCheckDuplication = useCallback(async (value, type) => {
    try {
      if (type === "nick") {
        await Fetch.post(process.env.NEXT_PUBLIC_PATH_CHECK_NICK, {
          nick: value,
        });
        setCanUseNick(true);
      } else if (type === "uid") {
        await Fetch.post(process.env.NEXT_PUBLIC_PATH_CHECK_UID, {
          uid: value,
        });
        setCanUseUid(true);
      }
    } catch (err) {
      if (type === "nick") {
        setCanUseNick(false);
      } else if (type === "uid") {
        setCanUseUid(false);
      }
      console.error(err);
    }
  }, []);

  const handlePwdsMatch = useCallback((pwdA, pwdB) => {
    if (pwdA === pwdB) setIsPwdMatch(true);
    else setIsPwdMatch(false);
  }, []);

  const handleClickBtnConfrim = useCallback(async () => {
    try {
      await Fetch.post(process.env.NEXT_PUBLIC_PATH_EMAIL_VERIFY, {
        email,
        authCode: Number(authCode),
      });
      setIsCodeVaild(true);
    } catch (err) {
      console.error(err);
      setIsFail(true);
      setTimeout(() => setIsFail(false), 3000);
    }
  }, [authCode, email]);

  const handleClickBtnAuth = useCallback(async () => {
    setIsClickBtnAuth(true);
    setIsAuthBtnDisabled(true);
    setCount(180);

    try {
      await Fetch.post(process.env.NEXT_PUBLIC_PATH_EMAIL_AUTHCODE, {
        email,
      });
    } catch (err) {
      console.error(err);
    }
  }, [email]);

  const handleClickBtnSignUp = async (e) => {
    e.preventDefault();

    try {
      const res = await Fetch.post(process.env.NEXT_PUBLIC_PATH_USER, {
        uid: uid,
        nick: nick,
        email: email,
        pwd: pwd,
      });

      if (res.data) {
        setShowSignUpForm(false);
        //TODO: 회원가입과 함께 DDB USERS TABLE에 회원 추가
      } else {
        throw new Error("singin rejected");
      }
    } catch (err) {
      console.error(err);
      alert("ERROR:", err);
    }
  };

  return (
    <div
      className="signup__background"
      onClickCapture={(e) => e.preventDefault()}
    >
      <form className="signup">
        <h2 className="signup__title" hidden>
          회원 가입
        </h2>
        <button
          className="btn-close icon"
          onClick={() => setShowSignUpForm(false)}
        ></button>
        <SectionInput
          placeholder={"아이디 (3~20자 영문/숫자)"}
          target={uid}
          handleOnChange={(e) => {
            setUid(e.target.value);
            handleCheckDuplication(e.target.value, "uid");
          }}
        >
          <p
            className={
              "signup__warn" +
              (checkUid(uid) && canUseUid ? " signup__warn--ok" : "")
            }
          >
            {uid &&
              (checkUid(uid)
                ? canUseUid
                  ? "사용 가능한 아이디입니다."
                  : "이미 사용중인 아이디입니다."
                : "아이디가 양식에 맞지 않습니다.")}
          </p>
        </SectionInput>
        <SectionInput
          placeholder={"닉네임 (3~8자 한글/영문/숫자)"}
          target={nick}
          handleOnChange={(e) => {
            setNick(e.target.value);
            handleCheckDuplication(e.target.value, "nick");
          }}
        >
          <p
            className={
              "signup__warn" +
              (checkNick(nick) && canUseNick ? " signup__warn--ok" : "")
            }
          >
            {nick &&
              (checkNick(nick)
                ? canUseNick
                  ? "사용 가능한 닉네임입니다."
                  : "이미 사용중인 닉네임입니다."
                : "닉네임이 양식에 맞지 않습니다.")}
          </p>
        </SectionInput>
        <SectionInput
          placeholder={"이메일 (example@email.com)"}
          target={email}
          handleOnChange={(e) => setEmail(e.target.value)}
        >
          <button
            className={"signup__btn-auth"}
            onClick={handleClickBtnAuth}
            disabled={isAuthBtnDisabled || !checkEmail(email)}
          >
            {count ? `${~~(count / 60)} : ${count % 60}` : "인증"}
          </button>
          <section className="signup__section-auth">
            <input
              type="text"
              className={
                "signup__input-auth" +
                (isClickBtnAuth ? "" : " signup__input-auth--disable") +
                (isClickBtnAuth && isFail ? " signup__input-auth--fail" : "")
              }
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              autoComplete="off"
            ></input>
            <button
              className={
                "signup__btn-auth" +
                (isClickBtnAuth
                  ? " signup__btn-auth--active"
                  : " signup__btn-auth--disable")
              }
              onClick={handleClickBtnConfrim}
              type="button"
              disabled={isCodeValid}
            >
              {isCodeValid ? "✔" : "확인"}
            </button>
          </section>
        </SectionInput>
        <SectionInput
          placeholder={"비밀번호 (8~16자 영문+숫자+특수기호)"}
          target={pwd}
          handleOnChange={(e) => setPwd(e.target.value)}
        >
          <p
            className={
              "signup__warn" + (checkPwd(pwd) ? " signup__warn--ok" : "")
            }
          >
            {pwd &&
              (checkPwd(pwd)
                ? "사용 가능한 비밀번호입니다."
                : "비밀번호가 양식에 맞지 않습니다.")}
          </p>
        </SectionInput>
        <SectionInput
          placeholder={"비밀번호 (중복확인)"}
          target={confirmPwd}
          handleOnChange={(e) => {
            setConfirmPwd(e.target.value);
            handlePwdsMatch(e.target.value, pwd);
          }}
        >
          <p
            className={"signup__warn" + (isPwdMatch ? " signup__warn--ok" : "")}
          >
            {confirmPwd &&
              (isPwdMatch
                ? "비밀번호가 일치합니다"
                : "입력한 비밀번호가 일치하지 않습니다.")}
          </p>
        </SectionInput>
        <button
          type="submit"
          className="signup__btn"
          disabled={
            !(
              checkUid(uid) &&
              canUseUid &&
              checkNick(nick) &&
              canUseNick &&
              checkPwd(pwd) &&
              isPwdMatch &&
              isCodeValid
            )
          }
          onClick={handleClickBtnSignUp}
        >
          회원 가입
        </button>
      </form>
    </div>
  );
}

function SectionInput({ placeholder, target, handleOnChange, children }) {
  return (
    <section className="signup__section">
      <input
        className="signup__input"
        type="text"
        value={target}
        onChange={handleOnChange}
        autoComplete="off"
        placeholder={placeholder}
      />
      {children}
    </section>
  );
}
