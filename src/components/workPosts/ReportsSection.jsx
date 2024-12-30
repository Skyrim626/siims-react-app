import { Button } from "@headlessui/react";
import React from "react";

const ReportsSection = ({
  navigateToDtr,
  navigateToWeekly,
  navigateToInsights,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Reports</h2>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={navigateToDtr}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Manage Daily Time Records
        </Button>
        <Button
          onClick={navigateToWeekly}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Manage Weekly Reports
        </Button>
        <Button
          onClick={navigateToInsights}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
        >
          Personal Insights
        </Button>
      </div>
    </div>
  );
};

export default ReportsSection;
