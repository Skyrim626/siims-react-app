import React, { useState } from "react";
import Heading from "../../../components/common/Heading";
import FormField from "../../../components/common/FormField";
import { Input } from "@headlessui/react";
import Text from "../../../components/common/Text";

const AdminCollegeFormAdd = ({
  states = {
    name: "",
  },
  setStates = {
    setName: () => {},
  },
  requiredFields = {
    name: true,
  },
  errors = {
    name: [""],
  },
}) => {
  return (
    <>
      {/* College Information Fields */}
      <div>
        <Heading
          level={5}
          color="black"
          text={"College Information"}
          className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
        />

        <div className="flex flex-col">
          <div className="grid grid-cols-3 gap-2 mt-4">
            <FormField
              label={"College Name"}
              name={"college_name"}
              labelClassName="text-sm text-black font-semibold"
              required={requiredFields["name"]}
            >
              <Input
                type="text"
                className="outline-none text-black rounded-sm p-2 text-sm"
                name="name"
                onChange={setStates.setName}
                placeholder="College Name"
                value={states.name}
                required={requiredFields["name"]}
              />
            </FormField>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCollegeFormAdd;
