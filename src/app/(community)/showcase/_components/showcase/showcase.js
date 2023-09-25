"use client";
import { useState } from "react";
import Link from "next/link";
import timeConverter from "@/util/time_converter";
import "./style.css";

export default function Showcase({ itemData }) {
  const [order, setOrder] = useState("최신순");
  const [searchTerm, setSearchTerm] = useState(null);

  const handleClickBtnToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="showcase">
      <div className="showcase__header">
        <input
          className="showcase__search"
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
        <button className="showcase__btn-search"></button>
        <select
          className="showcase__select-order"
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="최신순">최신순</option>
          <option value="등록일순">등록일순</option>
          <option value="인기순">인기순</option>
        </select>
      </div>
      <ul className="showcase__item-wrapper">
        {itemData.content.map((data, idx) => (
          <ItemCard key={"showcase-item-" + idx} data={data} />
        ))}
      </ul>
      <button
        className="showcase__btn-to-top"
        onClick={handleClickBtnToTop}
      ></button>
    </section>
  );
}

function ItemCard({ data }) {
  return (
    <div className="item-card">
      <Link href={process.env.NEXT_PUBLIC_ROUTE_ITEM + `/${data.id}`}>
        {false ? (
          <i className="item-card__img"></i>
        ) : (
          <div className="item-card__no-img"></div>
        )}
        <div className="item-card__info">
          <div className="item-card__title">{data.title}</div>
          <div className="item-card__indicator">
            <i className="item-card__i-like"></i>
            <span className="item-card__n-like">{data.interested_cnt}</span>
            <i className="item-card__i-chat"></i>
            <span className="item-card__n-chat">99+</span>
            <span className="item-card__time">
              {timeConverter(data.wr_date)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
