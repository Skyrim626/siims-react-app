import {
  Button,
  Field,
  Input,
  Label,
  Select,
  Textarea,
} from "@headlessui/react";
import {
  Book,
  Briefcase,
  Building,
  CalendarCheck,
  CalendarClock,
  Hash,
  Hourglass,
  LetterText,
  MapPin,
  Navigation,
  Phone,
  Users,
} from "lucide-react";
import React from "react";

const WorkPostForm = ({
  isFormModal = true,
  method = "post",
  workPostInfo = {
    work_type_id: "",
    title: "",
    max_applicants: "",
    responsibilities: "",
    qualifications: "",
    date_start: "",
    date_end: "",
    work_duration: "",
  },
  handleWorkPostInfoChange = () => console.log("Testing"),
  workTypes = [
    {
      id: 1,
      name: "Internship",
    },
    {
      id: 2,
      name: "Immersion",
    },
  ],
  handleSubmit,
  requiredFields = {
    work_type_id: true,
    title: true,
    responsibilities: true,
    qualifications: true,
    date_start: true,
    date_end: true,
    max_applicants: true,
    work_duration: true,
  },
  displayFields = {
    work_type_id: true,
    title: true,
    responsibilities: true,
    qualifications: true,
    date_start: true,
    date_end: true,
    work_duration: true,
    max_applicants: true,
  },
}) => {
  // Method Checker
  const buttonTitle = () => {
    switch (method) {
      case "put":
        return "Save Changes";

      default:
        return "Add Work";
    }
  };

  const renderWorkPostFormFields = () => {
    return (
      <>
        <div className="text-sm">
          {/* Work Types */}
          {displayFields.work_type_id && (
            <Field className="mb-4">
              <Label
                htmlFor="work_type_id"
                className="text-gray-700 font-bold mb-2 flex items-center"
              >
                <Briefcase size={20} className="mr-2 text-blue-600" />
                Work Type
                {requiredFields.work_type_id && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              <Select
                id="work_type_id"
                name="work_type_id"
                className="border rounded-lg w-full py-2 px-3 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
                value={workPostInfo.work_type_id}
                onChange={handleWorkPostInfoChange}
                required={requiredFields.work_type_id}
              >
                <option value="">-Select Work Type-</option>
                {workTypes.map((workTypes) => (
                  <option key={workTypes.id} value={workTypes.id}>
                    {workTypes.name}
                  </option>
                ))}
              </Select>
            </Field>
          )}

          {/* Title */}
          <Field className="mb-4">
            <Label
              htmlFor="title"
              className="text-gray-700 font-bold mb-2 flex items-center"
            >
              <Book size={20} className="mr-2 text-blue-600" />
              Title
              {requiredFields.title && <span className="text-red-500">*</span>}
            </Label>
            <Input
              type="text"
              id="title"
              name="title"
              className="border rounded-lg w-full py-2 px-3 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
              placeholder="e.g. Software Engineer"
              value={workPostInfo.title}
              onChange={handleWorkPostInfoChange}
              required={requiredFields.title}
            />
          </Field>

          {/* Responsibilities */}
          <Field className="mb-4">
            <Label
              htmlFor="phone_number"
              className="text-gray-700 font-bold mb-2 flex items-center"
            >
              <LetterText size={20} className="mr-2 text-blue-600" />
              Responsibilities
              {requiredFields.responsibilities && (
                <span className="text-red-500">*</span>
              )}
            </Label>
            <Textarea
              id="responsibilities"
              name="responsibilities"
              className="border rounded-lg w-full py-2 px-3 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
              placeholder="Enter the responsibilities for this job title..."
              value={workPostInfo.responsibilities}
              onChange={handleWorkPostInfoChange}
              required={requiredFields.responsibilities}
              rows={3}
            />
          </Field>

          {/* Qualifications */}
          <Field className="mb-4">
            <Label
              htmlFor="phone_number"
              className="text-gray-700 font-bold mb-2 flex items-center"
            >
              <LetterText size={20} className="mr-2 text-blue-600" />
              Qualifications
              {requiredFields.qualifications && (
                <span className="text-red-500">*</span>
              )}
            </Label>
            <Textarea
              id="qualifications"
              name="qualifications"
              className="border rounded-lg w-full py-2 px-3 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
              placeholder="Enter the qualifications for this job title..."
              value={workPostInfo.qualifications}
              onChange={handleWorkPostInfoChange}
              required={requiredFields.qualifications}
              rows={3}
            />
          </Field>

          {/* Max_applicants */}
          <Field className="mb-4">
            <Label
              htmlFor="phone_number"
              className="text-gray-700 font-bold mb-2 flex items-center"
            >
              <Users size={20} className="mr-2 text-blue-600" />
              Max Applicants
              {requiredFields.max_applicants && (
                <span className="text-red-500">*</span>
              )}
            </Label>
            <Input
              type="number"
              id="max_applicants"
              name="max_applicants"
              className="border rounded-lg w-full py-2 px-3 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
              placeholder="e.g. 5"
              value={workPostInfo.max_applicants}
              onChange={handleWorkPostInfoChange}
              required={requiredFields.max_applicants}
            />
          </Field>

          <div className="flex items-center gap-2">
            {/* Date Start */}
            <Field className="mb-4 flex-grow">
              <Label
                htmlFor="date_start"
                className="text-gray-700 font-bold mb-2 flex items-center"
              >
                <CalendarClock size={20} className="mr-2 text-blue-600" />
                Start Date
                {requiredFields.date_start && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              <Input
                type="date"
                id="date_start"
                name="date_start"
                className="border rounded-lg w-full py-2 px-3 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
                value={workPostInfo.date_start}
                onChange={handleWorkPostInfoChange}
                required={requiredFields.date_start}
              />
            </Field>

            {/* Date End */}
            <Field className="mb-4 flex-grow">
              <Label
                htmlFor="date_end"
                className="text-gray-700 font-bold mb-2 flex items-center"
              >
                <CalendarCheck size={20} className="mr-2 text-blue-600" />
                End Date
                {requiredFields.date_end && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              <Input
                type="date"
                id="date_end"
                name="date_end"
                className="border rounded-lg w-full py-2 px-3 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
                value={workPostInfo.date_end}
                onChange={handleWorkPostInfoChange}
                required={requiredFields.date_end}
              />
            </Field>

            {/* Work Duration */}
            <Field className="mb-4 flex-grow">
              <Label
                htmlFor="work_duration"
                className="text-gray-700 font-bold mb-2 flex items-center"
              >
                <Hourglass size={20} className="mr-2 text-blue-600" />
                Work Duration (in hours)
                {requiredFields.work_duration && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              <Input
                type="text"
                id="work_duration"
                name="work_duration"
                className="border rounded-lg w-full py-2 px-3 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
                placeholder="e.g. 40"
                value={workPostInfo.work_duration}
                onChange={handleWorkPostInfoChange}
                required={requiredFields.work_duration}
              />
            </Field>
          </div>

          {/* Submit Button */}
          {!isFormModal && (
            <div className="pt-3">
              <Button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
                type="button"
              >
                {buttonTitle}
              </Button>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      {isFormModal ? (
        renderWorkPostFormFields()
      ) : (
        <form
          onSubmit={handleSubmit}
          className=" bg-white shadow-lg rounded-lg p-8 space-y-6"
        >
          {renderWorkPostFormFields()}
        </form>
      )}
    </>
  );
};

export default WorkPostForm;
