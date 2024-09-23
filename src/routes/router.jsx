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
import UnauthorizedPage from "../pages/UnauthorizedPage";
import DeanRoutes from "./users/DeanRoutes";
import ChairpersonRoutes from "./users/ChairpersonRoutes";

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

      {
        path: "unauthorized",
        element: <UnauthorizedPage />,
      },
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
