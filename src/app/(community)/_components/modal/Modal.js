"use client";
import "./style.css";

export default function Modal({ dialogRef, children, isForm }) {
  const handleClkBtnClose = (e) => {
    e.preventDefault();
    dialogRef.current.close();
  };

  return (
    <dialog ref={dialogRef} className="modal">
      <button className="modal__btn-close" onClick={handleClkBtnClose}></button>
      {isForm ? (
        <form className="modal-container" method="dialog">
          {children}
        </form>
      ) : (
        <div className="modal-container">{children}</div>
      )}
    </dialog>
  );
}
