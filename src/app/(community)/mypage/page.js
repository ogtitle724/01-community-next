"use client";
import Fetch from "@/util/fetch";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { sanitize } from "@/util/secure";
import "./style.css";

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
  const [data, setData] = useState();
  const content = useMemo(() => {
    return {
      profile: <Profile data={data} />,
      posts: <Post data={data?.posts} />,
      comments: <Comment data={data?.comments} />,
      items: <Barter data={data?.items} />,
    };
  }, [data]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let res, data;
        res = await Fetch.get(process.env.NEXT_PUBLIC_PATH_USER);
        data = await res.json();
        setData(data);
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
      <div className="mypage__content">{data && content[focus]}</div>
    </div>
  );
}

function Profile({ data }) {
  if (!data) return;
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
        <p className="mypage__profile-container-title">
          작성한 게시물
          <span className="mypage__sub-data">
            (제목/조회수/댓글/추천/비추천)
          </span>
        </p>
        <div className="mypage__profile-items">
          {posts.content.map((post, idx) => {
            return (
              <li key={"mypage-post-" + idx}>
                <Link
                  href={process.env.NEXT_PUBLIC_ROUTE_POST + `/${post.id}`}
                  className="mypage__profile-link"
                >
                  <span>{post.title}</span>
                  <span>{post.view_cnt}</span>
                  <span>{post.comment_cnt}</span>
                  <span>{post.recommend_cnt}</span>
                  <span>{post.decommend_cnt}</span>
                </Link>
              </li>
            );
          })}
        </div>
      </div>
      <div className="mypage__profile-container">
        <p className="mypage__profile-container-title">
          작성한 댓글(내용/대댓글/추천/비추천)
        </p>
        <div className="mypage__profile-items">
          {comments.content.map((comment, idx) => {
            return (
              <li key={"mypage-comment-" + idx}>
                <Link
                  href={
                    process.env.NEXT_PUBLIC_ROUTE_POST + `/${comment.postId}`
                  }
                  className="mypage__profile-link"
                >
                  <span
                    className="mypage__profile-comment-content"
                    dangerouslySetInnerHTML={{
                      __html: sanitize(comment.content),
                    }}
                  ></span>
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
  if (!data) return;
  const posts = data;

  return (
    <form className="mypage__posts">
      <span></span>
      <span>✏️</span>
      <span>👀</span>
      <span>👍/👎</span>
      {posts.content.map((post, idx) => {
        return (
          <>
            <span>{idx}</span>
            <Link
              href={process.env.NEXT_PUBLIC_ROUTE_POST + `/${post.id}`}
              className="mypage__posts-content"
            >
              {post.title}
            </Link>
            <span>{post.view_cnt}</span>
            <span>{`${post.recommend_cnt}/${post.decommend_cnt}`}</span>
          </>
        );
      })}
    </form>
  );
}

function Comment({ data }) {
  if (!data) return;
  const comments = data;

  return (
    <form className="mypage__posts">
      <span></span>
      <span>✏️</span>
      <span>📩</span>
      <span>👍/👎</span>
      {comments.content.map((comment, idx) => {
        return (
          <>
            <span>{idx}</span>
            <Link
              href={process.env.NEXT_PUBLIC_ROUTE_POST + `/${comment.postId}`}
              className="mypage__posts-content"
            >
              <span
                dangerouslySetInnerHTML={{ __html: sanitize(comment.content) }}
              ></span>
            </Link>
            <span>{comment.reply_cnt}</span>
            <span>{`${comment.recommend_cnt}/${comment.decommend_cnt}`}</span>
          </>
        );
      })}
    </form>
  );
}

function Barter({ data }) {
  if (!data) return;
  const items = data;

  return (
    <form className="mypage__posts">
      <span></span>
      <span>📦</span>
      <span>♻️</span>
      <span>❤️</span>
      {items.content.map((item, idx) => {
        return (
          <>
            <span>{idx}</span>
            <Link
              href={process.env.NEXT_ROUTE_ITEM + `/${item.id}`}
              className="mypage__posts-content"
            >
              {item.title}
            </Link>
            <span>{item.deals_cnt}</span>
            <span>{item.dib_cnt}</span>
          </>
        );
      })}
    </form>
  );
}
