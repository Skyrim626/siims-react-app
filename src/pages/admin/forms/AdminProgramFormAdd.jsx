import React from "react";
import Heading from "../../../components/common/Heading";
import FormField from "../../../components/common/FormField";
import { Input, Select } from "@headlessui/react";

const AdminProgramFormAdd = ({
  colleges = [],
  programInfo,
  handleProgramInfoChange,
  requiredFields = {
    college_id: true,
    name: true,
  },
}) => {
  console.log(colleges);

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
              name={"college_id"}
              labelClassName="text-sm text-black font-semibold"
              required={requiredFields["college_id"]}
            >
              <Select
                typeof="text"
                className="outline-none text-black rounded-sm p-2 text-sm"
                name="college_id"
                onChange={handleProgramInfoChange}
                value={programInfo.college_id}
                required={requiredFields["college_id"]}
              >
                <option value="">-Select a College</option>
                {colleges.map((college) => {
                  return (
                    <option key={college.id} value={college.id}>
                      {college.name}
                    </option>
                  );
                })}
              </Select>
            </FormField>
            <FormField
              label={"Name"}
              name={"name"}
              labelClassName="text-sm text-black font-semibold"
              required={requiredFields["name"]}
            >
              <Input
                type="text"
                className="outline-none text-black rounded-sm p-2 text-sm"
                name="name"
                onChange={handleProgramInfoChange}
                placeholder="Program Name"
                value={programInfo.name}
                required={requiredFields["name"]}
              />
            </FormField>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProgramFormAdd;
