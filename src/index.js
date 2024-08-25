import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "tailwindcss/tailwind.css";
import "./index.css";

console.log("hi");
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)