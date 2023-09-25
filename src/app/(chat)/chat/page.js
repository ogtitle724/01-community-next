"use client";
import ChatNav from "./_components/chat_nav/ChatNav";
import ChatDetail from "./_components/chat_detail/ChatDetail";
import css from "./style.module.css";

export default function ChatLayout({ children, searchParams }) {
  /**유저에 따른 채티방 리스트 겟
   * => 유저는 리덕스 user데이터로 받아올것
   * => room을 선택하면 디테일한 채팅 리스트를 받아올 것
   */
  return (
    <main className={css.wrapper}>
      <ChatNav />
      <ChatDetail />
    </main>
  );
}
