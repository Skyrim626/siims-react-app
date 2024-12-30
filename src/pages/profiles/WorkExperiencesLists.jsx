import React, { useEffect, useState } from "react";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../api/apiHelpers";
import SectionCard from "../../components/profiles/SectionCard";
import { Button, Field, Input, Label } from "@headlessui/react";
import { formatDateOnly } from "../../utils/formatDate";
import { Check, Edit3, Trash2, X } from "lucide-react";
import Text from "../../components/common/Text";
import Loader from "../../components/common/Loader";

const WorkExperiencesLists = () => {
  const [loading, setLoading] = useState(false);
  const [workExperiences, setWorkExperiences] = useState([]);

  // Work experience states
  const [newWork, setNewWork] = useState({
    company_name: "",
    job_position: "",
    full_address: "",
    start_date: "",
    end_date: "",
  });
  const [editingWork, setEditingWork] = useState(null);
  const [editingData, setEditingData] = useState({});

  // Fetch Profile Data
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await getRequest({ url: "/api/v1/profiles/student" });
        if (response) {
          setWorkExperiences(response.work_experiences);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  /**
   * ADDING FUNCTIONS
   */
  const addWorkExperience = async () => {
    setLoading(true);

    try {
      const response = await postRequest({
        url: "/api/v1/work-experiences",
        data: newWork,
      });

      if (response) {
        setWorkExperiences((prev) => [...prev, response.data]);
        setNewWork({
          company_name: "",
          job_position: "",
          full_address: "",
          start_date: "",
          end_date: "",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Edit work experience
  const handleEdit = (work) => {
    setEditingWork(work.id);
    setEditingData({ ...work });
  };

  const saveEdit = async () => {
    setLoading(true);
    try {
      const response = await putRequest({
        url: `/api/v1/work-experiences/${editingWork}`,
        data: editingData,
      });
      if (response) {
        setWorkExperiences((prev) =>
          prev.map((work) =>
            work.id === editingWork ? { ...editingData } : work
          )
        );
        cancelEdit();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditingWork(null);
    setEditingData({});
  };

  const deleteWorkExperience = async (id) => {
    // console.log(id);

    setLoading(true);

    try {
      // DELETE METHOD
      const response = await deleteRequest({
        url: `/api/v1/work-experiences/${id}`,
      });

      if (response) {
        setWorkExperiences((prev) => prev.filter((data) => data.id !== id));

        cancelEdit();
      }

      // console.log("Testing");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Loader loading={loading} />

      <div className="mb-6">
        <h3 className="mb-4 text-lg font-semibold text-indigo-900">
          Work Experience
        </h3>

        <section>
          <ul className="space-y-4">
            {workExperiences.map((work) => (
              <li
                key={work.id}
                className="p-4 border rounded-lg shadow-sm bg-indigo-50"
              >
                {editingWork === work.id ? (
                  <>
                    <div className="flex flex-col">
                      {/* Company Name */}
                      <Field className="mb-2 sm:mb-6">
                        <Label
                          htmlFor="company_name"
                          className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                        >
                          Your company name
                        </Label>
                        <Input
                          type="text"
                          value={editingData.company_name}
                          onChange={(e) =>
                            setEditingData((prev) => ({
                              ...prev,
                              company_name: e.target.value,
                            }))
                          }
                          className="bg-indigo-100 border text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2.5 w-full"
                          placeholder="Company Name"
                        />
                      </Field>

                      {/* Job Position */}
                      <Field className="mb-2 sm:mb-6">
                        <Label
                          htmlFor="job_position"
                          className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                        >
                          Your job position
                        </Label>
                        <Input
                          type="text"
                          value={editingData.job_position}
                          onChange={(e) =>
                            setEditingData((prev) => ({
                              ...prev,
                              job_position: e.target.value,
                            }))
                          }
                          className="bg-indigo-100 border text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2.5 w-full"
                          placeholder="Job Position"
                        />
                      </Field>

                      {/* Full Address */}
                      <Field className="mb-2 sm:mb-6">
                        <Label
                          htmlFor="full_address"
                          className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                        >
                          Your company full address
                        </Label>
                        <Input
                          type="text"
                          value={editingData.full_address}
                          onChange={(e) =>
                            setEditingData((prev) => ({
                              ...prev,
                              full_address: e.target.value,
                            }))
                          }
                          className="bg-indigo-100 border text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2.5 w-full"
                          placeholder="Full Address"
                        />
                      </Field>

                      <div className="grid grid-cols-2 gap-3">
                        {/* Start Date */}
                        <Field className="mb-2 sm:mb-6">
                          <Label
                            htmlFor="start_date"
                            className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                          >
                            Your start date
                          </Label>
                          <Input
                            type="date"
                            value={editingData.start_date}
                            onChange={(e) =>
                              setEditingData((prev) => ({
                                ...prev,
                                start_date: e.target.value,
                              }))
                            }
                            className="bg-indigo-100 border text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2.5 w-full"
                            placeholder="Start Date"
                          />
                        </Field>

                        {/* Start Date */}
                        <Field className="mb-2 sm:mb-6">
                          <Label
                            htmlFor="end_date"
                            className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                          >
                            Your end date
                          </Label>
                          <Input
                            type="date"
                            value={editingData.end_date}
                            onChange={(e) =>
                              setEditingData((prev) => ({
                                ...prev,
                                end_date: e.target.value,
                              }))
                            }
                            className="bg-indigo-100 border text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2.5 w-full"
                            placeholder="End Date"
                          />
                        </Field>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button
                        onClick={saveEdit}
                        className="bg-green-500 text-white py-2 px-4 rounded"
                      >
                        <Check className="w-5 h-5" />
                      </Button>
                      <Button
                        onClick={cancelEdit}
                        className="bg-red-500 text-white py-2 px-4 rounded"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                      <Button
                        onClick={() => deleteWorkExperience(work.id)}
                        className="bg-red-700 text-white py-2 px-4 rounded"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="text-sm font-semibold text-indigo-900">
                        {work.company_name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {work.job_position}
                      </div>
                      <div className="text-sm text-gray-600">
                        {work.full_address}
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatDateOnly(work.start_date)} -{" "}
                        {formatDateOnly(work.end_date)}
                      </div>
                    </div>
                    <Button
                      onClick={() => handleEdit(work)}
                      className="text-indigo-500 hover:text-blue-600 mt-2"
                    >
                      <Edit3 className="w-5 h-5" />
                    </Button>
                  </>
                )}
              </li>
            ))}
          </ul>

          {/* Add New Work Experience */}
          <div className="mt-6 space-y-4">
            <div className="flex flex-col">
              {Object.keys(newWork).map((key) => (
                <div key={key}>
                  <Field className="mb-2 sm:mb-6">
                    <Input
                      type={key.includes("date") ? "date" : "text"}
                      placeholder={key.replace(/_/g, " ").toUpperCase()}
                      value={newWork[key]}
                      onChange={(e) =>
                        setNewWork((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      className="bg-indigo-100 border text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2.5 w-full"
                    />
                  </Field>
                </div>
              ))}
            </div>

            <Button
              onClick={addWorkExperience}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full text-sm"
            >
              Add Work Experience
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WorkExperiencesLists;
