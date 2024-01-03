"use client";
import Link from "next/link";
import Image from "next/image";
import timeConverter from "@/util/time_converter";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { selectWidth } from "@/redux/slice/pageSlice";
import "./style.css";

export default function Board({ posts, title, isThumbnail }) {
  console.log("BOARD");
  const [isDivide, setIsDivide] = useState(false);
  const [isShowImg, setIsShowImg] = useState(isThumbnail);
  const width = useSelector(selectWidth);

  useEffect(() => {
    if (width < 768 && isDivide) {
      setIsDivide(false);
    }
  }, [isDivide, width]);

  const handleClkBtnLayout = () => {
    setIsDivide((isDivide) => !isDivide);
  };

  const handleClkBtnShowImg = () => {
    setIsShowImg((isShowImg) => !isShowImg);
  };

  if (posts && !posts.content.length) {
    return (
      <section className="board">
        <h1 className="board__title">{title}</h1>
        <div className="board-empty">
          <span className="board-empty__noti center text--l">
            {"첫 게시물을 등록해 주세요!"}
          </span>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="board">
        <section className="board__header">
          <h1 className="board__title">{title}</h1>
          <div className="board__btn-wrapper">
            {width > 768 && (
              <button
                className={
                  "board__btn icon" +
                  (isDivide ? " board__btn-grid" : " board__btn-list")
                }
                onClick={handleClkBtnLayout}
                aria-label="게시글 목록 레이아웃 변경"
              ></button>
            )}
            <button
              className={
                "board__btn icon" +
                (isShowImg ? " board__btn-img" : " board__btn-default")
              }
              onClick={handleClkBtnShowImg}
              aria-label="이미지 노출 여부 변경"
            ></button>
          </div>
        </section>
        <ul className={"board__ul" + (isDivide ? " board__ul--grid" : "")}>
          {posts.content.map((post, idx) => {
            console.log(post);
            return (
              <li key={"post_" + idx}>
                <Post post={post} isShowImg={isShowImg} />
              </li>
            );
          })}
        </ul>
        {posts.totalPages > 1 && <Nav posts={posts} />}
      </section>
    </>
  );
}

function Post({ post, isShowImg }) {
  const time = timeConverter(post.wr_date);

  return (
    <Link
      className={"board-item" + (isShowImg ? "" : " board-item--hide-img")}
      href={process.env.NEXT_PUBLIC_ROUTE_POST + `/${post.id}`}
    >
      {isShowImg && (
        <div className={"board-item__img-wrapper"}>
          <Image
            src={post.thumbnail || "/image/img_default.svg"}
            alt="post thumbnail"
            fill={true}
          ></Image>
        </div>
      )}
      <div
        className={
          "board-item__body" + (isShowImg ? "" : " board-item__body--hide-img")
        }
      >
        <div>
          <div className="board-item__tag-wrapper">
            <span className="board-item__tag--category text--vs">
              {post.tbl + (post.grp ? `/${post.grp}` : "")}
            </span>
            {post.thumbnail && <i className="board-item__tag--img"></i>}
          </div>
          <span className="board-item__title text--m">{post.title}</span>
        </div>
        <div className="board-item__info">
          <div className="board-item__data-wrapper">
            <div className="board-item__data board-item__view">
              <span className="text--vs">{post.view_cnt}</span>
            </div>
            <div className="board-item__data board-item__like">
              <span className="text--vs">{post.recommend_cnt}</span>
            </div>
            <div className="board-item__data board-item__comment">
              <span className="text--vs">{post.comment_cnt}</span>
            </div>
          </div>
          <span className="board-item__date text--vs">
            {post.nick + " • " + time}{" "}
          </span>
        </div>
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
  const group = searchParams.get("group");
  const router = useRouter();

  navItems.current = Array(posts.totalPages)
    .fill(1)
    .map((ele, idx) => ele + idx);

  const handleClkPrev = () => {
    if (navPage > 0) setNavPage(navPage - 1);
  };

  const handleClkNext = () => {
    if (navPage < ~~(posts.totalPages / 10)) setNavPage(navPage + 1);
  };

  const handleClkNav = (e, query) => {
    e.preventDefault();
    console.log(path, query);
    e.preventDefault();
    router.refresh();
    router.push(`${path + query}`);
  };

  return (
    <ul className="board__nav">
      <li
        className="board__nav-btn board__nav-btn-direction"
        onClick={handleClkPrev}
        aria-label="게시글 목록 네비게이션바 변경(-10)"
      >
        {"◂"}
      </li>
      {navItems.current
        .slice(navPage * 10, navPage * 10 + 10)
        .map((ele, idx) => {
          const query =
            ele - 1 ? `?${group ? `group=${group}` : ""}&page=${ele}` : "";
          return (
            <li className="board__nav-btn" key={"navItem_" + idx}>
              <Link
                className={
                  "board__nav-btn" +
                  (page === ele || (ele === 1 && !page)
                    ? " board__nav-btn--focus"
                    : "")
                }
                href={path + query}
                onClick={(e) => handleClkNav(e, query)}
              >
                {ele}
              </Link>
            </li>
          );
        })}
      <li
        className="board__nav-btn board__nav-btn-direction"
        onClick={handleClkNext}
        aria-label="게시글 목록 네비게이션바 변경(+10)"
      >
        {"▸"}
      </li>
    </ul>
  );
}
