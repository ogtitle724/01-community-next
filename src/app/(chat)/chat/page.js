"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slice/signSlice";
import socket from "@/util/socket";
import ChatDetail from "./_components/chat_detail/ChatDetail";
import ChatNav from "./_components/chat_nav/ChatNav";
import "./style.css";

export default function ChatLayout() {
  const user = useSelector(selectUser);
  const [rooms, setRooms] = useState(null);
  const [curChatRoom, setCurChatRoom] = useState(null);
  const [chats, setChats] = useState([]);
  const [opponentId, setOpponentId] = useState(null);
  const [tempId, setTempId] = useState("");

  useEffect(() => {
    const callback = (e) => {
      const message = JSON.parse(e.data);
      const action = message.action;
      console.log(message);
      if (action === "setRooms") {
        setRooms(message.data);
      }

      if (action === "joinRoom") {
        setChats(message.data.reverse());
      }

      if (action === "message") {
        setChats((chats) => [...chats, message.data]);
      }
    };
    const id = prompt("아이디를 입력하시오");
    setTempId(id);
    socket.connect(id);
    socket.on("message", callback);

    return () => socket.off("message", callback);
  }, []);

  return (
    <main className="chat__wrapper">
      <ChatNav
        rooms={rooms}
        curChatRoom={curChatRoom}
        setCurChatRoom={setCurChatRoom}
        setOpponentId={setOpponentId}
        tempId={tempId}
      />
      <ChatDetail
        chats={chats}
        setChats={setChats}
        opponentId={opponentId}
        curChatRoom={curChatRoom}
        tempId={tempId}
      />
    </main>
  );
}
