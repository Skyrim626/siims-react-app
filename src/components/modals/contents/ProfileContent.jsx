import React from "react";
import { getProfileImage } from "../../../utils/imageHelpers";
import {
  getDocumentStatusColor,
  getStudentStatusColor,
} from "../../../utils/statusColor";
import { formatDateOnly } from "../../../utils/formatDate";
import { Button } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import LatestApplicationDetails from "./details/LatestApplicationDetails";

const ProfileContent = ({
  location = "",
  student_id,
  name,
  email,
  phone_number,
  gender,
  address,
  college,
  program,
  created_at,
  age,
  date_of_birth,
  last_applied_at,
  status,
  profile_image_url,
  latest_application,
}) => {
  // Open Navigation
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      {/* Left Section: Profile */}
      <div className="bg-gradient-to-br from-blue-50 to-white p-6 border-r shadow-md rounded-xl">
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-lg font-semibold">
            <img
              src={getProfileImage(profile_image_url)}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
        {/* Attributes */}
        <ul className="text-sm space-y-3">
          {[
            {
              label: "Student No",
              value: (
                <span className="font-bold text-blue-500">{student_id}</span>
              ),
            },
            { label: "Name", value: name },
            { label: "Email", value: email },
            { label: "Phone Number", value: phone_number },
            { label: "Gender", value: gender },
            {
              label: "Address",
              value: address,
            },
            { label: "College", value: college },
            { label: "Program", value: program },
            { label: "Created At", value: created_at },
            { label: "Age", value: age },
            { label: "Date of Birth", value: date_of_birth },
            { label: "Last Applied At", value: last_applied_at },
            {
              label: "Status",
              value: (
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    getStudentStatusColor(status).textColor
                  } ${getStudentStatusColor(status).backgroundColor}`}
                >
                  {status}
                </span>
              ),
            },
          ].map((item, index) => (
            <li key={index} className="flex items-center">
              <span className="font-medium text-gray-700 w-32">
                {item.label}:
              </span>
              <span className="text-gray-800">{item.value}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-end justify-end">
          <Button
            onClick={() => navigate(`${location}/${student_id}`)}
            className="mt-5 px-3 py-2 rounded-sm bg-blue-500 hover:bg-blue-600 text-white text-sm"
          >
            View Profile
          </Button>
        </div>
      </div>

      {/* Right Section: Information */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        {latest_application ? (
          <>
            {/* Latest Application Details */}
            <LatestApplicationDetails
              supervisor={latest_application.work_post.office.supervisor}
              company={latest_application.work_post.office.company.name}
              office={latest_application.work_post.office.name}
              workPost={latest_application.work_post.title}
              workType={latest_application.work_post.work_type.name}
            />

            {/* Endorsement and Application Summary */}
            <div className="mb-6">
              <p className="font-bold text-lg mb-2">Summary</p>
              <ul className="text-sm space-y-2">
                <li className="flex items-center">
                  <span className="font-medium text-gray-700 w-48">
                    Total Applications Applied:
                  </span>
                  <span className="text-gray-800 font-bold">10</span>
                </li>
              </ul>
            </div>

            {/* Documents Table */}
            <div>
              <p className="font-bold text-lg mb-4">Documents</p>
              <table className="w-full text-sm text-left border border-gray-300 rounded-lg">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">Document</th>
                    <th className="py-2 px-4 border-b">File</th>
                    <th className="py-2 px-4 border-b">Status</th>
                    <th className="py-2 px-4 border-b">Submitted At</th>
                  </tr>
                </thead>
                <tbody>
                  {latest_application.document_submissions.length > 0 &&
                    latest_application.document_submissions.map(
                      (doc, index) => {
                        return (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b">{doc.id}</td>
                            <td className="py-2 px-4 border-b">
                              {doc.document_type.name}
                            </td>

                            <td className="py-2 px-4 border-b">
                              {doc.file_path && (
                                <a
                                  href={doc.file_path}
                                  target="_blank"
                                  className="text-blue-500 hover:underline"
                                >
                                  File
                                </a>
                              )}
                            </td>
                            <td className="py-2 px-4 border-b">
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium ${
                                  getDocumentStatusColor(
                                    doc.document_status.name
                                  ).textColor
                                } ${
                                  getDocumentStatusColor(
                                    doc.document_status.name
                                  ).backgroundColor
                                }`}
                              >
                                {doc.document_status.name}
                              </span>
                            </td>

                            <td className="py-2 px-4 border-b">
                              {formatDateOnly(doc.created_at)}
                            </td>
                          </tr>
                        );
                      }
                    )}
                </tbody>
              </table>

              <div className="flex items-center justify-end mt-6">
                <Button
                  onClick={() =>
                    navigate(
                      `${location}/applications/${latest_application.id}`
                    )
                  }
                  className="py-2 px-3 bg-blue-500 hover:bg-blue-600 text-white text-sm"
                >
                  View Application
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center h-full">
              <p className="font-bold text-xl text-gray-400">
                No Application Yet
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileContent;
