import React from "react";
import Loader from "../../components/common/Loader";
import { Button } from "@headlessui/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Plus } from "lucide-react";
import Text from "../../components/common/Text";
import FormModal from "../../components/modals/FormModal";
import DailyRecordModalForm from "./forms/DailyRecordModalForm";
import { formatDate } from "../../_global/utilities/formatDate";
import { formatTime } from "../../_global/utilities/formatTime";
import { formatCreatedAt } from "../../_global/utilities/formatCreatedAt";

const DailyReportPresenter = ({
  rows = [],
  loading,
  viewDailyTimeRecordPDF = () => {},
  fileName,

  formData,

  /** Add Modal */
  isAddOpen,
  setIsAddOpen,
  handleInputChange,

  /** Edit Modal */
  isEditOpen,
  setEditIsOpen,
  validationErrors,
  openEditModal,

  /** Function Props */
  addDailyTimeRecord,
  updateDailyTimeRecord,
  deleteDailyTimeRecord,
}) => {
  return (
    <div>
      {/* Modals */}
      {/* Add Form Modal */}
      {isAddOpen && (
        <DailyRecordModalForm
          formData={formData}
          handleInputChange={handleInputChange}
          isOpen={isAddOpen}
          setIsOpen={setIsAddOpen}
          addDailyTimeRecord={addDailyTimeRecord}
          validationErrors={validationErrors}
        />
      )}

      {/* Edit Form Modal */}
      {isEditOpen && (
        <DailyRecordModalForm
          method="put"
          formData={formData}
          handleInputChange={handleInputChange}
          isOpen={isEditOpen}
          setIsOpen={setEditIsOpen}
          addDailyTimeRecord={updateDailyTimeRecord}
          validationErrors={validationErrors}
        />
      )}

      <Loader loading={loading} />

      <div className="mx-auto py-6 bg-white rounded-lg mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Daily Time Record
        </h2>

        <div className="flex items-center justify-between my-3">
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              onClick={viewDailyTimeRecordPDF}
              className="text-sm flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              View DTR as PDF
            </Button>
          </div>

          <Button
            onClick={() => setIsAddOpen(!isAddOpen)}
            type="button"
            className="text-sm flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            <Plus size={20} />
            <Text>Add New Record</Text>
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                <th className="py-3 px-4 text-left border">Date</th>
                <th className="py-3 px-4 text-left border">Time In</th>
                <th className="py-3 px-4 text-left border">Time Out</th>
                <th className="py-3 px-4 text-left border">Hours Received</th>
                <th className="py-3 px-4 text-left border">Created At</th>
                <th className="py-3 px-4 text-left border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? (
                rows.map((row, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-3 px-4 border">{formatDate(row.date)}</td>
                    <td className="py-3 px-4 border">
                      {formatTime(row.time_in)}
                    </td>
                    <td className="py-3 px-4 border">
                      {formatTime(row.time_out)}
                    </td>
                    <td className="py-3 px-4 border">{row.hours_received}</td>
                    <td className="py-3 px-4 border">
                      {formatCreatedAt(row.created_at)}
                    </td>
                    <td className="py-3 px-4 border">
                      <Button
                        onClick={() => openEditModal(row)}
                        className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded px-3 py-1 mr-2"
                      >
                        Update
                      </Button>
                      <Button
                        onClick={() => deleteDailyTimeRecord(row.id)}
                        className="text-sm bg-red-500 hover:bg-red-600 text-white rounded px-3 py-1"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 text-center text-gray-500">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DailyReportPresenter;
