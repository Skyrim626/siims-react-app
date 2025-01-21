import React from "react";

const LatestApplicationDetails = ({
  supervisor,
  company,
  office,
  workPost,
  workType,
}) => {
  return (
    <>
      {/* Latest Application Details */}
      <div className="font-semibold text-gray-700 mb-4 text-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Latest Application Details
        </h3>
        <ul className="text-sm space-y-3 mt-5">
          {[
            {
              label: "Company",
              value: company,
            },
            {
              label: "Office",
              value: office,
            },
            {
              label: "Supervisor",
              value: supervisor
                ? getFullName(
                    supervisor.first_name,
                    supervisor.middle_name,
                    supervisor.last_name
                  )
                : "No Supervisor",
            },
            {
              label: "Job Title",
              value: workPost,
            },
            {
              label: "Job Type",
              value: workType,
            },
          ].map((item, index) => (
            <li key={index} className="flex items-center">
              <span className="font-medium text-gray-700 w-32 capitalize">
                {item.label}
              </span>
              <span className="text-gray-800 capitalize">{item.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default LatestApplicationDetails;
