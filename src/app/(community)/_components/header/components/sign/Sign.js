"use client";
import { useRef } from "react";
import SignUp from "./signup/SignUp";
import SignIn from "./signin/SignIn";
import Modal from "../../../modal/Modal";
import "./style.css";

export default function Sign() {
  console.log("SIGN");
  const dialogRef = useRef();

  const handleClkBtnSignup = (e) => {
    e.preventDefault();
    dialogRef.current.showModal();
  };

  return (
    <section className="sign">
      <h3 hidden>Sign</h3>
      <SignIn />
      <button className="sign__btn-signup" onClick={handleClkBtnSignup}>
        +
      </button>
      <Modal dialogRef={dialogRef}>
        <SignUp dialogRef={dialogRef} />
      </Modal>
    </section>
  );
}
