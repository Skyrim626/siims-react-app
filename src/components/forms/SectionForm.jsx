import React from "react";
import Heading from "../common/Heading";
import FormField from "../common/FormField";
import { Field, Input } from "@headlessui/react";
import Text from "../common/Text";

const SectionForm = ({
  sectionInfo = {
    name: "",
    limit: 0,
    class_list: null,
  },
  requiredFields = {
    name: true,
    limit: true,
    class_list: null,
  },
  handleInputChange = () => {},
  onChange = () => {},
  errors = {},
  accept = "csv",
  maxSize = "20MB",
}) => {
  return (
    <div>
      <Heading
        level={5}
        color="black"
        text={"Section Information"}
        className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
      />

      <div className="flex flex-col">
        <div className="grid grid-cols-2 gap-2 mt-4">
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

          <FormField
            label={"Limit (Student Capacity for this Section)"}
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

      <div className="mt-3">
        <FormField
          label={"Import Students"}
          name={"class_list"}
          labelClassName="text-sm text-black font-semibold"
          required={requiredFields["class_list"]}
        >
          {/* File Upload Button */}
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
      </div>
    </div>
  );
};

export default SectionForm;
