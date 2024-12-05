import React, { useState } from "react";

const JobPost = ({
  jobTitle,
  company,
  description,
  startDate,
  endDate,
  workDuration,
  maxApplicants,
  skills,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Set the truncation limit to 20 characters
  const truncatedDescription =
    description.length > 20
      ? description.substring(0, 20) + "..."
      : description;

  return (
    <div className="group mx-2 mt-10 grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-gray-700 shadow transition hover:shadow-lg sm:mx-auto bg-white">
      <a
        href="#"
        className="order-2 col-span-1 mt-4 -ml-14 text-left text-gray-600 hover:text-gray-700 sm:-order-1 sm:ml-4"
      >
        <div className="group relative h-16 w-16 overflow-hidden rounded-lg">
          <img
            src="/images/EC25KRDBo-K3w8GexNHSE.png"
            alt="company logo"
            className="h-full w-full object-cover text-gray-700"
          />
        </div>
      </a>
      <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
        <h3 className="text-sm text-gray-600">{company}</h3>
        <a
          href="#"
          className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl"
        >
          {jobTitle}
        </a>
        <p className="overflow-hidden pr-7 text-sm">
          {showFullDescription ? description : truncatedDescription}{" "}
          <button
            onClick={toggleDescription}
            className="text-sm text-blue-600 hover:underline mt-2"
          >
            {showFullDescription ? "View Less" : "View More"}
          </button>
        </p>

        <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
          <div>
            <div className="">
              Start Date:
              <span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">
                {startDate}
              </span>
            </div>
            <div className="">
              End Date:
              <span className="ml-2 mr-3 rounded-full bg-red-100 px-2 py-0.5 text-red-900">
                {endDate}
              </span>
            </div>
          </div>
          <div>
            <div className="">
              Work Duration (hours):
              <span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">
                {workDuration}
              </span>
            </div>
            <div className="">
              Max Applicants:
              <span className="ml-2 mr-3 rounded-full bg-yellow-100 px-2 py-0.5 text-yellow-900">
                {maxApplicants}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-700">
            Skills Required:
          </h4>
          <div className="mt-2 flex flex-wrap space-x-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="text-white text-xs px-3 py-1 rounded-full bg-blue-500"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Redesigned Buttons */}
        <div className="mt-5 flex space-x-4">
          <button className="px-5 py-2 text-sm text-white bg-gray-800 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition">
            View Details
          </button>
          <button className="px-5 py-2 text-sm text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobPost;
