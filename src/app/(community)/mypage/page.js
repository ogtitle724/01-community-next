"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import "./style.css";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slice/signSlice";

export default function Mypage() {
  const [focus, setFocus] = useState("profile");
  const [btns, setBtns] = useState();
  const content = useMemo(() => {
    return {
      profile: <Profile />,
      post: <Post />,
      comment: <Comment />,
      barter: <Barter />,
    };
  }, []);

  useEffect(() => {
    const temp = Object.keys(content).map((value, idx) => {
      return (
        <button
          key={"mypage-btn_" + idx}
          className={
            "mypage__btn" + (value === focus ? " mypage__btn--focus" : "")
          }
          onClick={handleClkBtn}
          value={value}
        ></button>
      );
    });
    setBtns(temp);
  }, [content, focus]);

  const handleClkBtn = (e) => {
    e.preventDefault();
    setFocus(e.target.value);
  };

  return (
    <div className="mypage">
      {btns}
      <div className="mypage__content">{content[focus]}</div>
    </div>
  );
}

function Profile() {
  const user = useSelector(selectUser);

  return (
    <div className="mypage__profile-wrapper">
      <div>
        <span>{"아이디: "}</span>
        <span>{"test1"}</span>
      </div>
      <div>
        <span>{"닉네임: "}</span>
        <span>{"Nick네임"}</span>
      </div>
      <div>
        <span>{"클립: "}</span>
        <span>{"120c"}</span>
      </div>
      <div>
        <span>{"이메일: "}</span>
        <span>{"sample213@gmail.com"}</span>
      </div>
      <div>
        <span>{"물품: "}</span>
        <span>{`4/5`}</span>
        <span className="mypage__sub-data">{` (거래중/거래완료)`}</span>
      </div>
      <div className="mypage__divider"></div>
      <div className="mypage__profile-container">
        <p className="mypage__profile-container-title">작성한 게시물</p>
        <div className="mypage__profile-items"></div>
      </div>
      <div className="mypage__profile-container">
        <p className="mypage__profile-container-title">작성한 댓글</p>
        <div className="mypage__profile-items"></div>
      </div>
    </div>
  );
}

function Post() {
  const user = useSelector(selectUser);

  return (
    <form className="mypage__posts">
      <span></span>
      <span>✏️</span>
      <span>👀</span>
      <span>👍/👎</span>
      <span>✔️</span>
      <>
        <span>1.</span>
        <div className="mypage__posts-title">
          <span className="mypage__posts-content">
            새로운 취미 시작! 집에서 즐기는 수제 캔들 만들기
          </span>
        </div>
        <span>30</span>
        <span>5/2</span>

        <input className="mypage__radio" type="radio" value={"value"}></input>
      </>
    </form>
  );
}

function Comment() {
  const user = useSelector(selectUser);

  return (
    <form className="mypage__posts">
      <span></span>
      <span>✏️</span>
      <span>📩</span>
      <span>👍/👎</span>
      <span>✔️</span>
      <>
        <span>1.</span>
        <div className="mypage__posts-title">
          <div className="mypage__posts-content">
            글 쓰기도 제대로 못하면서 왜 여기서 글을 올리는 거야?
          </div>
        </div>
        <span>30</span>
        <span>5/2</span>

        <input className="mypage__radio" type="radio" value={"value"}></input>
      </>
    </form>
  );
}

function Barter() {
  const user = useSelector(selectUser);

  return (
    <form className="mypage__posts">
      <span></span>
      <span>📦</span>
      <span>♻️</span>
      <span>❤️</span>
      <span>✔</span>
      <>
        <span>1.</span>
        <div className="mypage__posts-title">
          <span className="mypage__posts-content">팔아.요 장농?</span>
        </div>
        <span>3</span>
        <span>12</span>

        <input className="mypage__radio" type="radio" value={"value"}></input>
      </>
    </form>
  );
}
