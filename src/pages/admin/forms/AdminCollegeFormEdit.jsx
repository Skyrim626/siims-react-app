import React from "react";
import Heading from "../../../components/common/Heading";
import FormField from "../../../components/common/FormField";
import { Input, Select } from "@headlessui/react";

const AdminCollegeFormEdit = ({
  editCollegeName = "",
  editDeanId = "",
  setEditCollegeName = () => {},
  setEditDeanId = () => {},
  requiredFields = {
    collegeName: true,
    deanId: false,
  },
  deans = [],
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
              name={"collegeName"}
              labelClassName="text-sm text-black font-semibold"
              required={requiredFields["collegeName"]}
            >
              <Input
                type="text"
                className="outline-none text-black rounded-sm p-2 text-sm"
                name="collegeName"
                onChange={(e) => {
                  setEditCollegeName(e.target.value);
                }}
                placeholder="College Name"
                value={editCollegeName}
                required={requiredFields["collegeName"]}
              />
            </FormField>

            {/* Dean Select Field */}
            <FormField
              label="Assign Dean"
              name="deanId"
              labelClassName="text-sm text-black font-semibold"
            >
              <Select
                name="deanId"
                value={editDeanId}
                onChange={(e) => {
                  setEditDeanId(e.target.value);
                }}
                className="outline-none text-black rounded-sm p-2 text-sm"
              >
                <option value="">Select Dean (Optional)</option>
                {deans.map((dean) => (
                  <option key={dean.id} value={dean.id}>
                    {dean.name}
                  </option>
                ))}
              </Select>
            </FormField>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCollegeFormEdit;
