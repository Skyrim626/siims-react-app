import React from "react";
import { useLoaderData } from "react-router-dom";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Text from "../../components/common/Text";
import Heading from "../../components/common/Heading";
import Card from "../../components/common/Card";
import DocumentSection from "../../components/applications/DocumentSection";

const CoordinatorViewStudentApplication = () => {
  // Fetch Application
  const { application } = useLoaderData();

  const {
    id,
    student_id,
    status_type_id,
    step,
    remarks,
    applied_date,
    document_submissions,
    work_post,
  } = application;

  // Document status mapping
  const statusMapping = {
    1: "Pending",
    7: "Incomplete",
    2: "Approved",
    3: "Rejected",
    // Add other statuses here as necessary
  };

  return (
    <Page>
      {/* Application Header */}
      <Section className="bg-gradient-to-r from-indigo-100 via-blue-50 to-blue-100 rounded-lg shadow-md p-8 mb-6 mt-6">
        <Heading
          level={3}
          text={`Student Application #${id}`}
          className="text-indigo-900 font-bold"
        />
        <Text className="text-sm text-gray-700 mt-1">
          Applied Date: {new Date(applied_date).toLocaleString()}
        </Text>
        <div className="mt-4 flex items-center gap-3">
          <span className="text-sm font-medium text-indigo-900">
            Status: Step {step}
          </span>
          <span className="px-3 py-1 rounded-full bg-indigo-200 text-indigo-800 text-xs font-semibold">
            {remarks}
          </span>
        </div>
      </Section>

      {/* Student Information */}
      <Section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <Heading
          level={4}
          text="Student Information"
          className="text-gray-800 font-semibold"
        />
        <div className="mt-4 space-y-2">
          <Text>
            <span className="font-medium text-gray-700">Student ID:</span>{" "}
            {student_id}
          </Text>
          <Text>
            <span className="font-medium text-gray-700">Status Type:</span>{" "}
            {status_type_id}
          </Text>
        </div>
      </Section>

      {/* Work Post Details */}
      <Section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <Heading
          level={4}
          text="Job Post Details"
          className="text-gray-800 font-semibold"
        />
        <div className="mt-4 space-y-3 flex flex-col">
          <Text>
            <span className="font-medium text-gray-700">Title:</span>{" "}
            {work_post.title}
          </Text>
          <Text>
            <span className="font-medium text-gray-700">Responsibilities:</span>{" "}
            {work_post.responsibilities}
          </Text>
          <Text>
            <span className="font-medium text-gray-700">Qualifications:</span>{" "}
            {work_post.qualifications}
          </Text>
          <Text>
            <span className="font-medium text-gray-700">Duration:</span>{" "}
            {work_post.work_duration}
          </Text>
          <Text>
            <span className="font-medium text-gray-700">Dates:</span>{" "}
            {work_post.start_date} to {work_post.end_date}
          </Text>
        </div>
      </Section>

      {/* Document Submissions */}
      {console.log(document_submissions)}
      <DocumentSection documents={document_submissions} role={"coordinator"} />

      {/* <Section>
        <Heading
          level={4}
          text="Document Submissions"
          className="text-gray-800 font-semibold"
        />
        <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
          {document_submissions.map((doc) => (
            <Card
              key={doc.id}
              className="transition-transform transform hover:scale-105 hover:shadow-lg border-gray-200"
            >
              <Heading
                level={5}
                text={doc.document_type.name}
                className="text-gray-800 font-medium"
              />
              <Text className="text-sm text-gray-700 mt-2">
                Status:{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    statusMapping[doc.doc_status_id] === "Pending"
                      ? "bg-green-200 text-green-800"
                      : statusMapping[doc.doc_status_id] === "Incomplete"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {statusMapping[doc.doc_status_id]}
                </span>
              </Text>
              <Text className="text-sm text-gray-700 mt-2">
                File Path:{" "}
                {doc.file_path ? (
                  <a
                    href={`${baseURL}/${doc.file_path}`}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Document
                  </a>
                ) : (
                  "Not uploaded"
                )}
              </Text>
              <Text className="text-sm text-gray-600 mt-2">
                Last Updated: {new Date(doc.updated_at).toLocaleString()}
              </Text>
            </Card>
          ))}
        </div>
      </Section> */}
    </Page>
  );
};

export default CoordinatorViewStudentApplication;
