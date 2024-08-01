// Import React Router Dom
import { createBrowserRouter, Navigate } from "react-router-dom";

// Layout Imports
import GuestLayout from "./components/templates/GuestLayout";

// Imports Global Pages
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";

// Import Layouts
import StackedLayout from "./components/layouts/StackedLayout";
import ChairpersonLayout from "./components/layouts/ChairpersonLayout";

// Import Chairperson Pages
import ChairpersonDashboard from "./pages/chairperson/ChairpersonDashboard";
import ChairpersonProfile from "./pages/chairperson/ChairpersonProfile";
import ChairpersonSettings from "./pages/chairperson/ChairpersonSettings";
import ChairpersonEndorsementRequests from "./pages/chairperson/ChairpersonEndorsementRequests";

// Import Handlers

const router = createBrowserRouter([
  {
    path: "/chairperson",
    element: <ChairpersonLayout />,
    children: [
      {
        path: "/chairperson/dashboard",
        element: <Navigate to={"/chairperson"} />,
      },
      {
        path: "/chairperson",
        element: <ChairpersonDashboard />,
      },
      {
        path: "/chairperson/profile",
        element: <ChairpersonProfile />,
      },
      {
        path: "/chairperson/endorsement-requests",
        element: <ChairpersonEndorsementRequests />,
      },
      {
        path: "/chairperson/settings",
        element: <ChairpersonSettings />,
      },
    ],
  },
  {
    path: "/student",
    element: <StackedLayout />,
  },
  /* {
    path: "/",
    element: <LoginSuccess />,
  }, */
  /* {
    path: "/student",
    element: (
      <ProtectedRoute allowedRoles={["student"]}>
        <StackedLayout />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
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
  }, */
  /* {
    path: "/select-role",
    element: (
      <ProtectedRoute>
        <SelectRole />
      </ProtectedRoute>
    ),
  }, */
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
  {
    path: "*",
    element: <NotFound />,
  },
]);

// Exporting router
export default router;
