import React from "react";
import Heading from "../../../components/common/Heading";
import FormField from "../../../components/common/FormField";
import Text from "../../../components/common/Text";
import { Input } from "@headlessui/react";

const DocumentTypeForm = ({
  formData,
  handleInputChange,

  requiredFields = {
    name: true,
  },
  errors = {},
}) => {
  return (
    <>
      <div>
        <Heading
          level={5}
          color="black"
          text={"Document Type Information"}
          className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
        />

        <div className="flex flex-col">
          <div className="grid grid-cols-3 gap-2 mt-4">
            <FormField
              label={"Document Type Name"}
              name={"name"}
              labelClassName="text-sm text-black font-semibold"
              required={requiredFields["name"]}
            >
              <Input
                type="text"
                className="outline-none text-black rounded-sm p-2 text-sm"
                name="name"
                onChange={handleInputChange}
                placeholder="Document Type Name"
                value={formData.name}
                required={requiredFields["name"]}
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

export default DocumentTypeForm;
