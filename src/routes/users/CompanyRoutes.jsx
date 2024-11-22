import { Navigate, Outlet } from "react-router-dom";
import CompanyLayout from "../../components/layouts/CompanyLayout";
import CompanyHomePage from "../../pages/company/CompanyHomePage";
import ProtectedRoute from "../handlers/ProtectedRoute";
import CompanyManageOfficesPage from "../../pages/company/CompanyManageOfficesPage";
import CompanyProfilePage from "../../pages/company/CompanyProfilePage";
import CompanyAddOfficePage from "../../pages/company/CompanyAddOfficePage";
import CompanyOfficePage from "../../pages/company/CompanyOfficePage";
import CompanyEditOfficePage from "../../pages/company/CompanyEditOfficePage";
import CompanyAddJobPage from "../../pages/company/CompanyAddJobPage";
import CompanyManageSupervisorsPage from "../../pages/company/CompanyManageSupervisorsPage";
import axiosClient from "../../api/axiosClient";
import CompanyManageWorkPostsPage from "../../pages/company/CompanyManageWorkPostsPage";
import CompanyAddWorkPostPage from "../../pages/company/CompanyAddWorkPostPage";
import CompanyEditWorkPostPage from "../../pages/company/CompanyEditWorkPostPage";
import CompanyManageApplicantsPage from "../../pages/company/CompanyManageApplicantsPage";
import CompanyAcceptanceLetterPage from "../../pages/company/CompanyAcceptanceLetterPage";


// Routes for Company
const CompanyRoutes = {
  path: "company",
  element: (
    <ProtectedRoute roleAllowed={"company"}>
      <CompanyLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: "home",
      element: <Navigate to={"/company"} />,
    },
    {
      index: true,
      element: <CompanyHomePage />,
    },
    {
      path: "profile",
      element: <CompanyProfilePage />,
    },
    {
      path: "work-posts",
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
              console.error(
                "Error fetching programs and chairpersons: ",
                error
              );
              throw error; // Let the router handle errors
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
              // Get work_types and offices
              const officesResponse = await axiosClient.get(
                "/api/v1/company/offices"
              );
              const workTypesResponse = await axiosClient.get(
                "/api/v1/work-types"
              );

              // console.log(officesResponse.data);
              const offices = officesResponse.data;
              const work_types = workTypesResponse.data;

              // console.log(offices);
              // console.log(work_types);

              return { offices, work_types };
            } catch (error) {
              console.error(
                "Error fetching programs and chairpersons: ",
                error
              );
              throw error; // Let the router handle errors
            }
          },
        },
      ],
    },
    {
      path: "offices",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <CompanyManageOfficesPage />,
          loader: async () => {
            const response = await axiosClient.get("/api/v1/company/offices");

            // console.log(response.data);

            const initial_offices = response.data;

            return initial_offices;
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
          path: ":id/add-job",
          element: <CompanyAddJobPage />,
        },
      ],
    },
    {
      path: "supervisors",
      element: <CompanyManageSupervisorsPage />,
    },
    {
      path: "applicants",
      element: <CompanyManageApplicantsPage />,
    },
    {
      path: "applicants/generate-acceptance",
      element: <CompanyAcceptanceLetterPage />,
    },
  ],
};

export default CompanyRoutes;
