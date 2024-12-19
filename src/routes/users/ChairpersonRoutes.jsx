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
import PDFFile from "../../components/letters/PDFFile";
import ViewCoordinatorsPage from "../../pages/ViewCoordinatorsPage";
import ManageStudentsPage from "../../pages/ManageStudentsPage";
import ManageCompaniesPage from "../../pages/ManageCompaniesPage";

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
      element: <ViewCoordinatorsPage authorizeRole={"chairperson"} />,
    },
    {
      path: "test/coordinators",
      element: <ChairpersonViewCoordinatorPage />,
      loader: async () => {
        try {
          const response = await axiosClient.get(
            "/api/v1/chairperson/coordinators"
          );

          const coordinators = response.data;

          return { coordinators };
        } catch (error) {
          console.error("Error fetching coordinators: ", error);
          return {
            coordinators: [],
          };
        }
      },
    },
    {
      path: "companies",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <ManageCompaniesPage />,
        },
        {
          path: "test",
          element: <ChairpersonManageCompaniesPage />,
          loader: async () => {
            try {
              /**
               * Responses
               */
              const companiesResponse = await axiosClient.get(
                "/api/v1/chairperson/companies"
              );

              /**
               * Variables
               */
              const initial_companies = companiesResponse.data;

              /**
               * Return
               */
              return { initial_companies };
            } catch (error) {
              console.log(error);
              return {
                initial_companies: [],
              };
            }
          },
        },
        {
          path: ":company_id",
          element: <ChairpersonCompanyPage />,
        },
      ],
    },
    {
      path: "students",
      element: <ManageStudentsPage authorizeRole={"chairperson"} />,
    },
    {
      path: "test/students",
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
          const coordinatorsResponse = await axiosClient.get(
            `/api/v1/users/coordinators/${currentProgramIdResponse.data}`
          );

          /**
           * Variables
           */
          const initial_students = studentResponse.data;
          const current_program_id = currentProgramIdResponse.data;
          const list_of_coordinators = coordinatorsResponse.data;

          // console.log(initial_students);
          /**
           * Return
           */
          return {
            initial_students,
            current_program_id,
            list_of_coordinators,
          };
        } catch (error) {
          console.log(error);
          return {
            initial_students: [],
            current_program_id: 0,
            coordinators: [],
          };
        }
      },
    },
    {
      path: "test",
      element: <PDFFile />,
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
