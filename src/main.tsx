import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// ✅ 전역 스타일 (Tailwind 포함) 반드시 임포트
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
