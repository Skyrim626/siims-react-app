import React from "react";
import Heading from "../common/Heading";
import FormField from "../common/FormField";
import { Input, Textarea } from "@headlessui/react";

const WeeklyEntryForm = ({
  method = "post",
  weeklyEntryInfo = {
    weekNumber: "",
    startDate: "",
    endDate: "",
    tasks: "",
    learnings: "",
    noOfHours: "",
  },
  handleWeeklyEntryInfoChange,
  handleSubmit = () => console.log("Testing"),
  requiredFields = {
    weekNumber: true,
    startDate: true,
    endDate: true,
    tasks: true,
    learnings: true,
    noOfHours: true,
  },
  errors = {},
}) => {
  return (
    <>
      <div className="space-y-3">
        <Heading
          level={5}
          color="black"
          text={"Weekly Entry Information"}
          className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
        />
        <div className="flex flex-col">
          <div className="grid grid-cols-2 gap-2 mt-4">
            {/* Week Number Field */}
            <div>
              <FormField
                label={"Week Number"}
                name={"weekNumber"}
                labelClassName="text-sm text-black font-semibold"
                required={requiredFields["weekNumber"]}
              >
                <Input
                  type="number"
                  className="outline-none text-black rounded-sm p-2 text-sm"
                  name="weekNumber"
                  onChange={handleWeeklyEntryInfoChange}
                  placeholder="Week number"
                  value={weeklyEntryInfo.weekNumber}
                  required={requiredFields["weekNumber"]}
                />
              </FormField>
              {errors.week_number && (
                <Text className="text-red-500">{errors.week_number[0]}</Text>
              )}
            </div>

            {/* Number of Hours Field */}
            <div>
              <FormField
                label={"No. of hours"}
                name={"noOfHours"}
                labelClassName="text-sm text-black font-semibold"
                required={requiredFields["noOfHours"]}
              >
                <Input
                  type="number"
                  className="outline-none text-black rounded-sm p-2 text-sm"
                  name="noOfHours"
                  onChange={handleWeeklyEntryInfoChange}
                  placeholder="Week number"
                  value={weeklyEntryInfo.noOfHours}
                  required={requiredFields["noOfHours"]}
                />
              </FormField>
              {errors.no_of_hours && (
                <Text className="text-red-500">{errors.no_of_hours[0]}</Text>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            {/* Start Date Field */}
            <div>
              <FormField
                label={"Start Date"}
                name={"startDate"}
                labelClassName="text-sm text-black font-semibold"
                required={requiredFields["startDate"]}
              >
                <Input
                  type="date"
                  className="outline-none text-black rounded-sm p-2 text-sm"
                  name="startDate"
                  onChange={handleWeeklyEntryInfoChange}
                  placeholder="Start Date"
                  value={weeklyEntryInfo.startDate}
                  required={requiredFields["startDate"]}
                />
              </FormField>
              {errors.startDate && (
                <Text className="text-red-500">{errors.start_date[0]}</Text>
              )}
            </div>

            {/* End Date Field */}
            <div>
              <FormField
                label={"End Date"}
                name={"endDate"}
                labelClassName="text-sm text-black font-semibold"
                required={requiredFields["endDate"]}
              >
                <Input
                  type="date"
                  className="outline-none text-black rounded-sm p-2 text-sm"
                  name="endDate"
                  onChange={handleWeeklyEntryInfoChange}
                  placeholder="End Date"
                  value={weeklyEntryInfo.endDate}
                  required={requiredFields["endDate"]}
                />
              </FormField>
              {errors.endDate && (
                <Text className="text-red-500">{errors.end_date[0]}</Text>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 mt-4">
            {/* Tasks Field */}
            <div>
              <FormField
                label={"Tasks"}
                name={"tasks"}
                labelClassName="text-sm text-black font-semibold"
                required={requiredFields["tasks"]}
              >
                <Textarea
                  name="tasks"
                  className="outline-none text-black rounded-sm p-2 text-sm"
                  onChange={handleWeeklyEntryInfoChange}
                  placeholder="Tasks"
                  value={weeklyEntryInfo.tasks}
                  rows={5}
                />
              </FormField>
              {errors.tasks && (
                <Text className="text-red-500">{errors.tasks[0]}</Text>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 mt-4">
            {/* Learnings Field */}
            <div>
              <FormField
                label={"Learnings"}
                name={"learnings"}
                labelClassName="text-sm text-black font-semibold"
                required={requiredFields["learnings"]}
              >
                <Textarea
                  name="learnings"
                  className="outline-none text-black rounded-sm p-2 text-sm"
                  onChange={handleWeeklyEntryInfoChange}
                  placeholder="Learnings"
                  value={weeklyEntryInfo.learnings}
                  rows={5}
                />
              </FormField>
              {errors.learnings && (
                <Text className="text-red-500">{errors.learnings[0]}</Text>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeeklyEntryForm;
