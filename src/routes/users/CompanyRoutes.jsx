import { Navigate, Outlet } from "react-router-dom";
import CompanyLayout from "../../components/layouts/CompanyLayout";
import CompanyHomePage from "../../pages/company/CompanyHomePage";
import ProtectedRoute from "../handlers/ProtectedRoute";
import CompanyManageOfficesPage from "../../pages/company/CompanyManageOfficesPage";
import CompanyProfilePage from "../../pages/company/CompanyProfilePage";
import CompanyAddOfficePage from "../../pages/company/CompanyAddOfficePage";
import CompanyOfficePage from "../../pages/company/CompanyOfficePage";
import CompanyEditOfficePage from "../../pages/company/CompanyEditOfficePage";
import CompanyManageSupervisorsPage from "../../pages/company/CompanyManageSupervisorsPage";
import axiosClient from "../../api/axiosClient";
import CompanyManageWorkPostsPage from "../../pages/company/CompanyManageWorkPostsPage";
import CompanyAddWorkPostPage from "../../pages/company/CompanyAddWorkPostPage";
import CompanyEditWorkPostPage from "../../pages/company/CompanyEditWorkPostPage";
import CompanyManageApplicantsPage from "../../pages/company/CompanyManageApplicantsPage";
import CompanyAcceptanceLetterPage from "../../pages/company/CompanyAcceptanceLetterPage";
import CompanyManageApplicantPage from "../../pages/company/CompanyManageApplicantPage";
import ViewActiveStudentsPage from "../../pages/ViewActiveStudentsPage";
import ViewDtrPage from "../../pages/ViewDtrPage";
import ManageSupervisorsPage from "../../pages/ManageSupervisorsPage";
import ViewCompanyProfilePage from "../../pages/profiles/ViewCompanyProfilePage";
import EditCompanyProfilePage from "../../pages/profiles/EditCompanyProfilePage";
import EditProfilePage from "../../pages/profiles/EditProfilePage";
import ManageOfficesPage from "../../pages/ManageOfficesPage";
import ManageApplicantsPage from "../../pages/ManageApplicantsPage";
import ViewProfilePage from "../../pages/profiles/ViewProfilePage";

import ManageApplicantPage from "../../pages/ManageApplicantPage";
import ViewReportsPage from "../../pages/ViewReportsPage";
import ViewWarPage from "../../pages/ViewWarPage";
import ManageWorkPostsPage from "../../pages/ManageWorkPostsPage";

import HomeRemotePage from "../../pages/remotes/HomeRemotePage";

import WorkPostsRemotePage from "../../pages/remotes/WorkPostsRemotePage";

