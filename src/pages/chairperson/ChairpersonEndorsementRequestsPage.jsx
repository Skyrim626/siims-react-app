import React from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import Table from "../../components/tables/Table";

const ChairpersonEndorsementRequestsPage = () => {
  // Fetch endorsement letter requests
  const endorsementLetterRequests = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();

  // console.log(endorsementLetterRequests);

  // Navigate to letter request
  const handleView = (id) => {
    // console.log(id);
    // console.log(location.pathname);

    navigate(`${location.pathname}/${id}`);
  };

  return (
    <Page>
      <Section>
        <Heading level={3} text={"Endorsement Letter Requests"} />
        <Text className="text-sm text-blue-950">
          This is where you manage the endorsement letter requests.
        </Text>
        <hr className="my-3" />
      </Section>

      {/* Table */}
      <Table data={endorsementLetterRequests} handleView={handleView} />
    </Page>
  );
};

export default ChairpersonEndorsementRequestsPage;
