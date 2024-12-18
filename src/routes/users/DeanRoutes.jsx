import { Navigate, Outlet } from "react-router-dom";
import DeanLayout from "../../components/layouts/DeanLayout";
import DeanDashboardPage from "../../pages/dean/DeanDashboardPage";
import ProtectedRoute from "../handlers/ProtectedRoute";
import DeanCompanyPage from "../../pages/dean/DeanCompanyPage";
import DeanProfilePage from "../../pages/dean/DeanProfilePage";
import DeanManageCompaniesPage from "../../pages/dean/DeanManageCompaniesPage";
import DeanProgramsPage from "../../pages/dean/DeanProgramsPage";
import axiosClient from "../../api/axiosClient";
import DeanManageStudentsPage from "../../pages/dean/DeanManageStudentsPage";
import DeanEndorsementLetterRequestsPage from "../../pages/dean/DeanEndorsementLetterRequestsPage";
import ViewProgramsPage from "../../pages/ViewProgramsPage";
import ViewCoordinatorsPage from "../../pages/ViewCoordinatorsPage";
import ManageCompaniesPage from "../../pages/ManageCompaniesPage";
import ManageStudentsPage from "../../pages/ManageStudentsPage";

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
          const response = await axiosClient.get("/api/v1/dashboards");

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
      path: "coordinators",
      element: <ViewCoordinatorsPage authorizeRole={"dean"} />,
    },
    {
      path: "students",
      element: <ManageStudentsPage authorizeRole={"dean"} />,
    },
    {
      path: "test/students",
      element: <DeanManageStudentsPage />,
      loader: async () => {
        try {
          /**
           * Responses
           */
          const studentResponse = await axiosClient.get(
            "/api/v1/users/students/dean"
          );
          const programResponse = await axiosClient.get(
            "/api/v1/programs/dean"
          );

          /**
           * Variables
           */
          const initial_students = studentResponse.data;
          const programs = programResponse.data;

          /**
           * Return
           */
          return {
            initial_students,
            programs,
          };
        } catch (error) {
          console.log(error);
          return {
            programs: [],
            initial_students: [],
          };
        }
      },
    },
    {
      path: "programs",
      element: <ViewProgramsPage authorizeRole={"dean"} />,
    },
    {
      path: "companies",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <ManageCompaniesPage authorizeRole={"dean"} />,
        },
        {
          path: ":company_id",
          element: <DeanCompanyPage />,
        },
      ],
    },
    {
      path: "endorsement-letter-requests",
      element: <DeanEndorsementLetterRequestsPage />,
      loader: async () => {
        try {
          /**
           * Responses
           */
          const endorsementResponse = await axiosClient.get(
            "/api/v1/endorsement-letter-requests/get-waiting-for-approval-letter-requests"
          );

          /**
           * Variables
           */
          const initial_endorsement_letter_requests = endorsementResponse.data;

          /**
           * Return
           */
          return {
            initial_endorsement_letter_requests,
          };
        } catch (error) {
          console.log(error);
          return {
            initial_endorsement_letter_requests: [],
          };
        }
      },
    },
    /* {
      path: "companies/:company_id",
      element: <DeanCompanyPage />,
    }, */
  ],
};

export default DeanRoutes;
