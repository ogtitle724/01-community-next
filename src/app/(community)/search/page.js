import Fetch from "@/util/fetch";
import Board from "../_components/board/Board";
import ServerError from "../_components/error/Error";
import { cache } from "react";
import { metaData } from "@/config/metadata";

const getData = cache(async (path) => {
  try {
    const res = await Fetch.get(path);
    return await res.json();
  } catch (err) {
    console.error(err);
    return false;
  }
});

export const generateMetadata = cache(async ({ searchParams }) => {
  const term = searchParams.term;
  const page = searchParams.page ?? 1;
  const path =
    process.env.NEXT_PUBLIC_PATH_SEARCH +
    `?page=${page - 1}&size=30&searchTerm=${term}`;
  const postData = await getData(path);
  const pageMetaData = structuredClone(metaData);

  if (postData) {
    const metaTitle = `'${term}'관련 게시물`;
    const metaUrl = process.env.NEXT_PUBLIC_URL_CLI + path;
    const metaDescription = postData.content.reduce((acc, cur, idx) => {
      return (acc += `${idx + 1})` + cur.title + " ");
    }, "");

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

export default async function SearchPage({ searchParams }) {
  const term = searchParams.term;
  const page = searchParams.page ?? 1;
  const path =
    process.env.NEXT_PUBLIC_PATH_SEARCH +
    `?page=${page - 1}&size=30&searchTerm=${term}`;
  const postData = await getData(path);

  if (postData) {
    return <Board posts={postData} title={`'${term}' 관련 게시물`} />;
  } else {
    return <ServerError />;
  }
}
