import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import InfoPage from "./components/InfoPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/product/:id" Component={InfoPage} />
      </Routes>
    </HashRouter>
  );
}

export default App;
