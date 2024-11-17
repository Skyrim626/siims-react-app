import React from "react";
import Heading from "../../../components/common/Heading";
import FormField from "../../../components/common/FormField";
import { Input, Select } from "@headlessui/react";

const AdminProgramFormAdd = ({
  colleges = [],
  collegeId = "",
  programName = "",
  setCollegeId = () => {},
  setProgramName = () => {},
  requiredFields = {
    collegeId: true,
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
          text={"Role Information"}
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
              <Select
                typeof="text"
                className="outline-none text-black rounded-sm p-2 text-sm"
                name="collegeId"
                onChange={(e) => {
                  setCollegeId(e.target.value);
                }}
                value={collegeId}
                required={requiredFields["collegeId"]}
              >
                <option value="">-Select a College-</option>
                {colleges.map((college) => {
                  return (
                    <option key={college.id} value={college.id}>
                      {college.name}
                    </option>
                  );
                })}
              </Select>
              {errors.college_id && (
                <Text className="text-red-500">{errors.college_id[0]}</Text>
              )}
            </FormField>
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

export default AdminProgramFormAdd;
