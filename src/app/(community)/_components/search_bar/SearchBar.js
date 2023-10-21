"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import "./style.css";

export default function SearchBar() {
  const [searchTerm, setsearchTerm] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      router.push(
        process.env.NEXT_PUBLIC_ROUTE_SEARCH + `?term=${searchTerm}&page=1`
      );
    }
  };

  return (
    <div onSubmit={(e) => handleOnSubmit(e)} className="search-bar">
      <input
        className="search-bar__input"
        name="searchTerm"
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setsearchTerm(e.target.value);
        }}
        autoComplete="off"
      />
      <button className="search-bar__btn" onClick={handleOnSubmit}></button>
    </div>
  );
}
