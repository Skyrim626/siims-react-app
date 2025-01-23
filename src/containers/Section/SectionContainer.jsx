import React, { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import SectionPresenter from "./SectionPresenter";
import { getSection } from "./Api";

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
  const [selectedSection, setSelectedSection] = useState({ id: 0 });

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

    try {
      const response = await getSection({
        authorizeRole: authorizeRole,
        searchTerm: searchSection,
      });

      if (response) {
        // console.log(response);
        setSections(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Check loading
  /* if (loading) {
    return <Loader loading={loading} />;
  } */

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
      />
    </div>
  );
};

export default SectionContainer;
