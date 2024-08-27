import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import TinyMCEPage from "./TinyMCEPage";
import TipTapPage from "./TipTapPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/tinymce" element={<TinyMCEPage />} />
        <Route path="/tiptap" element={<TipTapPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
