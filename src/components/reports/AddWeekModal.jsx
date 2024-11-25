const AddWeekModal = ({
  isOpen,
  onClose,
  onAddWeek,
  newWeekName,
  setNewWeekName,
  newRecords,
  setNewRecords,
}) => {
  if (!isOpen) return null;

  const handleInputChange = (index, field, value) => {
    const updatedRecords = [...newRecords];
    updatedRecords[index][field] = value;
    setNewRecords(updatedRecords);
  };

  const addRecord = () => {
    setNewRecords([
      ...newRecords,
      { date: "", timeIn: "", timeOut: "", hours: 0, status: "Present" },
    ]);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl font-semibold mb-4">Add New Week</h2>
        <input
          type="text"
          placeholder="Week Name"
          value={newWeekName}
          onChange={(e) => setNewWeekName(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        {newRecords.map((record, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <input
              type="date"
              value={record.date}
              onChange={(e) => handleInputChange(index, "date", e.target.value)}
              className="w-1/4 p-2 border rounded"
            />
            <input
              type="time"
              value={record.timeIn}
              onChange={(e) =>
                handleInputChange(index, "timeIn", e.target.value)
              }
              className="w-1/4 p-2 border rounded"
            />
            <input
              type="time"
              value={record.timeOut}
              onChange={(e) =>
                handleInputChange(index, "timeOut", e.target.value)
              }
              className="w-1/4 p-2 border rounded"
            />
            <input
              type="number"
              value={record.hours}
              onChange={(e) =>
                handleInputChange(index, "hours", e.target.value)
              }
              className="w-1/4 p-2 border rounded"
            />
          </div>
        ))}
        <button
          onClick={addRecord}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          + Add Record
        </button>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onAddWeek}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Add Week
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWeekModal;
