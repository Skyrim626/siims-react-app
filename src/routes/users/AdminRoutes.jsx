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

// Define routes for the Admin section
const AdminRoutes = {
  path: "admin", // Base path for admin routes
  element: (
    <ProtectedRoute roleAllowed={"admin"}>
      {/* Protect routes to allow access only to admin role */}
      <AdminLayout /> {/* Render AdminLayout for the admin section */}
    </ProtectedRoute>
  ),
  children: [
    {
      path: "dashboard", // Dashboard route that redirects to /admin
      element: <Navigate to={"/admin"} />,
    },
    {
      index: true, // Default route for the admin section
      element: <AdminDashboard />, // Render the Admin Dashboard component
      loader: async () => {
        const response = await axiosClient.get("/api/v1/admin/dashboard"); // Fetch dashboard data from API

        // console.log(response.data);
        const data = response.data;

        return data; // Return fetched data for the loader
      },
    },
    {
      path: "document-types",
      element: <AdminManageDocumentTypesPage />,
      loader: async () => {
        try {
          const response = await axiosClient.get(
            "/api/v1/admin/document-types"
          );
          const initial_document_types = response.data;
          // console.log(initial_document_types);
          return initial_document_types;
        } catch (error) {
          console.error("Error fetching document types: ", error);
          throw error; // Let the router handle errors
        }
      },
    },

    {
      path: "roles", // Route for managing user roles
      element: <AdminManageRolesPage />,
      loader: async () => {
        try {
          const response = await axiosClient.get("/api/v1/admin/roles");

          // Fetch the list of roles and user roles
          const { initialRoles, userRoles } = response.data;
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
          const response = await axiosClient.get("/api/v1/admin/colleges");
          // Fetch the list of colleges
          const { initial_colleges, list_of_deans } = response.data;

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
          const response = await axiosClient.get("/api/v1/admin/programs");

          // Fetch the list of programs and chairpersons
          const { initial_programs, list_of_chairpersons, list_of_colleges } =
            response.data;

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
        },
        {
          path: "chairpersons", // Route for managing chairpersons
          element: <AdminManageChairpersonsPage />,
        },
        {
          path: "deans", // Route for managing deans
          element: <AdminManageDeansPage />,
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
