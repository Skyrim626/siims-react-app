import React, { useState } from "react";
import { Input, Select } from "@headlessui/react";
import Heading from "../common/Heading";
import FormField from "../common/FormField";
import Text from "../common/Text";
import { getFullName } from "../../utils/formatName";

const CollegeForm = ({
  method = "post",
  collegeName = "",
  deanId = "",
  handleInputChange,
  requiredFields = {
    collegeName: true,
    deanId: false,
  },
  deans = [],
  errors = {},
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
                onChange={handleInputChange}
                placeholder="College Name"
                value={collegeName}
                required={requiredFields["collegeName"]}
              />
              {errors.name && (
                <Text className="text-red-500">{errors.name[0]}</Text>
              )}
            </FormField>

            {/* Dean Select Field */}
            {method === "put" && (
              <FormField
                label="Assign Dean"
                name="deanId"
                labelClassName="text-sm text-black font-semibold"
              >
                <Select
                  name="deanId"
                  value={deanId}
                  onChange={handleInputChange}
                  className="outline-none text-black rounded-sm p-2 text-sm"
                >
                  <option value="">Select Dean (Optional)</option>
                  {deans.map((dean) => {
                    // console.log(dean);

                    return (
                      <option key={dean.id} value={dean.id}>
                        {getFullName(
                          dean.first_name,
                          dean.middle_name,
                          dean.last_name
                        )}{" "}
                        | {dean.college}
                      </option>
                    );
                  })}
                </Select>
                {errors.dean_id && (
                  <Text className="text-red-500">{errors.dean_id[0]}</Text>
                )}
              </FormField>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CollegeForm;
