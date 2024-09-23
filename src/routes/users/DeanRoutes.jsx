import { Navigate, Outlet } from "react-router-dom";
import DeanLayout from "../../components/layouts/DeanLayout";
import DeanDashboardPage from "../../pages/dean/DeanDashboardPage";
import ProtectedRoute from "../handlers/ProtectedRoute";
import DeanCompaniesPage from "../../pages/dean/DeanCompaniesPage";
import DeanCompanyPage from "../../pages/dean/DeanCompanyPage";
import DeanProfilePage from "../../pages/dean/DeanProfilePage";

// Routes for Dean
const DeanRoutes = {
  path: "dean",
  element: (
    <ProtectedRoute roleAllowed={"dean"}>
      <DeanLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: "dashboard",
      element: <Navigate to={"/admin"} />,
    },
    {
      index: true,
      element: <DeanDashboardPage />,
    },
    {
      path: "profile",
      element: <DeanProfilePage />,
    },
    {
      path: "companies",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <DeanCompaniesPage />,
        },
        {
          path: ":company_id",
          element: <DeanCompanyPage />,
        },
      ],
    },
    /* {
      path: "companies/:company_id",
      element: <DeanCompanyPage />,
    }, */
  ],
};

export default DeanRoutes;
