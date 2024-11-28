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

const ChairpersonEndorsementRequestsPage = () => {
  // Fetch endorsement letter requests
  const { initial_endorsement_requests } = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();

  // Loading State
  const [loading, setLoading] = useState(false);

  // console.log(endorsementLetterRequests);

  // State
  const [endorsementRequests, setEndorsementRequests] = useState(
    initial_endorsement_requests
  );

  // Navigate to letter request
  const handleView = (id) => {
    // console.log(id);
    // console.log(location.pathname);

    navigate(`${location.pathname}/${id}`);
  };

  // Handle approval for Dean
  const handleApprovalForDean = async (selectedIds) => {
    // console.log(selectedIds);

    // Set loading state
    setLoading(true);
    // console.log(selectedIds);
    try {
      // Prepare payload containing the selected user IDs
      const payload = { ids: Array.from(selectedIds) };
      // console.log(payload);
      // Perform POST request to archive the selected users
      const response = await putRequest({
        url: "/api/v1/endorsement-letter-requests/mark-as-approval",
        data: payload,
        method: "post",
      });

      // console.log(response);
      // Check Response
      if (response) {
        setEndorsementRequests(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Loader loading={loading} />

      <Section>
        <Heading level={3} text={"Endorsement Letter Requests"} />
        <Text className="text-sm text-blue-950">
          This is where you manage the endorsement letter requests.
        </Text>
        <hr className="my-3" />
      </Section>

      {/* Table */}
      {endorsementRequests.length > 0 ? (
        <Table
          data={endorsementRequests}
          handleView={handleView}
          handleApprovalForDean={handleApprovalForDean}
        />
      ) : (
        <EmptyState
          title="No endorsement requests available at the moment"
          message="Once activities are recorded, endorsement requests will appear here."
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
    </Page>
  );
};

export default ChairpersonEndorsementRequestsPage;
