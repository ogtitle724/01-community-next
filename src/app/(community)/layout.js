import Header from "./_components/header/Header";
import "./style.css";

export default function CommunityLayout({ children }) {
  return (
    <>
      <Header />
      <main className="community-main">{children}</main>
    </>
  );
}
