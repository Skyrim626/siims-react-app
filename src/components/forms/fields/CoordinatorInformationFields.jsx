import React from "react";
import Heading from "../../common/Heading";
import FormField from "../../common/FormField";
import { Select } from "@headlessui/react";

const CoordinatorInformationFields = ({
  // Input State
  programId = "",

  // Set State
  setProgramId = () => {},

  // Required State
  requiredFields = {
    programId: true,
  },

  // Errors State
  errors = {},

  // Data for selections
  programs = [],
}) => {
  return (
    <div className="mt-6">
      <Heading
        level={5}
        color="black"
        text={"Coordinator Information"}
        className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
      />
      <div className="flex flex-col">
        <div className="grid grid-cols-3 gap-2 mt-4">
          <FormField
            label={"Program"}
            name={"programId"}
            labelClassName="text-sm text-black font-semibold"
            required={requiredFields["programId"]}
          >
            <Select
              name="programId"
              className="border data-[hover]:shadow data-[focus]:bg-blue-100 h-full outline-none p-2"
              aria-label="Select program"
              required={requiredFields["programId"]}
            >
              <option value="0">-Select a Program-</option>
              {programs.map((program) => (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              ))}
            </Select>
            {errors.program_id && (
              <Text className="text-red-600 font-bold italic">
                {errors.program_id}
              </Text>
            )}
          </FormField>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorInformationFields;
