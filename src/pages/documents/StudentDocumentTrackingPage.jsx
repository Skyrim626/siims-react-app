import React, { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import { getRequest } from "../../api/apiHelpers";
import { getDocumentStatusColor } from "../../utils/statusColor";

const StudentDocumentTrackingPage = () => {
  // Loading State
  const [loading, setLoading] = useState(false);

  // Container State
  const [documents, setDocuments] = useState([]);

  const [reports, setReports] = useState([]);

  // const [totalApplications, setTotalApplications] = useState(0);

  // Fetch documents
  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await getRequest({
        url: "/api/v1/trackings",
      });

      if (response) {
        console.log(response);
        setDocuments(response.documents);
        setReports(response.reports);
        // setTotalApplications(response.total_applications);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Use Effect
  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <>
      <Loader loading={loading} />

      <Section>
        <Heading level={3} text="Track Documents" />
        <Text className="text-md text-blue-950">
          This is where you track your documents from your latest application.
        </Text>
        <hr className="my-3" />

        {documents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-fixed w-full border-collapse border border-gray-300 mt-4">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left w-[5%]">
                    #
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left w-[30%]">
                    Document Type
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left w-[30%]">
                    File
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left w-[20%]">
                    Last Updated
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left w-[15%]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, index) => {
                  const { textColor, backgroundColor } = getDocumentStatusColor(
                    doc.status
                  ); // Get the styles
                  return (
                    <tr
                      key={doc.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                    >
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {doc.document_type}
                      </td>
                      <td className="overflow-hidden border border-gray-300 px-4 py-2">
                        <a
                          className="text-blue-500 hover:text-blue-600 underline"
                          href={doc.file_path}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {doc.file_path}
                        </a>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {doc.updated_at}
                      </td>
                      <td
                        className={`border border-gray-300 px-4 py-2 text-center ${textColor} ${backgroundColor}`}
                      >
                        {doc.status}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 mt-4">No documents found.</p>
        )}

        {reports.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-fixed w-full border-collapse border border-gray-300 mt-4">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left w-[5%]">
                    #
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left w-[30%]">
                    Report Type
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left w-[30%]">
                    File
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left w-[20%]">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody>
                {reports.map((doc, index) => {
                  return (
                    <tr
                      key={doc.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                    >
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {doc.name}
                      </td>
                      <td className="overflow-hidden border border-gray-300 px-4 py-2">
                        <a
                          className="text-blue-500 hover:text-blue-600 underline"
                          href={doc.file_path}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {doc.file_path}
                        </a>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {doc.created_at}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 mt-4">No reports found.</p>
        )}
      </Section>
    </>
  );
};

export default StudentDocumentTrackingPage;
