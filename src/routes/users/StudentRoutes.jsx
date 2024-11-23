// Libraries
import { Navigate } from "react-router-dom";

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
      const response = await axiosClient.get("/api/v1/student/auth");
      // console.log(response);

      const auth = response.data;

      // console.log(auth);

      return auth;
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

          const { currently_applied_work_post, application_id } =
            currentAppliedWorkResponse.data;

          const response = await axiosClient.get("/api/v1/student/jobs");

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
          };
        } catch (error) {
          console.error("Error fetching programs and chairpersons: ", error);
          throw error; // Let the router handle errors
        }
      },
    },
    {
      path: "profile",
      element: <StudentProfilePage />,
    },
    {
      path: "message",
      element: <StudentMessagingPage />,
    },
    {
      path: "edit-profile",
      element: <StudentEditProfilePage />,
    },
    {
      path: "applications/:application_id",
      element: <StudentJobApplicationPage />,
      loader: async ({ params }) => {
        try {
          const { application_id } = params;

          /**
           * Fetch response
           */
          const applicationResponse = await axiosClient.get(
            `/api/v1/student/applications/${application_id}`
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

          // console.log(stepTwoDocuments);

          return {
            initial_application,
            stepOneDocuments,
            stepTwoDocuments,
            job,
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
      path: "daily-time-records",
      element: <StudentManageDtrPage />,
    },
    {
      path: "view-evaluations",
      element: <StudentViewEvaluationPage />,
    },
  ],
};

// Exporting routes
export default StudentRoutes;
