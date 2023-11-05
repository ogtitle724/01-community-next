import Header from "./_components/header/Header";
import "./style.css";

export default function CommunityLayout({ children }) {
  console.log("initial");
  return (
    <>
      <Header />
      <main className="community-main">{children}</main>
    </>
  );
}