// Routes for Company
const CompanyRoutes = {
  path: "company",
  element: (
    <ProtectedRoute roleAllowed={"company"}>
      <CompanyLayout />
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
      path: "home",
      element: <Navigate to={"/company"} />,
    },
    /* {
      index: true,
      element: <CompanyHomePage />,
    }, */
    {
      index: true,
      element: <HomeRemotePage authorizeRole={"company"} />,
    },
    {
      path: "profile",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <ViewCompanyProfilePage authorizeRole={"company"} />,
        },
        {
          path: "edit",
          element: <EditProfilePage authorizeRole={"company"} />,
        },

        /*  {
          path: "edit",
          element: <EditCompanyProfilePage authorizeRole={"company"} />,
        }, */
      ],
    },

    {
      path: "test/profile",
      element: <CompanyProfilePage />,
    },
    // Interns
    {
      path: "interns",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <ViewActiveStudentsPage />,
        },
        {
          path: "applications/:id/daily-time-records",
          element: <ViewDtrPage authorizeRole={"company"} />,
        },
      ],
    },
    {
      path: "work-posts",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <ManageWorkPostsPage authorizeRole={"company"} />,
        },
        {
          path: "edit/:id",
          element: <CompanyEditWorkPostPage />,
          loader: async ({ params }) => {
            try {
              const { id } = params;

              // console.log(id);
              // Get work post and work types response
              const workPostResponse = await axiosClient(
                `/api/v1/company/work-posts/${id}`
              );
              const workTypesResponse = await axiosClient("/api/v1/work-types");

              const work_post = workPostResponse.data;
              const work_types = workTypesResponse.data;

              // console.log(work_post);
              // console.log(work_types);

              return { work_post, work_types };
            } catch (error) {
              console.error(
                "Error fetching programs and chairpersons: ",
                error
              );
              throw error; // Let the router handle errors
            }
          },
        },

        {
          path: "add",
          element: (
            <WorkPostsRemotePage authorizeRole={"company"} method={"add"} />
          ),
        },
        {
          path: "test/add",
          element: <CompanyAddWorkPostPage />,
          loader: async () => {
            try {
              /**
               * Responses
               */
              // Get work_types and offices
              const officesResponse = await axiosClient.get(
                "/api/v1/company/offices"
              );
              const workTypesResponse = await axiosClient.get(
                "/api/v1/work-types"
              );

              /**
               * Variables
               */
              // console.log(officesResponse.data);
              const offices = officesResponse.data;
              const work_types = workTypesResponse.data;

              // console.log(offices);
              // console.log(work_types);
              /**
               * Return
               */
              return { offices, work_types };
            } catch (error) {
              console.error("Error fetching offices and work types: ", error);
              return {
                offices: [],
                work_types: [],
              };
            }
          },
        },
      ],
    },
    // Work Posts
    {
      path: "test/work-posts",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <CompanyManageWorkPostsPage />,
          loader: async () => {
            try {
              const response = await axiosClient.get(
                "/api/v1/company/work-posts"
              );

              const { initial_work_posts, work_types } = response.data;

              // console.log(initial_work_posts);

              return { initial_work_posts, work_types };
            } catch (error) {
              console.error("Error fetching company and work posts: ", error);
              return {
                initial_work_posts: [],
                work_types: [],
              };
            }
          },
        },
        {
          path: "edit/:id",
          element: <CompanyEditWorkPostPage />,
          loader: async ({ params }) => {
            try {
              const { id } = params;

              // console.log(id);
              // Get work post and work types response
              const workPostResponse = await axiosClient(
                `/api/v1/company/work-posts/${id}`
              );
              const workTypesResponse = await axiosClient("/api/v1/work-types");

              const work_post = workPostResponse.data;
              const work_types = workTypesResponse.data;

              // console.log(work_post);
              // console.log(work_types);

              return { work_post, work_types };
            } catch (error) {
              console.error(
                "Error fetching programs and chairpersons: ",
                error
              );
              throw error; // Let the router handle errors
            }
          },
        },
        {
          path: "add",
          element: <CompanyAddWorkPostPage />,
          loader: async () => {
            try {
              /**
               * Responses
               */
              // Get work_types and offices
              const officesResponse = await axiosClient.get(
                "/api/v1/company/offices"
              );
              const workTypesResponse = await axiosClient.get(
                "/api/v1/work-types"
              );

              /**
               * Variables
               */
              // console.log(officesResponse.data);
              const offices = officesResponse.data;
              const work_types = workTypesResponse.data;

              // console.log(offices);
              // console.log(work_types);
              /**
               * Return
               */
              return { offices, work_types };
            } catch (error) {
              console.error("Error fetching offices and work types: ", error);
              return {
                offices: [],
                work_types: [],
              };
            }
          },
        },
      ],
    },
    // Offices
    {
      path: "offices",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <ManageOfficesPage authorizeRole={"company"} />,
        },
        {
          path: ":id",
          element: <CompanyOfficePage />,
          loader: async ({ params }) => {
            const { id } = params;
            const response = await axiosClient.get(
              `/api/v1/company/offices/${id}`
            );

            const {
              initial_office,
              supervisor_assigned,
              supervisors,
              work_posts,
            } = response.data;

            // console.log(initial_office);

            return {
              initial_office,
              supervisor_assigned,
              supervisors,
              work_posts,
            };
          },
        },
        {
          path: "add",
          element: <CompanyAddOfficePage />,
        },
        {
          path: "edit-office/:id",
          element: <CompanyEditOfficePage />,
          loader: async ({ params }) => {
            const { id } = params;
            const response = await axiosClient.get(
              `/api/v1/company/offices/${id}`
            );

            const { initial_office, office_types } = response.data;
            // console.log(initial_office);

            return { initial_office, office_types };
          },
        },
      ],
    },
    // Supervisors
    {
      path: "supervisors",
      element: <ManageSupervisorsPage authorizeRole={"company"} />,
    },
    {
      path: "reports",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <ViewReportsPage authorizeRole={"company"} />,
        },
        {
          path: ":id/daily-time-records",
          element: <ViewDtrPage authorizeRole={"company"} />,
        },
        {
          path: ":id/weekly-accomplishment-reports",
          element: <ViewWarPage authorizeRole={"company"} />,
        },
      ],
    },
    // Test Supervisors
    {
      path: "test/supervisors",
      element: <CompanyManageSupervisorsPage />,
    },
    // Applicants
    {
      path: "applicants",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <ManageApplicantsPage authorizeRole={"company"} />,
        },
        // Applicant ID
        {
          path: ":application_id",
          element: <Outlet />,
          children: [
            {
              index: true,
              element: <ManageApplicantPage authorizeRole={"company"} />,
            },
            {
              path: "generate-acceptance",
              element: <CompanyAcceptanceLetterPage />,
            },
          ],
        },
        //  Test Applicants ID
        {
          path: "test/:id",
          element: <Outlet />,
          children: [
            {
              index: true,
              element: <CompanyManageApplicantPage />,
              loader: async ({ params }) => {
                try {
                  /**
                   * Params
                   */
                  const { id } = params;

                  /**
                   * Response
                   */
                  const response = await axiosClient.get(
                    `/api/v1/company/applicants/${id}`
                  );

                  /**
                   * Variables
                   */
                  const { application, statuses } = response.data;

                  // console.log(application);
                  // console.log(statuses);

                  // console.log(applicant);

                  return { application, statuses };
                } catch (error) {
                  console.log(error);
                  return {
                    application: [],
                  };
                }
              },
            },
            {
              path: "generate-acceptance",
              element: <CompanyAcceptanceLetterPage />,
            },
          ],
        },
      ],
    },
    // Test Applicants
    {
      path: "test/applicants",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <CompanyManageApplicantsPage />,
          loader: async () => {
            try {
              /**
               * Response
               */
              const response = await axiosClient.get("/api/v1/applicants");

              /**
               * Variable
               * Check if response and data exist
               */
              const applicants = response.data;

              // Optionally, log if the response is empty
              if (applicants.length === 0) {
                console.warn("No applicants found.");
              }

              // console.log(applicants);

              return { applicants };
            } catch (error) {
              // Log the error in the console without breaking the client-side rendering
              console.error(
                "Error fetching applicants: ",
                error.response || error.message
              );

              // Return an empty array to ensure the application continues functioning smoothly
              return {
                applicants: [],
              };
            }
          },
        },
        {
          path: ":id",
          element: <Outlet />,
          children: [
            {
              index: true,
              element: <CompanyManageApplicantPage />,
              loader: async ({ params }) => {
                try {
                  /**
                   * Params
                   */
                  const { id } = params;

                  /**
                   * Response
                   */
                  const response = await axiosClient.get(
                    `/api/v1/company/applicants/${id}`
                  );

                  /**
                   * Variables
                   */
                  const { application, statuses } = response.data;

                  // console.log(application);
                  // console.log(statuses);

                  // console.log(applicant);

                  return { application, statuses };
                } catch (error) {
                  console.log(error);
                  return {
                    application: [],
                  };
                }
              },
            },
            {
              path: "generate-acceptance",
              element: <CompanyAcceptanceLetterPage />,
            },
          ],
        },
      ],
    },
    // Students View Profile
    {
      path: "profiles/:user_id",
      element: (
        <ViewProfilePage authorizeRole={"company"} viewingUser={"student"} />
      ),
    },
  ],
};

export default CompanyRoutes;
