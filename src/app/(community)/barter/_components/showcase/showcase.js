"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./style.css";

export default function Showcase({ itemPagingData }) {
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
      <div className="showcase__interface">
        <input
          className="showcase__search"
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
        <button
          className="showcase__btn-search"
          aria-label="물품 검색"
        ></button>
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
        {itemPagingData.content.length ? (
          itemPagingData.content.map((item, idx) => (
            <ItemCard key={"showcase-item-" + idx} item={item} />
          ))
        ) : (
          <p className="showcase__no-data">첫 게시물을 등록해 주세요!</p>
        )}
      </ul>
      <button
        className="showcase__btn-to-top"
        onClick={handleClickBtnToTop}
        aria-label="페이지 상단으로 이동"
      ></button>
    </section>
  );
}

function ItemCard({ item }) {
  return (
    <section className="item-card">
      <Link
        className="item-card__a"
        href={process.env.NEXT_PUBLIC_ROUTE_ITEM + `/${item.id}`}
      >
        <div
          className={
            "item-card__img" + (item.img_src ? "" : " item-card__no-img")
          }
        >
          {item.img_src && (
            <img src={item.img_src} fill={true} alt="item image" />
          )}
        </div>
        <h3 className="item-card__title">{item.title}</h3>
        <div className="item-card__indicator">
          <i className="item-card__i-like"></i>
          <span className="item-card__n-like">{item.wishlist_cnt}</span>
          <i className="item-card__i-chat"></i>
          <span className="item-card__n-chat">99+</span>
          <span className="item-card__nick">{item.nick}</span>
        </div>
      </Link>
    </section>
  );
}
