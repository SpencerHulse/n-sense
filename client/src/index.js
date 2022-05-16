import React from "react";
import ReactDOM from "react-dom";
import "./assets/main.css";
import App from "./App";
import "flowbite";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
