"use client";
import Fetch from "@/util/fetch";
import timeConverter from "@/util/time_converter";
import { useRouter } from "next/navigation";
import "./style.css";
import revalidate from "@/util/revalidate";
import { useSelector } from "react-redux";
import { selectIsLogIn } from "@/redux/slice/signSlice";

export default function BtnInterface({ itemDetail }) {
  const router = useRouter;
  const isLogIn = useSelector(selectIsLogIn);

  const handleClkBtnLike = async () => {
    if (isLogIn) {
      try {
        await Fetch.patch(
          process.env.NEXT_PUBLIC_PATH_ITEM + `/${itemDetail.id}/dib`
        );
        revalidate();
        router.refresh();
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  return (
    <section className="item-detail__info">
      <button
        className="item-detail__btn-like icon"
        onClick={handleClkBtnLike}
        aria-label="아이템 찜"
      ></button>
      <span className="item-detail__figure text--m">{itemDetail.dib_cnt}</span>
      <i className="item-detail__btn-chat icon"></i>
      <span className="item-detail__figure text--m">
        {itemDetail.deals.content.length}
      </span>
      <div className="item-detail__static-wrapper">
        <span className="item-detail__nick text--m">
          {itemDetail.user_nick}
        </span>
        <div className="item-detail__wrapper-border">|</div>
        <span className="item-detail__time text--m">
          {timeConverter(itemDetail.wr_date)}
        </span>
      </div>
    </section>
  );
}
