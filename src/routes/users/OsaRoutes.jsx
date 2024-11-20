import { Navigate } from "react-router-dom";
import OsaLayout from "../../components/layouts/OsaLayout";
import ProtectedRoute from "../handlers/ProtectedRoute";
import OsaDashboardPage from "../../pages/osa/OsaDashboardPage";
import OsaManageDocumentTypesPage from "../../pages/osa/OsaManageDocumentTypesPage";
import axiosClient from "../../api/axiosClient";
import OsaManageApplicantsPage from "../../pages/osa/OsaManageApplicantsPage";

// Routes for Dean
const OsaRoutes = {
  path: "osa",
  element: (
    <ProtectedRoute roleAllowed={"osa"}>
      {/* Protect routes to allow access only to osa role */}
      <OsaLayout /> {/* Render OsaLayout for the osa section */}
    </ProtectedRoute>
  ),
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
      path: "applicants",
      element: <OsaManageApplicantsPage />,
      loader: async () => {
        try {
          const response = await axiosClient.get("/api/v1/osa/applicants");

          const applicants = response.data;

          return applicants;
        } catch (error) {
          console.error("Error fetching document types: ", error);
          throw error; // Let the router handle errors
        }
      },
    },
    {
      path: "document-types",
      element: <OsaManageDocumentTypesPage />,
      loader: async () => {
        try {
          const response = await axiosClient.get("/api/v1/osa/document-types");
          const initial_document_types = response.data;
          // console.log(initial_document_types);
          return initial_document_types;
        } catch (error) {
          console.error("Error fetching document types: ", error);
          throw error; // Let the router handle errors
        }
      },
    },
  ],
};

// Export Osa Routes for use in the application
export default OsaRoutes;
