import React from "react";
import { getProfileImage } from "../../utils/imageHelpers";
import { getFullName } from "../../utils/formatName";
import { formatDateOnly } from "../../utils/formatDate";

const ProfileSidebar = ({ profile }) => {
  return (
    <>
      {/* Profile Sidebar (Sticky) */}
      <div className="lg:w-1/4 w-full sticky top-4 h-fit">
        <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200">
          {/* Profile Header */}
          <div className="flex items-center space-x-6">
            <div className="w-30 h-30">
              <img
                src={getProfileImage(profile.profile_image_url)}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {getFullName(
                  profile.first_name,
                  profile.middle_name,
                  profile.last_name
                )}
              </h3>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-gray-800">
              Contact Information
            </h4>
            <ul className="mt-4 text-sm text-gray-600 space-y-3">
              <li className="flex items-center space-x-2">
                <span className="text-indigo-600">✉️</span>
                <a
                  href={`mailto:${profile.email || ""}`}
                  className="text-blue-600 hover:underline"
                >
                  {profile.email || "No email"}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-indigo-600">📞</span>
                <a
                  href={`tel:${profile.phone_number || ""}`}
                  className="text-blue-600 hover:underline"
                >
                  {profile.phone_number || "No Phone number"}
                </a>
              </li>
            </ul>
          </div>

          {/* Coordinator Contact Information */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-gray-800">
              Coordinator Information
            </h4>
            <ul className="mt-4 text-sm text-gray-600 space-y-3">
              <li className="flex items-center space-x-2">
                <span className="text-indigo-600">👤</span>
                <a
                  href={`mailto:${profile.coordinator_email || ""}`}
                  className="text-blue-600 hover:underline"
                >
                  {profile.coordinator_name || "No Coordinator"}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-indigo-600">✉️</span>
                <a
                  href={`mailto:${profile.coordinator_email || ""}`}
                  className="text-blue-600 hover:underline"
                >
                  {profile.coordinator_email || "No email"}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-indigo-600">📞</span>
                <a
                  href={`tel:${profile.coordinator_phone_number || ""}`}
                  className="text-blue-600 hover:underline"
                >
                  {profile.coordinator_phone_number || "No Phone number"}
                </a>
              </li>
            </ul>
          </div>

          {/* Work Experience */}
          {profile.work_experiences && profile.work_experiences.length > 0 && (
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-800">
                Work Experience
              </h4>
              <ul className="mt-4 text-sm text-gray-600 space-y-3">
                {profile.work_experiences.map((workExperience, index) => (
                  <li key={index}>
                    <strong className="text-gray-900">
                      {workExperience.job_position}
                    </strong>{" "}
                    - {workExperience.company_name}
                    <p className="text-xs text-gray-500">
                      {formatDateOnly(workExperience.start_date)} -{" "}
                      {formatDateOnly(workExperience.end_date)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Education */}
          {profile.educations && profile.educations.length > 0 && (
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-800">Education</h4>
              <ul className="mt-4 text-sm text-gray-600 space-y-3">
                {profile.educations.map((education, index) => (
                  <li key={index}>
                    <strong className="text-gray-900">
                      {education.school_name}
                    </strong>
                    <p className="text-xs text-gray-500">
                      {formatDateOnly(education.start_date)} -{" "}
                      {formatDateOnly(education.end_date)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;
