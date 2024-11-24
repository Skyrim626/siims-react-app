import React from "react";
import { useLoaderData } from "react-router-dom";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";

const SupervisorManageApplicantPage = () => {
  const applicant = useLoaderData();

  return (
    <Page>
      <div className="p-8 bg-gradient-to-br from-blue-50 via-white to-blue-100 shadow-lg rounded-lg max-w-6xl mx-auto">
        {/* Page Header */}
        <header className="mb-8">
          <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-lg shadow-md">
            <div>
              <h1 className="text-4xl font-bold">Applicant Overview</h1>
              <p className="mt-2 text-lg">
                Viewing application for{" "}
                <span className="font-semibold">
                  {`${applicant.student.user.first_name} ${applicant.student.user.last_name}`}
                </span>
              </p>
            </div>
            <div className="rounded-full bg-white p-3 shadow-md">
              <img
                src="/assets/avatar-placeholder.png"
                alt="Applicant Avatar"
                className="w-16 h-16 rounded-full"
              />
            </div>
          </div>
        </header>

        {/* Applicant Details */}
        <Section className="mb-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b-2 border-blue-500 pb-2">
            Applicant Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <p className="text-lg">
                <span className="font-medium text-blue-600">Name:</span>{" "}
                {`${applicant.student.user.first_name} ${applicant.student.user.middle_name} ${applicant.student.user.last_name}`}
              </p>
              <p className="text-lg">
                <span className="font-medium text-blue-600">Email:</span>{" "}
                {applicant.student.user.email}
              </p>
              <p className="text-lg">
                <span className="font-medium text-blue-600">Phone:</span>{" "}
                {applicant.student.user.phone_number}
              </p>
            </div>
            <div>
              <p className="text-lg">
                <span className="font-medium text-blue-600">Address:</span>{" "}
                {`${applicant.student.user.street}, ${applicant.student.user.barangay}, ${applicant.student.user.city_municipality}, ${applicant.student.user.province} ${applicant.student.user.postal_code}`}
              </p>
              <p className="text-lg">
                <span className="font-medium text-blue-600">Gender:</span>{" "}
                {applicant.student.user.gender}
              </p>
            </div>
          </div>
        </Section>

        {/* Job Details */}
        <Section className="mb-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b-2 border-indigo-500 pb-2">
            Job Information
          </h2>
          <div className="text-gray-700 space-y-4">
            <p className="text-lg">
              <span className="font-medium text-indigo-600">Title:</span>{" "}
              {applicant.work_post.title}
            </p>
            <p className="text-lg">
              <span className="font-medium text-indigo-600">
                Responsibilities:
              </span>{" "}
              {applicant.work_post.responsibilities}
            </p>
            <p className="text-lg">
              <span className="font-medium text-indigo-600">
                Qualifications:
              </span>{" "}
              {applicant.work_post.qualifications}
            </p>
            <p className="text-lg">
              <span className="font-medium text-indigo-600">
                Work Duration:
              </span>{" "}
              {applicant.work_post.work_duration}
            </p>
            <p className="text-lg">
              <span className="font-medium text-indigo-600">
                Application Dates:
              </span>{" "}
              {`${applicant.work_post.start_date} to ${applicant.work_post.end_date}`}
            </p>
          </div>
        </Section>

        {/* Application Status */}
        <Section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b-2 border-teal-500 pb-2">
            Application Status
          </h2>
          <div className="text-gray-700 space-y-4">
            <p className="text-lg">
              <span className="font-medium text-teal-600">Status:</span>{" "}
              {applicant.status_type_id === 1 ? "Pending" : "Processed"}
            </p>
            <p className="text-lg">
              <span className="font-medium text-teal-600">Step:</span>{" "}
              {applicant.step}
            </p>
            <p className="text-lg">
              <span className="font-medium text-teal-600">Remarks:</span>{" "}
              {applicant.remarks}
            </p>
            <p className="text-lg">
              <span className="font-medium text-teal-600">Applied Date:</span>{" "}
              {new Date(applicant.applied_date).toLocaleDateString()}
            </p>
          </div>
        </Section>
      </div>
    </Page>
  );
};

export default SupervisorManageApplicantPage;
