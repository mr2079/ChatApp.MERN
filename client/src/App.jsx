import { Route, Routes } from "react-router";
import Layout from "./components/layout/Layout";
import StartPage from "./components/pages/StartPage";
import ChatPage from "./components/pages/ChatPage";
import CallPage from "./components/pages/CallPage";

import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<StartPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/call/:socketId" element={<CallPage />} />
      </Route>
    </Routes>
  );
}
