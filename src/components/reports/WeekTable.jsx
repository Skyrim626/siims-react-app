const WeekTable = ({ week }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{week.week}</h3>
    <table className="min-w-full border-collapse bg-white rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-gray-800 text-white">
          <th className="px-4 py-2 text-left">Date</th>
          <th className="px-4 py-2 text-left">Time In</th>
          <th className="px-4 py-2 text-left">Time Out</th>
          <th className="px-4 py-2 text-left">Hours Recorded</th>
          <th className="px-4 py-2 text-left">Status</th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {week.records.map((record, idx) => (
          <tr key={idx} className="border-b">
            <td className="px-4 py-2">{record.date}</td>
            <td className="px-4 py-2">{record.timeIn}</td>
            <td className="px-4 py-2">{record.timeOut}</td>
            <td className="px-4 py-2">{record.hours}</td>
            <td className="px-4 py-2">
              <span
                className={`px-3 py-1 text-white rounded-full ${
                  record.status === "Present" ? "bg-green-500" : "bg-gray-400"
                }`}
              >
                {record.status || "Not Set"}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default WeekTable;
