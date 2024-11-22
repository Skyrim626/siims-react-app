import React from "react";
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

const CoordinatorViewStudentsPage = () => {
  // Fetch students
  const { students } = useLoaderData();

  // Open location and navigation
  const location = useLocation();
  const navigate = useNavigate();

  // View Student
  const handleView = (id) => {
    navigate(`${location.pathname}/${id}/applications`);
  };

  return (
    <Page>
      <Section>
        <Heading level={3} text={"Students"} />
        <Text className="text-sm text-blue-950">
          This is where you view your students.
        </Text>
        <hr className="my-3" />
      </Section>

      {/* Table */}
      <Table data={students} handleView={handleView} />
    </Page>
  );
};

export default CoordinatorViewStudentsPage;
