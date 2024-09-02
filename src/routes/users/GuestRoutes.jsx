// Libraries
import { Navigate } from "react-router-dom";

// Guest Layout
import GuestLayout from "../../components/layouts/GuestLayout";

// Guest Pages
import LoginPage from "../../pages/guest/LoginPage";
import ForgotPasswordPage from "../../pages/guest/ForgotPasswordPage";

// Guest Routes
const GuestRoutes = {
  path: "/",
  element: <GuestLayout />,
  children: [
    {
      index: true,
      element: <Navigate to={"/login"} />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPasswordPage />,
    },
  ],
};

// Export GuestRoutes
export default GuestRoutes;
