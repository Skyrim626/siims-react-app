import React from "react";
import Heading from "../../../components/common/Heading";
import FormField from "../../../components/common/FormField";
import { Input } from "@headlessui/react";

const AdminRoleFormAdd = ({
  roleInfo,
  handleRoleInfoChange,
  requiredFields = {
    name: true,
  },
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
              label={"Name"}
              name={"name"}
              labelClassName="text-sm text-black font-semibold"
              required={requiredFields["name"]}
            >
              <Input
                type="text"
                className="outline-none text-black rounded-sm p-2 text-sm"
                name="name"
                onChange={handleRoleInfoChange}
                placeholder="Role Name"
                value={roleInfo.name}
                required={requiredFields["name"]}
              />
            </FormField>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminRoleFormAdd;
