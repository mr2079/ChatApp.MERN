import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import SocketContextProvider from "./components/providers/SocketContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <SocketContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </SocketContextProvider>
);
