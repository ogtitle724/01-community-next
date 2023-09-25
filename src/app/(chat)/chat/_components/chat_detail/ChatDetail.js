"use client";
import { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";
import "./style.css";

export default function ChatDetail() {
  const [data, setData] = useState();
  const chatWrapper = useRef();
  const handleClkBtnToTop = (e) => {
    e.preventDefault();

    chatWrapper.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleClkBtnToBottom = (e) => {
    e.preventDefault();
    const offsetHeight = chatWrapper.current.offsetHeight;
    const scrollHeight = chatWrapper.current.scrollHeight;
    console.log(scrollHeight, offsetHeight);

    chatWrapper.current.scrollTo({
      top: scrollHeight - offsetHeight,
      behavior: "smooth",
    });
  };
  return (
    <main className="chat-detail">
      <ul ref={chatWrapper} className="chat-detail__contents">
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--opponent">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용
        </li>
        <li className="chat chat--opponent">테스</li>
        <li className="chat chat--me">테스트용 채팅</li>
        <li className="chat chat--opponent">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스
        </li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다. 용입니다. 테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          채팅 내용입니다.테스트용 이거 뭐 다시 한번 해볼까 채팅
          내용입니다.용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--opponent">테스트용 채팅 내</li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--opponent">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용
        </li>
        <li className="chat chat--opponent">테스</li>
        <li className="chat chat--me">테스트용 채팅</li>
        <li className="chat chat--opponent">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스
        </li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다. 용입니다. 테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          채팅 내용입니다.테스트용 이거 뭐 다시 한번 해볼까 채팅
          내용입니다.용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--opponent">테스트용 채팅 내</li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--opponent">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용
        </li>
        <li className="chat chat--opponent">테스</li>
        <li className="chat chat--me">테스트용 채팅</li>
        <li className="chat chat--opponent">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스
        </li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다. 용입니다. 테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          채팅 내용입니다.테스트용 이거 뭐 다시 한번 해볼까 채팅
          내용입니다.용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--opponent">테스트용 채팅 내</li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--opponent">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용
        </li>
        <li className="chat chat--opponent">테스</li>
        <li className="chat chat--me">테스트용 채팅</li>
        <li className="chat chat--opponent">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스
        </li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다. 용입니다. 테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          채팅 내용입니다.테스트용 이거 뭐 다시 한번 해볼까 채팅
          내용입니다.용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--opponent">테스트용 채팅 내</li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--opponent">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용
        </li>
        <li className="chat chat--opponent">테스</li>
        <li className="chat chat--me">테스트용 채팅</li>
        <li className="chat chat--opponent">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스
        </li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다. 용입니다. 테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          채팅 내용입니다.테스트용 이거 뭐 다시 한번 해볼까 채팅
          내용입니다.용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--opponent">테스트용 채팅 내</li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--opponent">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용
        </li>
        <li className="chat chat--opponent">테스</li>
        <li className="chat chat--me">테스트용 채팅</li>
        <li className="chat chat--opponent">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스
        </li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다. 용입니다. 테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          채팅 내용입니다.테스트용 이거 뭐 다시 한번 해볼까 채팅
          내용입니다.용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--opponent">테스트용 채팅 내</li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--opponent">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용
        </li>
        <li className="chat chat--opponent">테스</li>
        <li className="chat chat--me">테스트용 채팅</li>
        <li className="chat chat--opponent">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스
        </li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다. 용입니다. 테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          채팅 내용입니다.테스트용 이거 뭐 다시 한번 해볼까 채팅
          내용입니다.용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--opponent">테스트용 채팅 내</li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--opponent">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용
        </li>
        <li className="chat chat--opponent">테스</li>
        <li className="chat chat--me">테스트용 채팅</li>
        <li className="chat chat--opponent">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스
        </li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다. 용입니다. 테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          채팅 내용입니다.테스트용 이거 뭐 다시 한번 해볼까 채팅
          내용입니다.용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--opponent">테스트용 채팅 내</li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--opponent">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용
        </li>
        <li className="chat chat--opponent">테스</li>
        <li className="chat chat--me">테스트용 채팅</li>
        <li className="chat chat--opponent">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스
        </li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다. 용입니다. 테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          채팅 내용입니다.테스트용 이거 뭐 다시 한번 해볼까 채팅
          내용입니다.용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--opponent">테스트용 채팅 내</li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--opponent">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용
        </li>
        <li className="chat chat--opponent">테스</li>
        <li className="chat chat--me">테스트용 채팅</li>
        <li className="chat chat--opponent">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스
        </li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다. 용입니다. 테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          채팅 내용입니다.테스트용 이거 뭐 다시 한번 해볼까 채팅
          내용입니다.용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--opponent">테스트용 채팅 내</li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--opponent">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용
        </li>
        <li className="chat chat--opponent">테스</li>
        <li className="chat chat--me">테스트용 채팅</li>
        <li className="chat chat--opponent">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스
        </li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다. 용입니다. 테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          채팅 내용입니다.테스트용 이거 뭐 다시 한번 해볼까 채팅
          내용입니다.용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--opponent">테스트용 채팅 내</li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--opponent">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용
        </li>
        <li className="chat chat--opponent">테스</li>
        <li className="chat chat--me">테스트용 채팅</li>
        <li className="chat chat--opponent">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스
        </li>
        <li className="chat chat--me">
          테스트용 채팅 내용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다. 용입니다. 테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          채팅 내용입니다.테스트용 이거 뭐 다시 한번 해볼까 채팅
          내용입니다.용입니다. 테스트용 채팅 내용입니다.테스트용 채팅
          내용입니다.테스트용 채팅 내용입니다.테스트용 채팅 내용입니다.테스트용
          이거 뭐 다시 한번 해볼까 채팅 내용입니다.
        </li>
        <li className="chat chat--opponent">테스트용 채팅 내</li>
      </ul>
      <section className="chat-detail__keyboard">
        <CKEditor
          editor={ClassicEditor}
          config={{
            placeholder: "내용을 입력하세요.",
          }}
          data=""
          onChange={(event, editor) => {
            const data = editor.getData();
            setData(data);
          }}
          onBlur={(event, editor) => {}}
          onFocus={(event, editor) => {}}
        />
        <label className="chat-detail__label-input-img">
          <input type="file" className="chat-detail__input-img"></input>
        </label>
        <div className="chat-detail__btn-wrapper-scroll">
          <button
            className="chat-detail__btn-scroll chat-detail__btn-top"
            onClick={handleClkBtnToTop}
          ></button>
          <button
            className="chat-detail__btn-scroll chat-detail__btn-bottom"
            onClick={handleClkBtnToBottom}
          ></button>
        </div>
        <button className="chat-detail__btn-submit"></button>
      </section>
    </main>
  );
}
