import React, { useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import Table from "../../components/tables/Table";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import { putRequest } from "../../api/apiHelpers";

const OsaManageApplicantsPage = () => {
  // Fetch applicants
  const { applicants } = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();

  // Loading State
  const [loading, setLoading] = useState(false);

  // View application
  const viewApplication = (id) => {
    // console.log(id);
    // console.log(location.pathname);

    navigate(`${location.pathname}/applications/${id}`);
  };

  // Update Student Status to Ready to Deploy
  const handleReadyToDeployBySelectedIds = async (selectedIds) => {
    //console.log(selectedIds); // Example output: Set { 2024301502 }
    // Set Loading
    setLoading(true);
    try {
      // Prepare payload
      const payload = {
        ids: Array.from(selectedIds), // Convert Set to array
      };

      // console.log(payload);

      // Call putRequest
      const response = await putRequest({
        url: "/api/v1/applications/mark-as-ready-to-deploy",
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
    <>
      <Page>
        <Loader loading={loading} />

        <Section>
          <Heading level={3} text={"Applicants"} />
          <Text className="text-sm text-blue-950">
            This is where you manage the applicants.
          </Text>
          <hr className="my-3" />
        </Section>

        {/* Table */}
        {applicants.length > 0 ? (
          <Table
            data={applicants}
            handleView={viewApplication}
            handleReadyToDeployBySelectedIds={handleReadyToDeployBySelectedIds}
          />
        ) : (
          <EmptyState
            title="No applicants available at the moment"
            message="Once activities are recorded, applicants will appear here."
          />
        )}
      </Page>
    </>
  );
};

export default OsaManageApplicantsPage;
