import React from "react";
import { useLoaderData } from "react-router-dom";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Table from "../../components/tables/Table";
import Text from "../../components/common/Text";
import EmptyState from "../../components/common/EmptyState";

const ChairpersonViewCoordinatorPage = () => {
  // Fetch coordinators data
  const { coordinators } = useLoaderData();

  // console.log(coordinators);

  return (
    <Page>
      <Section>
        <Heading level={3} text={"View Coordinators"} />
        <Text className="text-sm text-blue-950">
          This is where you view the coordinators.
        </Text>
        <hr className="my-3" />

        {/* Table */}
        {coordinators.length > 0 ? (
          <Table data={coordinators} />
        ) : (
          <EmptyState
            title="No coordinators available at the moment"
            message="Once activities are recorded, coordinators will appear here."
          />
        )}
      </Section>
    </Page>
  );
};

export default ChairpersonViewCoordinatorPage;
