import { memo, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Fetch from "@/util/fetch";
import socket from "@/util/socket";
import {
  logout,
  setUser,
  selectUser,
  setLoginDeadline,
  selectChatAlarm,
  selectIsLogIn,
} from "@/redux/slice/signSlice";
import "./style.css";

function UserBoard() {
  console.log("USERBOARD");
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);
  const isLogIn = useSelector(selectIsLogIn);
  const alarmCnt = useSelector(selectChatAlarm);
  const alarmDialog = useRef();

  useEffect(() => {
    if (
      isLogIn &&
      (socket.readyState === WebSocket.CLOSED || !socket.isConnect)
    ) {
      socket.connect(JSON.stringify(user.id));
    }
  }, [isLogIn, user.id]);

  const handleClickLogOut = async (e) => {
    e.preventDefault();

    try {
      await Fetch.get(process.env.NEXT_PUBLIC_PATH_LOGOUT);
      delete Fetch.defaultOptions.headers["Authorization"];
      dispatch(logout());
      dispatch(setUser({ user: null }));
      dispatch(setLoginDeadline({ deadline: null }));
      socket.disconnect();
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

  const handleClkBtnAddItem = () => {
    router.push(process.env.NEXT_PUBLIC_ROUTE_ADD_ITEM);
  };

  const handleClkBtnChat = () => {
    router.push(process.env.NEXT_PUBLIC_ROUTE_CHAT);
  };

  const handleClkBtnAlarm = (e) => {
    e.preventDefault();
    alarmDialog.current.show();
  };

  return (
    <div className="user-board">
      <button
        className="user-board__profile"
        onClick={handleNavigateMypage}
        aria-label="navigation to mypage"
      >
        {/* <i className="user-board__profile-img"></i> */}
        <p className="user-board__nickname text--s">{user.nick ?? "unknown"}</p>
      </button>
      <div className="divider"></div>
      <div className="user-board__clip">
        <i className="user-board__img-clip icon"></i>
        <span className="text--s">123</span>
      </div>
      <div className="divider"></div>
      <button
        className="user-board__btn-write icon"
        onClick={handleClickBtnWrite}
        aria-label="navigate to write page"
      ></button>
      <button
        className="user-board__btn-add icon"
        onClick={handleClkBtnAddItem}
        aria-label="navigate to add item page"
      ></button>
      <button
        className="user-board__btn-chat"
        onClick={handleClkBtnChat}
        aria-label="navigate to chat page"
      >
        {alarmCnt ? (
          <div className="user-board__alram-cnt">{alarmCnt}</div>
        ) : (
          ""
        )}
      </button>
      <button
        className="user-board__btn-alram"
        onCanPlayThrough={handleClkBtnAlarm}
        aria-label="open alarm modal"
      >
        {/* <div className="user-board__alram-cnt">3</div> */}
      </button>
      <button
        className="user-board__btn-logout text--vs"
        onClick={handleClickLogOut}
        aria-label="logout"
      >
        ✖
      </button>
    </div>
  );
}

/* function AlarmDialog({ alarmDialog }) {
  const handleClkBtnErase = (e) => {
    e.preventDefault();
    //알람다지우기
  };

  const handleClkBtnDel = (e) => {
    e.preventDefault();
    //알람 스플라이싱
  };

  return (
    <dialog ref={alarmDialog}>
      <form method="dialog">
        <ul>
          <Link>
            <i className="alarm__icon"></i>
            <span className="alarm__content"></span>
            <span className="alarm__nick"></span>
            <span className="alarm__time"></span>
            <button
              className="alarm__btn-delete"
              onClick={handleClkBtnDel}
            ></button>
          </Link>
        </ul>
        <div className="alarm__btn-wrapper">
          <button
            className="alarm__btn__erase-all"
            onClick={handleClkBtnErase}
          ></button>
          <button className="alarm__btn__close"></button>
        </div>
      </form>
    </dialog>
  );
}
 */

export default memo(UserBoard);
