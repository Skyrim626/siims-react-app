import { Tab, TabList } from "@headlessui/react";
import React from "react";

const CustomTabList = ({
  tabLinks,
  activeTab,
  setActiveTab,
  authorizeRole,
}) => {
  return (
    <TabList className="flex gap-4 mb-5 border-b border-gray-200">
      {tabLinks.map((tab, index) => {
        if (!tab.authorizeRoles.includes(authorizeRole)) {
          return null;
        }

        return (
          <Tab
            key={index}
            className={`px-3 text-sm/6 border-b-2 font-semibold focus:outline-none ${
              activeTab.name === tab.name
                ? "border-blue-600 text-blue-700" // Active tab style
                : "border-transparent text-gray-700" // Inactive tab style
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.name}
          </Tab>
        );
      })}
    </TabList>
  );
};

export default CustomTabList;
