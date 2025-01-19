import React, { useEffect, useState } from "react";
import Page from "../../components/common/Page";
import Loader from "../../components/common/Loader";
import { getRequest } from "../../api/apiHelpers";
import { useParams } from "react-router-dom";

const ViewEndorsementRequestPage = ({ authorizeRole }) => {
  // Open Params
  const { endorsementLetterRequestId } = useParams();

  // Container State
  const [endorsementLetterRequest, setEndorsementLetterRequest] = useState({});

  // Loading State
  const [loading, setLoading] = useState(false);

  // Use Effect
  useEffect(() => {
    fetchEndorsementDetails();
  }, []);

  // Fetch Endorsement details
  const fetchEndorsementDetails = async () => {
    // Set Loading State
    setLoading(true);

    try {
      const response = await getRequest({
        url: `/api/v1/v2/endorsement-letter-requests/${endorsementLetterRequestId}`,
      });

      if (response) {
        // console.log(response);
        setEndorsementLetterRequest(response);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Loader loading={loading} />

      <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Endorsement Request Details
          </h1>
        </div>

        {/* Request Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {endorsementLetterRequest.job_title && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Job Title</h2>
              <p className="text-gray-600">
                {endorsementLetterRequest.job_title}
              </p>
            </div>
          )}

          {endorsementLetterRequest.company && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Company</h2>
              <p className="text-gray-600">
                {endorsementLetterRequest.company}
              </p>
            </div>
          )}

          {endorsementLetterRequest.office && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Office</h2>
              <p className="text-gray-600">{endorsementLetterRequest.office}</p>
            </div>
          )}

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
            <p className="text-gray-600 font-bold">
              {endorsementLetterRequest.name} (
              {endorsementLetterRequest.student_id})
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Date Requested
            </h2>
            <p className="text-gray-600">
              {endorsementLetterRequest.created_at}
            </p>
          </div>
        </div>

        {/* Endorsed Students */}
        {endorsementLetterRequest.endorse_students &&
        endorsementLetterRequest.endorse_students.length > 0 ? (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Other Students to Endorse
            </h2>
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
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </Page>
  );
};

export default ViewEndorsementRequestPage;
