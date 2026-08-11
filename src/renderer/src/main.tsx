import React from "react";
import ReactDOM from "react-dom/client";

import AppRouter from "./router/AppRouter";

import "./index.css";
import Sonner from "./components/ui/sonner";
import { SettingsProvider } from "./context/SettingsContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SettingsProvider>
      <AppRouter />
    </SettingsProvider>
    <Sonner />
  </React.StrictMode>
);