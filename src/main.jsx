import React from "react";

// CSS
import "./index.css";

// Router
import router from "./routes/router";

// Hooks
import { AuthProvider } from "./hooks/useAuth";

// Components
import LoadingScreen from "./components/common/LoadingScreen";

// Libraries
import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} fallbackElement={<LoadingScreen />} />
    </AuthProvider>
  </React.StrictMode>
);
