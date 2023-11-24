import Fetch from "@/util/fetch";
import ServerError from "../_components/error/Error";
import Showcase from "./_components/showcase/showcase";
import { metaData } from "@/config/metadata";

export const generateMetadata = async () => {
  const pageMetaData = structuredClone(metaData);
  const metaTitle = `중고거래/물물교환`;
  const metaDescription = `당신의 잡동사니 누군가에겐 쓸모가 있다!`;
  const metaUrl = process.env.NEXT_PUBLIC_URL_CLI + "/barter";

  pageMetaData.title = metaTitle;
  pageMetaData.description = metaDescription;
  pageMetaData.alternates.canonical = metaUrl;
  pageMetaData.openGraph.title = metaTitle;
  pageMetaData.openGraph.description = metaDescription;
  pageMetaData.openGraph.url = metaUrl;
  pageMetaData.twitter.title = metaTitle;
  pageMetaData.twitter.description = metaDescription;

  return pageMetaData;
};

export default async function showCasePage({ searchParams }) {
  const order = searchParams?.order ?? "최신순";

  try {
    const res = await Fetch.get(process.env.NEXT_PUBLIC_PATH_ITEM_PAGING);
    const itemPagingData = await res.json();
    return <Showcase itemPagingData={itemPagingData} />;
  } catch (err) {
    console.error(err);
    return <ServerError />;
  }
}
