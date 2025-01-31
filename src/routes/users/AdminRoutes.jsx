// Libraries
import { Navigate, Outlet } from "react-router-dom";

// Route Handlers
import ProtectedRoute from "../handlers/ProtectedRoute"; // Importing the ProtectedRoute handler for route protection

// Services
import axiosClient from "../../api/axiosClient"; // Importing the axios client for API requests

// Admin Layout
import AdminLayout from "../../components/layouts/AdminLayout"; // Importing the layout component for the admin section

// Admin Pages
import AdminDashboard from "../../pages/admin/AdminDashboard"; // Importing the Admin Dashboard page
import AdminManageUserSelection from "../../pages/admin/AdminManageUserSelection"; // Importing the user selection management page
import AdminManageOfficesPage from "../../pages/admin/AdminManageOfficesPage";

import AdminManageCompanyOfficesPage from "../../pages/admin/manage-users/AdminManageCompanyOfficesPage";
import ChatLayout from "../../components/layouts/ChatLayout";
import ChatWindow from "../../components/messaging/ChatWindow";
import AdminViewLogsPage from "../../pages/admin/AdminViewLogsPage";
import ViewRolesPage from "../../pages/ViewRolesPage";
import ViewCollegesPage from "../../pages/ViewCollegesPage";
import ViewProgramsPage from "../../pages/ViewProgramsPage";
import ViewUsersPage from "../../pages/ViewUsersPage";
import ViewDeansPage from "../../pages/ViewDeansPage";
import ViewChairpersonsPage from "../../pages/ViewChairpersonsPage";
import ViewCoordinatorsPage from "../../pages/ViewCoordinatorsPage";
import ManageCompaniesPage from "../../pages/ManageCompaniesPage";
import ManageOsaPage from "../../pages/ManageOsaPage";
import ManageSupervisorsPage from "../../pages/ManageSupervisorsPage";
import EditProfilePage from "../../pages/profiles/EditProfilePage";
import ViewProfilePage from "../../pages/profiles/ViewProfilePage";
import Chamber from "../../pages/_testing/Chamber";
import ManageSectionsPage from "../../pages/ManageSectionsPage";
import ManageStudentsPage from "../../pages/ManageStudentsPage";
import DashboardContainer from "../../containers/Dashboards/DashboardContainer";
import DocumentTypeContainer from "../../containers/DocumentTypes/DocumentTypeContainer";
import StudentContainer from "../../containers/Students/StudentContainer";
import SectionContainer from "../../containers/Section/SectionContainer";
import GenerateEndorsementLetterIndex from "../../containers/Endorsements/GenerateEndorsementLetterIndex";
import CollegeContainer from "../../containers/Colleges/CollegeContainer";

