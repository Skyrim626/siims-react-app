import { Navigate, Outlet } from "react-router-dom";
import SupervisorLayout from "../../components/layouts/SupervisorLayout";
import ProtectedRoute from "../handlers/ProtectedRoute";
import SupervisorDashboardPage from "../../pages/supervisor/SupervisorDashboardPage";
import SupervisorManageJobsPage from "../../pages/supervisor/SupervisorManageJobsPage";
import SupervisorAddJobPage from "../../pages/supervisor/SupervisorAddJobPage";

// Routes for Supervisor
const SupervisorRoutes = {
  path: "supervisor",
  element: (
    <ProtectedRoute roleAllowed={"supervisor"}>
      <SupervisorLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: "dashboard",
      element: <Navigate to={"/supervisor"} />,
    },
    {
      index: true,
      element: <SupervisorDashboardPage />,
    },
    {
      path: "work-posts",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <SupervisorManageJobsPage />,
        },
        {
          path: "add",
          element: <SupervisorAddJobPage />,
        },
      ],
    },
  ],
};

export default SupervisorRoutes;
