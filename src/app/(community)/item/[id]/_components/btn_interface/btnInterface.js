"use client";
import { useRouter } from "next/navigation";
import timeConverter from "@/util/time_converter";
import "./style.css";

export default function BtnInterface({ itemDetail }) {
  const router = useRouter;

  const handleClkBtnLike = () => {
    router.refresh();
  };

  return (
    <div className="item-detail__info">
      <button
        className="item-detail__btn-like"
        onClick={handleClkBtnLike}
        aria-label="아이템 찜"
      ></button>
      <span className="item-detail__figure">99+</span>
      <i className="item-detail__btn-chat"></i>
      <span className="item-detail__figure">99+</span>
      <div className="item-detail__static-wrapper">
        <span className="item-detail__nick">{itemDetail.user_nick}</span>
        <div className="item-detail__wrapper-border">|</div>
        <span className="item-detail__time">
          {timeConverter(itemDetail.wr_date)}
        </span>
      </div>
    </div>
  );
}
