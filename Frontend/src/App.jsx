import React from "react";
import Routers from "./lib/router";
import { BrowserRouter } from "react-router-dom";
import Font from "./lib/font";
import { AnimatePresence } from "framer-motion";
import "react-quill/dist/quill.snow.css";
const App = () => {
  return (
    <AnimatePresence>
      <BrowserRouter>
        <Font />
        <Routers />
      </BrowserRouter>
    </AnimatePresence>
  );
};

export default App;
