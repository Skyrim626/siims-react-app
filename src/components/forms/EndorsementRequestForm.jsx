import React, { useState } from "react";
import { Button, Input, Textarea } from "@headlessui/react";
import Heading from "../common/Heading";
import Text from "../common/Text";

/**
 * Endorsement Request Form Component
 *
 * @returns JSX Element
 */
const EndorsementRequestForm = ({
  // Input State
  description = "",
  studentIds = "",

  // Set State
  setDescription = () => {},
  setStudentIds = () => {},

  // Error State
  errors = {},

  // Handlers
  handleDescriptionChange = () => {},
  handleStudentIdsChange = () => {},
}) => {
  // Loop through and display student ID error messages
  const renderStudentIdErrors = () => {
    const studentIdErrors = [];

    Object.keys(errors).forEach((key) => {
      if (key.startsWith("student_ids")) {
        // Check if the error key corresponds to a student_id
        const studentIndex = key.match(/\d+/)[0]; // Extract student index (0, 1, 2, etc.)
        const errorMessages = errors[key];

        studentIdErrors.push(
          <div key={studentIndex} className="text-sm text-red-600">
            {errorMessages.map((message, index) => (
              <Text key={index}>{message}</Text>
            ))}
          </div>
        );
      }
    });

    return studentIdErrors;
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-lg space-y-6">
      {/* Description Section */}
      <div>
        <label
          htmlFor="description"
          className="block text-gray-800 font-medium mb-2"
        >
          Description
        </label>
        <Textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          rows="4"
          placeholder="Why do you need an endorsement letter?"
        />
      </div>

      {/* Student IDs Section */}
      <div>
        <label
          htmlFor="studentIds"
          className="block text-gray-800 font-medium mb-2"
        >
          Other Student IDs (Comma separated)
        </label>
        <Input
          id="studentIds"
          value={studentIds}
          onChange={handleStudentIdsChange}
          className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter student IDs, separated by commas. If you want to include other student"
        />
        <Text className="text-sm text-gray-500 mt-2">
          Example: 2024984645, 2024590290, 2024596462
        </Text>
      </div>
      {/* Render student ID error messages */}
      {renderStudentIdErrors()}
    </div>
  );
};

export default EndorsementRequestForm;
