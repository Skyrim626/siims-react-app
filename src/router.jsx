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
import AdminLayout from "./components/layouts/AdminLayout";
import StudentLayout from "./components/layouts/StudentLayout";

// Import Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";

// Import Chairperson Pages
import ChairpersonDashboard from "./pages/chairperson/ChairpersonDashboard";
import ChairpersonProfile from "./pages/chairperson/ChairpersonProfile";
import ChairpersonSettings from "./pages/chairperson/ChairpersonSettings";
import ChairpersonEndorsementRequests from "./pages/chairperson/ChairpersonEndorsementRequests";
import ChairpersonUsers from "./pages/chairperson/ChairpersonUsers";
import ChairpersonUsersStudents from "./pages/chairperson/ChairpersonUsersStudents";

// Import Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";

// Import Handler
import Authentication from "./handlers/Authentication";
import Authorization from "./handlers/Authorization";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminUserAdd from "./pages/admin/AdminUserAdd";
import AdminUsersView from "./pages/admin/AdminUsersView";

const router = createBrowserRouter([
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
    path: "/auth",
    element: <Authentication />,
  },
  {
    path: "/chairperson",
    element: <ChairpersonLayout />,
    children: [
      {
        path: "dashboard",
        element: <Navigate to={"/chairperson"} />,
      },
      {
        path: "/chairperson",
        element: <ChairpersonDashboard />,
      },
      {
        path: "profile",
        element: <ChairpersonProfile />,
      },
      {
        path: "users",
        element: <ChairpersonUsers />,
      },
      {
        path: "users/students",
        element: <ChairpersonUsersStudents />,
      },
      {
        path: "endorsement-requests",
        element: <ChairpersonEndorsementRequests />,
      },
      {
        path: "settings",
        element: <ChairpersonSettings />,
      },
    ],
  },
  {
    path: "/student",
    element: (
      <Authorization allowedRole={"student"}>
        <StudentLayout />
      </Authorization>
    ),
    children: [
      {
        path: "dashboard",
        element: <Navigate to={"/student"} />,
      },
      {
        path: "/student",
        element: <StudentDashboard />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <Authorization allowedRole={"admin"}>
        <AdminLayout />
      </Authorization>
    ),
    children: [
      {
        path: "dashboard",
        element: <Navigate to={"/admin"} />,
      },
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "users",
        element: <AdminUsers />,
        children: [
          {
            index: true,
            element: <AdminUsersView />,
          },
          {
            path: "add",
            element: <AdminUserAdd />,
          },
        ],
      },
      {
        path: "/admin/users/add",
        element: <AdminUserAdd />,
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
