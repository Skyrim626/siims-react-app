import React, { useEffect, useMemo, useState } from "react";
import Loader from "../../components/common/Loader";
import SectionPresenter from "./SectionPresenter";
import { getSection } from "./Api";
import {
  getStudentActionColumns,
  getStudentStaticColumns,
} from "./utilities/studentColumns";

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
  const [isOpenSection, setIsOpenSection] = useState(false);
  const [isSectionOpen, setIsSectionOpen] = useState(false);

  /**
   *
   *
   * SELECT STATE
   *
   *
   */
  const [selectedSection, setSelectedSection] = useState({ id: null });

  /**
   *
   *
   * LIST STATE
   *
   *
   */
  const [sections, setSections] = useState([]);

  /**
   *
   *
   * SEARCH STATE
   *
   *
   */
  const [searchSection, setSearchSection] = useState("");

  /**
   *
   *
   * SUBMIT FUNCTIONS
   *
   *
   */

  /**
   *
   *
   * FETCHING
   *
   *
   */

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    // Set Loading
    setLoading(true);

    // console.log(authorizeRole);

    try {
      const response = await getSection({
        authorizeRole: authorizeRole,
        searchTerm: searchSection,
      });

      if (response) {
        // console.log(response);
        setSelectedSection(response[0] || { id: null, name: "All" });
        setSections(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   *
   * COLUMNS
   *
   */
  // Static Columns
  const staticColumns = useMemo(
    () =>
      getStudentStaticColumns({
        authorizeRole: authorizeRole,
      }),
    [authorizeRole]
  );

  // Action Column
  const actionColumn = useMemo(
    () =>
      getStudentActionColumns({
        authorizeRole,
      }),
    [authorizeRole]
  );

  // Render Columns
  const columns = useMemo(
    () => [...staticColumns, actionColumn],
    [staticColumns, actionColumn]
  );

  return (
    <div>
      <Loader loading={loading} />
      <SectionPresenter
        authorizeRole={authorizeRole}
        sections={sections}
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
        isSectionOpen={isSectionOpen}
        setIsSectionOpen={setIsSectionOpen}
        searchSection={searchSection}
        setSearchSection={setSearchSection}
        fetchSections={fetchSections}
        isOpenSection={isOpenSection}
        setIsOpenSection={setIsOpenSection}
        rows={rows}
        setRows={setRows}
        columns={columns}
      />
    </div>
  );
};

export default SectionContainer;
