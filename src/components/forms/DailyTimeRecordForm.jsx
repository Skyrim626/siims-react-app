import React from "react";
import Heading from "../common/Heading";
import FormField from "../common/FormField";
import { Input } from "@headlessui/react";

const DailyTimeRecordForm = ({
  method = "post",
  dailyTimeRecordInfo = {
    date,
    timeIn,
    timeOut,
    hoursReceived,
  },
  handleDailyTimeRecordInfoChange,
  handleSubmit = () => console.log("Testing"),
  requiredFields = {
    date: true,
    timeIn: true,
    timeOut: true,
    hoursReceived: true,
  },
  errors = {},
}) => {
  return (
    <>
      <div>
        <Heading
          level={5}
          color="black"
          text={"Daily Time Record Information"}
          className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
        />
        <div className="flex flex-col">
          <div className="grid grid-cols-1 gap-2 mt-4">
            {/* Date Field */}
            <div>
              <FormField
                label={"Date"}
                name={"date"}
                labelClassName="text-sm text-black font-semibold"
                required={requiredFields["date"]}
              >
                <Input
                  type="date"
                  className="outline-none text-black rounded-sm p-2 text-sm"
                  name="date"
                  onChange={handleDailyTimeRecordInfoChange}
                  placeholder="Date"
                  value={dailyTimeRecordInfo.date}
                  required={requiredFields["date"]}
                />
              </FormField>
              {errors.date && (
                <Text className="text-red-500">{errors.date[0]}</Text>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            {/* Time In Field */}
            <div>
              <FormField
                label={"Time In"}
                name={"timeIn"}
                labelClassName="text-sm text-black font-semibold"
                required={requiredFields["timeIn"]}
              >
                <Input
                  type="text"
                  className="outline-none text-black rounded-sm p-2 text-sm"
                  name="timeIn"
                  onChange={handleDailyTimeRecordInfoChange}
                  placeholder="Time In"
                  value={dailyTimeRecordInfo.timeIn}
                  required={requiredFields["timeIn"]}
                />
              </FormField>
              {errors.time_in && (
                <Text className="text-red-500">{errors.time_in[0]}</Text>
              )}
            </div>

            {/* Time Out Field */}
            <div>
              <FormField
                label={"Time Out"}
                name={"timeOut"}
                labelClassName="text-sm text-black font-semibold"
                required={requiredFields["timeOut"]}
              >
                <Input
                  type="text"
                  className="outline-none text-black rounded-sm p-2 text-sm"
                  name="timeOut"
                  onChange={handleDailyTimeRecordInfoChange}
                  placeholder="Time Out"
                  value={dailyTimeRecordInfo.timeOut}
                  required={requiredFields["timeOut"]}
                />
              </FormField>
              {errors.time_out && (
                <Text className="text-red-500">{errors.time_out[0]}</Text>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 mt-4">
            {/* Hours Received Field */}
            <div>
              <FormField
                label={"Hours Received"}
                name={"hoursReceived"}
                labelClassName="text-sm text-black font-semibold"
                required={requiredFields["hoursReceived"]}
              >
                <Input
                  type="number"
                  className="outline-none text-black rounded-sm p-2 text-sm"
                  name="hoursReceived"
                  onChange={handleDailyTimeRecordInfoChange}
                  placeholder="Time In"
                  value={dailyTimeRecordInfo.hoursReceived}
                  required={requiredFields["hoursReceived"]}
                />
              </FormField>
              {errors.hours_received && (
                <Text className="text-red-500">{errors.hours_received[0]}</Text>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyTimeRecordForm;
