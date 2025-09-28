// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LaunchDetails from "./pages/LaunchDetails";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/launch/:id" element={<LaunchDetails />} />
      </Routes>
    </Router>
  );
}
