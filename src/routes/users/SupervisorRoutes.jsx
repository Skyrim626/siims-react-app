import { Navigate, Outlet, useParams } from "react-router-dom";
import SupervisorLayout from "../../components/layouts/SupervisorLayout";
import ProtectedRoute from "../handlers/ProtectedRoute";
import SupervisorDashboardPage from "../../pages/supervisor/SupervisorDashboardPage";
import SupervisorManageJobsPage from "../../pages/supervisor/SupervisorManageJobsPage";
import SupervisorAddJobPage from "../../pages/supervisor/SupervisorAddJobPage";
import axiosClient from "../../api/axiosClient";
import SupervisorEditJobPage from "../../pages/supervisor/SupervisorEditJobPage";
import SupervisorManageApplicantsPage from "../../pages/supervisor/SupervisorManageApplicantsPage";
import SupervisorManageApplicantPage from "../../pages/supervisor/SupervisorManageApplicantPage";
import SupervisorEvaluationPage from "../../pages/supervisor/SupervisorEvaluationPage";
import SupervisorViewInterns from "../../pages/supervisor/SupervisorViewIntern";
import SupervisorManageDTR from "../../pages/supervisor/SupervisorManageDTR";
import SupervisorViewWeeklyReport from "../../pages/supervisor/SupervisorViewWeeklyReport";
import ViewActiveStudentsPage from "../../pages/ViewActiveStudentsPage";
import ViewDtrPage from "../../pages/ViewDtrPage";
import ViewWarPage from "../../pages/ViewWarPage";
import ManagePerformanceEvaluationPage from "../../pages/ManagePerformanceEvaluationPage";
import SelfProfile from "../../pages/profiles/SelfProfile";
import EditProfilePage from "../../pages/profiles/EditProfilePage";
import ViewReportsPage from "../../pages/ViewReportsPage";
import ViewProfilePage from "../../pages/profiles/ViewProfilePage";

// Routes for Supervisor
const SupervisorRoutes = {
  path: "supervisor",
  element: (
    <ProtectedRoute roleAllowed={"supervisor"}>
      <SupervisorLayout />
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
      path: "dashboard",
      element: <Navigate to={"/supervisor"} />,
    },
    {
      path: "profile",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <SelfProfile authorizeRole={"supervisor"} />,
        },
        {
          path: "edit",
          element: <EditProfilePage authorizeRole={"supervisor"} />,
        },
      ],
    },
    {
      path: "performance-evaluation",
      element: <SupervisorEvaluationPage />,
      loader: async () => {
        try {
          /**
           * Responses
           */

          const internResponse = await axiosClient.get(
            "/api/v1/users/supervisors/interns/get-all-on-going-interns"
          );

          /**
           * Variables
           */
          const list_of_interns = internResponse.data;

          /**
           * Return
           */
          return {
            list_of_interns,
          };
        } catch (error) {
          console.log(error);
        }
      },
    },
    {
      path: "reports",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <ViewReportsPage authorizeRole={"supervisor"} />,
        },
        {
          path: ":id/daily-time-records",
          element: <ViewDtrPage authorizeRole={"supervisor"} />,
        },
        {
          path: ":id/weekly-accomplishment-reports",
          element: <ViewWarPage authorizeRole={"supervisor"} />,
        },
        {
          path: ":id/performance-evaluation",
          element: (
            <ManagePerformanceEvaluationPage authorizeRole={"supervisor"} />
          ),
        },
      ],
    },
    {
      path: "trainees",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <ViewActiveStudentsPage authorizeRole={"supervisor"} />,
        },
        {
          path: "applications/:id/daily-time-records",
          element: <ViewDtrPage authorizeRole={"supervisor"} />,
        },
        {
          path: "applications/:applicationId/weekly-accomplishment-reports",
          element: <ViewWarPage authorizeRole={"supervisor"} />,
        },
        {
          path: "applications/:applicationId/performance-evaluation",
          element: (
            <ManagePerformanceEvaluationPage authorizeRole={"supervisor"} />
          ),
        },
        {
          path: "test",
          element: <SupervisorViewInterns />,
          loader: async () => {
            try {
              /**
               * Responses
               */
              const internResponse = await axiosClient.get(
                "/api/v1/users/supervisors/interns"
              );

              /**
               * Variables
               */
              const initial_interns = internResponse.data;

              /**
               * Return
               */
              return {
                initial_interns,
              };
            } catch (error) {
              console.log(error);

              return {
                initial_interns: [],
              };
            }
          },
        },
        {
          path: "daily-time-records/:applicationId",
          element: <SupervisorManageDTR />,
          loader: async ({ params }) => {
            try {
              /**
               * Params
               */
              const { applicationId } = params;

              /**
               * Responses
               */
              const dtrResponse = await axiosClient.get(
                `/api/v1/users/supervisors/interns/daily-time-records/${applicationId}`
              );

              /**
               * Variables
               */
              const initial_daily_time_records = dtrResponse.data;

              /**
               * Return
               */
              return {
                initial_daily_time_records,
              };
            } catch (error) {
              console.log(error);
              return {
                initial_daily_time_records: [],
              };
            }
          },
        },
        {
          path: "weekly-accomplishment-reports/:applicationId",
          element: <SupervisorViewWeeklyReport />,
          loader: async ({ params }) => {
            try {
              /**
               * Params
               */
              const { applicationId } = params;

              /**
               * Responses
               */
              const warsResponse = await axiosClient.get(
                `/api/v1/users/supervisors/interns/weekly-accomplishment-reports/${applicationId}`
              );

              /**
               * Variables
               */
              const initial_wars = warsResponse.data;
              // console.log(initial_wars);
              /**
               * Return
               */
              return {
                initial_wars,
              };
            } catch (error) {
              console.log(error);
              return {
                initial_wars: [],
              };
            }
          },
        },
      ],
    },
    {
      index: true,
      element: <SupervisorDashboardPage />,
    },
    {
      path: "applicants",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <SupervisorManageApplicantsPage />,
          loader: async () => {
            try {
              const response = await axiosClient.get(
                "/api/v1/supervisor/applicants"
              );

              // console.log(response.data);

              return response.data;
            } catch (error) {
              console.error("Error fetching work posts: ", error);
              throw error; // Let the router handle errors
            }
          },
        },

        {
          path: ":applicantId",
          element: <SupervisorManageApplicantPage />,
          loader: async ({ params }) => {
            try {
              /**
               * Params ID
               */
              const { applicantId } = params;

              /**
               * Responses
               */
              const response = await axiosClient.get(
                `/api/v1/supervisor/applicants/${applicantId}`
              );

              /**
               * Variables
               */
              const applicant = response.data;

              return applicant;
            } catch (error) {
              console.error("Error fetching work posts: ", error);
              throw error; // Let the router handle errors
            }
          },
        },
      ],
    },

    // Students View Profile
    {
      path: "profiles/:user_id",
      element: (
        <ViewProfilePage authorizeRole={"supervisor"} viewingUser={"student"} />
      ),
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
