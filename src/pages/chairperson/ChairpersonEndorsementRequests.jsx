import React from "react";

// Import Components
import Section from "../../components/atoms/Section";
import Heading from "../../components/atoms/Heading";
import Table from "../../components/organisms/Table";
import DynamicTable from "../../components/organisms/DynamicTable";
import Page from "../../components/atoms/Page";

export default function ChairpersonEndorsementRequests() {
  return (
    <>
      <Page>
        <Section>
          <Heading level={2} text={"Endorsement Requests"} />
          <p>View coordinators endorsement letter requests for internship.</p>
        </Section>
        <Section>
          <DynamicTable
            enableSearch
            enableFilters
            filterLabels={["All", "Pending", "Rejected"]}
            data={[
              {
                id: 1,
                name: "John Doe",
                email: "john.doe@example.com",
                status: "Pending",
              },
              {
                id: 2,
                name: "Jane Smith",
                email: "jane.smith@example.com",
                status: "Approved",
              },
              {
                id: 3,
                name: "Alice Johnson",
                email: "alice.johnson@example.com",
                status: "Rejected",
              },
              {
                id: 4,
                name: "Bob Brown",
                email: "bob.brown@example.com",
                status: "Pending",
              },
              {
                id: 5,
                name: "Charlie Davis",
                email: "charlie.davis@example.com",
                status: "Approved",
              },
              // Add more data as needed to test pagination
            ]}
          />
        </Section>
      </Page>
    </>
  );
}
