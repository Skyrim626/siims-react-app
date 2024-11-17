// Libraries
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

// Route Handlers
import Auth from "./handlers/Auth";

// User Routes
import AdminRoutes from "./users/AdminRoutes";
import StudentRoutes from "./users/StudentRoutes";
import GuestRoutes from "./users/GuestRoutes";

// Page
import NotFoundPage from "../pages/NotFoundPage";
import DeanRoutes from "./users/DeanRoutes";
import ChairpersonRoutes from "./users/ChairpersonRoutes";
import CompanyRoutes from "./users/CompanyRoutes";
import SupervisorRoutes from "./users/SupervisorRoutes";
import OsaRoutes from "./users/OsaRoutes";

// Router
const router = createBrowserRouter([
  // path: /auth
  {
    path: "/auth",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Auth />,
      },
      // path: admin
      AdminRoutes,

      // path: student
      StudentRoutes,

      // path: dean
      DeanRoutes,

      // path: chairperson
      ChairpersonRoutes,

      // path: company
      CompanyRoutes,

      // path: supervisor
      SupervisorRoutes,

      // path: osa
      OsaRoutes,
    ],
  },

  // path: /
  GuestRoutes,

  // path: *
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

// Export router
export default router;
