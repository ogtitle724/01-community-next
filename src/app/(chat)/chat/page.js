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
    const callback = (e) => {
      const message = JSON.parse(e.data);
      const action = message.action;
      console.log("callbackkkkkkk");
      if (action === "getConnectionData") {
        setRooms(message.data);
      } else if (action === "joinRoom") {
        setChats(message.data.reverse());
      } else if (action === "message") {
        setChats((chats) => [...chats, message.data]);
      }
    };

    //TODO: socket.js 수정해서 연결시 기본적으로 수행될 이벤트리스너 connection에 arg로 줄
    //수 있도록 수정할 것
    const establishConnection = () => {
      socket.connect(JSON.stringify(user.id));

      socket.socket.addEventListener("open", () => {
        socket.on("message", callback);
        socket.send({
          action: "getConnectionData",
          senderId: String(user.id),
        });
      });

      socket.socket.addEventListener("error", (err) => {
        console.error("Socket encountered an error:", err);
      });
    };

    if (
      isLogIn &&
      (socket.readyState === WebSocket.CLOSED || !socket.isConnect)
    ) {
      establishConnection();
    } else if (socket.readyState === WebSocket.OPEN) {
      socket.on("message", callback);
      socket.send({ action: "getConnectionData", senderId: String(user.id) });
    }

    return () => socket.off("message", callback);
  }, [isLogIn, user.id]);

  useEffect(() => {
    const chatQuit = () => {
      if (document.visibilityState === "hidden" && curChatRoom) {
        socket.send({ action: "quitRoom", senderId: JSON.stringify(user.id) });
      }
      if (document.visibilityState === "visible" && curChatRoom) {
        socket.send({
          action: "joinRoom",
          senderId: String(user.id),
          roomId: curChatRoom,
        });
      }
    };

    document.addEventListener("visibilitychange", chatQuit);
    return () => document.removeEventListener("visibilitychange", chatQuit);
  }, [curChatRoom, user.id]);

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
