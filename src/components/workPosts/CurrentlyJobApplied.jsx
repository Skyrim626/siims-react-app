import { Button } from "@headlessui/react";
import React from "react";

const CurrentlyJobApplied = ({
  currently_applied_work_post,
  handleWithdrawClick,
  navigateToApplication,
  status,
  navigateToJobDetails,
}) => {
  return (
    <div className="container mx-auto mb-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Currently Applied Job
      </h2>
      <div
        key={currently_applied_work_post.id}
        className="bg-white shadow-md rounded-lg p-6 transition-all transform hover:scale-105 duration-300"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          {currently_applied_work_post.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          <span className="font-semibold">Responsibilities:</span>{" "}
          {currently_applied_work_post.responsibilities}
        </p>
        <div className="flex flex-col space-y-2 mb-4">
          <p className="text-sm text-gray-500">
            <span className="font-semibold">Start Date:</span>{" "}
            {new Date(
              currently_applied_work_post.start_date
            ).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-semibold">End Date:</span>{" "}
            {new Date(
              currently_applied_work_post.end_date
            ).toLocaleDateString()}
          </p>
        </div>

        {/* Actions */}
        <div className="flex space-x-4 mt-4">
          <Button
            onClick={() => handleWithdrawClick(currently_applied_work_post.id)}
            disabled={[10, 11, 12].includes(status)}
            className={`w-full sm:w-auto py-2 px-6 rounded-md text-white font-medium ${
              [10, 11, 12].includes(status)
                ? "bg-gray-600"
                : "bg-red-600 hover:bg-red-700"
            } transition-all`}
          >
            Withdraw
          </Button>
          <Button
            onClick={navigateToApplication}
            className="w-full sm:w-auto py-2 px-6 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all"
          >
            View Application
          </Button>
          <Button
            onClick={navigateToJobDetails}
            className="w-full sm:w-auto py-2 px-6 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all"
          >
            View Job Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CurrentlyJobApplied;
