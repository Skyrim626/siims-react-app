import React from "react";
import { formatDate } from "../../../../_global/utilities/formatDate";
import { formatTime } from "../../../../_global/utilities/formatTime";
import { formatCreatedAt } from "../../../../_global/utilities/formatCreatedAt";

const DailyEntriesContent = ({ entries = [] }) => {
  // console.log(entries);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {entries && entries.length > 0 ? (
        <>
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Daily Reports
          </h2>

          <table className="table-fixed w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="border border-gray-200 px-4 py-2">Date</th>
                <th className="border border-gray-200 px-4 py-2">Time In</th>
                <th className="border border-gray-200 px-4 py-2">Time Out</th>
                <th className="border border-gray-200 px-4 py-2">
                  Hours Received
                </th>
                <th className="border border-gray-200 px-4 py-2 text-center">
                  Created At
                </th>
                <th className="border border-gray-200 px-4 py-2 text-center">
                  Updated At
                </th>
                <th className="border border-gray-200 px-4 py-2 text-center">
                  Deleted At
                </th>
              </tr>
            </thead>

            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className="odd:bg-white even:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">
                    {formatDate(entry.date)}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {formatTime(entry.time_in)}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {formatTime(entry.time_out)}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {entry.hours_received}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {formatCreatedAt(entry.created_at)}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {entry.updated_at
                      ? formatCreatedAt(entry.updated_at)
                      : null}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {entry.deleted_at
                      ? formatCreatedAt(entry.deleted_at)
                      : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <div className="w-full h-56 flex justify-center items-center">
            <p className="font-bold text-2xl text-gray-500">
              No Daily Reports Found
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default DailyEntriesContent;
