import React, { useEffect } from "react";
import { BsCart3 } from "react-icons/bs";

function Nav(props) {
  const { setCurrentNav, currentNav } = props;
  return (
    <header>
      <div className="flex flew-row w-full p-6">
        <div class="w-1/2 flex flex-row justify-between items-center">
          <div className="flex-row logo-container flex ">
            <h1 className="text-3xl">Logo</h1>
          </div>
          <a href="#candles">candles</a>
          <a href="#incense">incense</a>
          <a href="#essentialOils">essential oils</a>
          <a href="#soaps">soaps</a>
        </div>
        <div className="right-nav w-1/2 flex justify-end items-center">
          <div className="cart flex mr-8 items-center">
            <a
              href="#cart"
              className="nav-link mr-4"
              onClick={() => setCurrentNav("cart")}
            >
              Cart
            </a>
            <BsCart3 />
          </div>
          <a
            href="#about"
            className="nav-link"
            onClick={() => setCurrentNav("about")}
          >
            About
          </a>
        </div>
      </div>
    </header>
  );
}

export default Nav;
