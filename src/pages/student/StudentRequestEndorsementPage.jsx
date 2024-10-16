import React from "react";
import { useParams } from "react-router-dom";

const StudentRequestEndorsementPage = () => {
  const { job_id } = useParams();

  return <div>{job_id}</div>;
};

export default StudentRequestEndorsementPage;
