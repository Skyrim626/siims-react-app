// pages/ChairpersonUsersStudents.js
import React from "react";
import Page from "../../components/atoms/Page";
import Heading from "../../components/atoms/Heading";
import Section from "../../components/atoms/Section";

export default function ChairpersonUsersStudents() {
  return (
    <>
      <Page className="flex flex-col mt-10 justify-center">
        <Section className="mt-4 text-center">
          <Heading level={2} text={"STUDENT PAGE"} />
        </Section>
      </Page>
    </>
  );
}
