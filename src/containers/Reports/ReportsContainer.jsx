import React, { useState } from "react";
import ReportsPresenter from "./ReportsPresenter";

const ReportsContainer = ({ authorizeRole }) => {
  const [activeTab, setActiveTab] = useState("daily");

  return (
    <ReportsPresenter
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      authorizeRole={authorizeRole}
    />
  );
};

export default ReportsContainer;
