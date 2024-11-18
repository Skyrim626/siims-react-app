import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import Heading from "./Heading";
import Text from "./Text";
import { FaCalendarAlt, FaBriefcase, FaUsers } from "react-icons/fa";
import { Button } from "@headlessui/react";

const JobCard = ({ job = {}, deleteWorkPost = { deleteWorkPost } }) => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="bg-white p-6 rounded-sm shadow-lg transition-transform transform hover:scale-105">
      <Heading level={4} text={job.title} className="text-xl mb-2" />
      <div className="flex items-center mb-4">
        <FaBriefcase className="text-blue-500 mr-1" />
        <Text className="text-sm text-gray-600">
          Type: {job.work_type_name}
        </Text>
      </div>
      <div className="flex items-center mb-2">
        <FaCalendarAlt className="text-blue-500 mr-1" />
        <Text className="text-sm text-gray-500">
          Posted on: {job.created_at}
        </Text>
      </div>
      <div className="flex items-center mb-2">
        <FaUsers className="text-blue-500 mr-1" />
        <Text className="text-sm text-gray-600">
          Max Applicants: {job.max_applicants}
        </Text>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex space-x-2">
        <Button
          onClick={() => navigate(`/auth/supervisor/work-posts/edit/${job.id}`)} // Redirect to edit job page
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Edit
        </Button>
        <Button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
          View Applications
        </Button>
        <Button
          onClick={() => {
            deleteWorkPost(job.id);
          }}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
