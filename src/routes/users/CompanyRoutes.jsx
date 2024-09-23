import CompanyLayout from "../../components/layouts/CompanyLayout";
import CompanyHomePage from "../../pages/company/CompanyHomePage";
import ProtectedRoute from "../handlers/ProtectedRoute";

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
      path: "/",
      element: <CompanyHomePage />,
    },
  ],
};

export default CompanyRoutes;
