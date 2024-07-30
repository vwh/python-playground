import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";

import App from "./App.tsx";
import ThemeProvider from "@/components/theme-provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
