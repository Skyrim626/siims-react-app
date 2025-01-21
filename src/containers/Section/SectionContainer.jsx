import React, { useState } from "react";
import Loader from "../../components/common/Loader";
import SectionPresenter from "./SectionPresenter";

const SectionContainer = ({ authorizeRole }) => {
  /**
   *
   *
   * Loading State
   *
   *
   */
  const [loading, setLoading] = useState(false);

  // Row State
  const [rows, setRows] = useState([]);

  // Modal State
  const [isOpen, setIsOpen] = useState(false);

  // Check loading
  if (loading) {
    return <Loader loading={loading} />;
  }

  return <SectionPresenter />;
};

export default SectionContainer;
