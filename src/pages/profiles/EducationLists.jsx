import React, { useEffect, useState } from "react";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../api/apiHelpers";
import Loader from "../../components/common/Loader";
import { Button, Field, Input, Label } from "@headlessui/react";
import { Check, Edit3, Trash2, X } from "lucide-react";
import { formatDateOnly } from "../../utils/formatDate";

const EducationLists = () => {
  const [loading, setLoading] = useState(false);
  const [educations, setEducations] = useState([]);

  // Education states
  const [newEducation, setNewEducation] = useState({
    school_name: "",
    full_address: "",
    start_date: "",
    end_date: "",
  });
  const [editingEducation, setEditingEducation] = useState(null);
  const [editingEducationData, setEditingEducationData] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await getRequest({ url: "/api/v1/profiles/student" });
        if (response) {
          setEducations(response.educations);
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
  const addEducation = async () => {
    setLoading(true);

    try {
      const response = await postRequest({
        url: "/api/v1/educations",
        data: newEducation,
      });

      if (response) {
        setEducations((prev) => [...prev, response.data]);
        setNewEducation({
          school_name: "",
          full_address: "",
          start_date: "",
          end_date: "",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditEducation = (education) => {
    setEditingEducation(education.id);
    setEditingEducationData({ ...education });
  };

  const saveEditEducation = async () => {
    setLoading(true);

    try {
      // PUT METHOD
      const response = await putRequest({
        url: `/api/v1/educations/${editingEducation}`,
        data: editingEducationData,
      });
      if (response) {
        setEducations((prev) =>
          prev.map((education) =>
            education.id === editingEducation
              ? { ...editingEducationData }
              : education
          )
        );
        cancelEditEducation();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const cancelEditEducation = () => {
    setEditingEducation(null);
    setEditingEducationData({});
  };

  const deleteEducation = async (id) => {
    setLoading(true);

    try {
      // DELETE METHOD
      const response = await deleteRequest({
        url: `/api/v1/educations/${id}`,
      });

      if (response) {
        setEducations((prev) => prev.filter((data) => data.id !== id));

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
          Educations
        </h3>

        <section>
          <ul className="space-y-4">
            {educations.map((education) => (
              <li
                key={education.id}
                className="p-4 border rounded-lg shadow-sm bg-indigo-50"
              >
                {editingEducation === education.id ? (
                  <>
                    <div className="flex flex-col">
                      {/* School Name */}
                      <Field className="mb-2 sm:mb-6">
                        <Label
                          htmlFor="school_name"
                          className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                        >
                          Your school name
                        </Label>
                        <Input
                          type="text"
                          value={editingEducationData.school_name}
                          onChange={(e) =>
                            setEditingEducationData((prev) => ({
                              ...prev,
                              school_name: e.target.value,
                            }))
                          }
                          className="bg-indigo-100 border text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2.5 w-full"
                          placeholder="Company Name"
                        />
                      </Field>

                      {/* Full Address */}
                      <Field className="mb-2 sm:mb-6">
                        <Label
                          htmlFor="full_address"
                          className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                        >
                          Your School full address
                        </Label>
                        <Input
                          type="text"
                          value={editingEducationData.full_address}
                          onChange={(e) =>
                            setEditingEducationData((prev) => ({
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
                            value={editingEducationData.start_date}
                            onChange={(e) =>
                              setEditingEducationData((prev) => ({
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
                            value={editingEducationData.end_date}
                            onChange={(e) =>
                              setEditingEducationData((prev) => ({
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
                        onClick={saveEditEducation}
                        className="bg-green-500 text-white py-2 px-4 rounded"
                      >
                        <Check className="w-5 h-5" />
                      </Button>
                      <Button
                        onClick={cancelEditEducation}
                        className="bg-red-500 text-white py-2 px-4 rounded"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                      <Button
                        onClick={() => deleteEducation(education.id)}
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
                        {education.school_name}
                      </div>

                      <div className="text-sm text-gray-600">
                        {education.full_address}
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatDateOnly(education.start_date)} -{" "}
                        {formatDateOnly(education.end_date)}
                      </div>
                    </div>
                    <Button
                      onClick={() => handleEditEducation(education)}
                      className="text-indigo-500 hover:text-blue-600 mt-2"
                    >
                      <Edit3 className="w-5 h-5" />
                    </Button>
                  </>
                )}
              </li>
            ))}
          </ul>

          {/* Add New Education */}
          <div className="mt-6 space-y-4">
            <div className="flex flex-col">
              {Object.keys(newEducation).map((key) => (
                <div key={key}>
                  <Field className="mb-2 sm:mb-6">
                    <Input
                      type={key.includes("date") ? "date" : "text"}
                      placeholder={key.replace(/_/g, " ").toUpperCase()}
                      value={newEducation[key]}
                      onChange={(e) =>
                        setNewEducation((prev) => ({
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
              onClick={addEducation}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full text-sm"
            >
              Add Education
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EducationLists;
