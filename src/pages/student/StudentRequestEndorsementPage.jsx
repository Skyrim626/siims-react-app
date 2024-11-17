import React from "react";
import { useParams } from "react-router-dom";

const StudentRequestEndorsementPage = () => {
  const { job_id } = useParams();

  console.log(`Job_Id: ${job_id}`);

  return (
    <div>
      <button>Send Endorsement Request</button>
    </div>
  );
};

export default StudentRequestEndorsementPage;
