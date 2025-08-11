// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// ✅ CSS 반드시 임포트 (Tailwind/글로벌 스타일)
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
