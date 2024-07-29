import { createBrowserRouter, Navigate } from "react-router-dom";

// Layout Imports
import GuestLayout from "./components/templates/GuestLayout";

// Page Imports
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./handlers/ProtectedRoute";
import SelectRole from "./pages/SelectRole";
import LoginSuccess from "./handlers/LoginSuccess";
import SidebarLayout from "./components/layouts/SidebarLayout";
import StackedLayout from "./components/layouts/StackedLayout";
import Logs from "./pages/Logs";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <LoginSuccess />,
  },
  {
    path: "/student",
    element: (
      <ProtectedRoute>
        <StackedLayout />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <SidebarLayout userRole={"admin"} />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/admin",
        element: <Navigate to={"/admin/dashboard"} />,
      },
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/logs",
        element: <Logs />,
      },
    ],
  },
  {
    path: "/select-role",
    element: (
      <ProtectedRoute>
        <SelectRole />
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to={"/login"} />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
]);

// Exporting routes
export default routes;
