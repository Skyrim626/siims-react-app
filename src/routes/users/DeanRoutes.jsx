import { Navigate, Outlet } from "react-router-dom";
import DeanLayout from "../../components/layouts/DeanLayout";
import DeanDashboard from "../../pages/dean/DeanDashboard";
import ProtectedRoute from "../handlers/ProtectedRoute";
import DeanCompaniesPage from "../../pages/dean/DeanCompaniesPage";
import DeanCompanyPage from "../../pages/dean/DeanCompanyPage";

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
      element: <DeanDashboard />,
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
