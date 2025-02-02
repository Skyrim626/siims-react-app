// Libraries
import { Navigate, Outlet } from "react-router-dom";

// Route Handlers

// Student Layout
import StudentLayout from "../../components/layouts/StudentLayout";

// Student Pages
import ProtectedRoute from "../handlers/ProtectedRoute";
import StudentProfilePage from "../../pages/student/StudentProfilePage";

import StudentViewEvaluationPage from "../../pages/student/StudentViewEvaluationPage";
import axiosClient from "../../api/axiosClient";
import StudentReportsPage from "../../pages/student/StudentReportsPage";
import StudentJobApplicationPage from "../../pages/student/StudentJobApplicationPage";
import StudentEditProfilePage from "../../pages/student/StudentEditProfilePage";
import StudentMessagingPage from "../../pages/student/StudentMessagingPage";
import StudentWeeklyAccomplishmentPage from "../../pages/student/StudentWeeklyAccomplishmentPage";
import StudentPersonalInsight from "../../pages/student/StudentPersonalInsight";
import StudentViewEditInsights from "../../pages/student/StudentViewEditInsights";
import ManageDtrPage from "../../pages/ManageDtrPage";
import ManageWarPage from "../../pages/ManageWarPage";
import ViewCompanyProfilePage from "../../pages/profiles/ViewCompanyProfilePage";
import TestingHomePage from "../../pages/student/testing/TestingHomePage";
import ViewWorkPost from "../../pages/ViewWorkPost";
import ApplicationPage from "../../pages/ApplicationPage";
import SelfProfile from "../../pages/profiles/SelfProfile";
import EditProfilePage from "../../pages/profiles/EditProfilePage";
import DocumentsTrackingRemotePage from "../../pages/remotes/DocumentsTrackingRemotePage";
import EndorsementsRemotePage from "../../pages/remotes/EndorsementsRemotePage";
import ProfileContainer from "../../containers/Profiles/ProfileContainer";
import GenerateEndorsementLetterIndex from "../../containers/Endorsements/GenerateEndorsementLetterIndex";
import ReportsContainer from "../../containers/Reports/ReportsContainer";
import DailyReportContainer from "../../containers/Reports/DailyReportContainer";
import WeeklyReportContainer from "../../containers/Reports/WeeklyReportContainer";
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
      // const response = await axiosClient.get("/api/v1/student/auth");
      const userResponse = await axiosClient.get("/api/v1/user-roles");

      /**
       * Variables
       */
      // const auth = response.data;
      const userRoles = userResponse.data;

      /**
       * Return
       */
      return {
        // auth,
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
      element: <TestingHomePage />,
    },
    /* {
      index: true,
      element: <StudentHomePage />,
    }, */
    {
      path: "jobs/:workPostId",
      element: <ViewWorkPost authorizeRole={"student"} />,
    },
    {
      path: "test/profile",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <SelfProfile authorizeRole={"student"} />,
        },
        {
          path: "edit",
          element: <EditProfilePage authorizeRole={"student"} />,
        },
      ],
    },
    {
      path: "profile",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: (
            <ProfileContainer authorizeRole={"student"} method={"self"} />
          ),
        },
        {
          path: "edit",
          element: <EditProfilePage authorizeRole={"student"} />,
        },
      ],
    },
    {
      path: "documents",
      element: <DocumentsTrackingRemotePage authorizeRole={"student"} />,
    },
    /* {
      path: "test/profile",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <StudentProfilePage />,
        },
        {
          path: "edit",
          element: <StudentEditProfilePage />,
        },
      ],
    }, */
    {
      path: "companies/:company_id",
      element: <ViewCompanyProfilePage authorizeRole={"student"} />,
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
      element: <ApplicationPage authorizeRole={"student"} />,
    },
    {
      path: "test/applications/:application_id",
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
            `/api/v1/applications/${application_id}/step-1/get`
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
          const initial_step_one_documents = stepOneResponse.data;
          const stepTwoDocuments = stepTwoResponse.data;
          const job = jobResponse.data;
          const status = statusResponse.data;

          // console.log(stepTwoDocuments);

          return {
            initial_application,
            initial_step_one_documents,
            stepTwoDocuments,
            job,
            status,
          };
        } catch (error) {
          console.error("Error fetching programs and chairpersons: ", error);
          // throw error; // Let the router handle errors
          return {
            initial_application: {},
            stepOneDocuments: [],
            stepTwoDocuments: [],
            job: null,
            status: null,
          };
        }
      },
    },

    /* {
      path: "apply/:job_id/request-endorsement",
      element: <StudentRequestEndorsementPage />,
    }, */

    {
      path: "my-reports",
      element: <StudentReportsPage />,
      loader: async () => {
        try {
          /**
           * Responses
           */
          const documentReponse = await axiosClient.get(
            "/api/v1/users/students/my-reports"
          );

          /**
           * Variables
           */
          const initial_documents = documentReponse.data;

          /**
           * Return
           */
          return {
            initial_documents,
          };
        } catch (error) {
          console.log(error);
          return {
            initial_documents: [],
          };
        }
      },
    },
    {
      path: ":application_id/daily-time-records",
      element: <ManageDtrPage authorizeRole={"student"} />,
    },
    {
      path: ":applicationId/weekly-accomplishment-reports",
      element: <ManageWarPage authorizeRole={"student"} />,
    },
    {
      path: ":application_id/personal-insight",
      element: <StudentPersonalInsight authorizeRole={"student"} />,
    },
    {
      path: ":application_id/view-insights",
      element: <StudentViewEditInsights />,
    },
    {
      path: "test/:applicationId/my-weekly-reports",
      element: <StudentWeeklyAccomplishmentPage />,
      loader: async ({ params }) => {
        try {
          /**
           * Params
           */
          const { applicationId } = params;

          /**
           * Responses
           */
          const weeklyResponse = await axiosClient.get(
            `/api/v1/weekly-accomplishment-reports/${applicationId}`
          );

          /**
           * Variables
           */
          const initial_weekly_reports = weeklyResponse.data;

          /**
           * Return
           */
          return {
            initial_weekly_reports,
            applicationId,
          };
        } catch (error) {
          console.log(error);
        }
      },
    },

    {
      path: "reports",
      element: <ReportsContainer authorizeRole={"student"} />,
    },
    {
      path: "daily-time-records",
      element: <DailyReportContainer authorizeRole={"student"} />,
    },
    {
      path: "weekly-accomplishments",
      element: <WeeklyReportContainer authorizeRole={"student"} />,
    },

    {
      path: "view-evaluations",
      element: <StudentViewEvaluationPage />,
    },

    {
      path: "insights",
      element: <StudentPersonalInsight />,
    },
    {
      path: "view-insights",
      element: <StudentViewEditInsights />,
    },
    {
      path: "endorsements",
      element: <EndorsementsRemotePage authorizeRole={"student"} />,
    },
    /* {
      path: "manual-request-endorsements",
      element: (
        <GenerateEndorsementLetterIndex
          type={"manual"}
          authorizeRole={"student"}
        />
      ),
    }, */
  ],
};

// Exporting routes
export default StudentRoutes;
