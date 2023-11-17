import Fetch from "@/util/fetch";
import CommentBoard from "./_component/comment/Comment";
import ServerError from "../../_components/error/Error";
import BtnRec from "./_component/btn_rec/BtnRec";
import BtnUd from "./_component/btn_ud/BtnUd";
import timeConverter from "@/util/time_converter";
import { sanitize } from "@/util/secure";
import { cache } from "react";
import { deleteTags } from "@/util/textProcess";
import { metaData } from "@/config/metadata";
import "./style.css";
import revalidate from "@/util/revalidate";

const getData = cache(async (path) => {
  try {
    const res = await Fetch.get(path);
    return await res.json();
  } catch (err) {
    console.error(err);
    return false;
  }
});

export const generateMetadata = cache(async ({ params }) => {
  const path = process.env.NEXT_PUBLIC_PATH_POST + `/${params.id}`;
  const postData = await getData(path);
  const pageMetaData = structuredClone(metaData);

  if (postData) {
    const metaTitle = `${postData.title} | ${
      postData.tbl + (postData.grp ? `/${postData.grp}` : "")
    }`;
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
  revalidate();
  const path = process.env.NEXT_PUBLIC_PATH_POST + `/${params.id}`;
  const postData = await getData(path);
  console.log(postData.content);
  postData.content = postData.content.replaceAll(
    "<img",
    `<img alt="게시글 [${postData.title}]에 포함된 이미지" `
  );
  console.log(postData.content);
  if (postData) {
    return (
      <>
        <section className="content-board">
          <article className="content-board__content">
            <h1 className="content-board__title text--l">{postData.title}</h1>
            <div className="content-board__info-wrapper">
              <div>
                <span className="content-board__category text--vs">
                  {postData.tbl
                    ? postData.tbl + (postData.grp ? `.${postData.grp}` : "")
                    : "카테고리 없음"}
                </span>
                <span className="text--vs"> | </span>
                <span className="content-board__writer text--vs">
                  {postData.user_nick}
                </span>
              </div>
              <span className="content-board__date text--vs">
                {timeConverter(postData.wr_date)}
              </span>
            </div>
            <BtnUd writerId={postData.user_id} postId={postData.id} />
            <section
              className="content-board__detail text--m"
              dangerouslySetInnerHTML={{ __html: sanitize(postData.content) }}
            ></section>
            <BtnRec
              postId={postData.id}
              rec_state={postData.recommend_state}
              rec_cnt={postData.recommend_cnt}
              dec_cnt={postData.decommend_cnt}
            />
            <section className="content-board__related">
              <h2 className="content-board__title-related text--s">
                추천 컨텐츠
              </h2>
              <div className="content-board__rec-posts">
                <div className="content-board__rec-post">
                  <div className="content-board__rec-post-img center"></div>
                </div>
                <div className="content-board__rec-post">
                  <div className="content-board__rec-post-img center"></div>
                </div>
                <div className="content-board__rec-post">
                  <div className="content-board__rec-post-img center"></div>
                </div>
                <div className="content-board__rec-post">
                  <div className="content-board__rec-post-img center"></div>
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
