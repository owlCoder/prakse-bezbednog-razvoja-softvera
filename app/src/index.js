import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Global variable to access base API endpoint
//global.APIEndpoint = "http://localhost:5000";
// Working mode - demonstration purposes only (keep flag WM_SECURE)
// Available values WM_SECURE, WM_UNRESTRICTED
global.WM = "WM_SECURE";
// global.APIEndpoint = "http://172.16.178.152:5000";
 global.APIEndpoint = "https://oib.vercel.app/"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);