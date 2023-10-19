"use client";
import { useState } from "react";
import SignUp from "./signup/SignUp";
import SignIn from "./signin/SignIn";
import "./style.css";

export default function Sign() {
  console.log("SIGN");
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  return (
    <section className="sign">
      <h3 hidden>Sign</h3>
      <SignIn />
      <button
        className="sign__btn-submit"
        onClick={() => setShowSignUpForm(true)}
      >
        +
      </button>
      {showSignUpForm && <SignUp setShowSignUpForm={setShowSignUpForm} />}
    </section>
  );
}
