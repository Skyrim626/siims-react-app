import React from "react";
import Page from "../../components/common/Page";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import Table from "../../components/tables/Table";

const CoordinatorViewStudentApplications = () => {
  // Fetch student applications
  const { applications, student } = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();

  // console.log(student);

  const fullName = `${student.first_name} ${student.middle_name} ${student.last_name}`;

  // view applications
  const viewApplication = (id) => {
    // console.log(id);
    navigate(`${location.pathname}/${id}`);
  };

  return (
    <Page>
      <Section>
        <Heading level={3} text={`${fullName} applications`} />
        <Text className="text-sm text-blue-950">
          This is where you view {fullName}'s applications.
        </Text>
        <hr className="my-3" />
      </Section>

      {/* Table */}
      <Table data={applications} handleView={viewApplication} />
    </Page>
  );
};

export default CoordinatorViewStudentApplications;
