import { Button } from "@headlessui/react";
import { Plus } from "lucide-react";
import React from "react";
import Text from "../../components/common/Text";
import WeeklyRecordModalForm from "./forms/WeeklyRecordModalForm";
import Loader from "../../components/common/Loader";
import { formatDate } from "../../_global/utilities/formatDate";
import { formatCreatedAt } from "../../_global/utilities/formatCreatedAt";
import DOMPurify from "dompurify";
import Modal from "../../components/modals/Modal";

const WeeklyReportPresenter = ({
  loading,
  rows = [],

  // viewWeeklyRecordPDF = () => {},
  /** Form Props */
  formData,
  handleInputChange,

  /** Add Props */
  setIsAddOpen = () => {},
  isAddOpen = false,
  addWeeklyTimeRecord,

  /** Update props */
  openEditModal,
  isEditOpen,
  setIsEditOpen,
  updateWeeklyTimeRecord,

  /** Validation Error Props */
  validationErrors,

  /** Task View Props */
  selectedTask,

  openTaskViewModal,
  isTaskViewOpen,
  setIsTaskViewOpen,

  /** Learning View Props */
  selectedLearning,
  openLearningViewModal,
  isLearningViewOpen,
  setIsLearningViewOpen,

  /** Delete Props */
  deleteWeeklyTimeRecord,
}) => {
  return (
    <div>
      <Loader loading={loading} />

      {/* Modals */}
      {/* Add Form Modal */}
      <WeeklyRecordModalForm
        formData={formData}
        handleInputChange={handleInputChange}
        isOpen={isAddOpen}
        setIsOpen={setIsAddOpen}
        onSubmit={addWeeklyTimeRecord}
        validationErrors={validationErrors}
      />

      {/* Update Form Modal */}
      <WeeklyRecordModalForm
        method="put"
        formData={formData}
        handleInputChange={handleInputChange}
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        onSubmit={updateWeeklyTimeRecord}
        validationErrors={validationErrors}
      />

      {/* View Modals */}
      <Modal
        isOpen={isLearningViewOpen}
        setIsOpen={setIsLearningViewOpen}
        modalTitle="View Learnings"
        minWidth="min-w-[500px]"
      >
        {selectedLearning ? (
          <div
            className="prose dark:prose-invert"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(selectedLearning),
            }}
          ></div>
        ) : (
          <p>No learnings available</p>
        )}
      </Modal>

      <Modal
        isOpen={isTaskViewOpen}
        setIsOpen={setIsTaskViewOpen}
        modalTitle="View Tasks"
        minWidth="min-w-[500px]"
      >
        {selectedTask ? (
          <div
            className="prose dark:prose-invert"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(selectedTask),
            }}
          ></div>
        ) : (
          <p>No task available</p>
        )}
      </Modal>

      <div className="mx-auto py-6 bg-white rounded-lg mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Weekly Accomplishment
        </h2>

        <div className="flex items-center justify-between my-3">
          <div className="flex items-center space-x-2">
            {/* <Button
              type="button"
              onClick={viewWeeklyRecordPDF}
              className="text-sm flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              View Weekly Accomplishment as PDF
            </Button> */}
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
                <th className="py-3 px-4 text-left border">Week</th>
                <th className="py-3 px-4 text-left border">Start Date</th>
                <th className="py-3 px-4 text-left border">End Date</th>
                <th className="py-3 px-4 text-left border">Tasks</th>
                <th className="py-3 px-4 text-left border">Learnings</th>
                <th className="py-3 px-4 text-left border">No of Hours</th>
                <th className="py-3 px-4 text-left border">Created At</th>
                <th className="py-3 px-4 text-left border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? (
                rows.map((row, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-3 px-4 border">{row.week_number}</td>
                    <td className="py-3 px-4 border">
                      {formatDate(row.start_date)}
                    </td>
                    <td className="py-3 px-4 border">
                      {formatDate(row.end_date)}
                    </td>
                    <td className="py-3 px-4 border">
                      <Button
                        onClick={() => openTaskViewModal(row.tasks)}
                        className="hover:underline text-blue-500 hover:text-blue-600"
                      >
                        Read Tasks
                      </Button>
                    </td>
                    <td className="py-3 px-4 border">
                      <Button
                        onClick={() => openLearningViewModal(row.learnings)}
                        className="hover:underline text-blue-500 hover:text-blue-600"
                      >
                        Read Learnings
                      </Button>
                    </td>
                    {/* <td
                      className="py-3 px-4 border"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(row.tasks),
                      }}
                    ></td>
                    <td
                      className="py-3 px-4 border"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(row.learnings),
                      }}
                    ></td> */}
                    <td className="py-3 px-4 border">{row.no_of_hours}</td>
                    <td className="py-3 px-4 border">
                      {formatCreatedAt(row.created_at)}
                    </td>
                    <td className="py-3 px-4 flex items-center justify-center">
                      <Button
                        onClick={() => openEditModal(row)}
                        className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded px-3 py-1 mr-2"
                      >
                        Update
                      </Button>
                      <Button
                        onClick={() => deleteWeeklyTimeRecord(row.id)}
                        className="text-sm bg-red-500 hover:bg-red-600 text-white rounded px-3 py-1"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  <tr>
                    <td colSpan="6" className="py-4 text-center text-gray-500">
                      No records found
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WeeklyReportPresenter;
