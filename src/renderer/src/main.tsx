import React from "react";
import ReactDOM from "react-dom/client";

import AppRouter from "./router/AppRouter";

import "./index.css";
import Sonner from "./components/ui/sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppRouter />
    <Sonner />
  </React.StrictMode>
);