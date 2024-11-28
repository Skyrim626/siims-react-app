import { Navigate, Outlet } from "react-router-dom";
import ChairpersonLayout from "../../components/layouts/ChairpersonLayout";
import ProtectedRoute from "../handlers/ProtectedRoute";
import ChairpersonDashboardPage from "../../pages/chairperson/ChairpersonDashboardPage";
import ChairpersonManageCompaniesPage from "../../pages/chairperson/ChairpersonManageCompaniesPage";
import ChairpersonCompanyPage from "../../pages/chairperson/ChairpersonCompanyPage";

import ChairpersonViewCoordinatorPage from "../../pages/chairperson/ChairpersonViewCoordinatorPage";
import axiosClient from "../../api/axiosClient";
import ChairpersonGenerateEndorsemenLetterPage from "../../pages/chairperson/ChairpersonGenerateEndorsemenLetterPage";
import ChairpersonEndorsementRequestsPage from "../../pages/chairperson/ChairpersonEndorsementRequestsPage";
import ChairpersonEndorsementRequestPage from "../../pages/chairperson/ChairpersonEndorsementRequestPage";
import ChairpersonManageStudentsPage from "../../pages/chairperson/ChairpersonManageStudentsPage";

// Routes for Chairperson
const ChairpersonRoutes = {
  path: "chairperson",
  element: (
    <ProtectedRoute roleAllowed={"chairperson"}>
      <ChairpersonLayout />
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
      element: <Navigate to={"/chairperson"} />,
    },
    {
      index: true,
      element: <ChairpersonDashboardPage />,
    },
    {
      path: "coordinators",
      element: <ChairpersonViewCoordinatorPage />,
      loader: async () => {
        try {
          const response = await axiosClient.get(
            "/api/v1/chairperson/coordinators"
          );

          const coordinators = response.data;

          return coordinators;
        } catch (error) {
          console.error("Error fetching coordinators: ", error);
          throw error; // Let the router handle errors
        }
      },
    },
    {
      path: "companies",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <ChairpersonManageCompaniesPage />,
        },
        {
          path: ":company_id",
          element: <ChairpersonCompanyPage />,
        },
      ],
    },
    {
      path: "students",
      element: <ChairpersonManageStudentsPage />,
      loader: async () => {
        try {
          /**
           * Responses
           */
          const studentResponse = await axiosClient.get(
            "/api/v1/users/students/get-all-students"
          );
          const currentProgramIdResponse = await axiosClient.get(
            "/api/v1/users/chairpersons/current-program"
          );

          /**
           * Variables
           */
          const initial_students = studentResponse.data;
          const current_program_id = currentProgramIdResponse.data;

          // console.log(initial_students);
          /**
           * Return
           */
          return {
            initial_students,
            current_program_id,
          };
        } catch (error) {
          console.log(error);
          return {
            initial_students: [],
            current_program_id: 0,
          };
        }
      },
    },
    {
      path: "endorsement-requests",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <ChairpersonEndorsementRequestsPage />,
          loader: async () => {
            try {
              // Fetch response
              const response = await axiosClient.get(
                "/api/v1/endorsement-letter-requests"
              );

              /**
               * Variable Storage
               */
              // console.log(response.data);
              const initial_endorsement_requests = response.data;

              return { initial_endorsement_requests };
            } catch (error) {
              console.log(error);
              return {
                initial_endorsement_requests: [],
              };
            }
          },
        },
        {
          path: ":endorsementLetterRequestId",
          element: <Outlet />,
          children: [
            {
              index: true,
              element: <ChairpersonEndorsementRequestPage />,
              loader: async ({ params }) => {
                try {
                  // console.log(params);

                  // Fetch ID
                  const { endorsementLetterRequestId } = params;

                  // Fetch Response
                  const response = await axiosClient.get(
                    `/api/v1/endorsement-letter-requests/${endorsementLetterRequestId}`
                  );

                  // console.log(response);

                  /**
                   * Variable Storage
                   */
                  const endorsementLetterRequest = response.data;

                  // console.log(endorsementLetterRequest);

                  return {
                    endorsementLetterRequest,
                    endorsementLetterRequestId,
                  };
                } catch (error) {
                  console.log(error);
                  return {
                    endorsementLetterRequest: [],
                  };
                }
              },
            },
            {
              path: "generate-endorsement-letter",
              element: <ChairpersonGenerateEndorsemenLetterPage />,
            },
          ],
        },
      ],
    },
  ],
};

export default ChairpersonRoutes;
