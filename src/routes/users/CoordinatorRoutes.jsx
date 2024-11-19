import { Navigate } from "react-router-dom";
import CoordinatorLayout from "../../components/layouts/CoordinatorLayout";
import ProtectedRoute from "../handlers/ProtectedRoute";
import CoordinatorDashboardPage from "../../pages/coordinator/CoordinatorDashboardPage";
import CoordinatorProfilePage from "../../pages/coordinator/CoordinatorProfilePage";
import axiosClient from "../../api/axiosClient";

// Routes for Coordinator
const CoordinatorRoutes = {
  path: "coordinator",
  element: (
    <ProtectedRoute roleAllowed={"coordinator"}>
      {/* Protect routes to allow access only to coordinator role */}
      <CoordinatorLayout />
      {/* Render CoordinatorLayout for the coordinator section */}
    </ProtectedRoute>
  ),
  children: [
    {
      path: "dashboard", // Dashboard route that redirects to /osa
      element: <Navigate to={"/osa"} />,
    },
    {
      index: true,
      element: <CoordinatorDashboardPage />,
    },
    {
      path: "profile",
      element: <CoordinatorProfilePage />,
      loader: async () => {
        try {
          const response = await axiosClient.get("/api/v1/coordinator/profile");

          const profile = response.data;

          return profile;
        } catch (error) {
          console.error("Error fetching programs and chairpersons: ", error);
          throw error; // Let the router handle errors
        }
      },
    },
  ],
};

export default CoordinatorRoutes;
