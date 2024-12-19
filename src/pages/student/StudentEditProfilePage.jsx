import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { stripLocation } from "../../utils/strip";
import { Button, Field, Input, Label, Select } from "@headlessui/react";
import { postRequest } from "../../api/apiHelpers";
import { formatDate } from "../../utils/formatDate";
import { ArrowLeft } from "lucide-react"; // Import ArrowLeft icon

import ProfileForm from "../../components/student-profiles/ProfileForm";
import WorkExperienceForm from "../../components/student-profiles/WorkExperienceForm";
import EducationForm from "../../components/student-profiles/EducationForm";

const StudentEditProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { profile } = location.state || {};
  useEffect(() => {
    if (!profile) navigate("/dashboard", { replace: true });
  }, [profile, navigate]);

  if (!profile) return null;

  const [user, setUser] = useState(profile.user);
  const [workExperiences, setWorkExperiences] = useState(
    profile.work_experiences
  );
  const [educations, setEducations] = useState(profile.educations);

  const editProfile = () => {
    console.log("Updated User Data:", user);
    console.log("Updated Work Experience:", workExperiences);
    console.log("Updated Education:", educations);
    // handle saving logic
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg space-y-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
        Edit Profile
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Basic Information */}
        <div className="space-y-6">
          <div className="text-lg font-medium text-gray-700">
            Basic Information
          </div>

          <Field className="mb-4">
            <Label className="text-sm font-semibold text-gray-600">
              First name
            </Label>
            <Input
              type="text"
              name="first_name"
              value={user.first_name}
              onChange={(e) =>
                setUser({ ...user, ["first_name"]: e.target.value })
              }
              className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </Field>

          <Field className="mb-4">
            <Label className="text-sm font-semibold text-gray-600">
              Middle name
            </Label>
            <Input
              type="text"
              name="middle_name"
              value={user.middle_name}
              onChange={(e) =>
                setUser({ ...user, ["middle_name"]: e.target.value })
              }
              className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </Field>

          <Field className="mb-4">
            <Label className="text-sm font-semibold text-gray-600">
              Last name
            </Label>
            <Input
              type="text"
              name="last_name"
              value={user.last_name}
              onChange={(e) =>
                setUser({ ...user, ["last_name"]: e.target.value })
              }
              className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </Field>

          <Field className="mb-4">
            <Label className="text-sm font-semibold text-gray-600">Email</Label>
            <Input
              type="email"
              name="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, ["email"]: e.target.value })}
              className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </Field>

          <Field className="mb-4">
            <Label className="text-sm font-semibold text-gray-600">
              Phone number
            </Label>
            <Input
              type="text"
              name="phone_number"
              value={user.phone_number}
              onChange={(e) =>
                setUser({ ...user, ["phone_number"]: e.target.value })
              }
              className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </Field>
        </div>

        {/* Right Column: Address & Gender */}
        <div className="space-y-6">
          <div className="text-lg font-medium text-gray-700">
            Contact & Gender
          </div>

          <Field className="mb-4">
            <Label className="text-sm font-semibold text-gray-600">
              Street
            </Label>
            <Input
              type="text"
              name="street"
              value={user.street}
              onChange={(e) => setUser({ ...user, ["street"]: e.target.value })}
              className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </Field>

          <Field className="mb-4">
            <Label className="text-sm font-semibold text-gray-600">
              Barangay
            </Label>
            <Input
              type="text"
              name="barangay"
              value={user.barangay}
              onChange={(e) =>
                setUser({ ...user, ["barangay"]: e.target.value })
              }
              className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </Field>

          <Field className="mb-4">
            <Label className="text-sm font-semibold text-gray-600">City</Label>
            <Input
              type="text"
              name="city_municipality"
              value={user.city_municipality}
              onChange={(e) =>
                setUser({ ...user, ["city_municipality"]: e.target.value })
              }
              className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </Field>

          <Field className="mb-4">
            <Label className="text-sm font-semibold text-gray-600">
              Province
            </Label>
            <Input
              type="text"
              name="province"
              value={user.province}
              onChange={(e) =>
                setUser({ ...user, ["province"]: e.target.value })
              }
              className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </Field>

          <Field className="mb-4">
            <Label className="text-sm font-semibold text-gray-600">
              Postal Code
            </Label>
            <Input
              type="text"
              name="postal_code"
              value={user.postal_code}
              onChange={(e) =>
                setUser({ ...user, ["postal_code"]: e.target.value })
              }
              className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </Field>

          <Field className="mb-4">
            <Label className="text-sm font-semibold text-gray-600">
              Gender
            </Label>
            <Select
              name="gender"
              value={user.gender}
              onChange={(e) => setUser({ ...user, ["gender"]: e.target.value })}
              className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
          </Field>
        </div>
      </div>

      {/* Work Experience Section */}
      <div className="space-y-6">
        <div className="text-lg font-medium text-gray-700">Work Experience</div>
        {workExperiences.map((work, index) => (
          <div key={work.id} className="space-y-4">
            <Field>
              <Label className="text-sm font-semibold text-gray-600">
                Job Title
              </Label>
              <Input
                type="text"
                name={`job_position_${index}`}
                value={work.job_position}
                onChange={(e) => {
                  const updatedWorkExperiences = [...workExperiences];
                  updatedWorkExperiences[index].job_position = e.target.value;
                  setWorkExperiences(updatedWorkExperiences);
                }}
                className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </Field>

            <Field>
              <Label className="text-sm font-semibold text-gray-600">
                Company
              </Label>
              <Input
                type="text"
                name={`company_${index}`}
                value={work.company_name}
                onChange={(e) => {
                  const updatedWorkExperiences = [...workExperiences];
                  updatedWorkExperiences[index].company_name = e.target.value;
                  setWorkExperiences(updatedWorkExperiences);
                }}
                className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </Field>

            <div className="flex space-x-5">
              <Field>
                <Label className="text-sm font-semibold text-gray-600">
                  Start Date
                </Label>
                <Input
                  type="date"
                  name={`start_date_${index}`}
                  value={formatDate(work.start_date)}
                  onChange={(e) => {
                    const updatedWorkExperiences = [...workExperiences];
                    updatedWorkExperiences[index].start_date = e.target.value;
                    setWorkExperiences(updatedWorkExperiences);
                  }}
                  className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
                />
              </Field>

              <Field>
                <Label className="text-sm font-semibold text-gray-600">
                  End Date
                </Label>

                <Input
                  type="date"
                  name={`end_date${index}`}
                  value={formatDate(work.end_date)}
                  onChange={(e) => {
                    const updatedWorkExperiences = [...workExperiences];
                    updatedWorkExperiences[index].end_date = e.target.value;
                    setWorkExperiences(updatedWorkExperiences);
                  }}
                  className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
                />
              </Field>
            </div>

            <Button
              type="button"
              className="text-sm text-red-500"
              onClick={() => {
                const updatedWorkExperiences = workExperiences.filter(
                  (_, i) => i !== index
                );
                setWorkExperiences(updatedWorkExperiences);
              }}
            >
              Remove Work Experience
            </Button>
          </div>
        ))}
        <Button
          type="button"
          className="mt-4 w-full p-3 bg-indigo-600 text-white rounded-md"
          onClick={() =>
            setWorkExperiences([
              ...workExperiences,
              { job_title: "", company: "" },
            ])
          }
        >
          Add Work Experience
        </Button>
      </div>

      {/* Education Section */}
      <div className="space-y-6">
        <div className="text-lg font-medium text-gray-700">Education</div>
        {educations.map((education, index) => (
          <div key={index} className="space-y-4">
            <Field>
              <Label className="text-sm font-semibold text-gray-600">
                Degree
              </Label>
              <Input
                type="text"
                name={`degree_${index}`}
                value={education.degree}
                onChange={(e) => {
                  const updatedEducations = [...educations];
                  updatedEducations[index].degree = e.target.value;
                  setEducations(updatedEducations);
                }}
                className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </Field>

            <Field>
              <Label className="text-sm font-semibold text-gray-600">
                School
              </Label>
              <Input
                type="text"
                name={`school_${index}`}
                value={education.school}
                onChange={(e) => {
                  const updatedEducations = [...educations];
                  updatedEducations[index].school = e.target.value;
                  setEducations(updatedEducations);
                }}
                className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </Field>

            <Button
              type="button"
              className="text-sm text-red-500"
              onClick={() => {
                const updatedEducations = educations.filter(
                  (_, i) => i !== index
                );
                setEducations(updatedEducations);
              }}
            >
              Remove Education
            </Button>
          </div>
        ))}
        <Button
          type="button"
          className="mt-4 w-full p-3 bg-indigo-600 text-white rounded-md"
          onClick={() =>
            setEducations([...educations, { degree: "", school: "" }])
          }
        >
          Add Education
        </Button>
      </div>

      {/* Save Button */}
      <div className="mt-8 text-center">
        <Button
          type="button"
          onClick={editProfile}
          className="w-full p-3 bg-green-600 text-white rounded-md"
        >
          Save Profile
        </Button>
      </div>
    </div>
  );
};

export default StudentEditProfilePage;
