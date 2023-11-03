import ReduxProvider from "@/redux/reduxProvider";
import "./globals.css";
import GoogleAnalytics from "./GoogleAnalytics";
import localFont from "next/font/local";
import { meta } from "@/config/config";

export const metadata = meta;

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
  console.log(process.env.NEXT_PUBLIC_URL_SVR);
  return (
    <html
      lang="ko"
      className={[Giants.variable, GmarketSans.variable].join(" ")}
    >
      <body>
        <GoogleAnalytics />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
