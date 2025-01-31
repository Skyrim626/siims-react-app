import React from "react";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import SearchableDropdown from "./components/SearchableDropdown";
import { Button, Input } from "@headlessui/react";
import { Plus, Search, UserCog, UserCogIcon } from "lucide-react";
import Modal from "../../components/modals/Modal";
import SectionForm from "./forms/SectionForm";
import DynamicDataGrid from "./components/DynamicDataGrid";
import { Pagination } from "@mui/material";
import CustomDataGrid from "./components/CustomDataGrid";
import AssignSectionForm from "./forms/AssignSectionForm";
import StudentContentModal from "./components/modals/StudentContentModal";

const SectionPresenter = ({
  /** Authorize prop */
  authorizeRole,

  /** Section Props */
  sections = [],
  selectedSection,
  setSelectedSection,
  isSectionOpen,
  setIsSectionOpen,
  searchSection,
  setSearchSection,
  fetchSections,
  isOpenSection,
  setIsOpenSection,

  /** Section Form Data Props */
  sectionFormData,
  sectionHandleInputChange,
  addNewSection,

  /** Data Grid Props */
  rows = [],
  setRows,
  columns,
  paginationModel,
  totalCount,
  searchInput,
  handleSearchInputChange,
  handleSearchKeyDown,
  dataGridLoading,
  handlePaginationModelChange,
  onRowSelectionModelChange,

  /** Section Assign Props */
  openSectionAssignModal,
  isSectionAssignOpen,
  setIsSectionAssignOpen,
  selectedRows = [],
  selectedSectionID,
  setSelectedSectionID,
  assignSection,

  /** Student Info Modal */
  isStudentModalOpen,
  setIsStudentModalOpen,
  selectedStudent,

  /** Testing Props */
  printSelectedRows,
}) => {
  return (
    <Page>
      {/* Modals */}
      <Modal
        isOpen={isOpenSection}
        setIsOpen={setIsOpenSection}
        modalTitle="Create new section"
      >
        <SectionForm
          authorizeRole={authorizeRole}
          sectionInfo={sectionFormData}
          handleInputChange={sectionHandleInputChange}
          addNewSection={addNewSection}
        />
      </Modal>

      <Modal
        modalTitle="Student Info"
        isOpen={isStudentModalOpen}
        setIsOpen={setIsStudentModalOpen}
        minWidth="min-w-[1250px]"
      >
        <StudentContentModal student={selectedStudent} />
      </Modal>

      <Modal
        isOpen={isSectionAssignOpen}
        setIsOpen={setIsSectionAssignOpen}
        modalTitle="Assign to Section"
        minWidth="min-w-[500px]"
      >
        <AssignSectionForm
          selectedSectionID={selectedSectionID}
          setSelectedSectionID={setSelectedSectionID}
          sections={sections}
          assignSection={assignSection}
        />
      </Modal>

      <Section>
        <Heading level={3} text="Manage Sections" />
        <Text className="text-md text-blue-950">
          This is where you manage the sections.
        </Text>
        <hr className="my-3" />
      </Section>

      <div className="flex items-center justify-between mb-3">
        {sections.length > 0 && (
          <div className="flex items-center gap-3">
            <SearchableDropdown
              items={sections}
              selectedItem={selectedSection}
              setSelectedItem={setSelectedSection}
              isOpen={isSectionOpen}
              setIsOpen={setIsSectionOpen}
              searchTerm={searchSection}
              setSearchTerm={setSearchSection}
              placeholder="Search section..."
              onSearchSubmit={fetchSections}
            />

            {selectedSection.id === "no-sections" && (
              <Button
                onClick={() => openSectionAssignModal()}
                className={`px-3 py-2 rounded-sm text-sm text-white font-semibold flex items-center gap-2 ${
                  selectedRows.length > 0
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-500 cursor-not-allowed"
                }`}
                disabled={!(selectedRows.length > 0)}
              >
                <UserCog size={18} />
                Assign Student
              </Button>
            )}
          </div>
        )}

        <div className="flex items-center justify-end gap-3">
          <Button
            className="flex gap-1 items-center text-sm px-2 py-2 bg-blue-500 hover:bg-blue-600 rounded-sm text-white font-semibold transition"
            onClick={() => setIsOpenSection(!isOpenSection)}
          >
            <Plus size={15} />
            Add New Section
          </Button>
        </div>
      </div>

      <div>
        <div className="mb-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Text className="font-semibold">Page</Text>

            <Pagination
              count={Math.ceil(totalCount / paginationModel.pageSize)} // Calculate number of pages
              page={paginationModel.page + 1} // Pagination uses 1-based index
              onChange={(event, page) =>
                handlePaginationModelChange({
                  ...paginationModel,
                  page: page - 1,
                })
              } // Handle page change
              shape="rounded"
              variant="outlined"
            />
          </div>

          <div className="p-2 w-[300px] rounded-full border border-blue-950 flex items-center space-x-3 bg-white">
            <Search size={20} />
            <Input
              type="text"
              placeholder={"Search by name, company, or email"}
              value={searchInput}
              onChange={handleSearchInputChange} // Update input field only
              className={"bg-transparent w-full outline-none"}
              onKeyDown={handleSearchKeyDown} // Trigger search on Enter key press
            />
          </div>
        </div>
        <CustomDataGrid
          loading={dataGridLoading}
          paginationModel={paginationModel}
          totalCount={totalCount}
          handlePaginationModelChange={handlePaginationModelChange}
          rows={rows}
          columns={columns}
          checkboxSelection={selectedSection.id === "no-sections"}
          onRowSelectionModelChange={onRowSelectionModelChange}
        />
      </div>
    </Page>
  );
};

export default SectionPresenter;
