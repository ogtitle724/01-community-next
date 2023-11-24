import ReduxProvider from "@/redux/reduxProvider";
import GoogleAnalytics from "./GoogleAnalytics";
import { metaData } from "@/config/metadata";
import "./globals.css";

export const metadata = metaData;

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <GoogleAnalytics />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
