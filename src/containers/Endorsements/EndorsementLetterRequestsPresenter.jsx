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
import { File } from "lucide-react";
import TypeWrapper from "./components/TypeWrapper";

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

        <DynamicDataGrid
          searchPlaceholder={"Search Endorsement..."}
          rows={rows}
          setRows={setRows}
          columns={columns}
          url={selectedURL}
          requestedBy={authorizeRole}
          checkboxSelection={false}
          selectedDate={selectedDate}
        />
      </div>
    </Page>
  );
};

export default EndorsementLetterRequestsPresenter;
