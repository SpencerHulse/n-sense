import React, { useEffect } from "react";

function Nav(props) {
  const { setCurrentNav, currentNav } = props;
  return (
    <header>
      <nav className="flex flew-row">
        <div className="flex-row logo-container flex border-red border-4">
          <h1 className="underline">N-Sense</h1>
        </div>
        <div className="top-nav">
          <a
            href="#cart"
            className="nav-link"
            onClick={() => setCurrentNav("cart")}
          >
            Cart
          </a>
          <a
            href="#about"
            className="nav-link"
            onClick={() => setCurrentNav("about")}
          >
            About
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Nav;
