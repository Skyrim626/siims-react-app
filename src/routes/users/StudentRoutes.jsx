// Libraries
import { Navigate } from "react-router-dom";

// Route Handlers

// Student Layout
import StudentLayout from "../../components/layouts/StudentLayout";

// Student Pages
import StudentHomePage from "../../pages/student/StudentHomePage";
import ProtectedRoute from "../handlers/ProtectedRoute";
import StudentProfilePage from "../../pages/student/StudentProfilePage";
import StudentApplyJobPage from "../../pages/student/StudentJobApplicationPage";
import StudentRequestEndorsementPage from "../../pages/student/StudentRequestEndorsementPage";
import StudentProgramPage from "../../pages/student/StudentReportsPage";
import StudentManageDtrPage from "../../pages/student/StudentManageDtrPage";
import StudentViewEvaluationPage from "../../pages/student/StudentViewEvaluationPage";
import axiosClient from "../../api/axiosClient";
import StudentReportsPage from "../../pages/student/StudentReportsPage";
import StudentJobApplicationPage from "../../pages/student/StudentJobApplicationPage";

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
          const response = await axiosClient.get("/api/v1/student/jobs");

          const { initial_job_posts, student } = response.data;
          const workPosts = initial_job_posts;

          const currentAppliedWorkResponse = await axiosClient.get(
            "/api/v1/student/jobs/currently-applied"
          );
          const { currently_applied_work_post, application_id } =
            currentAppliedWorkResponse.data;

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
      path: "applications/:application_id",
      element: <StudentJobApplicationPage />,
      loader: async ({ params }) => {
        try {
          const { application_id, job_id } = params;

          // Fetch application
          const applicationResponse = await axiosClient.get(
            `/api/v1/student/applications/${application_id}`
          );

          // Fetch Step-1 Documents
          const stepOneResponse = await axiosClient.get(
            `/api/v1/student/applications/${application_id}/document-submissions/step-1/get`
          );

          // console.log(stepOneResponse.data);
          // Storing Variables
          const initial_application = applicationResponse.data;
          const stepOneDocuments = stepOneResponse.data;

          return { initial_application, stepOneDocuments };
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
