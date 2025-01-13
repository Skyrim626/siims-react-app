import React, { useState } from "react";
import Page from "../components/common/Page";
import Loader from "../components/common/Loader";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import Section from "../components/common/Section";
import SearchableDropdown from "../components/dropdowns/SearchableDropdown";

const ManageSectionsPage = ({ authorizeRole }) => {
  // Loading State
  const [loading, setLoading] = useState(false);

  // Row state
  const [rows, setRows] = useState([]);

  // Modal State
  const [isOpen, setIsOpen] = useState(false);

  // Check loading
  if (loading) {
    return <Loader loading={loading} />;
  }
  return (
    <Page>
      <Section>
        <Heading level={3} text="Manage Sections" />
        <Text className="text-md text-blue-950">
          This is where you manage the sections.
        </Text>
        <hr className="my-3" />
      </Section>

      <div>
        <SearchableDropdown />
      </div>
    </Page>
  );
};

export default ManageSectionsPage;
