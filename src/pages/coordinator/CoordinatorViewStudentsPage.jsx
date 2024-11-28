import { useState } from "react";
import {
  Navigate,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import Table from "../../components/tables/Table";
import { putRequest } from "../../api/apiHelpers";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";

const CoordinatorViewStudentsPage = () => {
  // Fetch students
  const { students } = useLoaderData();

  // Open location and navigation
  const location = useLocation();
  const navigate = useNavigate();

  // Loading State
  const [loading, setLoading] = useState(false);

  // View Student
  const handleView = (id) => {
    navigate(`${location.pathname}/${id}/applications`);
  };

  // Update Student Status to Deployed
  const handleDeployBySelectedIds = async (selectedIds) => {
    //console.log(selectedIds); // Example output: Set { 2024301502 }
    setLoading(true);
    try {
      // Prepare payload
      const payload = {
        ids: Array.from(selectedIds), // Convert Set to array
      };

      // console.log(payload);

      // Call putRequest
      const response = await putRequest({
        url: "/api/v1/coordinator/students/deploy-students",
        data: payload,
      });

      //   successful response
      // console.log("Deployment successful:", response);

      if (response) {
        navigate(location.pathname);
      }
    } catch (error) {
      // Handle error response
      console.error(
        "Error during deployment:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Loader loading={loading} />
      <Section>
        <Heading level={3} text={"Students"} />
        <Text className="text-sm text-blue-950">
          This is where you view your students.
        </Text>
        <hr className="my-3" />
      </Section>

      {/* Table */}
      {students.length > 0 ? (
        <Table
          data={students}
          handleView={handleView}
          handleDeployBySelectedIds={handleDeployBySelectedIds}
        />
      ) : (
        <EmptyState
          title="No students available at the moment"
          message="Once activities are recorded, students will appear here."
        />
      )}
    </Page>
  );
};

export default CoordinatorViewStudentsPage;
