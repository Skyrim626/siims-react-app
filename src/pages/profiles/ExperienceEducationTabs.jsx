import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import React, { useState } from "react";
import WorkExperiencesLists from "./WorkExperiencesLists";
import EducationLists from "./EducationLists";

const ExperienceEducationTabs = () => {
  const [activeTab, setActiveTab] = useState("Work Experiences");

  return (
    <TabGroup
      onChange={(index) =>
        setActiveTab(index === 0 ? "Work Experiences" : "Educations")
      }
    >
      {/* Tab List */}
      <TabList className="flex space-x-4 border-b border-gray-300">
        <Tab
          className={({ selected }) =>
            `py-2 px-4 text-sm font-medium outline-none ${
              selected
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-600"
            }`
          }
        >
          Work Experiences
        </Tab>
        <Tab
          className={({ selected }) =>
            `py-2 px-4 text-sm font-medium outline-none ${
              selected
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-600"
            }`
          }
        >
          Educations
        </Tab>
      </TabList>

      {/* Tab Panels */}
      <TabPanels className="mt-3">
        <TabPanel>
          <WorkExperiencesLists />
        </TabPanel>
        <TabPanel>
          <EducationLists />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};

export default ExperienceEducationTabs;
