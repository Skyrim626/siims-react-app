// Libraries
import { Navigate, Outlet } from "react-router-dom";

// Route Handlers
import ProtectedRoute from "../handlers/ProtectedRoute";

// Services
import axiosClient from "../../api/axiosClient";

// Admin Layout
import AdminLayout from "../../components/layouts/AdminLayout";

// Admin Pages
import AdminDashboard from "../../pages/admin/AdminDashboard";
import AdminManageUsers from "../../pages/admin/AdminManageUsers";
import AdminManageStudent from "../../pages/admin/manage-users/student/AdminManageStudent";
import AdminStudent from "../../pages/admin/manage-users/student/AdminAddStudent";
import AdminMessages from "../../pages/admin/AdminMessages";
import AdminLogs from "../../pages/admin/AdminLogs";
import AdminInternshipPostingsPage from "../../pages/admin/AdminInternshipPostingsPage";
import AdminDepartmentsPage from "../../pages/admin/AdminDepartmentsPage";
import AdminCollegesPage from "../../pages/admin/AdminCollegesPage";
import AdminManageCompaniesPage from "../../pages/admin/manage-users/companies/AdminManageCompaniesPage";

// Custom Hooks
/* import { useLoader } from "../../hooks/useLoader"; */

// Define a function for each API Call

// Loaders for Admin
function useLoader(api) {
  return async function loader() {
    try {
      const response = await axiosClient.get(api);
      return response.data;
    } catch (error) {
      throw new Response("Failed to fetch", {
        status: error.response?.status || 500,
      });
    }
  };
}

// Routes for Admin
const AdminRoutes = {
  path: "/admin",
  element: (
    <ProtectedRoute roleAllowed={"admin"}>
      <AdminLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: "dashboard",
      element: <Navigate to={"/admin"} />,
    },
    {
      index: true,
      element: <AdminDashboard />,
      loader: useLoader("/api/v1/statistics"),
    },
    {
      path: "users",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <AdminManageUsers />,
          loader: useLoader("/api/v1/users"),
        },
        {
          path: "students",
          element: <AdminManageStudent />,
          children: [
            {
              path: "add",
              element: <AdminStudent />,
            },
          ],
        },
        {
          path: "companies",
          element: <AdminManageCompaniesPage />,
        },
      ],
    },
    {
      path: "colleges",
      element: <AdminCollegesPage />,
    },
    {
      path: "messages",
      element: <AdminMessages />,
    },
    {
      path: "internship-postings",
      element: <AdminInternshipPostingsPage />,
    },
    {
      path: "logs",
      element: <AdminLogs />,
    },
    /* {
      path: "users",
      element: <AdminUsers />,
      children: [
        {
          index: true,
          element: <AdminUsersView />,
          loader: useLoader("/api/v1/users"),
        },
        {
          path: "add",
          element: <AdminUserAdd />,
        },
      ],
    }, */
  ],
};

// Export Admin Routes
export default AdminRoutes;
