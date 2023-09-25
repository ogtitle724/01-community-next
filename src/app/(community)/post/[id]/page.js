import Fetch from "@/util/fetch";
import CommentBoard from "./_component/comment/Comment";
import ServerError from "../../_components/error/Error";
import BtnRec from "./_component/btn_rec/BtnRec";
import BtnUd from "./_component/btn_ud/BtnUd";
import timeConverter from "@/util/time_converter";
import { sanitize } from "@/util/secure";
import "./style.css";

export default async function PostDetailPage({ params }) {
  const postId = params.id;

  try {
    const res = await Fetch.get(
      process.env.NEXT_PUBLIC_PATH_POST + `/${postId}`
    );
    const postDetail = await res.json();

    return (
      <>
        <section className="content-board">
          <article className="content-board__content">
            <h2 className="content-board__title">
              {postDetail.title}
              <BtnUd writerId={postDetail.user_id} postId={postDetail.id} />
            </h2>
            <div className="content-board__info-wrapper">
              <span className="content-board__date">
                {timeConverter(postDetail.wr_date)}
              </span>
              <div>
                <span className="content-board__category">
                  {postDetail.category ? postDetail.category : "카테고리 없음"}
                </span>
                <span> | </span>
                <span className="content-board__writer">
                  {postDetail.user_nick}
                </span>
              </div>
            </div>
            <div
              className="content-board__detail"
              dangerouslySetInnerHTML={{ __html: sanitize(postDetail.content) }}
            ></div>
            <BtnRec
              postId={postDetail.id}
              rec_state={postDetail.recommend_state}
              rec_cnt={postDetail.recommend_cnt}
              dec_cnt={postDetail.decommend_cnt}
            />
            <section className="content-board__related">
              <h3 className="content-board__title-related">추천 컨텐츠</h3>
              <div className="content-board__best"></div>
            </section>
          </article>
        </section>
        <CommentBoard postId={postDetail.id} comments={postDetail.comments} />
      </>
    );
  } catch (err) {
    console.error(err);
    return <ServerError />;
  }
}
