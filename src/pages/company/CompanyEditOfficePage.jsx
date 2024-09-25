import React from "react";
import { useParams } from "react-router-dom";

const CompanyEditOfficePage = () => {
  // Use Params
  const { id } = useParams();

  return <div>{id}</div>;
};

export default CompanyEditOfficePage;
