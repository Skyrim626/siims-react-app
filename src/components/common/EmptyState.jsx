import React from "react";
import PropTypes from "prop-types";
import Text from "./Text";

const EmptyState = ({ icon, title, message, className }) => {
  return (
    <div className={`bg-white shadow rounded-lg p-6 text-center ${className}`}>
      <div className="flex justify-center items-center">
        {icon ? (
          <span className="h-16 w-16 text-gray-400 mx-auto">{icon}</span>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-400 mx-auto mb-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        )}
      </div>
      <div className="space-x-2">
        <Text className="text-gray-500 text-lg font-medium">{title}</Text>
        <Text className="text-gray-400 text-sm mt-2">{message}</Text>
      </div>
    </div>
  );
};
export default EmptyState;
