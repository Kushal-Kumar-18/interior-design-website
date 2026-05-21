import React from "react";

import ReactDOM from "react-dom/client";

import {
  HelmetProvider,
} from "react-helmet-async";

import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/theme.css";
import "./styles/global.css";
import "./styles/animations.css";

import "./index.css";

import App from "./App";

import reportWebVitals from "./reportWebVitals";

import {
  AuthProvider,
} from "./context/AuthContext";

// ============================================================
// ROOT
// ============================================================
const root = ReactDOM.createRoot(
  document.getElementById(
    "root"
  )
);

// ============================================================
// RENDER
// ============================================================
root.render(

  <React.StrictMode>

    <HelmetProvider>

      <AuthProvider>

        <App />

      </AuthProvider>

    </HelmetProvider>

  </React.StrictMode>
);

// ============================================================
// WEB VITALS
// ============================================================
reportWebVitals();