import React from "react";
import RoleBasedView from "../../../components/common/RoleBasedView";
import StudentHeadProfileInfo from "./student/StudentHeadProfileInfo";
import Text from "../../../components/common/Text";
import WorkExperienceSection from "./student/WorkExperienceSection";
import EducationSection from "./student/EducationSection";
import CertificateContainer from "./student/CertificateContainer";

const MainContainer = ({ authorizeRole, profile = {} }) => {
  // console.log(profile.student);

  return (
    <div className="mt-6 px-6 flex flex-col gap-7 bg-white py-3">
      {/* Side Profile Info of Student */}
      <RoleBasedView roles={["student"]} authorizeRole={authorizeRole}>
        <StudentHeadProfileInfo profile={profile} />
      </RoleBasedView>

      <div className="col-span-3 flex flex-col gap-10">
        {profile?.student && profile.student.about_me && (
          <RoleBasedView roles={["student"]} authorizeRole={authorizeRole}>
            <section className="border-b-2 border-b-gray-900 pb-5">
              <div className="flex gap-3 items-center">
                {/* Blank BG Space */}
                <div className="h-10 w-3/12 bg-gray-900"></div>
                <Text className="text-xl font-bold">About Me</Text>
              </div>

              <div className="mt-3 text-justify">
                <Text className="text-sm">{profile.student?.about_me}</Text>
              </div>
            </section>
          </RoleBasedView>
        )}

        {/* Work Experiences */}
        {profile?.student && profile?.student?.work_experiences?.length > 0 && (
          <RoleBasedView roles={["student"]} authorizeRole={authorizeRole}>
            {profile.student?.work_experiences && (
              <WorkExperienceSection
                workExperiences={profile.student.work_experiences}
              />
            )}
          </RoleBasedView>
        )}

        {/* Educations */}
        {profile?.student && profile.student?.educations?.length > 0 && (
          <RoleBasedView roles={["student"]} authorizeRole={authorizeRole}>
            {profile.student?.educations && (
              <EducationSection educations={profile.student.educations} />
            )}
          </RoleBasedView>
        )}

        {/* Certificates */}
        <RoleBasedView roles={["student"]} authorizeRole={authorizeRole}>
          {profile.student?.certificates && (
            <CertificateContainer
              certificates={profile.student.certificates}
              student={profile.student}
            />
          )}
        </RoleBasedView>
      </div>
    </div>
  );
};

export default MainContainer;
