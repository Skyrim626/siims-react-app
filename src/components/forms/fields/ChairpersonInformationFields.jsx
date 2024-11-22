import React from "react";
import Heading from "../../common/Heading";
import FormField from "../../common/FormField";
import Select from "../../common/Select";
import Text from "../../common/Text";

const ChairpersonInformationFields = ({
  // Input State
  collegeId = "",

  // Set State
  setCollegeId = () => {},

  // Required State
  requiredFields = {
    collegeId: true,
  },

  // Errors State
  errors = {},

  // Data for selections
  colleges = [],
}) => {
  // console.log(colleges);
  return (
    <div className="mt-6">
      <Heading
        level={5}
        color="black"
        text={"Chairperson Information"}
        className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
      />
      <div className="flex flex-col">
        <div className="grid grid-cols-3 gap-2 mt-4">
          <FormField
            label={"College"}
            name={"collegeId"}
            labelClassName="text-sm text-black font-semibold"
            required={requiredFields["collegeId"]}
          >
            <select
              name="collegeId"
              value={collegeId}
              onChange={(e) => setCollegeId(e.target.value)}
              className="border data-[hover]:shadow data-[focus]:bg-blue-100 h-full outline-none p-2"
              aria-label="Select College"
              required={requiredFields["collegeId"]}
            >
              <option value="0">-Select a College-</option>
              {colleges.map((college) => (
                <option key={college.id} value={college.id}>
                  {college.name}
                </option>
              ))}
            </select>
            {errors.collegeId && (
              <Text className="text-red-600 font-bold italic">
                {errors.collegeId}
              </Text>
            )}
          </FormField>
        </div>
      </div>
    </div>
  );
};

export default ChairpersonInformationFields;
