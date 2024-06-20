import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import News from "./components/News";
import Details from "./components/Details";
import Fav from "./components/Fav";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<News />}
      />
      <Route
        path="/details"
        element={<Details />}
      />
      <Route
        path="/fav"
        element={<Fav />}
      />
    </Routes>
  );
}

export default App;
