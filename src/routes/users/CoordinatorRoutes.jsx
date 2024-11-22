import { Navigate, Outlet } from "react-router-dom";
import CoordinatorLayout from "../../components/layouts/CoordinatorLayout";
import ProtectedRoute from "../handlers/ProtectedRoute";
import CoordinatorDashboardPage from "../../pages/coordinator/CoordinatorDashboardPage";
import CoordinatorProfilePage from "../../pages/coordinator/CoordinatorProfilePage";
import axiosClient from "../../api/axiosClient";
import CoordinatorViewStudentsPage from "../../pages/coordinator/CoordinatorViewStudentsPage";
import CoordinatorViewStudentApplications from "../../pages/coordinator/CoordinatorViewStudentApplications";
import CoordinatorViewStudentApplication from "../../pages/coordinator/CoordinatorViewStudentApplication";

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
