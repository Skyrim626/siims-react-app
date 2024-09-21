import React, { useEffect, useState } from "react";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import DeanManageHeader from "../../components/users/dean/DeanManageHeader";
import { getRequest } from "../../api/apiHelpers";
import DeanCompaniesTable from "../../components/users/dean/table/DeanCompaniesTable";

// Dean Companies Page
const DeanCompaniesPage = () => {
  // State
  const [companies, setCompanies] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Get Companies
  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await getRequest({
        url: "/api/v1/dean/companies",
      });

      // Set
      setCompanies(response);
    };

    // Call
    fetchCompanies();
  }, []);

  return (
    <Page>
      <Section>
        <Heading level={3} text={"Companies"} />
        <Text className="text-sm text-blue-950">
          This is where you manage companies.
        </Text>
        <hr className="my-3" />
      </Section>
      <DeanManageHeader
        addPlaceholder="Add New Company"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      {companies.length !== 0 && (
        <DeanCompaniesTable
          data={companies}
          searchPlaceholder="Search Companies"
        />
      )}

      {/* Add Company Form */}
    </Page>
  );
};

export default DeanCompaniesPage;
