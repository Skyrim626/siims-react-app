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
import AdminManageDeansPage from "../../pages/admin/manage-users/deans/AdminManageDeansPage"; // Importing the page to manage deans
import AdminManageUsersPage from "../../pages/admin/manage-users/AdminManageUsersPage"; // Importing the general user management page
import AdminManageChairpersonsPage from "../../pages/admin/manage-users/chairpersons/AdminManageChairpersonsPage"; // Importing the page to manage chairpersons
import AdminManageCollegesPage from "../../pages/admin/AdminManageCollegesPage"; // Importing the page to manage colleges
import AdminManageRolesPage from "../../pages/admin/AdminManageRolesPage"; // Importing the page to manage user roles
import AdminManageCompaniesPage from "../../pages/admin/AdminManageCompaniesPage"; // Importing the page to manage companies
import AdminManageOfficesPage from "../../pages/admin/AdminManageOfficesPage";
import AdminManageProgramsPage from "../../pages/admin/AdminManageProgramsPage";
import AdminManageDocumentTypesPage from "../../pages/admin/AdminManageDocumentTypesPage";
import AdminManageCompanyOfficesPage from "../../pages/admin/manage-users/AdminManageCompanyOfficesPage";
import AdminMessagingPage from "../../pages/admin/AdminMessagingPage";
import ChatLayout from "../../components/layouts/ChatLayout";
import AdminManageStudentsPage from "../../pages/admin/AdminManageStudentsPage";
import AdminManageCoordinatorsPage from "../../pages/admin/AdminManageCoordinatorsPage";
import ChatWindow from "../../components/messaging/ChatWindow";
import TestChatWindow from "../../components/messaging/TestChatWindow";
import TestingPage from "../../pages/TestingPage";
import AdminViewLogsPage from "../../pages/admin/AdminViewLogsPage";

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
      index: true, // Default route for the admin section
      element: <AdminDashboard />, // Render the Admin Dashboard component
      loader: async () => {
        try {
          /**
           * Response
           */
          const response = await axiosClient.get("/api/v1/dashboards"); // Fetch dashboard data from API

          /**
           * Variables
           */

          const data = response.data;

          /**
           * Return
           */
          return data; // Return fetched data for the loader
        } catch (error) {
          console.log(error);
        }
      },
    },
    {
      path: "document-types",
      element: <AdminManageDocumentTypesPage />,
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
    {
      path: "roles", // Route for managing user roles
      element: <AdminManageRolesPage />,
      loader: async () => {
        try {
          /**
           * Responses
           */
          const userRoleResponse = await axiosClient.get(
            "/api/v1/roles/user-roles"
          );

          /**
           * Variables
           */
          const userRoles = userRoleResponse.data;

          /**
           * Return
           */
          return { userRoles }; // Return both as an object
        } catch (error) {
          console.error("Error fetching user roles: ", error);
          return {
            userRoles: [],
          };
        }
      },
    },
    {
      path: "colleges", // Route for managing colleges
      element: <AdminManageCollegesPage />,
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
      element: <AdminManageProgramsPage />,
      loader: async () => {
        try {
          /**
           * Responses
           */
          const collegeResponse = await axiosClient.get(
            "/api/v1/colleges/lists"
          );
          const chairpersonResponse = await axiosClient.get(
            "/api/v1/users/chairpersons/including-programs"
          );

          /**
           * Variables
           */
          const list_of_colleges = collegeResponse.data;
          const list_of_chairpersons = chairpersonResponse.data;

          /**
           * Return
           */

          return { list_of_chairpersons, list_of_colleges };
        } catch (error) {
          console.error("Error fetching programs and chairpersons: ", error);

          return {
            list_of_chairpersons: [],
            list_of_colleges: [],
          };
        }
      },
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
    {
      path: "users", // Base path for user management
      element: <AdminManageUserSelection />, // Render user selection component

      children: [
        {
          index: true, // Default route for user management
          element: <AdminManageUsersPage />, // Render the users management page
        },
        {
          path: "coordinators",
          element: <AdminManageCoordinatorsPage />,
          loader: async () => {
            try {
              /**
               * Responses
               */
              const coordinatorResponse = await axiosClient.get(
                "/api/v1/users/coordinators"
              );
              const programResponse = await axiosClient.get("/api/v1/programs");

              /**
               * Variables
               */
              const initial_coordinators = coordinatorResponse.data;
              const programs = programResponse.data;

              /**
               * Return
               */
              return {
                initial_coordinators,
                programs,
              };
            } catch (error) {
              console.error(
                "Error fetching coordinators and programs: ",
                error
              );
              return {
                initial_coordinators: [],
                programs: [],
              };
            }
          },
        },
        {
          path: "chairpersons", // Route for managing chairpersons
          element: <AdminManageChairpersonsPage />,
          loader: async () => {
            try {
              /**
               * Responses
               */
              const chairpersonResponse = await axiosClient.get(
                "/api/v1/users/chairpersons"
              );
              const programResponse = await axiosClient.get("/api/v1/programs");

              /**
               * Variables
               */
              const chairpersons = chairpersonResponse.data;
              const programs = programResponse.data;

              /**
               * Return
               */
              return {
                chairpersons,
                programs,
              };
            } catch (error) {
              console.log(error);
              throw error;
            }
          },
        },
        {
          path: "deans", // Route for managing deans
          element: <AdminManageDeansPage />,
          loader: async () => {
            try {
              /**
               * Responses
               */
              const collegeResponse = await axiosClient.get(
                "/api/v1/colleges/lists"
              );

              /**
               * Variables
               */
              const colleges = collegeResponse.data;

              /**
               * Return
               */
              return {
                colleges,
              };
            } catch (error) {
              console.log(error);
              return {
                colleges: [],
              };
            }
          },
        },
        {
          path: "students",
          element: <AdminManageStudentsPage />,
          loader: async () => {
            try {
              /**
               * Responses
               */
              const studentResponse = await axiosClient.get(
                "/api/v1/users/students/get-all-students"
              );
              const collegeResponse = await axiosClient.get("/api/v1/colleges");
              const programResponse = await axiosClient.get("/api/v1/programs");

              /**
               * Variables
               */
              const initial_students = studentResponse.data;
              const colleges = collegeResponse.data;
              const programs = programResponse.data;

              // console.log(initial_students);
              /**
               * Return
               */
              return {
                initial_students,
                colleges,
                programs,
              };
            } catch (error) {
              console.log(error);
              throw error;
            }
          },
        },
        /*  {
          path: "students", // Base path for student management
          element: <AdminManageStudent />, // Render student management page
          children: [
            {
              path: "add", // Route for adding a new student
              element: <AdminStudent />, // Render add student component
            },
          ],
        }, */

        {
          path: "companies", // Route for managing companies
          element: <AdminManageCompaniesPage />,
          children: [
            {
              path: ":id",
              element: <AdminManageCompanyOfficesPage />,
              loader: async ({ params }) => {
                try {
                  const { id } = params;

                  console.log(id);

                  const response = await axiosClient.get(
                    `/api/v1/admin/users/companies/${id}/offices`
                  );

                  // Fetch the offices
                  const initial_offices = response.data;

                  // console.log(initial_offices);

                  return initial_offices;
                } catch (error) {
                  console.error(
                    "Error fetching programs and chairpersons: ",
                    error
                  );
                  throw error; // Let the router handle errors
                }
              },
            },
          ],
        },
      ],
    },
    {
      path: "testing",
      element: <TestingPage />,
    },
    {
      path: "offices", // Route for managing offices
      element: <AdminManageOfficesPage />,
    },

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
  ],
};

// Export Admin Routes for use in the application
export default AdminRoutes;
