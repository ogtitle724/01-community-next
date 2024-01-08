"use client";
import Fetch from "@/util/fetch";
import Link from "next/link";
import Image from "next/image";
import "./style.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { selectIsLogIn } from "@/redux/slice/signSlice";
import { useRouter } from "next/navigation";
import revalidate from "@/util/revalidate";
import timeConverter from "@/util/time_converter";

export default function Showcase({ itemPagingData }) {
  const [order, setOrder] = useState("최신순");
  const [searchTerm, setSearchTerm] = useState(null);

  console.log(itemPagingData);

  const handleClickBtnToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="showcase">
      <section className="showcase__interface">
        <input
          className="showcase__search"
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="search"
        ></input>
        <button
          className="showcase__btn-search"
          aria-label="물품 검색"
        ></button>
        <select
          className="showcase__select-order text--vs"
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="최신순" aria-label="최신순">
            최신순
          </option>
          <option value="등록일순" aria-label="최신순">
            등록일순
          </option>
          <option value="인기순" aria-label="최신순">
            인기순
          </option>
        </select>
      </section>
      <ul className="showcase__item-wrapper">
        {itemPagingData.content.length ? (
          itemPagingData.content.map((item, idx) => (
            <ItemCard key={"showcase-item-" + idx} item={item} />
          ))
        ) : (
          <p className="showcase__no-data center text--t">
            첫 게시물을 등록해 주세요!
          </p>
        )}
      </ul>
      <button
        className="showcase__btn-to-top center--x"
        onClick={handleClickBtnToTop}
        aria-label="페이지 상단으로 이동"
      ></button>
    </section>
  );
}

function ItemCard({ item }) {
  const isLogIn = useSelector(selectIsLogIn);
  const router = useRouter();

  console.log(item);
  const handleClkBtnLike = async (e) => {
    e.preventDefault();

    if (isLogIn) {
      try {
        await Fetch.patch(
          process.env.NEXT_PUBLIC_PATH_ITEM + `/${item.id}/dib`
        );
        revalidate();
        router.refresh();
      } catch (e) {
        console.error(e.message);
      }
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  return (
    <li className="item-card">
      <Link
        className="item-card__a"
        href={process.env.NEXT_PUBLIC_ROUTE_ITEM + `/${item.id}`}
      >
        <section
          className={
            "item-card__img" + (item.img_src ? "" : " item-card__no-img")
          }
        >
          {item.img_src && (
            <Image
              src={item.img_src}
              sizes="(max-width: 1024px) 160px, 120px"
              fill={true}
              alt="item image"
              priority
            />
          )}
          <span className="text--vs item-card__region">
            {item.region
              ? item.region.dong ||
                item.region.district ||
                item.region.city ||
                "---"
              : "•••"}
          </span>
        </section>
        <h3 className="item-card__title text--s">{item.title}</h3>
        <div className="item-card__indicator">
          <i
            className={
              "item-card__i-like" +
              (item.dib_state ? " item-card__i-like--clk" : "")
            }
            onClick={handleClkBtnLike}
          ></i>
          <span className="item-card__n-like text--s">{item.dib_cnt}</span>
          <i className="item-card__i-chat"></i>
          <span className="item-card__n-chat text--s">{item.deals_cnt}</span>
          <span className="item-card__nick text--s">
            {timeConverter(item.wr_date)}
          </span>
        </div>
      </Link>
    </li>
  );
}
