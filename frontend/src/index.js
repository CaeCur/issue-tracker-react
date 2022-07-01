import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { IssueContextProvider } from "./context/IssueContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <IssueContextProvider>
      <App />
    </IssueContextProvider>
  </React.StrictMode>
);
