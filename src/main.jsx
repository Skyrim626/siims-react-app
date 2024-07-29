import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";

// Import routes
import routes from "./router";
import { ContextProvider } from "./contexts/ContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={routes} />
    </ContextProvider>
  </React.StrictMode>
);
