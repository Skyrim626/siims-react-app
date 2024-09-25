import { Button, Field, Input, Label, Select } from "@headlessui/react";
import { Building, Hash, MapPin, Navigation, Phone } from "lucide-react";
import React from "react";

const OfficeForm = ({
  userRole = "",
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
  return (
    <form
      onSubmit={handleSubmit}
      className="text-sm bg-white shadow-lg rounded-lg p-8 space-y-6"
    >
      {/* Office Type */}
      <Field className="mb-4">
        <Label
          htmlFor="office_type_id"
          className="text-gray-700 font-bold mb-2 flex items-center"
        >
          <Building size={20} className="mr-2 text-blue-600" />
          Office Type{" "}
          {requiredFields.type && <span className="text-red-500">*</span>}
        </Label>
        <Select
          id="office_type_id"
          name="office_type_id"
          className="border rounded-lg w-full py-2 px-3 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
          required={requiredFields.office_type_id}
          value={officeInfo.office_type_id}
          onChange={handleOfficeInfoChange}
        >
          <option value="">-Select Office Type-</option>
          {officeTypes.map((officeType) => (
            <option key={officeType.id} value={officeType.id}>
              {officeType.name}
            </option>
          ))}
        </Select>
      </Field>

      {/* Supervisor */}
      <Field className="mb-4">
        <Label
          htmlFor="supervisor_id"
          className="text-gray-700 font-bold mb-2 flex items-center"
        >
          <Building size={20} className="mr-2 text-blue-600" />
          Supervisor{" "}
          {requiredFields.supervisor && <span className="text-red-500">*</span>}
        </Label>
        <Select
          id="supervisor_id"
          name="supervisor_id"
          className="border rounded-lg w-full py-2 px-3 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
          value={officeInfo.supervisor_id}
          onChange={handleOfficeInfoChange}
          required={requiredFields.supervisor}
        >
          <option value="">-Select Supervisor-</option>
          {supervisors.map((supervisor) => (
            <option key={supervisor.id} value={supervisor.id}>
              {supervisor.first_name}
            </option>
          ))}
        </Select>
      </Field>

      {/* Office Name */}
      <Field className="mb-4">
        <Label
          htmlFor="name"
          className="text-gray-700 font-bold mb-2 flex items-center"
        >
          <Building size={20} className="mr-2 text-blue-600" />
          Office Name{" "}
          {requiredFields.name && <span className="text-red-500">*</span>}
        </Label>
        <Input
          type="text"
          id="name"
          name="name"
          className="border rounded-lg w-full py-2 px-3 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
          placeholder="e.g. Newton Branch Office"
          value={officeInfo.name}
          onChange={handleOfficeInfoChange}
          required={requiredFields.name}
        />
      </Field>

      {/* Phone Number */}
      <Field className="mb-4">
        <Label
          htmlFor="phone_number"
          className="text-gray-700 font-bold mb-2 flex items-center"
        >
          <Phone size={20} className="mr-2 text-blue-600" />
          Contact Phone{" "}
          {requiredFields.phone_number && (
            <span className="text-red-500">*</span>
          )}
        </Label>
        <Input
          type="text"
          id="phone_number"
          name="phone_number"
          className="border rounded-lg w-full py-2 px-3 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
          placeholder="+63 9XX-___-____"
          value={officeInfo.phone_number}
          onChange={handleOfficeInfoChange}
          required={requiredFields.phone_number}
        />
      </Field>

      {/* Location Header */}
      <h3 className="text-lg font-bold text-gray-800 mb-5 border-b pb-2">
        Location
      </h3>

      {/* Street Address */}
      <Field className="mb-4">
        <Label
          htmlFor="street"
          className="text-gray-700 font-bold mb-2 flex items-center"
        >
          <MapPin size={20} className="mr-2 text-blue-600" />
          Street Address{" "}
          {requiredFields.street && <span className="text-red-500">*</span>}
        </Label>
        <Input
          type="text"
          id="street"
          name="street"
          className="border rounded-lg w-full py-2 px-3 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
          placeholder="House No., Street Name"
          value={officeInfo.street}
          onChange={handleOfficeInfoChange}
          required={requiredFields.street}
        />
      </Field>

      {/* Barangay */}
      <Field className="mb-4">
        <Label
          htmlFor="barangay"
          className="text-gray-700 font-bold mb-2 flex items-center"
        >
          <Navigation size={20} className="mr-2 text-blue-600" />
          Barangay{" "}
          {requiredFields.barangay && <span className="text-red-500">*</span>}
        </Label>
        <Input
          type="text"
          id="barangay"
          name="barangay"
          className="border rounded-lg w-full py-2 px-3 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
          placeholder="Barangay"
          value={officeInfo.barangay}
          onChange={handleOfficeInfoChange}
          required={requiredFields.barangay}
        />
      </Field>

      {/* City/Municipality */}
      <Field className="mb-4">
        <Label
          htmlFor="city_municipality"
          className="text-gray-700 font-bold mb-2 flex items-center"
        >
          <MapPin size={20} className="mr-2 text-blue-600" />
          City/Municipality{" "}
          {requiredFields.city_municipality && (
            <span className="text-red-500">*</span>
          )}
        </Label>
        <Input
          type="text"
          id="city_municipality"
          name="city_municipality"
          className="border rounded-lg w-full py-2 px-3 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
          placeholder="City/Municipality"
          value={officeInfo.city_municipality}
          onChange={handleOfficeInfoChange}
          required={requiredFields.city_municipality}
        />
      </Field>

      {/* Province */}
      <Field className="mb-4">
        <Label
          htmlFor="province"
          className="text-gray-700 font-bold mb-2 flex items-center"
        >
          <MapPin size={20} className="mr-2 text-blue-600" />
          Province{" "}
          {requiredFields.province && <span className="text-red-500">*</span>}
        </Label>
        <Input
          type="text"
          id="province"
          name="province"
          className="border rounded-lg w-full py-2 px-3 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
          placeholder="Province"
          value={officeInfo.province}
          onChange={handleOfficeInfoChange}
          required={requiredFields.province}
        />
      </Field>

      {/* Postal Code */}
      <Field className="mb-4">
        <Label
          htmlFor="postal_code"
          className="text-gray-700 font-bold mb-2 flex items-center"
        >
          <Hash size={20} className="mr-2 text-blue-600" />
          Postal Code{" "}
          {requiredFields.postal_code && (
            <span className="text-red-500">*</span>
          )}
        </Label>
        <Input
          type="text"
          id="postal_code"
          name="postal_code"
          className="border rounded-lg w-full py-2 px-3 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
          placeholder="4-digit Postal Code"
          value={officeInfo.postal_code}
          onChange={handleOfficeInfoChange}
          required={requiredFields.postal_code}
        />
      </Field>

      {/* Submit Button */}
      <div className="pt-3">
        <Button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
          type="button"
        >
          Add Office
        </Button>
      </div>
    </form>
  );
};

export default OfficeForm;
