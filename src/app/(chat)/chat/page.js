"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectIsLogIn, selectUser } from "@/redux/slice/signSlice";
import socket from "@/util/socket";
import ChatDetail from "./_components/chat_detail/ChatDetail";
import ChatNav from "./_components/chat_nav/ChatNav";
import "./style.css";

export default function ChatLayout() {
  const user = useSelector(selectUser);
  const isLogIn = useSelector(selectIsLogIn);
  const [rooms, setRooms] = useState(null);
  const [curChatRoom, setCurChatRoom] = useState(null);
  const [chats, setChats] = useState([]);
  const [opponentId, setOpponentId] = useState(null);

  useEffect(() => {
    const chatQuit = () => {
      if (document.visibilityState === "hidden") {
        socket.send({ action: "quitRoom", senderId: user.id });
      }
      if (document.visibilityState === "visible" && curChatRoom) {
        socket.send({
          action: "joinRoom",
          senderId: String(user.id),
          roomId,
        });
      }
    };

    document.addEventListener("visibilitychange", chatQuit);
    return document.removeEventListener("visibilitychange", chatQuit);
  }, [curChatRoom, user.id]);

  useEffect(() => {
    if (isLogIn) socket.connect(JSON.stringify(user.id));
  }, [isLogIn, user.id]);

  useEffect(() => {
    const callback = (e) => {
      const message = JSON.parse(e.data);
      const action = message.action;

      if (action === "getConnectionData") {
        setRooms(message.data);
      }

      if (action === "joinRoom") {
        setChats(message.data.reverse());
      }

      if (action === "message") {
        setChats((chats) => [...chats, message.data]);
      }
    };

    socket.on("message", callback);
    socket.send({ action: "getConnectionData", senderId: String(user.id) });

    return () => socket.off("message", callback);
  }, [user.id]);

  return (
    <main className="chat__wrapper">
      <ChatNav
        rooms={rooms}
        curChatRoom={curChatRoom}
        setCurChatRoom={setCurChatRoom}
        setOpponentId={setOpponentId}
      />
      <ChatDetail
        chats={chats}
        setChats={setChats}
        opponentId={opponentId}
        curChatRoom={curChatRoom}
      />
    </main>
  );
}
