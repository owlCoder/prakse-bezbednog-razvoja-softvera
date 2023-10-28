import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Global variable to access base API endpoint
global.APIEndpoint = "http://localhost:5000";
// global.APIEndpoint = "https://oib-api3.vercel.app/"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);