import React from "react";
import Text from "../common/Text";
import { Button } from "@headlessui/react";
import { Link } from "react-router-dom";

const WorkPost = ({ workPost, handleApplyClick, location, canApply }) => {
  return (
    <div
      key={workPost.id}
      className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Job Details */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {workPost.title}
        </h3>
        <Text className="text-gray-600 text-sm font-medium mb-2">
          {workPost.company_name}
        </Text>
        <Text className="text-gray-500 text-sm line-clamp-3 mb-4">
          {workPost.responsibilities}
        </Text>
        <div className="text-sm text-gray-500 space-y-1">
          <Text>
            <span className="font-semibold">Start Date:</span>{" "}
            {workPost.start_date}
          </Text>
          <Text>
            <span className="font-semibold">End Date:</span> {workPost.end_date}
          </Text>
        </div>
      </div>
      {/* Buttons */}
      <div className="bg-gray-100 px-5 py-4 flex justify-between items-center">
        <Button
          onClick={() => handleApplyClick(workPost.id)}
          className={`px-4 py-2 rounded-md font-medium text-white transition ${
            workPost.is_closed || !canApply
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={workPost.is_closed || !canApply}
        >
          Apply Now
        </Button>
        <Link
          to={`${location.pathname}/jobs/${workPost.id}`}
          className="px-4 py-2 rounded-md font-medium bg-gray-200 hover:bg-gray-300 text-gray-700"
        >
          View Job
        </Link>
      </div>
    </div>
  );
};

export default WorkPost;
