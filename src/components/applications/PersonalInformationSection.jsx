import React from "react";
import { getStatusBgColor, getStatusColor } from "../../utils/statusColor";

const PersonalInformationSection = ({ application }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-blue-700">
        Personal Information
      </h2>
      <div className="space-y-2">
        <p>
          <strong>Name:</strong>{" "}
          {`${application.first_name} ${application.middle_name} ${application.last_name}`}
        </p>
        <p>
          <strong>Email:</strong> {application.email}
        </p>
        <p>
          <strong>Phone:</strong> {application.phone_number}
        </p>
        <p>
          <strong>Date of Birth:</strong> {application.date_of_birth}
        </p>
        <p>
          <strong>Program:</strong> {application.program}
        </p>
        <p>
          <strong>College:</strong> {application.college}
        </p>
      </div>
      <div className="flex items-center mt-6 space-x-2">
        <p className="text-xl font-semibold">Status: </p>
        <span
          className={`px-4 py-2 rounded-full ${getStatusColor(
            application.status
          )} text-lg font-bold ${getStatusBgColor(application.status)} `}
        >
          {application.status}
        </span>
      </div>
    </div>
  );
};

export default PersonalInformationSection;
