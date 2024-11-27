import React from "react";
import FormField from "./FormField";

const EducationForm = ({ educations, setEducations }) => {
  const handleEducationChange = (index, key, value) => {
    const updatedEducations = [...educations];
    updatedEducations[index][key] = value;
    setEducations(updatedEducations);
  };

  const removeEducation = (index) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="text-lg font-medium text-gray-700">Education</div>
      {educations.map((edu, index) => (
        <div key={index} className="space-y-4 border-b pb-4">
          <FormField
            label="School Name"
            name={`school_name_${index}`}
            value={edu.school_name}
            onChange={(e) =>
              handleEducationChange(index, "school_name", e.target.value)
            }
          />
          <FormField
            label="Full Address"
            name={`full_address_${index}`}
            value={edu.full_address}
            onChange={(e) =>
              handleEducationChange(index, "full_address", e.target.value)
            }
          />
          <FormField
            label="Start Date"
            type="date"
            name={`start_date_${index}`}
            value={edu.start_date}
            onChange={(e) =>
              handleEducationChange(index, "start_date", e.target.value)
            }
          />
          <FormField
            label="End Date"
            type="date"
            name={`end_date_${index}`}
            value={edu.end_date}
            onChange={(e) =>
              handleEducationChange(index, "end_date", e.target.value)
            }
          />
          <button
            type="button"
            className="text-red-500 text-sm"
            onClick={() => removeEducation(index)}
          >
            Remove Education
          </button>
        </div>
      ))}
      <button
        type="button"
        className="mt-4 w-full p-3 bg-indigo-600 text-white rounded-md"
        onClick={() =>
          setEducations([
            ...educations,
            { school_name: "", full_address: "", start_date: "", end_date: "" },
          ])
        }
      >
        Add Education
      </button>
    </div>
  );
};

export default EducationForm;
