import { Button } from "@headlessui/react";
import React, { useState } from "react";
import DailyEntriesContent from "../contents/DailyEntriesContent";
import WeeklyEntriesContent from "../contents/WeeklyEntriesContent";

const StudentContentModal = ({ student }) => {
  const [activeTab, setActiveTab] = useState("Profile"); // State to track the active tab

  // console.log(student);

  // Tab content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "Profile":
        return <p>Profile</p>;

      case "Applications":
        return <p>Applications</p>;

      case "Reports":
        return <p>Reports</p>;

      case "Daily Reports":
        return <DailyEntriesContent entries={student.daily_entries} />;

      case "Weekly Reports":
        return <WeeklyEntriesContent userID={student.id} />;

      case "Certificates":
        return <p>Certificates</p>;
    }
  };

  return (
    <div className="flex flex-col">
      {/* Tabs */}
      <div className="flex border-b mb-4">
        {[
          "Profile",
          "Applications",
          "Daily Reports" /* "Reports" */,
          "Weekly Reports",
          "Certificates",
        ].map((tab) => (
          <Button
            key={tab}
            className={`px-4 py-2 focus:outline-none ${
              activeTab === tab
                ? "border-b-2 border-blue-500 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      <div>{renderTabContent()}</div>
    </div>
  );
};

export default StudentContentModal;
