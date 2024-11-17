import React from "react";
import Heading from "../../../components/common/Heading";
import FormField from "../../../components/common/FormField";
import { Input, Select } from "@headlessui/react";
import Text from "../../../components/common/Text";

const DeanProgramFormEdit = ({
  programName = "",
  setProgramName = () => {},
  requiredFields = {
    programName: true,
  },
  errors = {},
}) => {
  return (
    <>
      <div>
        <Heading
          level={5}
          color="black"
          text={"Program Information"}
          className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
        />

        <div className="flex flex-col">
          <div className="grid grid-cols-3 gap-2 mt-4">
            <FormField
              label={"Program Name"}
              name={"programName"}
              labelClassName="text-sm text-black font-semibold"
              required={requiredFields["programName"]}
            >
              <Input
                type="text"
                className="outline-none text-black rounded-sm p-2 text-sm"
                name="programName"
                onChange={(e) => {
                  setProgramName(e.target.value);
                }}
                placeholder="Program Name"
                value={programName}
                required={requiredFields["programName"]}
              />
              {errors.name && (
                <Text className="text-red-500">{errors.name[0]}</Text>
              )}
            </FormField>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeanProgramFormEdit;
