// Libraries
import { Navigate, Outlet } from "react-router-dom";

// Route Handlers

// Student Layout
import StudentLayout from "../../components/layouts/StudentLayout";

// Student Pages
import StudentHomePage from "../../pages/student/StudentHomePage";
import ProtectedRoute from "../handlers/ProtectedRoute";
import StudentProfilePage from "../../pages/student/StudentProfilePage";
import StudentRequestEndorsementPage from "../../pages/student/StudentRequestEndorsementPage";
import StudentManageDtrPage from "../../pages/student/StudentManageDtrPage";
import StudentViewEvaluationPage from "../../pages/student/StudentViewEvaluationPage";
import axiosClient from "../../api/axiosClient";
import StudentReportsPage from "../../pages/student/StudentReportsPage";
import StudentJobApplicationPage from "../../pages/student/StudentJobApplicationPage";
import StudentEditProfilePage from "../../pages/student/StudentEditProfilePage";
import StudentMessagingPage from "../../pages/student/StudentMessagingPage";
<<<<<<< HEAD
import StudentWeeklyAccomplishmentPage from "../../pages/student/StudentWeeklyAccomplishmentPage";
=======
import StudentViewWorkPost from "../../pages/student/StudentViewWorkPost";
>>>>>>> 74254991ccfe049636ead3207115d7b588c12d12

// Routes for Student
const StudentRoutes = {
  path: "my",
  element: (
    <ProtectedRoute roleAllowed={"student"}>
      <StudentLayout />
    </ProtectedRoute>
  ),
  loader: async () => {
    try {
      /**
       * Response
       */
      const response = await axiosClient.get("/api/v1/student/auth");
      const userResponse = await axiosClient.get("/api/v1/user-roles");

      /**
       * Variables
       */
      const auth = response.data;
      const userRoles = userResponse.data;

      /**
       * Return
       */
      return {
        auth,
        userRoles,
      };
    } catch (error) {
      console.error("Error fetching programs and chairpersons: ", error);
      throw error; // Let the router handle errors
    }
  },
  children: [
    {
      path: "dashboard",
      element: <Navigate to={"/my"} />,
    },
    {
      index: true,
      element: <StudentHomePage />,
      loader: async () => {
        try {
          /**
           * Response
           */

          const currentAppliedWorkResponse = await axiosClient.get(
            "/api/v1/student/jobs/currently-applied"
          );
          const statusResponse = await axiosClient.get(
            "/api/v1/users/students/get-student-status-id"
          );

          /**
           * Variables
           */
          const response = await axiosClient.get("/api/v1/student/jobs");
          const { currently_applied_work_post, application_id } =
            currentAppliedWorkResponse.data;
          const status = statusResponse.data;

          /**
           * Variables
           */
          const { initial_job_posts, student } = response.data;
          const workPosts = initial_job_posts;

          // console.log(initial_job_posts);
          // console.log(student);
          // console.log(currently_applied_work_post);
          // console.log(application_id);

          return {
            workPosts,
            student,
            currently_applied_work_post,
            application_id,
            status,
          };
        } catch (error) {
          console.error("Error fetching programs and chairpersons: ", error);
          throw error; // Let the router handle errors
        }
      },
    },
    {
      path: ":workPostId",
      element: <StudentViewWorkPost />,
      loader: async ({ params }) => {
        try {
          /**
           * Params
           */
          const { workPostId } = params;

          /**
           * Responses
           */
          const workPostResponse = await axiosClient.get(
            `/api/v1/work-posts/${workPostId}/details`
          );
          const statusResponse = await axiosClient.get(
            "/api/v1/users/students/get-student-status-id"
          );

          /**
           * Variables
           */
          const workPost = workPostResponse.data;
          const status = statusResponse.data;

          // console.log(status);
          /**
           * Return
           */
          return {
            workPost,
            status,
          };
        } catch (error) {
          console.log(error);
        }
      },
    },
    {
      path: "profile",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <StudentProfilePage />,
          loader: async () => {
            try {
              /**
               * Responses
               */

              const profileResponse = await axiosClient.get("/api/v1/profile");

              // console.log("Testing");
              // console.log(response);

              /**
               * Variables
               */
              const profile = profileResponse.data;

              // console.log(profile);

              /**
               * Return Data
               */
              return { profile };
            } catch (error) {
              console.log(error);
              throw error;
            }
          },
        },
        {
          path: "edit",
          element: <StudentEditProfilePage />,
        },
      ],
    },

    {
      path: "message",
      element: <StudentMessagingPage />,
    },
    /* {
      path: "edit-profile",
      element: <StudentEditProfilePage />,
    }, */
    {
      path: "applications/:application_id",
      element: <StudentJobApplicationPage />,
      loader: async ({ params }) => {
        try {
          /**
           * Params
           */

          const { application_id } = params;

          /**
           * Fetch response
           */
          const applicationResponse = await axiosClient.get(
            `/api/v1/student/applications/${application_id}`
          );
          const statusResponse = await axiosClient.get(
            "/api/v1/users/students/get-student-status-id"
          );

          const jobResponse = await axiosClient.get(
            `/api/v1/student/jobs/${applicationResponse.data.work_post_id}`
          );

          // Fetch Step-1 Documents
          const stepOneResponse = await axiosClient.get(
            `/api/v1/student/applications/${application_id}/document-submissions/step-1/get`
          );

          // Fetch Step-2 Documents
          const stepTwoResponse = await axiosClient.get(
            `api/v1/student/applications/${application_id}/document-submissions/step-2/get`
          );

          /**
           * Variable Containers
           */
          // Storing Variables
          const initial_application = applicationResponse.data;
          // console.log(initial_application);
          const stepOneDocuments = stepOneResponse.data;
          const stepTwoDocuments = stepTwoResponse.data;
          const job = jobResponse.data;
          const status = statusResponse.data;

          // console.log(stepTwoDocuments);

          return {
            initial_application,
            stepOneDocuments,
            stepTwoDocuments,
            job,
            status,
          };
        } catch (error) {
          console.error("Error fetching programs and chairpersons: ", error);
          throw error; // Let the router handle errors
        }
      },
    },
    {
      path: "apply/:job_id/request-endorsement",
      element: <StudentRequestEndorsementPage />,
    },
    {
      path: "my-reports",
      element: <StudentReportsPage />,
    },
    {
      path: ":applicationId/daily-time-records",
      element: <StudentManageDtrPage />,
      loader: async ({ params }) => {
        try {
          /**
           * Params
           */
          const { applicationId } = params;

          /**
           * Responses
           */

          const statusResponse = await axiosClient.get(
            "/api/v1/users/students/get-student-status-id"
          );
          const dtrResponse = await axiosClient.get(
            `/api/v1/daily-time-records/${applicationId}`
          );

          /**
           * Variables
           */
          const status = statusResponse.data;
          const dtrEntries = dtrResponse.data;

          // console.log(dtrEntries);

          return {
            status,
            dtrEntries,
          };
        } catch (error) {
          console.log(error);
        }
      },
    },
    {
      path: "view-evaluations",
      element: <StudentViewEvaluationPage />,
    },
    {
      path: "my-weekly",
      element: <StudentWeeklyAccomplishmentPage />,
    },
  ],
};

// Exporting routes
export default StudentRoutes;
