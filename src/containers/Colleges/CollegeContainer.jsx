import React, { useState } from "react";

const CollegeContainer = ({ authorizeRole }) => {
  /**
   *
   *
   * LOADING
   *
   *
   */
  const [loading, setLoading] = useState(false);

  /**
   *
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
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return <div></div>;
};

export default CollegeContainer;
