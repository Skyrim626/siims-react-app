import { Navigate, Outlet, useParams } from "react-router-dom";
import SupervisorLayout from "../../components/layouts/SupervisorLayout";
import ProtectedRoute from "../handlers/ProtectedRoute";
import SupervisorDashboardPage from "../../pages/supervisor/SupervisorDashboardPage";
import SupervisorManageJobsPage from "../../pages/supervisor/SupervisorManageJobsPage";
import SupervisorAddJobPage from "../../pages/supervisor/SupervisorAddJobPage";
import axiosClient from "../../api/axiosClient";
import SupervisorEditJobPage from "../../pages/supervisor/SupervisorEditJobPage";

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
          loader: async () => {
            try {
              const response = await axiosClient.get(
                "/api/v1/supervisor/work-posts"
              );

              const { initial_work_posts, work_types } = response.data;

              // console.log(initial_work_posts);
              // console.log(work_types);

              return { initial_work_posts, work_types };
            } catch (error) {
              console.error("Error fetching work posts: ", error);
              throw error; // Let the router handle errors
            }
          },
        },
        {
          path: "add",
          element: <SupervisorAddJobPage />,
          loader: async () => {
            try {
              const response = await axiosClient.get(
                "/api/v1/supervisor/work-types"
              );

              const workTypes = response.data;

              console.log(workTypes);

              return workTypes;
            } catch (error) {
              console.error("Error fetching work types: ", error);
              throw error; // Let the router handle errors
            }
          },
        },
        {
          path: "edit/:id",
          element: <SupervisorEditJobPage />,
          loader: async ({ params }) => {
            try {
              const { id } = params; // Get the `id` from the params
              // console.log("The ID is: ", id); // Log the ID
              const response = await axiosClient.get(
                `/api/v1/supervisor/work-posts/${id}`
              );

              const { initial_work_post, work_types } = response.data;
              // console.log(initial_work_post);
              return { initial_work_post, work_types };
            } catch (error) {
              console.error("Error fetching job: ", error);
              throw error; // Let the router handle errors
            }
          },
        },
      ],
    },
  ],
};

export default SupervisorRoutes;
