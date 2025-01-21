import { Download, Eye, Mail, Phone } from "lucide-react";
import Text from "../components/common/Text";
import AddressItem from "../components/profiles/AddressItem";
import StudentSideProfileInfo from "../components/profiles/StudentSideProfileInfo";
import { formatDateOnly } from "../utils/formatDate";

import "../print.css";

// TESTING
const testing = [
  {
    id: 1,
    name: "Certificate of Orientation",
    path: "https://www.npmjs.com/package/react-to-print",
  },
  {
    id: 2,
    name: "Transcript of Records",
    path: "https://www.typingtest.com/trainer/",
  },
];

// Render self main profile content (For Self)
export const renderSelfMainProfileContent = ({ authorizeRole, profile }) => {
  switch (authorizeRole) {
    case "dean":
      return (
        <div className="mt-6 px-6">
          {/* Contact Info */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Contact</h2>

            <AddressItem profile={profile} />

            <div className="flex items-center gap-4 text-gray-700 mb-3">
              <Mail size={20} className="text-blue-600" />
              <Text>
                <a
                  href={`mailto:${profile.email || "dean.email@example.com"}`}
                  className="text-blue-600 hover:underline"
                >
                  {profile.email || "dean.email@example.com"}
                </a>
              </Text>
            </div>
            <div className="flex items-center gap-4 text-gray-700">
              <Phone size={20} className="text-blue-600" />
              <Text>{profile.phone || "+63 912 345 6789"}</Text>
            </div>
          </div>
        </div>
      );
    case "chairperson":
      return (
        <div className="mt-6 px-6">
          {/* Contact Info */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Contact</h2>

            <AddressItem profile={profile} />

            <div className="flex items-center gap-4 text-gray-700 mb-3">
              <Mail size={20} className="text-blue-600" />
              <Text>
                <a
                  href={`mailto:${profile.email || `dean.email@example.com`}`}
                  className="text-blue-600 hover:underline"
                >
                  {profile.email || "dean.email@example.com"}
                </a>
              </Text>
            </div>
            <div className="flex items-center gap-4 text-gray-700">
              <Phone size={20} className="text-blue-600" />
              <Text>{profile.phone || "+63 912 345 6789"}</Text>
            </div>
          </div>
        </div>
      );
    case "coordinator":
      return (
        <div className="mt-6 px-6">
          {/* Contact Info */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Contact</h2>

            <AddressItem profile={profile} />

            <div className="flex items-center gap-4 text-gray-700 mb-3">
              <Mail size={20} className="text-blue-600" />
              <Text>
                <a
                  href={`mailto:${profile.email || `dean.email@example.com`}`}
                  className="text-blue-600 hover:underline"
                >
                  {profile.email || "dean.email@example.com"}
                </a>
              </Text>
            </div>
            <div className="flex items-center gap-4 text-gray-700">
              <Phone size={20} className="text-blue-600" />
              <Text>{profile.phone || "+63 912 345 6789"}</Text>
            </div>
          </div>
        </div>
      );
    case "supervisor":
      return (
        <div className="mt-6 px-6">
          {/* Contact Info */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Contact</h2>

            <AddressItem profile={profile} />

            <div className="flex items-center gap-4 text-gray-700 mb-3">
              <Mail size={20} className="text-blue-600" />
              <Text>
                <a
                  href={`mailto:${profile.email || `dean.email@example.com`}`}
                  className="text-blue-600 hover:underline"
                >
                  {profile.email || "dean.email@example.com"}
                </a>
              </Text>
            </div>
            <div className="flex items-center gap-4 text-gray-700">
              <Phone size={20} className="text-blue-600" />
              <Text>{profile.phone || "+63 912 345 6789"}</Text>
            </div>
          </div>
        </div>
      );
    case "student":
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
            {profile.work_experiences &&
              profile.work_experiences.length > 0 && (
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
  }
};

// Render main profile content (For Viewing)
export const renderMainProfileContent = ({ viewingUser, profile }) => {
  switch (viewingUser) {
    case "student":
      return (
        <div className="mt-6 px-6 grid grid-cols-4 gap-7 bg-white py-3">
          {/* Side Profile Info of Student */}
          <StudentSideProfileInfo profile={profile} />
          <div className="col-span-3 flex flex-col gap-10">
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
            {profile.work_experiences &&
              profile.work_experiences.length > 0 && (
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
          </div>
        </div>
      );
    default:
      /* Main Profile Content */
      return (
        <div className="mt-6 px-6">
          {/* Contact Info */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Contact</h2>

            <AddressItem profile={profile} />

            <div className="flex items-center gap-4 text-gray-700 mb-3">
              <Mail size={20} className="text-blue-600" />
              <Text>
                <a
                  href={`mailto:${profile.email || "dean.email@example.com"}`}
                  className="text-blue-600 hover:underline"
                >
                  {profile.email || "dean.email@example.com"}
                </a>
              </Text>
            </div>
            <div className="flex items-center gap-4 text-gray-700">
              <Phone size={20} className="text-blue-600" />
              <Text>{profile.phone || "+63 912 345 6789"}</Text>
            </div>
          </div>
        </div>
      );
  }
};
