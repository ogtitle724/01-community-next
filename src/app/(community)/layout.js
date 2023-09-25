import Header from "./_components/header/Header";
import Gnb from "./_components/gnb/Gnb";
import "./style.css";

export default function CommunityLayout({ children }) {
  return (
    <>
      <Header />
      <Gnb />
      <main className="community-main">{children}</main>
    </>
  );
}
