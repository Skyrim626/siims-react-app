import React from "react";
import EmptyState from "../common/EmptyState";
import { Button, Input } from "@headlessui/react";
import JobPost from "./JobPost";

const JobListsSection = ({
  jobPosts = [],
  activeTab,
  handleTabChange,
  searchQuery,
  handleSearchChange,
  handleApplyClick,
  canApply,
}) => {
  return (
    <>
      {jobPosts && jobPosts.length > 0 ? (
        <>
          <div className="lg:w-3/4 w-full">
            {/* Tabs for filtering job types */}
            <div className="flex space-x-4 border-b border-gray-300 pb-2">
              <Button
                onClick={() => handleTabChange("All Jobs")}
                className={`text-lg font-semibold ${
                  activeTab === "All Jobs" ? "text-blue-600" : "text-gray-600"
                }`}
              >
                All Jobs
              </Button>
              <Button
                onClick={() => handleTabChange("Internship")}
                className={`text-lg font-semibold ${
                  activeTab === "Internship" ? "text-blue-600" : "text-gray-600"
                }`}
              >
                Internship
              </Button>
              <Button
                onClick={() => handleTabChange("Immersion")}
                className={`text-lg font-semibold ${
                  activeTab === "Immersion" ? "text-blue-600" : "text-gray-600"
                }`}
              >
                Immersion
              </Button>
            </div>

            {/* Search Input */}
            <div className="mt-8 flex items-center space-x-4">
              <Input
                type="text"
                placeholder="Search job listings..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {/* Duplicate Job Posts for scrolling */}
            <div className="space-y-8">
              {jobPosts.map((post, index) => {
                return (
                  <JobPost
                    key={post.id}
                    job={post}
                    handleApplyClick={() => handleApplyClick(post.id)}
                    canApply={canApply}
                  />
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <EmptyState
            title="No jobs available at the moment"
            message="Once activities are recorded, jobs will appear here."
          />
        </>
      )}
    </>
  );
};

export default JobListsSection;
