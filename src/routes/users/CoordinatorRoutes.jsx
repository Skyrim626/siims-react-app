import { Navigate, Outlet } from "react-router-dom";
import CoordinatorLayout from "../../components/layouts/CoordinatorLayout";
import ProtectedRoute from "../handlers/ProtectedRoute";
import CoordinatorDashboardPage from "../../pages/coordinator/CoordinatorDashboardPage";
import CoordinatorProfilePage from "../../pages/coordinator/CoordinatorProfilePage";
import axiosClient from "../../api/axiosClient";
import CoordinatorViewStudentsPage from "../../pages/coordinator/CoordinatorViewStudentsPage";
import CoordinatorViewStudentApplications from "../../pages/coordinator/CoordinatorViewStudentApplications";
import CoordinatorViewStudentApplication from "../../pages/coordinator/CoordinatorViewStudentApplication";
import CoordinatorMyStudentProgress from "../../pages/coordinator/CoordinatorMyStudentsReports";
import CoordinatorMyStudentsReports from "../../pages/coordinator/CoordinatorMyStudentsReports";

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
      element: <Navigate to={"/osa"} />,
    },
    {
      path: "my-students-reports",
      element: <CoordinatorMyStudentsReports />,
      loader: async () => {
        try {
          /**
           * Responses
           */
          const studentReportResponse = await axiosClient.get(
            "/api/v1/users/coordinators/students/reports"
          );

          /**
           * Variables
           */
          const initial_student_reports = studentReportResponse.data;

          /**
           * Return
           */
          return {
            initial_student_reports,
          };
        } catch (error) {
          console.log(error);
          return {
            initial_student_reports: [],
          };
        }
      },
    },
    {
      index: true,
      element: <CoordinatorDashboardPage />,
    },

    {
      path: "students",
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
