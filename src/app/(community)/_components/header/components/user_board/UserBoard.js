"use client";
import Fetch from "@/util/fetch";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  setUser,
  selectUser,
  setLoginDeadline,
  selectChatAlarm,
} from "@/redux/slice/signSlice";
import "./style.css";

export default function UserBoard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);
  const alarmCnt = useSelector(selectChatAlarm);

  const handleClickLogOut = async () => {
    try {
      await Fetch.get(process.env.NEXT_PUBLIC_PATH_LOGOUT);
      delete Fetch.defaultOptions.headers["Authorization"];
      dispatch(logout());
      dispatch(setUser({ user: null }));
      dispatch(setLoginDeadline({ deadline: null }));
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleNavigateMypage = () => {
    router.push(process.env.NEXT_PUBLIC_ROUTE_MYPAGE);
  };

  const handleClickBtnWrite = () => {
    router.push(process.env.NEXT_PUBLIC_ROUTE_WRITE);
  };

  const handleClkBtnChat = () => {
    router.push(process.env.NEXT_PUBLIC_ROUTE_CHAT);
  };

  return (
    <div className="user-board">
      <div className="user-board__profile">
        <i
          className="user-board__profile-img"
          onClick={handleNavigateMypage}
        ></i>
        <div>
          <p className="user-board__nickname" onClick={handleNavigateMypage}>
            {user.nick ?? "unknown"}
          </p>
        </div>
      </div>
      <div className="divider"></div>
      <div className="user-board__clip">
        <i className="user-board__img-clip"></i>
        <span>123</span>
      </div>
      <div className="divider"></div>
      <button
        className="user-board__btn-write"
        onClick={handleClickBtnWrite}
      ></button>
      <button className="user-board__btn-chat" onClick={handleClkBtnChat}>
        {alarmCnt ? (
          <div className="user-board__alram-cnt">{alarmCnt}</div>
        ) : (
          ""
        )}
      </button>
      <button className="user-board__btn-alram">
        <div className="user-board__alram-cnt">3</div>
      </button>
      <button className="user-board__btn-logout" onClick={handleClickLogOut}>
        ✖
      </button>
    </div>
  );
}
