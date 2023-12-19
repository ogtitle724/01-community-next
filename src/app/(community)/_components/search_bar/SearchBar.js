"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import "./style.css";

export default function SearchBar({ dialogRef }) {
  const [searchTerm, setsearchTerm] = useState("");
  const router = useRouter();
  const searchInput = useRef();
  const btnSubmit = useRef();

  useEffect(() => {
    searchInput.current.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        btnSubmit.current.click();
        if (dialogRef) dialogRef.current.close();
      }
    });
  }, [btnSubmit, dialogRef]);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      router.push(
        process.env.NEXT_PUBLIC_ROUTE_SEARCH + `?term=${searchTerm}&page=1`
      );
      if (dialogRef) dialogRef.current.close();
    }
  };

  return (
    <section onSubmit={(e) => handleOnSubmit(e)} className="search-bar">
      <input
        ref={searchInput}
        className="search-bar__input text--s"
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
        ref={btnSubmit}
        className="search-bar__btn"
        onClick={handleOnSubmit}
        aria-label="검색"
      ></button>
    </section>
  );
}
