import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EndorsementLetterRequestsPresenter from "./EndorsementLetterRequestsPresenter";
import {
  getEndorsementRequestsActionColumns,
  getEndorsementRequestsStaticColumns,
} from "./utilities/endorsementLetterRequestsColumns";
import { GET_ALL_URL, GET_ALL_WALK_IN_URL } from "./constants/resources";
import { useDispatch, useSelector } from "react-redux";
import { setFormValues } from "./_redux/endorsementLetterDetailSlice";

// Items for Drop down
const items = [
  {
    value: "all",
    label: "All",
    url: GET_ALL_URL,
  },
  {
    value: "walk-in",
    label: "Walk-In",
    url: GET_ALL_WALK_IN_URL,
  },
];

const EndorsementLetterRequestsContainer = ({ authorizeRole }) => {
  /**
   *
   *
   * Location and Navigate
   *
   *
   */
  const location = useLocation();
  const navigate = useNavigate();

  /**
   *
   *
   * Loading State
   *
   *
   */
  const [loading, setLoading] = useState(false);

  /**
   *
   *
   * Row States and Redux
   *
   *
   */
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.endorsementLetterDetailSlice);

  /**
   *
   *
   * Select State
   *
   *
   */
  const [selectedStatus, setSelectedStatus] = useState(items[0].value);
  const [selectedURL, setSelectedURL] = useState(items[0].url);

  /**
   *
   *
   * Other Functions
   *
   *
   */
  const viewEndorsementPage = (id, type, row) => {
    dispatch(setFormValues(row));

    navigate(`${location.pathname}/${id}`, {
      state: { type, data: row },
    });
  };

  /**
   *
   *
   * Column Renderer
   *
   *
   */

  // Static Columns
  const staticColumns = useMemo(
    () =>
      getEndorsementRequestsStaticColumns({
        pathname: location.pathname,
        viewEndorsementPage: viewEndorsementPage,
        selectedStatus: selectedStatus,
      }),
    [selectedStatus, authorizeRole]
  );

  // Action Columns
  const actionColumns = useMemo(
    () =>
      getEndorsementRequestsActionColumns({
        pathname: location.pathname,
        selectedStatus: selectedStatus,
      }),
    [authorizeRole, selectedStatus]
  );

  // Render Columns
  const columns = useMemo(
    () => [...staticColumns, actionColumns],
    [staticColumns, actionColumns]
  );

  return (
    <EndorsementLetterRequestsPresenter
      items={items}
      selectedStatus={selectedStatus}
      setSelectedStatus={setSelectedStatus}
      selectedURL={selectedURL}
      setSelectedURL={setSelectedURL}
      authorizeRole={authorizeRole}
      rows={rows}
      setRows={setRows}
      columns={columns}
    />
  );
};

export default EndorsementLetterRequestsContainer;
