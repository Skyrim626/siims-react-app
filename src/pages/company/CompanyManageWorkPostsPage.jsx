import React, { useState } from "react";
import { useLoaderData, useNavigate, useLocation } from "react-router-dom";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import ManageHeader from "../../components/common/ManageHeader";
import CompanyWorkPostsTable from "../../components/users/company/table/CompanyWorkPostsTable";
import { UserRoundPlus } from "lucide-react";
import { Button } from "@headlessui/react";
import { deleteRequest } from "../../api/apiHelpers";
import Table from "../../components/tables/Table";
import EmptyState from "../../components/common/EmptyState";

const CompanyManageWorkPostsPage = () => {
  // Fetch initial_work_posts and work_types
  const { initial_work_posts, work_types } = useLoaderData();

  // Open navigate and location
  const navigate = useNavigate();
  const location = useLocation();

  // State for offices and form modal
  const [workPosts, setWorkPosts] = useState(initial_work_posts);
  const [isOpen, setIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);

  // NavigateTo work post
  const navigateToEditWorkPostPage = (workPost) => {
    // console.log(workPost);

    navigate(`${location.pathname}/edit/${workPost.id}`);
  };

  // Delete work post
  const deleteWorkPost = async (id) => {
    try {
      // console.log(id);

      // Make the DELETE request
      const response = await deleteRequest({
        url: `/api/v1/company/work-posts/${id}`,
      });

      setWorkPosts((prevWorkPosts) =>
        prevWorkPosts.filter((workPost) => workPost.id !== id)
      );
    } catch (error) {
      console.log(`Cannot delete a work post: `, error);
    }
  };

  // Navigate to CompanyAddWorkPostPage.jsx
  const navigateToAddWorkPostPage = () => {
    // console.log(`${location.pathname}/add`);

    navigate(`${location.pathname}/add`);
  };

  return (
    <Page>
      <Section>
        <Heading level={3} text={"Job Posts"} />
        <Text className="text-sm text-blue-950">
          This is where you manage the job posts.
        </Text>
        <hr className="my-3" />

        <div className="flex justify-end items-center">
          <div className="button-group | flex gap-2">
            <Button
              onClick={navigateToAddWorkPostPage}
              className="transition text-sm py-1 px-3 font-bold text-white flex items-center justify-center gap-2 border-2 rounded-md border-transparent ${
                bg-blue-500 hover:bg-blue-600
                }"
            >
              <UserRoundPlus size={15} />
              <Text>Add new work post</Text>
            </Button>
          </div>
        </div>

        {/* Table */}
        {workPosts.length > 0 ? (
          <Table
            data={workPosts}
            handleEdit={navigateToEditWorkPostPage}
            handleArchive={deleteWorkPost}
          />
        ) : (
          <EmptyState
            title="No work posts available at the moment"
            message="Once activities are recorded, work posts will appear here."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            }
          />
        )}

        {/* <CompanyWorkPostsTable
          data={workPosts}
          handleEdit={navigateToEditWorkPostPage}
          handleArchive={deleteWorkPost}
        /> */}
      </Section>
    </Page>
  );
};

export default CompanyManageWorkPostsPage;
