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
import AdminManageStudent from "../../pages/admin/manage-users/student/AdminManageStudent"; // Importing the page to manage students
import AdminStudent from "../../pages/admin/manage-users/student/AdminAddStudent"; // Importing the page to add a new student
import AdminMessages from "../../pages/admin/AdminMessages"; // Importing the messages management page
import AdminLogs from "../../pages/admin/AdminLogs"; // Importing the logs management page
import AdminInternshipPostingsPage from "../../pages/admin/AdminInternshipPostingsPage"; // Importing the internship postings page
import AdminManageUserSelection from "../../pages/admin/AdminManageUserSelection"; // Importing the user selection management page
import AdminManageDeansPage from "../../pages/admin/manage-users/deans/AdminManageDeansPage"; // Importing the page to manage deans
import AdminManageUsersPage from "../../pages/admin/manage-users/AdminManageUsersPage"; // Importing the general user management page
import AdminManageChairpersonsPage from "../../pages/admin/manage-users/chairpersons/AdminManageChairpersonsPage"; // Importing the page to manage chairpersons
import AdminManageCollegesPage from "../../pages/admin/AdminManageCollegesPage"; // Importing the page to manage colleges
import AdminManageRolesPage from "../../pages/admin/AdminManageRolesPage"; // Importing the page to manage user roles
import AdminManageCompaniesPage from "../../pages/admin/AdminManageCompaniesPage"; // Importing the page to manage companies

// Define routes for the Admin section
const AdminRoutes = {
  path: "admin", // Base path for admin routes
  element: (
    <ProtectedRoute roleAllowed={"admin"}>
      {" "}
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
        return response.data; // Return fetched data for the loader
      },
    },
    {
      path: "roles", // Route for managing user roles
      element: <AdminManageRolesPage />,
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
        {
          path: "students", // Base path for student management
          element: <AdminManageStudent />, // Render student management page
          children: [
            {
              path: "add", // Route for adding a new student
              element: <AdminStudent />, // Render add student component
            },
          ],
        },
        {
          path: "companies", // Route for managing companies
          element: <AdminManageCompaniesPage />,
        },
      ],
    },
    {
      path: "colleges", // Route for managing colleges
      element: <AdminManageCollegesPage />,
    },
    {
      path: "messages", // Route for managing messages
      element: <AdminMessages />,
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
