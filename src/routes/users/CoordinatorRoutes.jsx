import { Navigate, Outlet } from "react-router-dom";
import CoordinatorLayout from "../../components/layouts/CoordinatorLayout";
import ProtectedRoute from "../handlers/ProtectedRoute";
import CoordinatorProfilePage from "../../pages/coordinator/CoordinatorProfilePage";
import axiosClient from "../../api/axiosClient";
import CoordinatorViewStudentsPage from "../../pages/coordinator/CoordinatorViewStudentsPage";
import CoordinatorViewStudentApplications from "../../pages/coordinator/CoordinatorViewStudentApplications";
import CoordinatorViewStudentApplication from "../../pages/coordinator/CoordinatorViewStudentApplication";
import ViewActiveStudentsPage from "../../pages/ViewActiveStudentsPage";
import ViewDtrPage from "../../pages/ViewDtrPage";
import ViewWarPage from "../../pages/ViewWarPage";
import ManageStudentsPage from "../../pages/ManageStudentsPage";
import ViewProfilePage from "../../pages/profiles/ViewProfilePage";
import SelfProfile from "../../pages/profiles/SelfProfile";
import EditProfilePage from "../../pages/profiles/EditProfilePage";
import ManageApplicantPage from "../../pages/ManageApplicantPage";
import ViewReportsPage from "../../pages/ViewReportsPage";
import HomeRemotePage from "../../pages/remotes/HomeRemotePage";
import ManageSectionsPage from "../../pages/sections/ManageSectionsPage";
import TestingPage from "../../pages/TestingPage";
import SectionContainer from "../../containers/Section/SectionContainer";

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
      path: "dashboard", // Dashboard route that redirects to /osa
      element: <Navigate to={"/coordinator"} />,
    },
    {
      index: true,
      element: <HomeRemotePage authorizeRole={"coordinator"} />,
    },
    {
      path: "profile",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <SelfProfile authorizeRole={"coordinator"} />,
        },
        {
          path: "edit",
          element: <EditProfilePage authorizeRole={"coordinator"} />,
        },
      ],
    },
    {
      path: "sections",
      element: <SectionContainer authorizeRole={"coordinator"} />,
    },
    {
      path: "students",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <ManageStudentsPage authorizeRole={"coordinator"} />,
        },
        // Student View Profile Route
        {
          path: ":user_id",
          element: (
            <ViewProfilePage
              authorizeRole={"coordinator"}
              viewingUser={"student"}
            />
          ),
        },
        {
          path: "user_id",
          element: (
            <ViewProfilePage
              authorizeRole={"coordinator"}
              viewingUser={"coordinator"}
            />
          ),
        },
        {
          path: "applications/:application_id",
          element: <ManageApplicantPage authorizeRole={"coordinator"} />,
        },
      ],
    },
    {
      path: "my-students-reports",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <ViewReportsPage authorizeRole={"coordinator"} />,
        },
        {
          path: ":id/daily-time-records",
          element: <ViewDtrPage authorizeRole={"coordinator"} />,
        },
        {
          path: ":id/weekly-accomplishment-reports",
          element: <ViewWarPage authorizeRole={"coordinator"} />,
        },
      ],
    },
    {
      path: "test/my-students-reports",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <ViewActiveStudentsPage authorizeRole={"coordinator"} />,
        },
        {
          path: "applications/:id/daily-time-records",
          element: <ViewDtrPage authorizeRole={"coordinator"} />,
        },
        {
          path: "applications/:applicationId/weekly-accomplishment-reports",
          element: <ViewWarPage authorizeRole={"coordinator"} />,
        },
      ],
    },

    // Students View Profile
    {
      path: "profiles/:user_id",
      element: (
        <ViewProfilePage
          authorizeRole={"coordinator"}
          viewingUser={"student"}
        />
      ),
    },

    {
      path: "test/students",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <CoordinatorViewStudentsPage />,
          loader: async () => {
            try {
              const response = await axiosClient.get(
                "/api/v1/coordinator/students"
              );

              const students = response.data;
              console.log(students);

              return { students };
            } catch (error) {
              console.log(error);
            }
          },
        },
        {
          path: ":studentId/applications",
          element: <Outlet />,
          children: [
            {
              index: true,
              element: <CoordinatorViewStudentApplications />,
              loader: async ({ params }) => {
                try {
                  const { studentId } = params;

                  // Responses
                  const applicationResponse = await axiosClient.get(
                    `/api/v1/coordinator/students/${studentId}/applications`
                  );
                  const studentResponse = await axiosClient.get(
                    `/api/v1/coordinator/students/${studentId}`
                  );

                  // Variables
                  const applications = applicationResponse.data;
                  const student = studentResponse.data;
                  // console.log(applications);

                  return { applications, student };
                } catch (error) {
                  console.log(error);
                }
              },
            },
            {
              path: ":applicationId",
              element: <CoordinatorViewStudentApplication />,
              loader: async ({ params }) => {
                try {
                  const { studentId, applicationId } = params;

                  // console.log(studentId);
                  // console.log(applicationId);

                  const response = await axiosClient(
                    `/api/v1/coordinator/students/${studentId}/applications/${applicationId}`
                  );

                  const application = response.data;

                  return { application };
                } catch (error) {
                  console.log(error);
                }
              },
            },
          ],
        },
      ],
    },
    {
      path: "testing",
      element: <TestingPage />,
    },
    {
      path: "profile",
      element: <CoordinatorProfilePage />,
      loader: async () => {
        try {
          /**
           * Responses
           */
          const response = await axiosClient.get("/api/v1/coordinator/profile");

          /**
           * Variables
           */
          const initial_profile = response.data;

          /**
           * Returns
           */
          return { initial_profile };
        } catch (error) {
          console.error("Error fetching programs and chairpersons: ", error);
          return {
            initial_profile: {},
          };
        }
      },
    },
  ],
};

export default CoordinatorRoutes;
