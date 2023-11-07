"use client";
import Fetch from "@/util/fetch";
import timeConverter from "@/util/time_converter";
import { useRouter } from "next/navigation";
import "./style.css";

export default function BtnInterface({ itemDetail }) {
  const router = useRouter;

  const handleClkBtnLike = async () => {
    try {
      await Fetch.patch(
        process.env.NEXT_PUBLIC_PATH_ITEM + `/${itemDetail.id}/dib`
      );
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="item-detail__info">
      <button
        className="item-detail__btn-like"
        onClick={handleClkBtnLike}
        aria-label="아이템 찜"
      ></button>
      <span className="item-detail__figure">{itemDetail.dib_cnt}</span>
      <i className="item-detail__btn-chat"></i>
      <span className="item-detail__figure">
        {itemDetail.deals.content.length}
      </span>
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
