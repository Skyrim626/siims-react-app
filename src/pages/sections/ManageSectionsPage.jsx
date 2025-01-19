import React, { useEffect, useState } from "react";
import { GET_API_ROUTE_PATH, POST_API_ROUTE_PATH } from "../../api/resources";
import Loader from "../../components/common/Loader";
import useRequest from "../../hooks/useRequest";
import StatusDropdown from "../../components/dropdowns/StatusDropdown";
import useForm from "../../hooks/useForm";
import ManageHeader from "../../components/common/ManageHeader";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import FormModal from "../../components/modals/FormModal";
import SectionForm from "../../components/forms/SectionForm";
import { postFormDataRequest } from "../../api/apiHelpers";

const ManageSectionsPage = ({ authorizeRole }) => {
  // Loading State
  const [loading, setLoading] = useState(false);

  /**
   *
   *
   *
   *
   * Container State
   *
   *
   *
   *
   */
  const [rows, setRows] = useState([]);
  const [sections, setSections] = useState([]);

  /**
   *
   *
   *
   * Modal State
   *
   *
   */
  const [isOpen, setIsOpen] = useState(false);

  /**
   *
   *
   *
   * URL State
   *
   *
   */
  const [dataGridUrl, setDataGridUrl] = useState(GET_API_ROUTE_PATH.sections);

  /**
   *
   *
   * Select State
   *
   *
   *
   */
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSectionID, setSelectedSectionID] = useState(null);

  /**
   *
   *
   *
   * Modal State
   *
   *
   *
   */
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);

  useEffect(() => {
    setDataGridUrl(
      selectedStatus === "archived"
        ? `${GET_API_ROUTE_PATH.deans}?status=archived`
        : GET_API_ROUTE_PATH.deans
    );
  }, [selectedStatus]);

  // Use the useForm hook to manage form data
  const { formData, handleInputChange, resetForm, setFormValues } = useForm({
    name: "",
    limit: 0,
    class_list: null,

    program_id: 8,
  });

  /**
   * Use Request
   */
  const {
    errors: validationErrors,
    postData,
    putData,
    deleteData,
  } = useRequest({
    setData: setRows,
    setIsOpen: setIsOpen,
    setLoading: setLoading,
  });

  // Check if loading
  if (loading) {
    return <Loader loading={loading} />;
  }

  const addSection = () => {
    const sectionData = new FormData();

    // Append all form fields
    for (const key in formData) {
      sectionData.append(key, formData[key]);
    }

    // Check if a file is attached
    const file = sectionData.get("class_list");
    if (file) {
      console.log("File attached:", file.name);
    } else {
      console.log("No file attached.");
    }

    // Log FormData contents
    for (let [key, value] of sectionData.entries()) {
      console.log(`${key}:`, value);
    }

    postData({
      url: POST_API_ROUTE_PATH.sections,
      payload: sectionData,
      params: {
        requestedBy: authorizeRole,
      },
    });
  };

  // Return Sections
  return (
    <Page>
      <Section>
        <Heading level={3} text="Manage Sections" />
        <Text className="text-md text-blue-950">
          This is where you manage the sections.
        </Text>
        <hr className="my-3" />
      </Section>

      <div className="mt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <StatusDropdown
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            />

            <StatusDropdown
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            />
          </div>

          <ManageHeader
            isOpen={isSectionModalOpen}
            setIsOpen={setIsSectionModalOpen}
            addPlaceholder="Add New Section"
            showExportButton={false}
            showImportButton={false}
          />
        </div>
      </div>

      {/* Modals */}
      <FormModal
        isOpen={isSectionModalOpen}
        setIsOpen={setIsSectionModalOpen}
        modalTitle="Add Section"
        onSubmit={addSection}
        minWidth="min-w-[1000px]"
      >
        <SectionForm
          sectionInfo={formData}
          handleInputChange={handleInputChange}
        />
      </FormModal>
    </Page>
  );
};

export default ManageSectionsPage;
