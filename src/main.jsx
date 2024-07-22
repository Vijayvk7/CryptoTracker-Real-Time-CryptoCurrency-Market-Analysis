import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CoinContextProvider from "./context/CoinContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CoinContextProvider>
      <App />
    </CoinContextProvider>
  </React.StrictMode>
);
