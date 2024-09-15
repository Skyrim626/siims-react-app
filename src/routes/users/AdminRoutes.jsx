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
import AdminManageUsers from "../../pages/admin/manage-users/companies/AdminManageUsers";
import AdminManageStudent from "../../pages/admin/manage-users/student/AdminManageStudent";
import AdminStudent from "../../pages/admin/manage-users/student/AdminAddStudent";
import AdminMessages from "../../pages/admin/AdminMessages";
import AdminLogs from "../../pages/admin/AdminLogs";
import AdminInternshipPostingsPage from "../../pages/admin/AdminInternshipPostingsPage";
import AdminCollegesPage from "../../pages/admin/AdminCollegesPage";
import AdminManageCompaniesPage from "../../pages/admin/manage-users/companies/AdminManageCompaniesPage";
import AdminManageUserSelection from "../../pages/admin/AdminManageUserSelection";
import AdminManageDeansPage from "../../pages/admin/manage-users/deans/AdminManageDeansPage";

// Routes for Admin
const AdminRoutes = {
  path: "admin",
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
      loader: async () => {
        const response = await axiosClient.get("/api/v1/admin/dashboard");
        return response.data;
      },
    },
    {
      path: "users",
      element: <AdminManageUserSelection />,
      children: [
        {
          index: true,
          element: <AdminManageUsers />,
          loader: async () => {
            const response = await axiosClient.get("/api/v1/users");
            return response.data;
          },
        },
        {
          path: "deans",
          element: <AdminManageDeansPage />,
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
          loader: async () => {
            const response = await axiosClient.get(
              "/api/v1/admin/users/companies"
            );
            return response.data;
          },
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
