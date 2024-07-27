import React from "react";
import LiveStreamSetup from "./LiveStreamSetup";
import LoginPage from "./loginPage";
import CurrentUser from "./CurrentUser";
import LiveStreams from "./LiveStreams";
import StreamPage from "./StreamPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/golive" element={<LiveStreamSetup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/getu" element={<CurrentUser />} />
        <Route path="/" element={<LiveStreams />} />
        <Route path="/stream/:id" element={<StreamPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
