import React from "react";
import { state } from "react";

const Modal = (props) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Shopping Cart</h4>
        </div>
        <div className="modal-body">Shopping cart content</div>
        <div className="modal-footer">
          <button>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
