import React from "react";
import Heading from "../../common/Heading";
import FormField from "../../common/FormField";
import { Input } from "@headlessui/react";
import Text from "../../common/Text";

import { addressInfo as defaultAddressInfo } from "../../../formDefaults/addressInfo";

/**
 * Fields:
 * - Street
 * - Barangay
 * - City/Municipality
 * - Province
 * - Postal Code
 *
 * @param {*} param0
 * @returns
 */
const AddressInfoFields = ({
  addressInfo = {
    ...defaultAddressInfo,
  },
  handleAddressInfoChange,
  requiredFields = {
    street: false,
    barangay: false,
    city_municipality: false,
    province: false,
    postal_code: false,
    college_id: true,
  },
  errors = {},
}) => (
  <>
    {/*  Address Information */}
    <div>
      <Heading
        level={5}
        color="black"
        text={"Address Information"}
        className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
      />

      <div className="flex flex-col">
        <div className="grid grid-cols-3 gap-2 mt-4">
          {/* Street Field */}
          <div>
            <FormField
              label={"Street"}
              name={"street"}
              labelClassName="text-sm text-black font-semibold"
              required={requiredFields["street"]}
            >
              <Input
                type="text"
                className="outline-none text-black rounded-sm p-2 text-sm"
                name="street"
                onChange={handleAddressInfoChange}
                placeholder="Street"
                value={addressInfo.street}
              />
            </FormField>
            {errors.street && (
              <Text className="text-red-500">{errors.street[0]}</Text>
            )}
          </div>

          {/* Barangay Field */}
          <div>
            <FormField
              label={"Barangay"}
              name={"barangay"}
              labelClassName="text-sm text-black font-semibold"
              required={requiredFields["barangay"]}
            >
              <Input
                type="text"
                className="outline-none text-black rounded-sm p-2 text-sm"
                name="barangay"
                onChange={handleAddressInfoChange}
                placeholder="Barangay"
                value={addressInfo.barangay}
              />
            </FormField>
            {errors.barangay && (
              <Text className="text-red-500">{errors.barangay[0]}</Text>
            )}
          </div>

          {/* City Municipality Field */}
          <div>
            <FormField
              label={"City/Municipality"}
              name={"city_municipality"}
              labelClassName="text-sm text-black font-semibold"
              required={requiredFields["city_municipality"]}
            >
              <Input
                type="text"
                className="outline-none text-black rounded-sm p-2 text-sm"
                name="city_municipality"
                onChange={handleAddressInfoChange}
                placeholder="City/Municipality"
                value={addressInfo.city_municipality}
              />
            </FormField>
            {errors.city_municipality && (
              <Text className="text-red-500">
                {errors.city_municipality[0]}
              </Text>
            )}
          </div>

          {/* Province Field */}
          <div>
            <FormField
              label={"Province"}
              name={"province"}
              labelClassName="text-sm text-black font-semibold"
              required={requiredFields["province"]}
            >
              <Input
                type="province"
                className="outline-none text-black rounded-sm p-2 text-sm"
                name="province"
                onChange={handleAddressInfoChange}
                placeholder="Province"
                value={addressInfo.province}
              />
            </FormField>
            {errors.province && (
              <Text className="text-red-500">{errors.province[0]}</Text>
            )}
          </div>

          {/* Postal Code Field */}
          <div>
            <FormField
              label={"Postal Code"}
              name={"postal_code"}
              labelClassName="text-sm text-black font-semibold"
              required={requiredFields["postal_code"]}
            >
              <Input
                type="text"
                className="outline-none text-black rounded-sm p-2 text-sm"
                name="postal_code"
                onChange={handleAddressInfoChange}
                placeholder="Phone Number"
                value={addressInfo.postal_code}
              />
            </FormField>
            {errors.postal_code && (
              <Text className="text-red-500">{errors.postal_code[0]}</Text>
            )}
          </div>
        </div>
      </div>
    </div>
  </>
);

export default AddressInfoFields;
