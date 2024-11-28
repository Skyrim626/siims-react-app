import React from "react";
import Text from "../common/Text";
import { Button } from "@headlessui/react";
import { Link } from "react-router-dom";

const WorkPost = ({ workPost, handleApplyClick, location, canApply }) => {
  return (
    <div
      key={workPost.id}
      className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Job Details Section */}
      <div className="p-6 space-y-4">
        {/* Job Title */}
        <h3 className="text-2xl font-semibold text-gray-900">
          {workPost.title}
        </h3>

        {/* Company */}
        <Text className="text-lg font-medium text-gray-700">
          {workPost.company}
        </Text>

        {/* Responsibilities Section */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-600">
            Responsibilities
          </h4>
          <Text className="text-sm text-gray-500 line-clamp-3">
            {workPost.responsibilities}
          </Text>
        </div>

        {/* Qualifications Section */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-600">
            Qualifications
          </h4>
          <Text className="text-sm text-gray-500 line-clamp-3">
            {workPost.qualifications}
          </Text>
        </div>

        {/* Dates Section */}
        <div className="flex justify-between text-sm text-gray-500">
          <Text>
            <span className="font-semibold">Start Date:</span>{" "}
            {workPost.start_date}
          </Text>
          <Text>
            <span className="font-semibold">End Date:</span> {workPost.end_date}
          </Text>
          <Text>
            <span className="font-semibold">Work Type:</span>{" "}
            {workPost.work_post_type}
          </Text>
        </div>

        {/* Office & Max Applicants */}
        <div className="flex justify-between text-sm text-gray-500">
          <Text className="flex-1">
            <span className="font-semibold">Office:</span> {workPost.office}
          </Text>
          <Text className="flex-1">
            <span className="font-semibold">Max Applicants:</span>{" "}
            {workPost.max_applicants}
          </Text>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="bg-gray-100 px-6 py-4 flex justify-between items-center space-x-4">
        <Button
          onClick={() => handleApplyClick(workPost.id)}
          className={`w-full sm:w-auto px-6 py-3 rounded-md font-medium text-white transition ${
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
          className="w-full sm:w-auto px-6 py-3 rounded-md font-medium bg-gray-200 hover:bg-gray-300 text-gray-700 text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default WorkPost;
