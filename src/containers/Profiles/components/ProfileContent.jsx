import React from "react";
import StudentSideProfileInfo from "../../../components/profiles/StudentSideProfileInfo";
import Text from "../../../components/common/Text";
import { formatDateOnly } from "../../../utils/formatDate";

const ProfileContent = ({ profile }) => {
  return (
    <div className="mt-6 px-6 flex flex-col gap-7 bg-white py-3">
      {/* Side Profile Info of Student */}
      <div className="col-span-3 no-page-break">
        <StudentSideProfileInfo profile={profile} />
      </div>

      <div className="col-span-3 flex flex-col gap-10 no-page-break">
        {/* About Me */}
        {profile.about_me && (
          <section className="border-b-2 border-b-gray-900 pb-5">
            <div className="flex gap-3 items-center">
              {/* Blank BG Space */}
              <div className="h-10 w-3/12 bg-gray-900"></div>
              <Text className="text-xl font-bold">About Me</Text>
            </div>

            <div className="mt-3 text-justify">
              <Text className="text-sm">{profile.about_me}</Text>
            </div>
          </section>
        )}

        {/* Work Experiences */}
        {profile.work_experiences && profile.work_experiences.length > 0 && (
          <section className="border-b-2 border-b-gray-900 pb-5">
            <div className="flex gap-3 items-center">
              {/* Blank BG Space */}
              <div className="h-10 w-3/12 bg-gray-900"></div>
              <Text className="text-xl font-bold">Work Experiences</Text>
            </div>

            <div className="mt-5 flex flex-col gap-5">
              {profile.work_experiences.map((workExperience, index) => (
                <div key={index} className="flex items-start gap-5">
                  {/* Dates */}
                  <div className="flex-shrink-0 w-[17rem] text-sm text-gray-700 whitespace-nowrap font-bold">
                    {formatDateOnly(workExperience.start_date)} -{" "}
                    {formatDateOnly(workExperience.end_date)}
                  </div>

                  {/* Work Experience Content */}
                  <div className="flex flex-col flex-1">
                    <Text className="text-sm font-bold">
                      {workExperience.job_position} -{" "}
                      {workExperience.company_name}
                    </Text>
                    <Text className="text-sm text-gray-600">
                      {workExperience.full_address}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Educations */}
        {profile.educations && profile.educations.length > 0 && (
          <section className="border-b-2 border-b-gray-900 pb-5">
            <div className="flex gap-3 items-center">
              {/* Blank BG Space */}
              <div className="h-10 w-3/12 bg-gray-900"></div>
              <Text className="text-xl font-bold">Educations</Text>
            </div>

            <div className="mt-5 flex flex-col gap-5">
              {profile.educations.map((education, index) => (
                <div key={index} className="flex items-start gap-5">
                  {/* Dates */}
                  <div className="flex-shrink-0 w-[17rem] text-sm text-gray-700 whitespace-nowrap font-bold">
                    {formatDateOnly(education.start_date)} -{" "}
                    {formatDateOnly(education.end_date)}
                  </div>

                  {/* Work Experience Content */}
                  <div className="flex flex-col flex-1">
                    <Text className="text-sm font-bold">
                      {education.school_name}
                    </Text>
                    <Text className="text-sm text-gray-600">
                      {education.full_address}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certificates */}
        {profile.certificates && profile.certificates.length > 0 && (
          <section className="border-b-2 border-b-gray-900 pb-5">
            <div className="flex gap-3 items-center">
              {/* Blank BG Space */}
              <div className="h-10 w-3/12 bg-gray-900"></div>
              <Text className="text-xl font-bold">Certificates</Text>
            </div>

            <div className="mt-5 flex flex-col gap-5">
              <div className="mt-5 flex flex-col gap-5">
                {profile.certificates.map((certificate, index) => (
                  <div key={index} className="flex items-start gap-5">
                    {/* Dates */}
                    <div className="flex-shrink-0 w-[17rem] text-sm text-gray-700 whitespace-nowrap font-bold">
                      {formatDateOnly(certificate.issued_date)}
                    </div>

                    {/* Work Experience Content */}
                    <a
                      className="flex items-center gap-3 font-bold text-blue-500 border-b border-b-transparent hover:border-b-blue-500"
                      href={certificate.file_path}
                      target="_blank"
                    >
                      {certificate.name}
                      <Eye size={18} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProfileContent;
