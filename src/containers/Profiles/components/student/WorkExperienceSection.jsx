import React from "react";
import Text from "../../../../components/common/Text";
import { formatDateOnly } from "../../../../utils/formatDate";

const WorkExperienceSection = ({ workExperiences = [] }) => {
  return (
    <section className="border-b-2 border-b-gray-900 pb-5">
      <div className="flex gap-3 items-center">
        {/* Blank BG Space */}
        <div className="h-10 w-3/12 bg-gray-900"></div>
        <Text className="text-xl font-bold">Work Experiences</Text>
      </div>

      <div className="mt-5 flex flex-col gap-5">
        {workExperiences.map((workExperience, index) => (
          <div key={index} className="flex items-start gap-5">
            {/* Dates */}
            <div className="flex-shrink-0 w-[17rem] text-sm text-gray-700 whitespace-nowrap font-bold">
              {formatDateOnly(workExperience.start_date)} -{" "}
              {formatDateOnly(workExperience.end_date)}
            </div>

            {/* Work Experience Content */}
            <div className="flex flex-col flex-1">
              <Text className="text-sm font-bold">
                {workExperience.job_position} - {workExperience.company_name}
              </Text>
              <Text className="text-sm text-gray-600">
                {workExperience.full_address}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkExperienceSection;
