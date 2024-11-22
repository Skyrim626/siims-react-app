import React from "react";
import { useLoaderData } from "react-router-dom";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import Table from "../../components/tables/Table";

const SupervisorManageApplicants = () => {
  // Fetch applicants
  const applicants = useLoaderData();

  // console.log(applicants);

  return (
    <>
      <Page>
        <Section>
          <Heading level={3} text={"Applicants"} />
          <Text className="text-sm text-blue-950">
            This is where you manage the applicants.
          </Text>
          <hr className="my-3" />
        </Section>

        {/* Table */}
        <Table data={applicants} />
      </Page>
    </>
  );
};

export default SupervisorManageApplicants;
