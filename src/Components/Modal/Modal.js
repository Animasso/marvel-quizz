import React from "react";

function Modal({ children, showModal }) {
  return (
    showModal && (
      <div className="modalBackground">
        <div className="modalContainer">{children} </div>
      </div>
    )
  );
}

export default Modal;
