import React, { useState } from "react";
import StudentPresenter from "./StudentPresenter";

const StudentContainer = ({ authorizeRole }) => {
  /**
   *
   *
   * Loading State
   *
   *
   */
  const [loading, setLoading] = useState(false);

  return <StudentPresenter authorizeRole={authorizeRole} />;
};

export default StudentContainer;
