import React from "react";
import Heading from "../../../components/common/Heading";
import FormField from "../../../components/common/FormField";
import { Input, Select } from "@headlessui/react";

const AdminProgramFormEdit = ({
  collegeId = "",
  chairpersonId = "",
  programName = "",
  setCollegeId = () => {},
  setChairpersonId = () => {},
  setProgramName = () => {},
  colleges = [],
  chairpersons = [],
  requiredFields = {
    programName: true,
    collegeId: true,
    chairpersonId: false,
  },
  errors = {},
}) => {
  return (
    <>
      {/* Program Information Fields */}
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
              label={"Chairperson Assign"}
              name={"chairpersonId"}
              labelClassName="text-sm text-black font-semibold"
              required={requiredFields["chairpersonId"]}
            >
              <Select
                typeof="text"
                className="outline-none text-black rounded-sm p-2 text-sm"
                name="chairpersonId"
                onChange={(e) => {
                  setChairpersonId(e.target.value);
                }}
                value={chairpersonId}
                required={requiredFields["chairpersonId"]}
              >
                <option value="">-Assign a Chairperson-</option>
                {chairpersons.map((chairperson) => {
                  return (
                    <option key={chairperson.id} value={chairperson.id}>
                      {chairperson.name} | {chairperson.program_assigned}
                    </option>
                  );
                })}
              </Select>
              {errors.chairperson_id && (
                <Text className="text-red-500">{errors.chairperson_id[0]}</Text>
              )}
            </FormField>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProgramFormEdit;
