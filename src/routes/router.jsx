// Libraries
import { createBrowserRouter, Navigate } from "react-router-dom";

// Route Handlers
import Auth from "./handlers/Auth";

// User Routes
import AdminRoutes from "./users/AdminRoutes";
import StudentRoutes from "./users/StudentRoutes";
import GuestRoutes from "./users/GuestRoutes";

// Pages
import NotFoundPage from "../pages/NotFoundPage";

// Router
const router = createBrowserRouter([
  // path: /
  GuestRoutes,

  // path: /auth
  {
    path: "/auth",
    element: <Auth />,
  },

  // path: /admin
  AdminRoutes,

  // path: /student
  StudentRoutes,

  // path: *
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

// Export router
export default router;
