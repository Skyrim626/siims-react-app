import React from "react";
import { useLoaderData } from "react-router-dom";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Text from "../../components/common/Text";
import Table from "../../components/tables/Table";
import Heading from "../../components/common/Heading";
import EmptyState from "../../components/common/EmptyState";

const AdminViewLogsPage = () => {
  // Get Logs
  const { logs } = useLoaderData();

  return (
    <Page>
      <Section>
        <Heading level={3} text="System Logs" />
        <Text className="text-md text-blue-950">
          This is where you view the logs in the system.
        </Text>
        <hr className="my-3" />
      </Section>

      {logs && logs.length > 0 ? (
        <Table data={logs} />
      ) : (
        <EmptyState
          title="No logs available at the moment"
          message="Once activities are recorded, logs will appear here."
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

export default AdminViewLogsPage;
