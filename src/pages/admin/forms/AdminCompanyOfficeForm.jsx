import { Button, Field, Input, Label, Select } from "@headlessui/react";
import { Building, Hash, MapPin, Navigation, Phone } from "lucide-react";
import React from "react";

const AdminCompanyOfficeForm = ({
  officeTypeId = "",
  setOfficeTypeId = () => {},
  officeName = "",
  setOfficeName = () => {},
  phoneNumber = "",
  setPhoneNumber = () => {},
  street = "",
  setStreet = () => {},
  barangay = "",
  setBarangay = () => {},
  cityMunicipality = "",
  setCityMunicipality = () => {},
  province = "",
  setProvince = () => {},
  postalCode = "",
  setPostalCode = () => {},
  errors = {},
  setErrors = () => {},
  supervisorId = "",
  setSupervisorId = () => {},
  requiredFields = {
    officeTypeId: true,
    name: true,
    phoneNumber: true,
    street: false,
    barangay: false,
    cityMunicipality: false,
    province: false,
    postalCode: false,
  },
  displayFields = {
    officeTypeId: true,
    supervisorId: false,
  },
  supervisors = [],
  officeTypes = [],
}) => {
  return (
    <div className="text-sm">
      {/* Office Type */}
      <Field className="mb-4">
        <Label
          htmlFor="officeTypeId"
          className="text-gray-700 font-bold mb-2 flex items-center"
        >
          <Building size={20} className="mr-2 text-blue-600" />
          Office Type{" "}
          {requiredFields.officeTypeId && (
            <span className="text-red-500">*</span>
          )}
        </Label>
        <Select
          id="officeTypeId"
          name="officeTypeId"
          className="border rounded-lg w-full py-2 px-3 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
          required={requiredFields.officeTypeId}
          value={officeTypeId}
          onChange={(e) => {
            setOfficeTypeId(e.target.value);
          }}
        >
          <option value=" ">-Select Office Type-</option>
          {officeTypes.map((officeType) => (
            <option key={officeType.id} value={officeType.id}>
              {officeType.name}
            </option>
          ))}
        </Select>
      </Field>

      {/* Supervisor */}
      {displayFields.supervisorId && (
        <Field className="mb-4">
          <Label
            htmlFor="supervisorId"
            className="text-gray-700 font-bold mb-2 flex items-center"
          >
            <Building size={20} className="mr-2 text-blue-600" />
            Supervisor{" "}
            {requiredFields.supervisor && (
              <span className="text-red-500">*</span>
            )}
          </Label>
          <Select
            id="supervisorId"
            name="supervisorId"
            className="border rounded-lg w-full py-2 px-3 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
            value={supervisorId}
            onChange={(e) => {
              setSupervisorId(e.target.value);
            }}
            required={requiredFields.supervisorId}
          >
            <option value="">-Select Supervisor-</option>
            {supervisors.map((supervisor) => {
              return (
                <option key={supervisor.id} value={supervisor.id}>
                  {supervisor.full_name}
                </option>
              );
            })}
          </Select>
        </Field>
      )}

      {/* Office Name */}
      <Field className="mb-4">
        <Label
          htmlFor="officeName"
          className="text-gray-700 font-bold mb-2 flex items-center"
        >
          <Building size={20} className="mr-2 text-blue-600" />
          Office Name{" "}
          {requiredFields.name && <span className="text-red-500">*</span>}
        </Label>
        <Input
          type="text"
          id="officeName"
          name="officeName"
          className="border rounded-lg w-full py-2 px-3 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
          placeholder="e.g. Newton Branch Office"
          value={officeName}
          onChange={(e) => {
            setOfficeName(e.target.value);
          }}
          required={requiredFields.name}
        />
      </Field>

      {/* Phone Number */}
      <Field className="mb-4">
        <Label
          htmlFor="phoneNumber"
          className="text-gray-700 font-bold mb-2 flex items-center"
        >
          <Phone size={20} className="mr-2 text-blue-600" />
          Contact Phone{" "}
          {requiredFields.phoneNumber && (
            <span className="text-red-500">*</span>
          )}
        </Label>
        <Input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          className="border rounded-lg w-full py-2 px-3 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
          placeholder="+63 9XX-___-____"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
          required={requiredFields.phoneNumber}
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
          value={street}
          onChange={(e) => {
            setStreet(e.target.value);
          }}
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
          value={barangay}
          onChange={(e) => {
            setBarangay(e.target.value);
          }}
          required={requiredFields.barangay}
        />
      </Field>

      {/* City/Municipality */}
      <Field className="mb-4">
        <Label
          htmlFor="cityMunicipality"
          className="text-gray-700 font-bold mb-2 flex items-center"
        >
          <MapPin size={20} className="mr-2 text-blue-600" />
          City/Municipality{" "}
          {requiredFields.cityMunicipality && (
            <span className="text-red-500">*</span>
          )}
        </Label>
        <Input
          type="text"
          id="cityMunicipality"
          name="cityMunicipality"
          className="border rounded-lg w-full py-2 px-3 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
          placeholder="City/Municipality"
          value={cityMunicipality}
          onChange={(e) => {
            setCityMunicipality(e.target.value);
          }}
          required={requiredFields.cityMunicipality}
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
          value={province}
          onChange={(e) => {
            setProvince(e.target.value);
          }}
          required={requiredFields.province}
        />
      </Field>

      {/* Postal Code */}
      <Field className="mb-4">
        <Label
          htmlFor="postalCode"
          className="text-gray-700 font-bold mb-2 flex items-center"
        >
          <Hash size={20} className="mr-2 text-blue-600" />
          Postal Code{" "}
          {requiredFields.postalCode && <span className="text-red-500">*</span>}
        </Label>
        <Input
          type="text"
          id="postalCode"
          name="postalCode"
          className="border rounded-lg w-full py-2 px-3 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
          placeholder="4-digit Postal Code"
          value={postalCode}
          onChange={(e) => {
            setPostalCode(e.target.value);
          }}
          required={requiredFields.postalCode}
        />
      </Field>
    </div>
  );
};

export default AdminCompanyOfficeForm;
