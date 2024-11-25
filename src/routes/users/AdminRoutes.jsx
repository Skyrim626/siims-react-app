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
import AdminLogs from "../../pages/admin/AdminLogs"; // Importing the logs management page
import AdminInternshipPostingsPage from "../../pages/admin/AdminInternshipPostingsPage"; // Importing the internship postings page
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
          const response = await axiosClient.get("/api/v1/dashboard"); // Fetch dashboard data from API

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
      loader: async () => {
        try {
          /**
           * Responses
           */
          const response = await axiosClient.get("/api/v1/document-types");

          /**
           * Variables
           */
          const initial_document_types = response.data;

          /**
           * Return
           */
          return initial_document_types;
        } catch (error) {
          console.error("Error fetching document types: ", error);
          throw error; // Let the router handle errors
        }
      },
    },
    {
      path: "messaging",
      element: <AdminMessagingPage />,
    },

    {
      path: "roles", // Route for managing user roles
      element: <AdminManageRolesPage />,
      loader: async () => {
        try {
          /**
           * Responses
           */
          const roleResponse = await axiosClient.get("/api/v1/roles");
          const userRoleResponse = await axiosClient.get(
            "/api/v1/roles/user-roles"
          );

          /**
           * Variables
           */
          const initialRoles = roleResponse.data;
          const userRoles = userRoleResponse.data;

          // console.log(initialRoles);
          // console.log(userRoles);

          /**
           * Return
           */
          return { initialRoles, userRoles }; // Return both as an object
        } catch (error) {
          console.error("Error fetching user roles: ", error);
          throw error; // Let the router handle errors
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
          const collegeResponse = await axiosClient.get("/api/v1/colleges");
          const deanResponse = await axiosClient.get(
            "/api/v1/users/deans/including-colleges"
          );

          /**
           * Variables
           */
          const initial_colleges = collegeResponse.data;
          const list_of_deans = deanResponse.data;

          /**
           * Return
           */
          return { initial_colleges, list_of_deans };
        } catch (error) {
          console.error("Error fetching colleges: ", error);
          throw error; // Let the router handle errors
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
          const programResponse = await axiosClient.get("/api/v1/programs");
          const collegeResponse = await axiosClient.get("/api/v1/colleges");
          const chairpersonResponse = await axiosClient.get(
            "/api/v1/users/chairpersons/including-programs"
          );

          /**
           * Variables
           */
          const initial_programs = programResponse.data;
          const list_of_colleges = collegeResponse.data;
          const list_of_chairpersons = chairpersonResponse.data;

          /**
           * Return
           */

          return { initial_programs, list_of_chairpersons, list_of_colleges };
        } catch (error) {
          console.error("Error fetching programs and chairpersons: ", error);
          throw error; // Let the router handle errors
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
          loader: async () => {
            try {
              const response = await axiosClient.get("/api/v1/users");
              const programsResponse = await axiosClient.get(
                "/api/v1/programs"
              );
              const collegesResponse = await axiosClient.get(
                "/api/v1/colleges"
              );

              // console.log(response.data);

              const users = response.data;
              const programs = programsResponse.data;
              const colleges = collegesResponse.data;

              return { users, programs, colleges };
            } catch (error) {
              console.log(error);
            }
          },
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
              console.log(error);
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
              const deanResponse = await axiosClient.get(
                "/api/v1/users/deans/including-colleges"
              );
              const collegeResponse = await axiosClient.get("/api/v1/colleges");

              /**
               * Variables
               */
              const initial_deans = deanResponse.data;
              const colleges = collegeResponse.data;

              /**
               * Return
               */
              return {
                initial_deans,
                colleges,
              };
            } catch (error) {
              console.log(error);
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
                "api/v1/users/students/get-all-students"
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
      path: "offices", // Route for managing offices
      element: <AdminManageOfficesPage />,
    },

    {
      path: "internship-postings", // Route for managing internship postings
      element: <AdminInternshipPostingsPage />,
    },

    {
      path: "logs", // Route for viewing logs
      element: <AdminLogs />,
    },
  ],
};

// Export Admin Routes for use in the application
export default AdminRoutes;
