"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import "./style.css";

export default function SearchBar({ dialogRef }) {
  const [searchTerm, setsearchTerm] = useState("");
  const router = useRouter();
  const searchInput = useRef();

  useEffect(() => {
    searchInput.current.addEventListener("keyDown", (e) => {
      if (e.key === "Enter") {
        activeButton();
        if (dialogRef.current) dialogRef.current.close();
      }
    });
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      router.push(
        process.env.NEXT_PUBLIC_ROUTE_SEARCH + `?term=${searchTerm}&page=1`
      );
      if (dialogRef.current) dialogRef.current.close();
    }
  };

  return (
    <div onSubmit={(e) => handleOnSubmit(e)} className="search-bar">
      <input
        ref={searchInput}
        className="search-bar__input"
        name="searchTerm"
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setsearchTerm(e.target.value);
        }}
        autoComplete="off"
        placeholder=" · · · · "
      />
      <button
        className="search-bar__btn"
        onClick={handleOnSubmit}
        aria-label="검색"
      ></button>
    </div>
  );
}
