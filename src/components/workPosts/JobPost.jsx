import { Button } from "@headlessui/react";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getProfileImage } from "../../utils/imageHelpers";
import Text from "../common/Text";

const JobPost = ({ job, handleApplyClick, canApply }) => {
  // Open location and navigation
  const location = useLocation();
  const navigate = useNavigate();

  const [showFullQualification, setShowFullQualification] = useState(false);

  const toggleQualification = () => {
    setShowFullQualification(!showFullQualification);
  };

  const truncatedQualification =
    job.qualifications.length > 20
      ? `${job.qualifications.substring(0, 20)}...`
      : job.qualifications;

  // console.log(location.pathname);
  // console.log(job.company_id);

  return (
    <div className="group mx-2 mt-8 grid max-w-screen-md grid-cols-12 gap-6 rounded-lg border border-gray-300 bg-white p-6 shadow-sm transition hover:shadow-md sm:mx-auto">
      {/* Company Logo */}
      <div className="col-span-2 flex items-start">
        <div className="h-16 w-16 overflow-hidden rounded-lg border border-gray-200">
          <img
            src={getProfileImage(job.company_profile)}
            alt="company logo"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Job Details */}
      <div className="col-span-10 flex flex-col">
        <Link to={`${location.pathname}/companies/${job.company_id}`}>
          <h3 className="text-sm font-medium text-gray-600 hover:underline">
            {job.company_name}
          </h3>
        </Link>
        <div className="mt-1 flex items-start justify-between">
          <Link
            to={`${location.pathname}/jobs/${job.id}`}
            className="mb-1 text-lg font-semibold text-gray-800 hover:underline sm:text-xl"
          >
            {job.title}
          </Link>
          <p className="mb-3 px-3 py-2 rounded-full text-white font-semibold text-sm bg-gray-900 w-fit">
            {job.work_type}
          </p>
        </div>
        <p className="text-sm text-gray-700">
          {showFullQualification ? job.qualifications : truncatedQualification}{" "}
          <Button
            onClick={toggleQualification}
            className="text-blue-600 hover:underline"
          >
            {showFullQualification ? "View Less" : "View More"}
          </Button>
        </p>

        {/* Date and Work Details */}
        <div className="mt-4 grid grid-cols-2 gap-y-2 gap-x-4 text-sm font-medium text-gray-600">
          <div>
            <span className="block font-semibold text-gray-800">
              Start Date:
            </span>
            <span className="block bg-green-100 px-2 py-1 rounded text-green-900">
              {job.start_date}
            </span>
          </div>
          <div>
            <span className="block font-semibold text-gray-800">End Date:</span>
            <span className="block bg-red-100 px-2 py-1 rounded text-red-900">
              {job.end_date}
            </span>
          </div>
          <div>
            <span className="block font-semibold text-gray-800">
              Work Duration:
            </span>
            <span className="block bg-blue-100 px-2 py-1 rounded text-blue-900">
              {job.work_duration} hours
            </span>
          </div>
          <div>
            <span className="block font-semibold text-gray-800">
              Max Applicants:
            </span>
            <span className="block bg-yellow-100 px-2 py-1 rounded text-yellow-900">
              {job.max_applicants}
            </span>
          </div>
        </div>

        {/* Skills */}
        {/* <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-800">
            Skills Required:
          </h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {job.skills ? (
              job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white">
                {" "}
                None
              </span>
            )}
          </div>
        </div> */}

        {/* Actions */}
        <div className="mt-6 flex space-x-4">
          <Button
            onClick={() => navigate(`${location.pathname}/jobs/${job.id}`)}
            className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            View Details
          </Button>
          <Button
            onClick={() => handleApplyClick(job.id)}
            className={`w-full sm:w-auto px-6 py-3 rounded-md font-medium text-white transition ${
              job.is_closed || !canApply
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={job.is_closed || !canApply}
          >
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobPost;
