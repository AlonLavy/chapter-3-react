import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import "./components/Square/Square.css";
import "./components/Board/Board.css";
import "./components/Game/Game.css";
import "./components/ListButton/ListButton.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
