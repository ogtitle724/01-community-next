"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Fetch from "@/util/fetch";
import "./style.css";
import Link from "next/link";

export const generateMetadata = async () => {
  const metaTitle = `마이페이지 | 클립마켓`;
  const metaUrl = "https://www.bayclip.com/mypage";

  meta.title = metaTitle;
  meta.alternates.canonical = metaUrl;
  meta.robots = {
    index: false,
    folow: false,
    nocahch: ture,
  };
  meta.openGraph.title = metaTitle;
  meta.openGraph.url = metaUrl;
  meta.twitter.title = metaTitle;

  return meta;
};

export default function Mypage() {
  const [focus, setFocus] = useState("profile");
  const [btns, setBtns] = useState();
  const [data, setData] = useState({});
  const content = useMemo(() => {
    return {
      profile: <Profile data={data} />,
      posts: <Post data={data.posts} />,
      comments: <Comment data={data.comments} />,
      items: <Barter data={data.items} />,
    };
  }, [data]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const tempData = {};

        tempData.user = await Fetch.getData(process.env.NEXT_PUBLIC_PATH_USER);
        tempData.posts = await Fetch.getData(
          process.env.NEXT_PUBLIC_PATH_USER + `/posts`
        );
        tempData.comments = await Fetch.getData(
          process.env.NEXT_PUBLIC_PATH_USER + `/comments`
        );
        tempData.items = await Fetch.getData(
          process.env.NEXT_PUBLIC_PATH_USER + `/items`
        );
        console.log(tempData);
        setData(tempData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
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
          aria-label={`마이페이지 하위 카테고리 ${value}로 변경`}
        ></button>
      );
    });
    setBtns(temp);
  }, [content, focus]);

  const handleClkBtn = async (e) => {
    e.preventDefault();
    const currContent = e.target.value;
    setFocus(currContent);
  };

  return (
    <div className="mypage">
      {btns}
      <div className="mypage__content">{content[focus]}</div>
    </div>
  );
}

function Profile({ data }) {
  const { user, posts, comments, items } = data;

  return (
    <div className="mypage__profile-wrapper">
      <div>
        <span>{"아이디: "}</span>
        <span>{user.uid}</span>
      </div>
      <div>
        <span>{"닉네임: "}</span>
        <span>{user.nick}</span>
      </div>
      <div>
        <span>{"클립: "}</span>
        <span>{user.point}</span>
      </div>
      <div>
        <span>{"이메일: "}</span>
        <span>{user.email}</span>
      </div>
      <div>
        <span>{"물품: "}</span>
        <span>{`${items.sale}/${items.total}`}</span>
        <span className="mypage__sub-data">{` (거래중/거래완료)`}</span>
      </div>
      <div className="mypage__divider"></div>
      <div className="mypage__profile-container">
        <p className="mypage__profile-container-title">작성한 게시물</p>
        <div className="mypage__profile-items">
          {posts.map((post, idx) => {
            return (
              <li key={"mypage-post-" + idx}>
                <Link>
                  <span>{post.title}</span>
                  <span>{post.view_cnt}</span>
                  <span>{post.recommend_cnt}</span>
                  <span>{post.decommend_cnt}</span>
                </Link>
              </li>
            );
          })}
        </div>
      </div>
      <div className="mypage__profile-container">
        <p className="mypage__profile-container-title">작성한 댓글</p>
        <div className="mypage__profile-items">
          {comments.map((comment, idx) => {
            return (
              <li key={"mypage-comment-" + idx}>
                <Link>
                  <span>{comment.content}</span>
                  <span>{comment.reply_cnt}</span>
                  <span>{comment.recommend_cnt}</span>
                  <span>{comment.decommend_cnt}</span>
                </Link>
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Post({ data }) {
  const posts = data;

  return (
    <form className="mypage__posts">
      <span></span>
      <span>✏️</span>
      <span>👀</span>
      <span>👍/👎</span>
      {posts.map((post, idx) => {
        return (
          <>
            <span>{idx}</span>
            <Link className="mypage__posts-content">{post.title}</Link>
            <span>{post.view_cnt}</span>
            <span>{`${post.recommend_cnt}/${post.decommend_cnt}`}</span>
          </>
        );
      })}
    </form>
  );
}

function Comment() {
  const comments = data;

  return (
    <form className="mypage__posts">
      <span></span>
      <span>✏️</span>
      <span>📩</span>
      <span>👍/👎</span>
      {comments.map((comment, idx) => {
        return (
          <>
            <span>{idx}</span>
            <Link className="mypage__posts-content">{comment.content}</Link>
            <span>{comment.reply_cnt}</span>
            <span>{`${comment.recommend_cnt}/${comment.decommend_cnt}`}</span>
          </>
        );
      })}
    </form>
  );
}

function Barter({ data }) {
  const items = data;

  return (
    <form className="mypage__posts">
      <span></span>
      <span>📦</span>
      <span>♻️</span>
      <span>❤️</span>
      {items.map((item, idx) => {
        return (
          <>
            <span>{idx}</span>
            <Link className="mypage__posts-content">{item.title}</Link>
            <span>{item.sug_cnt}</span>
            <span>{item.interested_cnt}</span>
          </>
        );
      })}
    </form>
  );
}
