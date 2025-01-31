import React from "react";
import DailyReportContainer from "./DailyReportContainer";
import WeeklyReportContainer from "./WeeklyReportContainer";
import { Button } from "@headlessui/react";

const ReportsPresenter = ({ activeTab, setActiveTab, authorizeRole }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Tab Navigation */}
        <div className="flex border-b-2 border-gray-200 mb-6">
          <Button
            className={`${
              activeTab === "daily"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            } pb-2 px-6 font-semibold transition duration-300`}
            onClick={() => setActiveTab("daily")}
          >
            Daily Reports
          </Button>
          <Button
            className={`${
              activeTab === "weekly"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            } pb-2 px-6 font-semibold transition duration-300`}
            onClick={() => setActiveTab("weekly")}
          >
            Weekly Reports
          </Button>
        </div>

        {/* Active Tab Content */}
        {activeTab === "daily" ? (
          <DailyReportContainer authorizeRole={authorizeRole} />
        ) : (
          <WeeklyReportContainer authorizeRole={authorizeRole} />
        )}
      </div>
    </div>
  );
};

export default ReportsPresenter;
