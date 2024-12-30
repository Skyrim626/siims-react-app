import React, { useMemo, useState } from "react";

import Page from "../components/common/Page";
import Loader from "../components/common/Loader";
import Section from "../components/common/Section";
import Heading from "../components/common/Heading";
import { Button, Tab, TabGroup, TabList } from "@headlessui/react";
import Text from "../components/common/Text";
import DynamicDataGrid from "../components/tables/DynamicDataGrid";
import { Check } from "lucide-react";
import {
  getEndorsementRequestsApprovalActionColumns,
  getEndorsementRequestsApprovalStaticColumns,
} from "../utils/columns/endorsementLetterColumns";
import { postFormDataRequest, putRequest } from "../api/apiHelpers";
import FormModal from "../components/modals/FormModal";
import UploadForm from "./admin/forms/UploadForm";

// Tab Links
const tabLinks = [
  {
    name: "Pending Approval",
    url: "/endorsement-letter-requests/pending-approval",
  },
  {
    name: "Approved",
    url: "/endorsement-letter-requests/approved",
  },
];

const ManageEndorsementLetterApprovalPage = ({ authorizeRole }) => {
  // Loading State
  const [loading, setLoading] = useState(false);

  // File Type
  const [file, setFile] = useState();
  // Row State
  const [rows, setRows] = useState([]);
  // Modal State
  const [isOpenUpload, setIsOpenUpload] = useState(false);
  const [status, setStatus] = useState("");
  // Select State
  const [activeTab, setActiveTab] = useState(tabLinks[0]);
  // State to hold modal data
  const [selectedRow, setSelectedRow] = useState({}); // State for selected row
  const [selectedRows, setSelectedRows] = useState([]); // State for selected rows
  const [errors, setErrors] = useState({});

  // Function to handle row selection
  const handleRowSelection = (ids) => {
    setSelectedRows(ids); // Update state with selected row IDs
  };

  // Modal open handler
  const openModal = (row) => {
    console.log(row);
    setSelectedRow(row); // Store the data of the clicked row
    setIsOpenUpload(true); // Open the modal
  };

  // Modal close handler
  const closeModal = () => {
    setIsOpenUpload(false);
    setSelectedRow(null); // Clear the selected row data
  };

  /**
   * Update Endorsement Letter
   */
  const handleFileChange = (event) => {
    // console.log("Selected Row: ", selectedRow.id);
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("Selected File:", selectedFile);
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  // Submit File
  const submitFile = async (event) => {
    // Set Loading
    setLoading(true);

    event.preventDefault();
    if (!file) {
      setStatus("error");
      return;
    }

    // Create a FormData object
    const formData = new FormData();
    formData.append("pdf_file", file);

    try {
      // POST FORM DATA
      const response = await postFormDataRequest({
        url: `/api/v1/endorsement-letter-requests/${selectedRow.id}/dean-submit-endorsement-letter`,
        data: formData,
      });

      if (response) {
        setRows((prevData) =>
          prevData.map((data) =>
            data.id === selectedRow["id"] ? { ...data, ...response.data } : data
          )
        );
        closeModal();
      }
    } catch (error) {
      // console.log(error.response.data.errors);
      setErrors(error.response.data.errors); // Assuming validation errors are in `errors`
    } finally {
      setLoading(false);
    }
  };

  /**
   * Approves the selected Endorsement Letter Requests
   */
  const handleApprovedLetter = async (selectedIds) => {
    // console.log(selectedIds);

    // Set loading state
    setLoading(true);
    // console.log(selectedIds);
    try {
      const selectedData = rows.filter((row) => selectedRows.includes(row.id));
      // console.log(selectedData);

      // Extract only the IDs from the selected data
      const selectedIds = selectedData.map((row) => row.id);

      // console.log("Selected Ids: ", selectedIds);

      // Prepare payload containing the selected user IDs
      const payload = { ids: Array.from(selectedIds) };
      // console.log(payload);
      // Perform POST request to archive the selected users
      const response = await putRequest({
        url: "/api/v1/endorsement-letter-requests/mark-as-approved",
        data: payload,
        method: "post",
      });

      // console.log(response);
      // Check Response
      if (response) {
        // Update rows based on selected IDs
        setRows((prevData) =>
          prevData.map((row) => {
            // If the row's ID is in the selectedIds, update letter_status_id to 3
            if (selectedIds.includes(row.id)) {
              return {
                ...row,
                letter_status_id: 3, // Set to approved status
                letter_status_name: "Approved",
              };
            }

            return row; // Return unchanged row for non-selected IDs
          })
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Static Columns
  const staticColumns = useMemo(
    () =>
      getEndorsementRequestsApprovalStaticColumns({
        pathname: location.pathname,
        authorizeRole: authorizeRole,
        activeTab: activeTab,
      }),
    [authorizeRole, activeTab]
  );

  // Action Column
  const actionColumn = useMemo(
    () =>
      getEndorsementRequestsApprovalActionColumns({
        pathname: location.pathname,
        activeTab: activeTab,
        openModal: openModal,
      }),
    [authorizeRole, activeTab]
  );

  // Render Columns
  const columns = useMemo(
    () => [...staticColumns, actionColumn],
    [staticColumns, actionColumn]
  );

  return (
    <Page>
      <Loader loading={loading} />

      <Section>
        <Heading level={3} text={"Endorsement Letter Approvals"} />
        <Text className="text-sm text-blue-950">
          This is where you approve the endorsement letter requests.
        </Text>
        <hr className="my-3" />
      </Section>

      <div className="mt-3">
        <TabGroup>
          <TabList className="flex gap-4 mb-5">
            {tabLinks.map((tab, index) => {
              return (
                <Tab
                  key={index}
                  className={`rounded-full py-1 px-3 text-sm/6 font-semibold focus:outline-none ${
                    activeTab.name === tab.name
                      ? "bg-blue-700 text-white" // Active tab style
                      : "bg-transparent text-blue-700" // Inactive tab style
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.name}
                </Tab>
              );
            })}
          </TabList>

          {activeTab.name === "Pending Approval" && (
            <>
              {
                <div className="my-3">
                  <Button
                    // onClick={() => setIsAssignOpen(!isAssignOpen)}
                    onClick={() => handleApprovedLetter()}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
                      selectedRows.length > 0
                        ? "bg-green-500 text-white hover:bg-green-600 transition"
                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                    }`}
                    disabled={selectedRows.length === 0} // Disable button if no rows are selected
                  >
                    <Check className="w-5 h-5" />
                    Approve Letter
                  </Button>
                </div>
              }
            </>
          )}

          <DynamicDataGrid
            allowSearch={false}
            rows={rows}
            setRows={setRows}
            columns={columns}
            url={activeTab.url}
            onSelectionModelChange={handleRowSelection} // Handle selection change
            getRowId={(row) => row.id} // Define the row ID
          />
        </TabGroup>
      </div>

      <FormModal
        isOpen={isOpenUpload}
        setIsOpen={setIsOpenUpload}
        modalTitle="Upload Endorsement Letter"
        onSubmit={submitFile}
      >
        <UploadForm
          file={file}
          set={setFile}
          status={status}
          setStatus={setStatus}
          handleFileChange={handleFileChange}
        />
      </FormModal>
    </Page>
  );
};

export default ManageEndorsementLetterApprovalPage;
