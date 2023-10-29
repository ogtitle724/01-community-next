import ReduxProvider from "@/redux/reduxProvider";
import "./globals.css";
import GoogleAnalytics from "./GoogleAnalytics";
import localFont from "next/font/local";

export const metadata = {
  title: "클립마켓",
  description: "클립마켓 커뮤니티에서 새로운 경험을 제공합니다",
  author: "YMH & JWJ",
};

const GmarketSans = localFont({
  variable: "--font-GmarketSans",
  src: [
    {
      path: "./assets/fonts/GmarketSansTTFLight.ttf",
      weight: "300",
    },
    {
      path: "./assets/fonts/GmarketSansTTFMedium.ttf",
      weight: "500",
    },
    {
      path: "./assets/fonts/GmarketSansTTFBold.ttf",
      weight: "700",
    },
  ],
});

const Giants = localFont({
  variable: "--font-Giants",
  src: [
    {
      path: "./assets/fonts/Giants-Regular.ttf",
      weight: "300",
    },
    {
      path: "./assets/fonts/Giants-Bold.ttf",
      weight: "500",
    },
  ],
});

export default function RootLayout({ children }) {
  return (
    <html className={[Giants.variable, GmarketSans.variable].join(" ")}>
      <body>
        <GoogleAnalytics />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
