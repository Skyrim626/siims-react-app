// Libraries
import { Navigate } from "react-router-dom";

// Guest Layout
import GuestLayout from "../../components/layouts/GuestLayout";

// Guest Pages
import LoginPage from "../../pages/guest/LoginPage";
import ForgotPasswordPage from "../../pages/guest/ForgotPasswordPage";
import PasswordResetPage from "../../pages/guest/PasswordResetPage";

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
    {
      path: "/password-reset/:token",
      element: <PasswordResetPage />,
    },
  ],
};

// Export GuestRoutes
export default GuestRoutes;
