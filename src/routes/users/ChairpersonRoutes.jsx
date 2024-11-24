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
                "/api/v1/chairperson/endorsement-letter-requests"
              );

              /**
               * Variable Storage
               */
              const endorsementRequests = response.data;

              return endorsementRequests;
            } catch (error) {
              console.log(error);
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
                  // Fetch ID
                  const { endorsementLetterRequestId } = params;

                  // Fetch Response
                  const response = await axiosClient.get(
                    `/api/v1/chairperson/endorsement-letter-requests/${endorsementLetterRequestId}`
                  );

                  /**
                   * Variable Storage
                   */
                  const endorsementLetterRequest = response.data;

                  // console.log(endorsementLetterRequest);

                  return endorsementLetterRequest;
                } catch (error) {
                  console.log(error);
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
