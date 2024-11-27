import React from "react";
import FormField from "./FormField";

const WorkExperienceForm = ({ workExperiences, setWorkExperiences }) => {
  const handleWorkChange = (index, key, value) => {
    const updatedWorkExperiences = [...workExperiences];
    updatedWorkExperiences[index][key] = value;
    setWorkExperiences(updatedWorkExperiences);
  };

  const removeWork = (index) => {
    setWorkExperiences(workExperiences.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="text-lg font-medium text-gray-700">Work Experience</div>
      {workExperiences.map((work, index) => (
        <div key={index} className="space-y-4 border-b pb-4">
          <FormField
            label="Job Position"
            name={`job_position_${index}`}
            value={work.job_position}
            onChange={(e) =>
              handleWorkChange(index, "job_position", e.target.value)
            }
          />
          <FormField
            label="Company Name"
            name={`company_name_${index}`}
            value={work.company_name}
            onChange={(e) =>
              handleWorkChange(index, "company_name", e.target.value)
            }
          />
          <FormField
            label="Start Date"
            type="date"
            name={`start_date_${index}`}
            value={work.start_date}
            onChange={(e) =>
              handleWorkChange(index, "start_date", e.target.value)
            }
          />
          <FormField
            label="End Date"
            type="date"
            name={`end_date_${index}`}
            value={work.end_date}
            onChange={(e) =>
              handleWorkChange(index, "end_date", e.target.value)
            }
          />
          <button
            type="button"
            className="text-red-500 text-sm"
            onClick={() => removeWork(index)}
          >
            Remove Work Experience
          </button>
        </div>
      ))}
      <button
        type="button"
        className="mt-4 w-full p-3 bg-indigo-600 text-white rounded-md"
        onClick={() =>
          setWorkExperiences([
            ...workExperiences,
            {
              job_position: "",
              company_name: "",
              start_date: "",
              end_date: "",
            },
          ])
        }
      >
        Add Work Experience
      </button>
    </div>
  );
};

export default WorkExperienceForm;
