import ReduxProvider from "@/redux/reduxProvider";
import "./globals.css";
import GoogleAnalytics from "./GoogleAnalytics";

export const metadata = {
  title: "클립마켓",
  description: "클립마켓 커뮤니티에서 새로운 경험을 제공합니다",
  author: "YMH & JWJ",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <GoogleAnalytics />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
