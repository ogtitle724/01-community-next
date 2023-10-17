"use client";
import { memo, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useDispatch } from "react-redux";
import {
  selectCategory,
  selectWidth,
  setCategory,
} from "@/redux/slice/pageSlice";
import { categories, categoriesKO2EN } from "@/config/config";
import "./style.css";

function Gnb() {
  const dispatch = useDispatch();
  const category = useSelector(selectCategory);
  const width = useSelector(selectWidth);
  const marker = useRef();
  const gnb = useRef();
  const btnFocus = useRef();

  useEffect(() => {
    btnFocus.current = Object.values(gnb.current.children).filter(
      (btn) => btn.innerHTML === category
    )[0];
    marker.current.style = `width:${btnFocus.current.offsetWidth}px; left:${btnFocus.current.offsetLeft}px;`;
  }, [width, category]);

  const handleClkLink = (category) => dispatch(setCategory({ category }));
  console.log("GNB");
  return (
    <nav ref={gnb} className="gnb">
      <Link
        className="gnb__btn"
        href={process.env.NEXT_PUBLIC_ROUTE_HOME}
        onClick={() => handleClkLink("홈")}
        scroll={false}
      >
        홈
      </Link>
      {categories.map((category, idx) => {
        return (
          <Link
            key={"gnb-category_" + idx}
            className="gnb__btn"
            href={`/${categoriesKO2EN[category]}`}
            onClick={() => handleClkLink(category)}
            scroll={false}
          >
            {category}
          </Link>
        );
      })}
      <Link
        className="gnb__btn"
        href={"/showcase"}
        onClick={() => handleClkLink("물물교환")}
        scroll={false}
      >
        물물교환
      </Link>
      <div ref={marker} className="gnb__mark"></div>
    </nav>
  );
}

export default memo(Gnb);
