import ReduxProvider from "@/redux/reduxProvider";
import GoogleAnalytics from "./GoogleAnalytics";
import { Noto_Sans_KR } from "next/font/google";
import { metaData } from "@/config/metadata";
import "./globals.css";

metaData.metadataBase = new URL(process.env.NEXT_PUBLIC_URL_CLI);
export const metadata = metaData;

const NOTO = Noto_Sans_KR({
  weight: ["300", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={NOTO.variable}>
      <body>
        <GoogleAnalytics />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
