import Fetch from "@/util/fetch";
import CommentBoard from "./_component/comment/Comment";
import ServerError from "../../_components/error/Error";
import BtnRec from "./_component/btn_rec/BtnRec";
import BtnUd from "./_component/btn_ud/BtnUd";
import timeConverter from "@/util/time_converter";
import { sanitize } from "@/util/secure";
import { cache } from "react";
import { deleteTags } from "@/util/textProcess";
import { meta } from "@/config/config";
import "./style.css";

const getData = cache(async (path) => {
  try {
    const res = await Fetch.get(path, { next: { revalidate: 0 } });
    return await res.json();
  } catch (err) {
    console.error(err);
    return false;
  }
});

export const generateMetadata = cache(async ({ params }) => {
  const path = process.env.NEXT_PUBLIC_PATH_POST + `/${params.id}`;
  const postData = await getData(path);
  const pageMetaData = JSON.parse(JSON.stringify(meta));

  if (postData) {
    const metaTitle = `${postData.title} | ${
      postData.tbl
        ? postData.tbl + (postData.grp ? `/${postData.grp}` : "")
        : "카테고리 없음"
    } | 클립마켓`;
    console.log(metaTitle);
    const metaDescription = deleteTags(postData.content.slice(0, 250));
    const metaUrl = process.env.NEXT_PUBLIC_URL_CLI + path;

    pageMetaData.title = metaTitle;
    pageMetaData.description = metaDescription;
    pageMetaData.alternates.canonical = metaUrl;
    pageMetaData.openGraph.title = metaTitle;
    pageMetaData.openGraph.description = metaDescription;
    pageMetaData.openGraph.url = metaUrl;
    pageMetaData.twitter.title = metaTitle;
    pageMetaData.twitter.description = metaDescription;
  }

  return pageMetaData;
});

export default async function PostDetailPage({ params }) {
  const path = process.env.NEXT_PUBLIC_PATH_POST + `/${params.id}`;
  const postData = await getData(path);

  if (postData) {
    return (
      <>
        <section className="content-board">
          <article className="content-board__content">
            <h2 className="content-board__title">
              {postData.title}
              <BtnUd writerId={postData.user_id} postId={postData.id} />
            </h2>
            <div className="content-board__info-wrapper">
              <span className="content-board__date">
                {timeConverter(postData.wr_date)}
              </span>
              <div>
                <span className="content-board__category">
                  {postData.tbl
                    ? postData.tbl + (postData.grp ? `.${postData.grp}` : "")
                    : "카테고리 없음"}
                </span>
                <span> | </span>
                <span className="content-board__writer">
                  {postData.user_nick}
                </span>
              </div>
            </div>
            <div
              className="content-board__detail"
              dangerouslySetInnerHTML={{ __html: sanitize(postData.content) }}
            ></div>
            <BtnRec
              postId={postData.id}
              rec_state={postData.recommend_state}
              rec_cnt={postData.recommend_cnt}
              dec_cnt={postData.decommend_cnt}
            />
            <section className="content-board__related">
              <h3 className="content-board__title-related">추천 컨텐츠</h3>
              <div className="content-board__rec-posts">
                <div className="content-board__rec-post">
                  <div className="content-board__rec-post-img"></div>
                </div>
                <div className="content-board__rec-post">
                  <div className="content-board__rec-post-img"></div>
                </div>
                <div className="content-board__rec-post">
                  <div className="content-board__rec-post-img"></div>
                </div>
                <div className="content-board__rec-post">
                  <div className="content-board__rec-post-img"></div>
                </div>
              </div>
            </section>
          </article>
        </section>
        <CommentBoard postId={postData.id} comments={postData.comments} />
      </>
    );
  } else {
    return <ServerError />;
  }
}
