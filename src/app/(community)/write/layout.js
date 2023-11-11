import { metaData } from "@/config/metadata";

const pageMetaData = structuredClone(metaData);
const metaTitle = "글작성";

pageMetaData.title = metaTitle;
pageMetaData.openGraph.title = metaTitle;
pageMetaData.twitter.title = metaTitle;
pageMetaData.robots = {
  index: false,
  follow: false,
  nocache: true,
};

export const metadata = pageMetaData;

export default function WritePageLayout({ children }) {
  return <>{children}</>;
}
