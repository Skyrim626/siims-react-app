import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";

// Import routes
import routes from "./router";

// Import Context
import { AppContextProvider } from "./contexts/AppContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContextProvider>
      <RouterProvider router={routes} />
    </AppContextProvider>
  </React.StrictMode>
);
