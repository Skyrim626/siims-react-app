const TraineeInfo = ({ trainee }) => (
  <div className="mb-4 text-sm text-gray-700">
    <p>
      <strong>Name:</strong> {trainee.name}
    </p>
    <p>
      <strong>Department:</strong> {trainee.department}
    </p>
    <p>
      <strong>Supervisor:</strong> {trainee.supervisor}
    </p>
  </div>
);

export default TraineeInfo;
