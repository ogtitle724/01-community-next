import ReduxProvider from "@/redux/reduxProvider";
import GoogleAnalytics from "./GoogleAnalytics";
import { metaData } from "@/config/metadata";
import Fetch from "@/util/fetch";
import "./globals.css";

export const metadata = metaData;

export default async function RootLayout({ children }) {
  try {
    const res = await Fetch.get("/board/posts-ids");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
  return (
    <html lang="ko">
      <body>
        <GoogleAnalytics />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
