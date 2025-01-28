import React from "react";
import Page from "../../components/common/Page";
import Loader from "../../components/common/Loader";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import SelectDropDown from "./components/SelectDropDown";
import DynamicDataGrid from "./components/DynamicDataGrid";
import { Button, Input } from "@headlessui/react";
import DeleteConfirmModal from "./components/modals/DeleteConfirmModal";
import RestoreConfirmModal from "./components/modals/RestoreConfirmModal";
import { generateCSV } from "./utilities/generateCSV";
import { File, Search } from "lucide-react";
import TypeWrapper from "./components/TypeWrapper";
import CustomDataGrid from "./components/CustomDataGrid";
import { Pagination } from "@mui/material";

const EndorsementLetterRequestsPresenter = ({
  loading,
  items,
  selectedStatus,
  setSelectedStatus,

  selectedURL,
  setSelectedURL,

  authorizeRole,
  rows,
  setRows,
  columns,

  /** Date Selection */
  selectedDate,
  setSelectedDate,

  /** Modal Props */
  openDelete,
  setOpenDelete,
  handleDelete,

  openRestore,
  setOpenRestore,
  handleRestore,

  /* Data Grid Props */
  paginationModel,
  totalCount,
  searchInput,
  handleSearchInputChange,
  handleSearchKeyDown,
  dataGridLoading,
  handlePaginationModelChange,
  onSelectionModelChange,
}) => {
  return (
    <Page>
      {/* Loader */}
      <Loader loading={loading} />

      {/* Modals */}
      <DeleteConfirmModal
        open={openDelete}
        setOpen={setOpenDelete}
        handleDelete={handleDelete}
      />

      <RestoreConfirmModal
        open={openRestore}
        setOpen={setOpenRestore}
        handleRestore={handleRestore}
      />

      <Section>
        <Heading level={3} text={"Endorsement Letter Requests"} />
        <Text className="text-sm text-blue-950">
          This is where you manage the endorsement letter requests.
        </Text>
        <hr className="my-3" />
      </Section>

      <div className="mt-3">
        <div className="mb-3 flex items-center gap-2">
          <TypeWrapper type={selectedStatus} requiredType={"walk-in"}>
            <Button
              onClick={() => generateCSV(rows)}
              className="bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md text-sm text-white font-semibold flex gap-2 items-center"
            >
              <File size={18} />
              Download CSV
            </Button>
          </TypeWrapper>

          <SelectDropDown
            items={items}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            selectedURL={selectedURL}
            setSelectedURL={setSelectedURL}
          />

          {!(selectedStatus === "archived") && (
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-3 px-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-[44px]"
            />
          )}
        </div>

        <div>
          <div className="mb-4 flex justify-between items-center">
            {/* Pagination */}
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
            onSelectionModelChange={onSelectionModelChange}
          />
        </div>
      </div>
    </Page>
  );
};

export default EndorsementLetterRequestsPresenter;
