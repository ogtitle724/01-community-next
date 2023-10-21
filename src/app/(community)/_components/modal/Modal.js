"use client";

import { useEffect } from "react";
import "./style.css";

export default function Modal({ dialogRef, children }) {
  return (
    <dialog ref={dialogRef} className="modal">
      <form className="modal-container" method="dialog">
        <button className="modal__btn-close"></button>
        {children}
      </form>
    </dialog>
  );
}
