import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Breadcrumb = ({ paths }) => {
  return (
    <nav className="bg-white py-4 px-5 rounded-b-sm shadow-sm border border-gray-300 text-sm">
      <ol className="flex items-center space-x-2">
        {paths.map((path, index) => (
          <li key={index} className="flex items-center">
            {index !== 0 && (
              <ChevronRight className="w-4 h-4 text-blue-500 mx-1" />
            )}
            {index === paths.length - 1 ? (
              <span className="font-semibold text-blue-700">{path.text}</span>
            ) : (
              <Link
                to={path.path}
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
              >
                {path.text}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
