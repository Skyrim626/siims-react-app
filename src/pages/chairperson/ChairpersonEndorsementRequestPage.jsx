import React from "react";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import Page from "../../components/common/Page";

const ChairpersonEndorsementRequestPage = () => {
  const endorsementLetterRequest = useLoaderData();
  const location = useLocation();

  return (
    <Page>
      <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Endorsement Request Details
          </h1>
          <Link
            to="generate-endorsement-letter"
            state={{
              requested_by: endorsementLetterRequest.requested_by_full_name,
              endorse_students: endorsementLetterRequest.endorse_students,
            }}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Make Endorsement Letter
          </Link>
        </div>

        {/* Request Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Job Title</h2>
            <p className="text-gray-600">
              {endorsementLetterRequest.job_title}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Company</h2>
            <p className="text-gray-600">{endorsementLetterRequest.company}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Office</h2>
            <p className="text-gray-600">{endorsementLetterRequest.office}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Description</h2>
            <p className="text-gray-600">
              {endorsementLetterRequest.description ||
                "No description provided"}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Requested By
            </h2>
            <p className="text-gray-600">
              {endorsementLetterRequest.requested_by_full_name}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Date Requested
            </h2>
            <p className="text-gray-600">
              {new Date(
                endorsementLetterRequest.created_at
              ).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Endorsed Students */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Students to Endorse
          </h2>
          {endorsementLetterRequest.endorse_students &&
          endorsementLetterRequest.endorse_students.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-600">
                      Student ID
                    </th>
                    <th className="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-600">
                      Full Name
                    </th>
                    <th className="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-600">
                      Email
                    </th>
                    <th className="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-600">
                      Phone Number
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {endorsementLetterRequest.endorse_students.map(
                    (student, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        <td className="px-4 py-2 border border-gray-300 text-sm text-gray-700">
                          {student.student_id}
                        </td>
                        <td className="px-4 py-2 border border-gray-300 text-sm text-gray-700">
                          {student.full_name}
                        </td>
                        <td className="px-4 py-2 border border-gray-300 text-sm text-gray-700">
                          {student.email}
                        </td>
                        <td className="px-4 py-2 border border-gray-300 text-sm text-gray-700">
                          {student.phone_number}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No students to endorse.</p>
          )}
        </div>
      </div>
    </Page>
  );
};

export default ChairpersonEndorsementRequestPage;
