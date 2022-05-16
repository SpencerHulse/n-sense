import React from "react";
import ReactDOM from "react-dom";
import "./assets/main.css";
import App from "./App";
import "flowbite";
// Redux Store/Provider
import { store } from "./store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
