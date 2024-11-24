import { Navigate, Outlet } from "react-router-dom";
import DeanLayout from "../../components/layouts/DeanLayout";
import DeanDashboardPage from "../../pages/dean/DeanDashboardPage";
import ProtectedRoute from "../handlers/ProtectedRoute";
import DeanCompanyPage from "../../pages/dean/DeanCompanyPage";
import DeanProfilePage from "../../pages/dean/DeanProfilePage";
import DeanManageCompaniesPage from "../../pages/dean/DeanManageCompaniesPage";
import DeanProgramsPage from "../../pages/dean/DeanProgramsPage";
import axiosClient from "../../api/axiosClient";

// Routes for Dean
const DeanRoutes = {
  path: "dean",
  element: (
    <ProtectedRoute roleAllowed={"dean"}>
      <DeanLayout />
    </ProtectedRoute>
  ),
  loader: async () => {
    try {
      /**
       * Response
       */
      const response = await axiosClient.get("/api/v1/user-roles");

      /**
       * Variables
       */
      const userRoles = response.data;

      // console.log(userRoles);

      /**
       * Return Data
       */
      return { userRoles };
    } catch (error) {
      console.log(error);
    }
  },
  children: [
    {
      path: "dashboard",
      element: <Navigate to={"/admin"} />,
    },
    {
      index: true,
      element: <DeanDashboardPage />,
      loader: async () => {
        try {
          /**
           * Responses
           */
          const response = await axiosClient.get("/api/v1/dashboard");

          /**
           * Variables
           */
          const dashboard = response.data;

          /**
           * Return
           */

          return {
            dashboard,
          };
        } catch (error) {
          console.log(error);
        }
      },
    },
    {
      path: "profile",
      element: <DeanProfilePage />,
    },
    {
      path: "programs",
      element: <DeanProgramsPage />,
      loader: async () => {
        try {
          const response = await axiosClient.get("/api/v1/programs");

          // Fetch the list of programs and chairpersons
          const initial_programs = response.data;

          // console.log(initial_programs);

          return initial_programs;
        } catch (error) {
          console.error("Error fetching programs: ", error);
          throw error; // Let the router handle errors
        }
      },
    },
    {
      path: "companies",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <DeanManageCompaniesPage />,
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
