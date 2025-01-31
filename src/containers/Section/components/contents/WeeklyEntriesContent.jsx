import React, { useEffect, useState } from "react";
import Loader from "../../../../components/common/Loader";
import { fetchWeeklyByStudent } from "../../Api";
import { formatDate } from "../../../../_global/utilities/formatDate";
import { Button } from "@headlessui/react";
import { formatCreatedAt } from "../../../../_global/utilities/formatCreatedAt";
import Modal from "../../../../components/modals/Modal";
import DOMPurify from "dompurify";

const WeeklyEntriesContent = ({ userID }) => {
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
   *
   * MODAL STATE
   *
   *
   */
  const [isTaskViewOpen, setIsTaskViewOpen] = useState(false);
  const [isLearningViewOpen, setIsLearningViewOpen] = useState(false);

  /**
   *
   *
   * ENTRY STATE
   *
   *
   */
  const [entries, setEntries] = useState([]);

  /**
   *
   *
   * SELECT STATE
   *
   *
   */
  const [selectedTask, setSelectedTask] = useState("");
  const [selectedLearning, setSelectedLearning] = useState("");

  /**
   *
   *
   * USE EFFECT
   *
   *
   */
  useEffect(() => {
    fetchData();
  }, []);

  /**
   *
   *
   * API FUNCTIONS
   *
   *
   */
  const fetchData = async () => {
    await fetchWeeklyByStudent({
      setLoading: setLoading,
      studentID: userID,
      setRows: setEntries,
    });
  };

  /**
   *
   *
   * OTHER FUNCTIONS
   *
   *
   */
  const openViewTask = (task) => {
    // console.log(task);
    setSelectedTask(task);
    setIsTaskViewOpen(true);
  };

  const openViewLearning = (learning) => {
    // console.log(task);
    setSelectedLearning(learning);
    setIsLearningViewOpen(true);
  };

  // console.log(entries);

  return (
    <div>
      <Loader loading={loading} />

      {/* Modals */}
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

      <div className="p-4 bg-white shadow-md rounded-lg">
        {entries && entries.length > 0 ? (
          <>
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Weekly Reports
            </h2>

            <table className="table-fixed w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="border border-gray-200 px-4 py-2">Week</th>
                  <th className="border border-gray-200 px-4 py-2">
                    Start Date
                  </th>
                  <th className="border border-gray-200 px-4 py-2">End Date</th>
                  <th className="border border-gray-200 px-4 py-2">Tasks</th>
                  <th className="border border-gray-200 px-4 py-2">
                    Learnings
                  </th>
                  <th className="border border-gray-200 px-4 py-2">
                    No. of Hours
                  </th>
                  <th className="border border-gray-200 px-4 py-2">
                    Created At
                  </th>
                  <th className="border border-gray-200 px-4 py-2">
                    Updated At
                  </th>
                </tr>
              </thead>

              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id} className="odd:bg-white even:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2">
                      {entry.week_number}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {formatDate(entry.start_date)}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {formatDate(entry.end_date)}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      <Button
                        onClick={() => openViewTask(entry.tasks)}
                        className="text-sm text-blue-500 underline hover:text-blue-700"
                      >
                        Read Tasks
                      </Button>
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      <Button
                        onClick={() => openViewLearning(entry.learnings)}
                        className="text-sm text-blue-500 underline hover:text-blue-700"
                      >
                        Read Learnings
                      </Button>
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {entry.no_of_hours}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {formatCreatedAt(entry.created_at)}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {entry.updated_at
                        ? formatCreatedAt(entry.updated_at)
                        : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <div className="w-full h-56 flex justify-center items-center">
              <p className="font-bold text-2xl text-gray-500">
                No Weekly Reports Found
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeeklyEntriesContent;
