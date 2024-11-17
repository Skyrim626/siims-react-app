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
  requestMethod = "post",
  workTypeId = "",
  title = "",
  responsibilities = "",
  qualifications = "",
  startDate = "",
  endDate = "",
  workDuration = "",
  maxApplicants = "",
  setWorkTypeId = () => {},
  setTitle = () => {},
  setResponsibilities = () => {},
  setQualifications = () => {},
  setStartDate = () => {},
  setEndDate = () => {},
  setMaxApplicants = () => {},
  setWorkDuration = () => {},
  isFormModal = true,
  method = "post",
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
  handleSubmit = () => {
    console.log("Submit");
  },
  requiredFields = {
    workTypeId: true,
    title: true,
    responsibilities: true,
    qualifications: true,
    startDate: true,
    endDate: true,
    maxApplicants: true,
    workDuration: true,
  },
  displayFields = {
    workTypeId: true,
    title: true,
    responsibilities: true,
    qualifications: true,
    startDate: true,
    endDate: true,
    workDuration: true,
    maxApplicants: true,
  },
}) => {
  // console.log(startDate);

  // Method Checker
  const buttonTitle = () => {
    switch (requestMethod) {
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
          {displayFields.workTypeId && (
            <Field className="mb-4">
              <Label
                htmlFor="workTypeId"
                className="text-gray-700 font-bold mb-2 flex items-center"
              >
                <Briefcase size={20} className="mr-2 text-blue-600" />
                Work Type
                {requiredFields.workTypeId && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              <Select
                id="workTypeId"
                name="workTypeId"
                className="border rounded-lg w-full py-2 px-3 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
                value={workTypeId}
                onChange={(e) => {
                  setWorkTypeId(e.target.value);
                }}
                required={requiredFields.workTypeId}
              >
                <option value=" ">-Select Work Type-</option>
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
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
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
              value={responsibilities}
              onChange={(e) => {
                setResponsibilities(e.target.value);
              }}
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
              value={qualifications}
              onChange={(e) => {
                setQualifications(e.target.value);
              }}
              required={requiredFields.qualifications}
              rows={3}
            />
          </Field>

          {/* MaxApplicants */}
          <Field className="mb-4">
            <Label
              htmlFor="phone_number"
              className="text-gray-700 font-bold mb-2 flex items-center"
            >
              <Users size={20} className="mr-2 text-blue-600" />
              Max Applicants
              {requiredFields.maxApplicants && (
                <span className="text-red-500">*</span>
              )}
            </Label>
            <Input
              type="number"
              id="maxApplicants"
              name="maxApplicants"
              className="border rounded-lg w-full py-2 px-3 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
              placeholder="e.g. 5"
              value={maxApplicants}
              onChange={(e) => {
                setMaxApplicants(e.target.value);
              }}
              required={requiredFields.maxApplicants}
            />
          </Field>

          <div className="flex items-center gap-2">
            {/* Date Start */}
            <Field className="mb-4 flex-grow">
              <Label
                htmlFor="startDate"
                className="text-gray-700 font-bold mb-2 flex items-center"
              >
                <CalendarClock size={20} className="mr-2 text-blue-600" />
                Start Date
                {requiredFields.startDate && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              <Input
                type="date"
                id="startDate"
                name="startDate"
                className="border rounded-lg w-full py-2 px-3 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
                required={requiredFields.startDate}
              />
            </Field>

            {/* Date End */}
            <Field className="mb-4 flex-grow">
              <Label
                htmlFor="endDate"
                className="text-gray-700 font-bold mb-2 flex items-center"
              >
                <CalendarCheck size={20} className="mr-2 text-blue-600" />
                End Date
                {requiredFields.endDate && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              <Input
                type="date"
                id="endDate"
                name="endDate"
                className="border rounded-lg w-full py-2 px-3 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
                required={requiredFields.endDate}
              />
            </Field>

            {/* Work Duration */}
            <Field className="mb-4 flex-grow">
              <Label
                htmlFor="workDuration"
                className="text-gray-700 font-bold mb-2 flex items-center"
              >
                <Hourglass size={20} className="mr-2 text-blue-600" />
                Work Duration (in hours)
                {requiredFields.workDuration && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              <Input
                type="text"
                id="workDuration"
                name="workDuration"
                className="border rounded-lg w-full py-2 px-3 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
                placeholder="e.g. 40"
                value={workDuration}
                onChange={(e) => {
                  setWorkDuration(e.target.value);
                }}
                required={requiredFields.workDuration}
              />
            </Field>
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
              type="submit"
            >
              {buttonTitle}
            </Button>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className=" bg-white shadow-lg rounded-lg p-8 space-y-6"
      >
        {renderWorkPostFormFields()}
      </form>
    </>
  );
};

export default WorkPostForm;
