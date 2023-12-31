"use client";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slice/signSlice";
import { useRouter } from "next/navigation";
import Fetch from "@/util/fetch";
import "./style.css";

export default function BtnRec(props) {
  const router = useRouter();
  const user = useSelector(selectUser);

  const handleClickRecommend = async (value) => {
    if (user) {
      try {
        const path = process.env.NEXT_PUBLIC_PATH_POST_REC.replace(
          "{post-id}",
          props.postId
        );
        const option = {
          headers: { "Content-Type": "application/json" },
        };
        const body = JSON.stringify({ value });
        await Fetch.patch(path, body, option);
        router.refresh();
      } catch (err) {
        console.error(err);
      }
    } else {
      return alert("로그인이 필요합니다!");
    }
  };

  return (
    <div className="content-board__btn-wrapper">
      <button
        className="content-board__btn content-board__btn-like"
        onClick={() => handleClickRecommend(1)}
        aria-label="추천"
      >
        <i
          className={
            "content-board__img-like" +
            (props.rec_state === 1 ? " content-board__img-like--active" : "")
          }
          role="button"
          aria-label="추천"
        ></i>
        <span className="content-board__span text--m">{props.rec_cnt}</span>
      </button>
      <button
        className="content-board__btn content-board__btn-dislike"
        onClick={() => handleClickRecommend(-1)}
        aria-label="비추천"
      >
        <span className="content-board__span text--m">{props.dec_cnt}</span>
        <i
          className={
            "content-board__img-dislike" +
            (props.rec_state === -1
              ? " content-board__img-dislike--active"
              : "")
          }
          role="button"
          aria-label="비추천"
        ></i>
      </button>
    </div>
  );
}
