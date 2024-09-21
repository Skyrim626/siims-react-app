// Libraries
import React from "react";
import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";

// CSS
import "./index.css";
import "react-toastify/dist/ReactToastify.css"; // React-Toastify

// Router
import router from "./routes/router";

// Hooks
import { AuthProvider } from "./hooks/useAuth";

// Components
import LoadingScreen from "./components/common/LoadingScreen";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} fallbackElement={<LoadingScreen />} />
    </AuthProvider>
    <ToastContainer />
  </React.StrictMode>
);
