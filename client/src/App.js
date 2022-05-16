import React, { useState } from "react";
import Nav from "./components/Nav";

function App() {
  const [navs] = useState([
    "Cart",
    "About",
    "Smellables",
    "Tastables",
    "Burnables",
  ]);

  const [currentNav, setCurrentNav] = useState(navs[1]);
  return (
    <div>
      <Nav
        navs={navs}
        setCurrentNav={setCurrentNav}
        currentNav={currentNav}
      ></Nav>
    </div>
  );
}

export default App;