// Define routes for the Admin section
const AdminRoutes = {
  path: "admin", // Base path for admin routes
  element: (
    <ProtectedRoute roleAllowed={"admin"}>
      <AdminLayout />
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
      path: "dashboard", // Dashboard route that redirects to /admin
      element: <Navigate to={"/admin"} />,
    },
    {
      index: true,
      element: <DashboardContainer authorizeRole={"admin"} />,
    },
    {
      path: "document-types",
      element: <DocumentTypeContainer authorizeRole={"admin"} />,
    },

    /* {
      path: "test/sections",
      element: <ManageSectionsPage authorizeRole={"admin"} />,
    }, */
    {
      path: "sections",
      element: <SectionContainer authorizeRole={"admin"} />,
    },
    {
      path: "messaging",
      element: <ChatLayout />,
      loader: async () => {
        try {
          /**
           * Responses
           */
          const myGroupsResponse = await axiosClient.get(
            "/api/v1/messaging/my-groups"
          );

          /**
           * Variables
           */
          const myGroups = myGroupsResponse.data;

          /**
           * Return
           */
          return {
            myGroups,
          };
        } catch (error) {
          console.log(error);
        }
      },
      children: [
        {
          index: true,
          element: <ChatWindow />,
        },
        {
          path: ":groupId",
          element: <ChatWindow />,
          loader: async ({ params }) => {
            /**
             * Params
             */

            const { groupId } = params;

            /**
             * Responses
             */
            const groupResponse = await axiosClient.get(
              `/api/v1/messaging/groups/${groupId}`
            );

            const groupMessagesResponse = await axiosClient.get(
              `/api/v1/messaging/groups/${groupId}/messages`
            );

            /**
             * Return
             */
            const group = groupResponse.data;
            const groupMessages = groupMessagesResponse.data;

            return {
              groupMessages,
              group,
              groupId,
            };
          },
        },
      ],
    },
    /* {
      path: "roles", // Route for managing user roles
      element: <ViewRolesPage />,
    }, */
    {
      path: "test/colleges",
      element: <CollegeContainer authorizeRole={"admin"} />,
    },
    {
      path: "colleges", // Route for managing colleges
      element: <ViewCollegesPage />,
      loader: async () => {
        try {
          /**
           * Responses
           */
          const deanResponse = await axiosClient.get(
            "/api/v1/users/deans/including-colleges"
          );

          /**
           * Variables
           */
          const list_of_deans = deanResponse.data;

          /**
           * Return
           */
          return { list_of_deans };
        } catch (error) {
          console.error("Error fetching colleges: ", error);

          return {
            list_of_deans: [],
          };
        }
      },
    },
    {
      path: "programs",
      element: <ViewProgramsPage authorizeRole={"admin"} />,
    },

    {
      path: "companies/:id",
      element: <AdminManageCompanyOfficesPage />,
      loader: async ({ params }) => {
        try {
          const { id } = params;
          const response = await axiosClient.get(
            `/api/v1/admin/users/companies/${id}/offices`
          );

          // Fetch the offices and company (owner)
          const { initial_offices, company, office_types, supervisors } =
            response.data;

          // console.log(initial_offices);

          return { initial_offices, company, office_types, supervisors };
        } catch (error) {
          console.error("Error fetching programs and chairpersons: ", error);
          throw error; // Let the router handle errors
        }
      },
    },

    // User Routes
    {
      path: "users", // Base path for user management
      element: <AdminManageUserSelection />, // Render user selection component
      children: [
        {
          index: true, // Default route for user management
          element: <ViewUsersPage />, // Render the users management page
        },
        // Deans
        {
          path: "deans", // Route for managing deans
          element: <ViewDeansPage />,
        },
        // Chairpersons
        {
          path: "chairpersons",
          element: <ViewChairpersonsPage />,
        },
        // Coordinators
        {
          path: "coordinators",
          element: <ViewCoordinatorsPage authorizeRole={"admin"} />,
        },
        // Companies
        {
          path: "companies",
          element: <ManageCompaniesPage authorizeRole={"admin"} />,
        },
        // OSA
        {
          path: "osa",
          element: <ManageOsaPage />,
        },
        // STUDENT
        {
          path: "students",
          element: <ManageStudentsPage authorizeRole={"admin"} />,
        },
        {
          path: "test/students",
          element: <StudentContainer authorizeRole={"admin"} />,
        },
        /* {
          path: "students",
          element: <ManageStudentsPage authorizeRole={"admin"} />,
        }, */
        // SUPERVISORS
        {
          path: "supervisors",
          element: <ManageSupervisorsPage authorizeRole={"admin"} />,
        },
      ],
    },
    /**
     * View Profiles
     */
    // Dean View Profile Route
    {
      path: "users/deans/:user_id",
      element: <ViewProfilePage authorizeRole={"admin"} viewingUser={"dean"} />,
    },
    // Chairperson View Profile Route
    {
      path: "users/chairpersons/:user_id",
      element: (
        <ViewProfilePage authorizeRole={"admin"} viewingUser={"chairperson"} />
      ),
    },
    // Coordinator View Profile Route
    {
      path: "users/coordinators/:user_id",
      element: (
        <ViewProfilePage authorizeRole={"admin"} viewingUser={"coordinator"} />
      ),
    },
    // Student View Profile Route
    {
      path: "users/students/:user_id",
      element: (
        <ViewProfilePage authorizeRole={"admin"} viewingUser={"student"} />
      ),
    },
    // Company View Profile Route
    {
      path: "users/companies/:user_id",
      element: (
        <ViewProfilePage authorizeRole={"admin"} viewingUser={"company"} />
      ),
    },

    /**
     * End of View Profiles
     */

    /**
     * Edit Profiles
     */
    // Company Edit Profile
    {
      path: "users/companies/:company_id/edit",
      element: <EditProfilePage authorizeRole={"admin"} />,
    },
    {
      path: "offices", // Route for managing offices
      element: <AdminManageOfficesPage />,
    },
    {
      path: "manual-create-endorsement-letter",
      element: (
        <GenerateEndorsementLetterIndex
          authorizeRole={"admin"}
          type={"manual"}
        />
      ),
    },
    // Logs
    {
      path: "logs", // Route for viewing logs
      element: <AdminViewLogsPage />,
      loader: async () => {
        try {
          /**
           * Responses
           */
          const logResponse = await axiosClient.get("/api/v1/logs");

          /**
           * Variables
           */
          const logs = logResponse.data;

          /**
           * Return
           */
          return {
            logs,
          };
        } catch (error) {
          // Log the error for debugging (optional)
          console.error("Failed to fetch logs:", error);

          // Return an empty array as a fallback
          return { logs: [] };
        }
      },
    },
    // Testing Chamber
    {
      path: "chamber",
      element: <Chamber />,
    },
  ],
};

// Export Admin Routes for use in the application
export default AdminRoutes;
