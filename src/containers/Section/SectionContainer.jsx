import React, { useState } from "react";
import Loader from "../../components/common/Loader";
import SectionPresenter from "./SectionPresenter";

const SectionContainer = ({ authorizeRole }) => {
  /**
   *
   *
   * LOADING STATE
   *
   *
   */
  const [loading, setLoading] = useState(false);

  /**
   *
   * ROW STATE
   *
   *
   */
  const [rows, setRows] = useState([]);

  /**
   *
   *
   * MODAL STATE
   *
   *
   */
  const [isOpen, setIsOpen] = useState(false);

  /**
   *
   *
   * SELECT STATE
   *
   *
   */
  const [selectedSection, setSelectedSection] = useState(0);

  /**
   *
   *
   * LIST STATE
   *
   *
   */
  const [sections, setSections] = useState([]);

  // Check loading
  if (loading) {
    return <Loader loading={loading} />;
  }

  return <SectionPresenter />;
};

export default SectionContainer;
