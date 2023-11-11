import { metaData } from "@/config/metadata";

const pageMetaData = structuredClone(metaData);
const metaTitle = "클립챗";
const metaDescription = "클립챗을 통해 거래 일정을 잡으세요!";
const metaUrl = "/chat";

pageMetaData.title = metaTitle;
pageMetaData.description = metaDescription;
pageMetaData.alternates.canonical = metaUrl;
pageMetaData.robots = {
  index: false,
  follow: false,
  nocache: true,
};
pageMetaData.openGraph.title = metaTitle;
pageMetaData.openGraph.description = metaDescription;
pageMetaData.openGraph.url = metaUrl;
pageMetaData.twitter.title = metaTitle;
pageMetaData.twitter.description = metaDescription;

export const metadata = pageMetaData;

export default function ChatLayout({ children }) {
  return <>{children}</>;
}
