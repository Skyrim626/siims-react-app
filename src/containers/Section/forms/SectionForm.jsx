import React from "react";

import { Button, Field, Input } from "@headlessui/react";
import Heading from "../../../components/common/Heading";
import FormField from "../../../components/common/FormField";
import Text from "../../../components/common/Text";
import RoleBasedView from "../../../components/common/RoleBasedView";

const SectionForm = ({
  sectionInfo = {
    name: "",
    limit: 0,
    class_list: null,
    coordinator_id: 0,
  },
  requiredFields = {
    name: true,
    limit: true,
    class_list: null,
    coordinator_id: 0,
  },
  handleInputChange = () => {},
  errors = {},
  accept = "csv",
  maxSize = "20MB",
  authorizeRole,
  addNewSection,
}) => {
  return (
    <form method="post" onSubmit={addNewSection}>
      <Heading
        level={5}
        color="black"
        text={"Section Information"}
        className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
      />

      <div className="flex flex-col">
        <div className="grid grid-cols-3 gap-2 mt-4">
          <FormField
            label={"Section Name"}
            name={"name"}
            labelClassName="text-sm text-black font-semibold"
            required={requiredFields["name"]}
          >
            <Input
              type="text"
              className="outline-none text-black rounded-sm p-2 text-sm"
              name="name"
              onChange={handleInputChange}
              placeholder="Section Name"
              value={sectionInfo.name}
              required={requiredFields["name"]}
            />
            {errors.name && (
              <Text className="text-red-500">{errors.name[0]}</Text>
            )}
          </FormField>

          <RoleBasedView
            authorizeRole={authorizeRole}
            roles={["admin", "chairperson"]}
          >
            <FormField
              label={"Coordinator"}
              name={"limit"}
              labelClassName="text-sm text-black font-semibold"
              required={requiredFields["limit"]}
            >
              <select className="p-2 text-sm text-black outline-none">
                <option value={""}>-Select Coordinator-</option>
              </select>
              {errors.limit && (
                <Text className="text-red-500">{errors.limit[0]}</Text>
              )}
            </FormField>
          </RoleBasedView>

          <FormField
            label={"Limit (60 max)"}
            name={"limit"}
            labelClassName="text-sm text-black font-semibold"
            required={requiredFields["limit"]}
          >
            <Input
              type="text"
              className="outline-none text-black rounded-sm p-2 text-sm"
              name="limit"
              onChange={handleInputChange}
              placeholder="Limit"
              value={sectionInfo.limit}
              required={requiredFields["limit"]}
            />
            {errors.limit && (
              <Text className="text-red-500">{errors.limit[0]}</Text>
            )}
          </FormField>
        </div>
      </div>

      {/*Import Students */}

      {/* <div className="mt-3">
        <FormField
          label={"Import Students"}
          name={"class_list"}
          labelClassName="text-sm text-black font-semibold"
          required={requiredFields["class_list"]}
        >
          
          <div className="relative flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-md p-6 cursor-pointer hover:bg-gray-50 transition-all">
            <Input
              type={"file"}
              name={"class_list"}
              onChange={handleInputChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept={accept}
            />
            <div className="text-center text-gray-600">
              <p className="text-base font-semibold">Click or Drag to Upload</p>
              <p className="text-sm">CSV (Max size: {maxSize})</p>
            </div>
          </div>
        </FormField>
      </div> */}

      <div className="mt-3">
        <Button
          type="submit"
          className="w-full py-2 px-3 text-center bg-blue-500 hover:bg-blue-600 transition font-semibold text-white"
        >
          Create
        </Button>
      </div>
    </form>
  );
};

export default SectionForm;
