import React from "react";
import Heading from "../../common/Heading";
import FormField from "../../common/FormField";
import { Input } from "@headlessui/react";

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
const AddressInfoFields = ({ addressInfo, handleAddressInfoChange }) => (
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
          <FormField
            label={"Street"}
            name={"street"}
            labelClassName="text-sm text-black font-semibold"
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

          <FormField
            label={"Barangay"}
            name={"barangay"}
            labelClassName="text-sm text-black font-semibold"
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
          <FormField
            label={"City/Municipality"}
            name={"city_municipality"}
            labelClassName="text-sm text-black font-semibold"
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

          <FormField
            label={"Province"}
            name={"province"}
            labelClassName="text-sm text-black font-semibold"
          >
            <input
              type="province"
              className="outline-none text-black rounded-sm p-2 text-sm"
              name="province"
              onChange={handleAddressInfoChange}
              placeholder="Province"
              value={addressInfo.province}
            />
          </FormField>
          <FormField
            label={"Postal Code"}
            name={"post_code"}
            labelClassName="text-sm text-black font-semibold"
          >
            <input
              type="text"
              className="outline-none text-black rounded-sm p-2 text-sm"
              name="postal_code"
              onChange={handleAddressInfoChange}
              placeholder="Phone Number"
              value={addressInfo.postal_code}
            />
          </FormField>
        </div>
      </div>
    </div>
  </>
);

export default AddressInfoFields;
