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
      ></button>
      <span className="item-detail__figure">99+</span>
      <button className="item-detail__btn-chat"></button>
      <span className="item-detail__figure">99+</span>
      <span className="item-detail__time">
        {timeConverter(itemDetail.wr_date)}
      </span>
    </div>
  );
}