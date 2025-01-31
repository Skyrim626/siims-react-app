import React from "react";
import Page from "../../components/common/Page";
import Loader from "../../components/common/Loader";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";

const CollegePresenter = ({ loading }) => {
  return (
    <Page>
      <Loader loading={loading} />

      <Section>
        <Heading level={3} text="Manage Colleges" />
        <Text className="text-md text-blue-950">
          This is where you manage the colleges.
        </Text>
        <hr className="my-3" />
      </Section>
    </Page>
  );
};

export default CollegePresenter;
