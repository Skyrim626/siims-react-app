import React from "react";
import Heading from "../../../components/common/Heading";
import FormField from "../../../components/common/FormField";
import { Input } from "@headlessui/react";
import Text from "../../../components/common/Text";

const AdminRoleFormAdd = ({
  roleName = "",
  setRoleName = () => {},
  errors,
  requiredFields = {
    roleName: false,
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
              label={"Role Name"}
              name={"roleName"}
              labelClassName="text-sm text-black font-semibold"
              required={requiredFields["roleName"]}
            >
              <Input
                type="text"
                className="outline-none text-black rounded-sm p-2 text-sm"
                name="roleName"
                onChange={(e) => {
                  setRoleName(e.target.value);
                }}
                placeholder="Role Name"
                value={roleName}
                required={requiredFields["roleName"]}
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

export default AdminRoleFormAdd;
