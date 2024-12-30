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
import ViewCompanyProfilePage from "../../pages/profiles/ViewCompanyProfilePage";
import ViewProfilePage from "../../pages/profiles/ViewProfilePage";
import ManageEndorsementLetterApprovalPage from "../../pages/ManageEndorsementLetterApprovalPage";
import SelfProfile from "../../pages/profiles/SelfProfile";
import EditProfilePage from "../../pages/profiles/EditProfilePage";

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
    // Navigate to Dashboard Page
    {
      path: "dashboard",
      element: <Navigate to={"/admin"} />,
    },
    // Dashboard Page
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
    // Profile Page
    {
      path: "profile",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <SelfProfile authorizeRole={"dean"} />,
        },
        {
          path: "edit",
          element: <EditProfilePage authorizeRole={"dean"} />,
        },
      ],
    },
    {
      path: "test/profile",
      element: <DeanProfilePage />,
    },
    // Coordinators Page
    {
      path: "coordinators",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <ViewCoordinatorsPage authorizeRole={"dean"} />,
        },
        {
          path: ":user_id",
          element: (
            <ViewProfilePage
              authorizeRole={"dean"}
              viewingUser={"coordinator"}
            />
          ),
        },
      ],
    },
    // Students Page
    {
      path: "students",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <ManageStudentsPage authorizeRole={"dean"} />,
        },
        {
          path: ":user_id",
          element: (
            <ViewProfilePage authorizeRole={"dean"} viewingUser={"student"} />
          ),
        },
      ],
    },
    // Programs Page
    {
      path: "programs",
      element: <ViewProgramsPage authorizeRole={"dean"} />,
    },
    // Companies Page
    {
      path: "companies",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <ManageCompaniesPage authorizeRole={"dean"} />,
        },
        /* {
          path: ":company_id",
          element: <DeanCompanyPage />,
        }, */
        {
          path: ":user_id",
          element: (
            <ViewProfilePage authorizeRole={"dean"} viewingUser={"company"} />
          ),
        },
      ],
    },
    {
      path: "endorsement-letter-requests",
      element: <ManageEndorsementLetterApprovalPage authorizeRole={"dean"} />,
    },
    {
      path: "test/endorsement-letter-requests",
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
