import { Navigate, Outlet } from "react-router-dom";
import CompanyLayout from "../../components/layouts/CompanyLayout";
import CompanyHomePage from "../../pages/company/CompanyHomePage";
import ProtectedRoute from "../handlers/ProtectedRoute";
import CompanyManageOfficesPage from "../../pages/company/CompanyManageOfficesPage";
import CompanyProfilePage from "../../pages/company/CompanyProfilePage";
import CompanyAddOfficePage from "../../pages/company/CompanyAddOfficePage";
import CompanyOfficePage from "../../pages/company/CompanyOfficePage";
import CompanyEditOfficePage from "../../pages/company/CompanyEditOfficePage";

// Routes for Company
const CompanyRoutes = {
  path: "company",
  element: (
    <ProtectedRoute roleAllowed={"company"}>
      <CompanyLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: "home",
      element: <Navigate to={"/company"} />,
    },
    {
      index: true,
      element: <CompanyHomePage />,
    },
    {
      path: "profile",
      element: <CompanyProfilePage />,
    },
    {
      path: "offices",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <CompanyManageOfficesPage />,
        },
        {
          path: "add",
          element: <CompanyAddOfficePage />,
        },
        {
          path: "edit-office/:id",
          element: <CompanyEditOfficePage />,
        },
        {
          path: ":id",
          element: <CompanyOfficePage />,
        },
      ],
    },
  ],
};

export default CompanyRoutes;
