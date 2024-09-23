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
import AdminManageStudent from "../../pages/admin/manage-users/student/AdminManageStudent";
import AdminStudent from "../../pages/admin/manage-users/student/AdminAddStudent";
import AdminMessages from "../../pages/admin/AdminMessages";
import AdminLogs from "../../pages/admin/AdminLogs";
import AdminInternshipPostingsPage from "../../pages/admin/AdminInternshipPostingsPage";
import AdminManageUserSelection from "../../pages/admin/AdminManageUserSelection";
import AdminManageDeansPage from "../../pages/admin/manage-users/deans/AdminManageDeansPage";
import AdminManageUsersPage from "../../pages/admin/manage-users/AdminManageUsersPage";
import AdminManageChairpersonsPage from "../../pages/admin/manage-users/chairpersons/AdminManageChairpersonsPage";
import AdminManageCollegesPage from "../../pages/admin/AdminManageCollegesPage";
import AdminManageRolesPage from "../../pages/admin/AdminManageRolesPage";
import AdminManageCompaniesPage from "../../pages/admin/AdminManageCompaniesPage";

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
      path: "roles",
      element: <AdminManageRolesPage />,
    },
    {
      path: "users",
      element: <AdminManageUserSelection />,
      children: [
        {
          index: true,
          element: <AdminManageUsersPage />,
          /* loader: async () => {
            const response = await axiosClient.get("/api/v1/admin/users");
            return response.data;
          }, */
        },
        {
          path: "chairpersons",
          element: <AdminManageChairpersonsPage />,
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
          /* loader: async () => {
            const response = await axiosClient.get(
              "/api/v1/admin/users/companies"
            );
            return response.data;
          }, */
        },
      ],
    },
    {
      path: "colleges",
      element: <AdminManageCollegesPage />,
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
