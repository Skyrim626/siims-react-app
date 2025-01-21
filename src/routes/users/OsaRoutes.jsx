import { Navigate, Outlet } from "react-router-dom";
import OsaLayout from "../../components/layouts/OsaLayout";
import ProtectedRoute from "../handlers/ProtectedRoute";
import OsaDashboardPage from "../../pages/osa/OsaDashboardPage";
import axiosClient from "../../api/axiosClient";
import OsaManageApplicantsPage from "../../pages/osa/OsaManageApplicantsPage";
import OsaManageApplicantApplication from "../../pages/osa/OsaManageApplicantApplication";
import OSAProfilePage from "../../pages/osa/OsaProfilePage";
import ManageApplicantsPage from "../../pages/ManageApplicantsPage";
import ManageApplicantPage from "../../pages/ManageApplicantPage";
import DocumentTypeContainer from "../../containers/DocumentTypes/DocumentTypeContainer";

// Routes for Dean
const OsaRoutes = {
  path: "osa",
  element: (
    <ProtectedRoute roleAllowed={"osa"}>
      {/* Protect routes to allow access only to osa role */}
      <OsaLayout /> {/* Render OsaLayout for the osa section */}
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
      index: true,
      element: <OsaDashboardPage />,
    },
    {
      path: "profile",
      element: <OSAProfilePage />,
    },
    {
      path: "applicants",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <ManageApplicantsPage authorizeRole={"osa"} />,
        },

        {
          path: ":application_id",
          element: <ManageApplicantPage authorizeRole={"osa"} />,
        },
      ],
    },
    {
      path: "test/applicants",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <OsaManageApplicantsPage />,
          loader: async () => {
            try {
              const response = await axiosClient.get("/api/v1/osa/applicants");

              const applicants = response.data;

              return { applicants };
            } catch (error) {
              console.error("Error fetching document types: ", error);

              return {
                applicants: [],
              };
            }
          },
        },
        {
          path: "applications/:applicationId",
          element: <OsaManageApplicantApplication />,
          loader: async ({ params }) => {
            try {
              /**
               * Params
               */
              const { applicationId } = params;

              /**
               * Response
               */
              const applicationResponse = await axiosClient.get(
                `/api/v1/osa/applications/${applicationId}`
              );
              const statusesReponse = await axiosClient.get(
                "/api/v1/statuses/document-statuses"
              );

              // console.log(applicationResponse);
              // console.log(statusesReponse);
              /**
               * Variables
               */
              const application = applicationResponse.data;
              const statuses = statusesReponse.data;

              return {
                application,
                statuses,
              };
            } catch (error) {
              console.log(error);
              console.error(error);
              throw error;
            }
          },
        },
      ],
    },
    {
      path: "document-types",
      element: <DocumentTypeContainer authorizeRole={"osa"} />,
    },
  ],
};

// Export Osa Routes for use in the application
export default OsaRoutes;
