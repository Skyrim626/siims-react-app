import React from "react";
import Page from "../../components/common/Page";
import Loader from "../../components/common/Loader";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import { Button } from "@headlessui/react";
import { HelpCircle } from "lucide-react";
import RoleBasedView from "../../components/common/RoleBasedView";
import SettingsContainer from "./components/SettingsContainer";

const StudentPresenter = ({
  authorizeRole,
  loading,
  /** Modal Props */
  isHelpOpen,
  setIsHelpOpen,
}) => {
  return (
    <Page className={`${authorizeRole !== "admin" ? "px-4" : ""}`}>
      <Loader loading={loading} />

      <Section>
        <div className="flex justify-between items-center">
          <RoleBasedView roles={["dean", "chairperson"]}>
            <div>
              <Heading level={3} text="Manage Students" />
              <Text className="text-md text-blue-950">
                This is where you manage the students.
              </Text>
            </div>
          </RoleBasedView>

          <div>
            <Button
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
              onClick={() => setIsHelpOpen(!isHelpOpen)}
            >
              <HelpCircle size={25} />
            </Button>
          </div>
        </div>

        <hr className="my-3" />
      </Section>

      <div className="mt-3">
        <SettingsContainer authorizeRole={authorizeRole} />
      </div>
    </Page>
  );
};

export default StudentPresenter;
