// Libraries
import { Navigate } from "react-router-dom";

// Route Handlers
import ProtectedRoute from "../handlers/ProtectedRoute";

// Services
import axiosClient from "../../api/axiosClient";

// Admin Layout
import AdminLayout from "../../components/layouts/AdminLayout";

// Admin Pages
import AdminDashboard from "../../pages/admin/AdminDashboard";
import AdminUsers from "../../pages/admin/AdminUsers";
import AdminUsersView from "../../pages/admin/AdminUsersView";
import AdminUserAdd from "../../pages/admin/AdminUserAdd";

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
    },
  ],
};

// Export Admin Routes
export default AdminRoutes;
