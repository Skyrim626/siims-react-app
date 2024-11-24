import React from "react";
import { Input, Select } from "@headlessui/react";
import Heading from "../common/Heading";
import FormField from "../common/FormField";
const ProgramForm = ({
  method = "post",
  collegeId = 0,
  chairpersonId = 0,
  programName = "",
  setCollegeId = () => {},
  setProgramName = () => {},
  setChairpersonId = () => {},
  requiredFields = {
    collegeId: true,
    programName: true,
  },
  displayFields = {
    collegeId: true,
    programName: true,
  },
  errors = {},
  chairpersons = [],
  colleges = [],
}) => {
  // console.log(colleges);
  // console.log(chairpersons);

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
            {displayFields.collegeId && (
              <FormField
                label={"College"}
                name={"collegeId"}
                labelClassName="text-sm text-black font-semibold"
                required={requiredFields["collegeId"]}
              >
                <Select
                  typeof="text"
                  className={`outline-none text-black rounded-sm p-2 text-sm ${
                    method !== "post" && "bg-gray-400"
                  }`}
                  name="collegeId"
                  onChange={(e) => {
                    setCollegeId(e.target.value);
                  }}
                  disabled={method === "put"}
                  value={collegeId}
                  required={requiredFields["collegeId"]}
                >
                  <option value="null">-Select a College-</option>
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
            )}

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

            {method === "put" && (
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
                        {chairperson.name} | {chairperson.program}
                      </option>
                    );
                  })}
                </Select>
                {errors.chairperson_id && (
                  <Text className="text-red-500">
                    {errors.chairperson_id[0]}
                  </Text>
                )}
              </FormField>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgramForm;
