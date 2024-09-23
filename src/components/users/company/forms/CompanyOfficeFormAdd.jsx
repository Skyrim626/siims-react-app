import { Button, Field, Input, Label, Select } from "@headlessui/react";
import React from "react";

const CompanyOfficeFormAdd = ({
  officeInfo = {
    office_type_id: "",
    supervisor_id: "",
    name: "",
    phone_number: "",
    street: "",
    barangay: "",
    city_municipality: "",
    province: "",
    postal_code: "",
  },
  handleOfficeInfoChange,
  officeTypes = [],
  supervisors = [],
  handleSubmit,
  requiredFields = {
    type: true,
    supervisor: false,
    name: true,
    phone_number: true,
    street: false,
    barangay: false,
    city_municipality: false,
    province: false,
    postal_code: false,
  },
}) => {
  // TODO: Concatenate Full Name
  return (
    <form onSubmit={handleSubmit} className="text-sm">
      <Field className="mb-4">
        <Label htmlFor="type" className="block text-gray-700 font-bold mb-2">
          Office Type{" "}
          {requiredFields.type && <span className="text-red-500">*</span>}
        </Label>
        <Select
          id="office_type_id"
          name="office_type_id"
          className="border rounded w-full py-2 px-3"
          required={requiredFields.office_type_id}
          value={officeInfo.office_type_id}
          onChange={handleOfficeInfoChange}
        >
          <option value="">-Select Office Type-</option>
          {officeTypes.map((officeType) => {
            return (
              <option key={officeType.id} value={officeType.id}>
                {officeType.name}
              </option>
            );
          })}
        </Select>
      </Field>

      <Field className="mb-4">
        <Label htmlFor="type" className="block text-gray-700 font-bold mb-2">
          Supervisor{" "}
          {requiredFields.supervisor && <span className="text-red-500">*</span>}
        </Label>
        <Select
          id="supervisor_id"
          name="supervisor_id"
          className="border rounded w-full py-2 px-3"
          value={officeInfo.supervisor_id}
          onChange={handleOfficeInfoChange}
          required={requiredFields.supervisor}
        >
          <option value="">-Select Supervisor-</option>
          {supervisors.map((supervisor) => {
            return (
              <option key={supervisor.id} value={supervisor.id}>
                {supervisor.first_name}
              </option>
            );
          })}
        </Select>
      </Field>

      <Field className="mb-4">
        <Label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Office Name{" "}
          {requiredFields.name && <span className="text-red-500">*</span>}
        </Label>

        <Input
          type="text"
          id="name"
          name="name"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="e.g. Newton Branch Office"
          value={officeInfo.name}
          onChange={handleOfficeInfoChange}
          required={requiredFields.name}
        />
      </Field>

      <Field className="mb-4">
        <Label
          htmlFor="phone_number"
          className="block text-gray-700 font-bold mb-2"
        >
          Contact Phone{" "}
          {requiredFields.phone_number && (
            <span className="text-red-500">*</span>
          )}
        </Label>

        <Input
          type="text"
          id="phone_number"
          name="phone_number"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="+63 9XX-___-____"
          value={officeInfo.phone_number}
          onChange={handleOfficeInfoChange}
          required={requiredFields.phone_number}
        />
      </Field>

      {/* Location */}
      <h3 className="text-xl mb-5 font-bold">Location</h3>
      <Field className="mb-4">
        <Label htmlFor="street" className="block text-gray-700 font-bold mb-2">
          Street Address{" "}
          {requiredFields.street && <span className="text-red-500">*</span>}
        </Label>

        <Input
          type="text"
          id="street"
          name="street"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="House No., Street Name"
          value={officeInfo.street}
          onChange={handleOfficeInfoChange}
          required={requiredFields.street}
        />
      </Field>
      <Field className="mb-4">
        <Label
          htmlFor="barangay"
          className="block text-gray-700 font-bold mb-2"
        >
          Barangay{" "}
          {requiredFields.barangay && <span className="text-red-500">*</span>}
        </Label>

        <Input
          type="text"
          id="barangay"
          name="barangay"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Barangay"
          value={officeInfo.barangay}
          onChange={handleOfficeInfoChange}
          required={requiredFields.barangay}
        />
      </Field>

      <Field className="mb-4">
        <Label
          htmlFor="city_municipality"
          className="block text-gray-700 font-bold mb-2"
        >
          City/Municipality{" "}
          {requiredFields.city_municipality && (
            <span className="text-red-500">*</span>
          )}
        </Label>

        <Input
          type="text"
          id="city_municipality"
          name="city_municipality"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="City/Municipality"
          value={officeInfo.city_municipality}
          onChange={handleOfficeInfoChange}
          required={requiredFields.city_municipality}
        />
      </Field>
      <Field className="mb-4">
        <Label
          htmlFor="province"
          className="block text-gray-700 font-bold mb-2"
        >
          Province{" "}
          {requiredFields.province && <span className="text-red-500">*</span>}
        </Label>

        <Input
          type="text"
          id="province"
          name="province"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Province"
          value={officeInfo.province}
          onChange={handleOfficeInfoChange}
          required={requiredFields.province}
        />
      </Field>
      <Field className="mb-4">
        <Label
          htmlFor="postal_code"
          className="block text-gray-700 font-bold mb-2"
        >
          Postal Code{" "}
          {requiredFields.postal_code && (
            <span className="text-red-500">*</span>
          )}
        </Label>

        <Input
          type="text"
          id="postal_code"
          name="postal_code"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="4-digit Postal Code"
          value={officeInfo.postal_code}
          onChange={handleOfficeInfoChange}
          required={requiredFields.postal_code}
        />
      </Field>

      <div className="py-3">
        <Button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm w-full focus:outline-none focus:shadow-outline"
          type="button"
        >
          Add Office
        </Button>
      </div>
    </form>
  );
};

export default CompanyOfficeFormAdd;
