import Board from "../_components/board/Board";
import ServerError from "../_components/error/Error";
import Fetch from "@/util/fetch";
import { categoryEN2KO } from "@/config/config";
import { meta } from "@/config/config";
import { cache } from "react";

const getData = cache(async (path) => {
  try {
    const res = await Fetch.get(path, { next: { revalidate: 0 } });
    return await res.json();
  } catch (err) {
    console.error(err);
    return false;
  }
});

export const generateMetadata = async (props) => {
  const category = categoryEN2KO[props.params.topic];
  const querys = props.searchParams;
  const group = querys.group;
  const page = querys.page ?? 1;

  let path =
    process.env.NEXT_PUBLIC_PATH_PAGING +
    `/${category}?page=${page - 1}&size=30`;
  if (group) path += `&group=${group}`;
  const postData = await getData(path);

  const metaTitle = `${category}${group ? "." + group : ""} | 클립마켓`;
  const metaUrl = process.env.NEXT_PUBLIC_URL_CLI + `/${props.params.topic}`;
  const metaDescription = postData.content
    .reduce((acc, cur, idx) => {
      return (acc += `${idx + 1})${cur.title} `);
    }, "")
    .slice(0, 160);
  const pageMetaData = JSON.parse(JSON.stringify(meta));
  console.log(pageMetaData);

  pageMetaData.title = metaTitle;
  pageMetaData.description = metaDescription;
  pageMetaData.alternates.canonical = metaUrl;
  pageMetaData.robots = { index: true, follow: true, nocache: true };
  pageMetaData.openGraph.title = metaTitle;
  pageMetaData.openGraph.description = metaDescription;
  pageMetaData.openGraph.url = metaUrl;
  pageMetaData.twitter.title = metaTitle;
  pageMetaData.twitter.description = metaDescription;

  return pageMetaData;
};

export default async function TopicPage(props) {
  const category = categoryEN2KO[props.params.topic];
  const querys = props.searchParams;
  const group = querys.group;
  const page = querys.page ?? 1;

  let path =
    process.env.NEXT_PUBLIC_PATH_PAGING +
    `/${category}?page=${page - 1}&size=30`;
  if (group) path += `&group=${group}`;

  const postData = await getData(path);

  if (postData) {
    return (
      <>
        <Board
          posts={postData}
          title={category + (group ? `.${group}` : "")}
        ></Board>
      </>
    );
  } else {
    return <ServerError />;
  }
}
