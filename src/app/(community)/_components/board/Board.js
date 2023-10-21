"use client";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCategory } from "@/redux/slice/pageSlice";
import timeConverter from "@/util/time_converter";
import "./style.css";

export default function Board({ posts, title }) {
  const [isDivide, setIsDivide] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCategory({ category: title }));
  }, [dispatch, title]);

  const handleChangeLayout = () => {
    setIsDivide((isDivide) => !isDivide);
  };

  //게시물 없을 경우
  if (posts && !posts.content.length) {
    return (
      <section className="board">
        <h2 className="board__title">{title}</h2>
        <div className="board-empty">
          <span className="board-empty__notif">
            {"첫 게시물을 등록해 주세요!"}
          </span>
        </div>
      </section>
    );
  }

  console.log("BOARD");
  return (
    <>
      <section className="board">
        <h2 className="board__title">{title}</h2>
        <button
          className={
            "board__btn-layout" +
            (isDivide ? " board__btn-layout--grid" : " board__btn-layout--list")
          }
          onClick={handleChangeLayout}
        ></button>
        <ul className={"board__ul" + (isDivide ? " board__ul--grid" : "")}>
          {posts.content.map((post, idx) => {
            return <Post key={"post_" + idx} post={post} />;
          })}
        </ul>
        {posts.totalPages > 1 && <Nav posts={posts} />}
      </section>
    </>
  );
}

function Post({ post }) {
  const time = timeConverter(post.wr_date);

  return (
    <Link
      className="board-item"
      href={process.env.NEXT_PUBLIC_ROUTE_POST + `/${post.id}`}
    >
      <span className="board-item__category">{post.category}</span>
      <h3 className="board-item__title">{post.title}</h3>
      <div className="board-item__data-wrapper">
        <div className="board-item__data board-item__view">
          <span>{post.view_cnt}</span>
        </div>
        <div className="board-item__data board-item__like">
          <span>{post.recommend_cnt}</span>
        </div>
        <div className="board-item__data board-item__comment">
          <span>{post.comment_cnt}</span>
        </div>
        <span className="board-item__nick">{post.nick}</span>
        <span className="board-item__date">{time} </span>
      </div>
    </Link>
  );
}

function Nav({ posts }) {
  const [navPage, setNavPage] = useState(0);
  const navItems = useRef();
  const path = usePathname();
  const searchParams = useSearchParams();
  const page = +searchParams.get("page");

  navItems.current = Array(posts.totalPages)
    .fill(1)
    .map((ele, idx) => ele + idx);

  const handleClkPrev = () => {
    if (navPage > 0) setNavPage(navPage - 1);
  };

  const handleClkNext = () => {
    if (navPage < ~~(posts.totalPages / 10)) setNavPage(navPage + 1);
  };

  return (
    <ul className="board__nav">
      <button
        className="board__nav-btn board__nav-btn-direction"
        onClick={handleClkPrev}
      >
        {"◂"}
      </button>
      {navItems.current
        .slice(navPage * 10, navPage * 10 + 10)
        .map((ele, idx) => {
          return (
            <Link
              key={"navItem_" + idx}
              className={
                "board__nav-btn" +
                (page === ele || (ele === 1 && !page)
                  ? " board__nav-btn--focus"
                  : "")
              }
              href={path + (ele - 1 ? `?page=${ele}` : "")}
            >
              {ele}
            </Link>
          );
        })}
      <button
        className="board__nav-btn board__nav-btn-direction"
        onClick={handleClkNext}
      >
        {"▸"}
      </button>
    </ul>
  );
}
