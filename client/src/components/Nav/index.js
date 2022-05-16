import React, { useEffect } from "react";

function Nav(props) {
  const { setCurrentNav, currentNav } = props;
  return (
    <header className="flex-row px-1">
      <div className="flex-row logo-container flex justify-between items-center">
        <h1>N-Sense</h1>
      </div>
    </header>
  );
}

export default Nav;
