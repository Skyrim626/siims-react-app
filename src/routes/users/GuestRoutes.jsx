// Libraries
import { Navigate } from "react-router-dom";

// Guest Layout
import GuestLayout from "../../components/layouts/GuestLayout";

// Guest Pages
import PasswordResetPage from "../../pages/guest/PasswordResetPage";
import LoginContainer from "../../containers/Auth/LoginContainer";
import ForgetPasswordContainer from "../../containers/Auth/ForgetPasswordContainer";

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
      element: <LoginContainer />,
    },
    {
      path: "/forgot-password",
      element: <ForgetPasswordContainer />,
    },
    {
      path: "/password-reset/:token",
      element: <PasswordResetPage />,
    },
  ],
};

// Export GuestRoutes
export default GuestRoutes;
