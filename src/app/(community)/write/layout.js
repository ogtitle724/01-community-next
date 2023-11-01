import { meta } from "@/config/config";

const pageMetaData = JSON.parse(JSON.stringify(meta));
pageMetaData.robots = {
  index: false,
  follow: false,
  nocache: true,
};

export const metaData = pageMetaData;

export default function WritePageLayout({ children }) {
  return <>{children}</>;
}
