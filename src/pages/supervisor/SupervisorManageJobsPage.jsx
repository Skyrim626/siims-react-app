import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useLocation } from "react-router-dom"; // Import useNavigate for redirection
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import { Button, Input, Select } from "@headlessui/react";
import JobCard from "../../components/common/JobCard";
import { deleteRequest, getRequest } from "../../api/apiHelpers";

const SupervisorManageJobsPage = () => {
  // Initialize navigate and location
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve the programs data from the loader
  const { initial_work_posts, work_types } = useLoaderData();

  // console.log(initial_work_posts);
  // console.log(work_types);

  // Filter State
  const [jobType, setJobType] = useState("all");
  // Search State
  const [searchTerm, setSearchTerm] = useState("");

  // Filter Jobs
  const filteredJobs =
    initial_work_posts &&
    initial_work_posts
      .filter(
        (job) => jobType === "all" || job.work_type_id === parseInt(jobType)
      )
      .filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

  // Delete a work post
  const deleteWorkPost = async (id) => {
    // console.log(id);

    try {
      // console.log(id);

      // Make the DELETE request
      const response = await deleteRequest({
        url: `/api/v1/supervisor/work-posts/${id}`,
      });

      navigate(location.pathname);
    } catch (error) {
      console.log(`Cannot delete a program: `, error);
    }
  };

  return (
    <Page>
      {/* Header Section */}
      <Section>
        <Heading level={3} text={"Manage Jobs"} />
        <Text className="text-sm text-blue-950 mb-4">
          Add new job postings and manage existing job listings.
        </Text>
        <hr className="my-3" />
      </Section>

      {/* Add New Job Section */}
      <Section className="my-4 flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-md">
        <Heading level={4} text={"Add New Job"} />
        <Button
          onClick={() => navigate("/auth/supervisor/work-posts/add")} // Redirect on button click
          className="bg-blue-600 text-white hover:bg-blue-700 p-2 rounded-sm"
        >
          Create Job
        </Button>
      </Section>

      {/* Search Section */}
      <Section className="my-4">
        <Input
          type="text"
          placeholder="Search for a job..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </Section>

      {/* Job Type Filter */}
      <Section className="my-4 flex justify-between items-center">
        <div>
          <Text className="font-semibold">Filter by Job Type:</Text>
          <Select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 ml-2"
          >
            <option value="all">All</option>
            <option value="1">Internship</option>
            <option value="2">Immersion</option>
          </Select>
        </div>
      </Section>

      {/* Job Listings Section */}
      <Section>
        <Heading level={4} text={"Job Listings"} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} deleteWorkPost={deleteWorkPost} />
            ))
          ) : (
            <Text className="text-gray-600">
              No jobs available for the selected type.
            </Text>
          )}
        </div>
      </Section>
    </Page>
  );
};

export default SupervisorManageJobsPage;
