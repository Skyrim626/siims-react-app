import { Navigate, Outlet } from "react-router-dom";
import CompanyLayout from "../../components/layouts/CompanyLayout";
import CompanyHomePage from "../../pages/company/CompanyHomePage";
import ProtectedRoute from "../handlers/ProtectedRoute";
import CompanyManageOfficesPage from "../../pages/company/CompanyManageOfficesPage";
import CompanyProfilePage from "../../pages/company/CompanyProfilePage";
import CompanyAddOfficePage from "../../pages/company/CompanyAddOfficePage";
import CompanyOfficePage from "../../pages/company/CompanyOfficePage";
import CompanyEditOfficePage from "../../pages/company/CompanyEditOfficePage";
import CompanyAddJobPage from "../../pages/company/CompanyAddJobPage";
import CompanyManageSupervisorsPage from "../../pages/company/CompanyManageSupervisorsPage";
import axiosClient from "../../api/axiosClient";

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
          loader: async () => {
            const response = await axiosClient.get("/api/v1/company/offices");

            // console.log(response.data);

            const initial_offices = response.data;

            return initial_offices;
          },
        },
        {
          path: "add",
          element: <CompanyAddOfficePage />,
        },
        {
          path: "edit-office/:id",
          element: <CompanyEditOfficePage />,
          loader: async ({ params }) => {
            const { id } = params;
            const response = await axiosClient.get(
              `/api/v1/company/offices/${id}`
            );

            const { initial_office, office_types } = response.data;
            // console.log(initial_office);

            return { initial_office, office_types };
          },
        },
        {
          path: ":id",
          element: <CompanyOfficePage />,
          loader: async ({ params }) => {
            const { id } = params;
            const response = await axiosClient.get(
              `/api/v1/company/offices/${id}`
            );

            const {
              initial_office,
              supervisor_assigned,
              supervisors,
              work_posts,
            } = response.data;

            // console.log(initial_office);

            return {
              initial_office,
              supervisor_assigned,
              supervisors,
              work_posts,
            };
          },
        },
        {
          path: ":id/add-job",
          element: <CompanyAddJobPage />,
        },
      ],
    },
    {
      path: "supervisors",
      element: <CompanyManageSupervisorsPage />,
    },
  ],
};

export default CompanyRoutes;
