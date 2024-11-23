import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentEditProfilePage = () => {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    firstName: "Jane",
    middleName: "Marie",
    lastName: "Smith",
    role: "IT Intern",
    profilePic: "/src/assets/images/company/company-profile-photo.jpg",
    education: [
      {
        department: "College of Information Technology and Computing",
        course: "Bachelor of Science in Computer Science",
      },
    ],
    contact: {
      email: "jane.doe@example.com",
      phone: "+63 123 4567",
      address: "123 Main Street, Central Business District, Metro Manila, 1234",
    },
    languages: ["English", "Filipino", "Spanish"],
    aboutMe:
      "I am a dedicated and enthusiastic software development intern currently pursuing a Bachelor of Science in Computer Science.",
    skills: [
      "JavaScript",
      "React.js",
      "HTML & CSS",
      "Node.js",
      "Version Control (Git)",
      "Problem-Solving",
      "Team Collaboration",
    ],
    workExperience: [
      {
        job_position: "Software Development Intern",
        company_name: "Tech Solutions Inc.",
        full_address: "456 Elm Street, Business District, Metro Manila",
        start_date: "2023-06-01",
        end_date: "2023-08-31",
      },
    ],
  });

  // Handle saving changes
  const editProfile = () => {
    console.log("Updated Student Data:", student);
    navigate("/auth/my/profile");
  };

  // Handle work experience changes
  const handleWorkExperienceChange = (index, key, value) => {
    const updatedExperience = [...student.workExperience];
    updatedExperience[index][key] = value;
    setStudent((prev) => ({
      ...prev,
      workExperience: updatedExperience,
    }));
  };

  const addWorkExperience = () => {
    setStudent((prev) => ({
      ...prev,
      workExperience: [
        ...prev.workExperience,
        {
          job_position: "",
          company_name: "",
          full_address: "",
          start_date: "",
          end_date: "",
        },
      ],
    }));
  };

  const removeWorkExperience = (index) => {
    const updatedExperience = student.workExperience.filter(
      (_, i) => i !== index
    );
    setStudent((prev) => ({
      ...prev,
      workExperience: updatedExperience,
    }));
  };

  // Handle education changes
  const handleEducationChange = (index, key, value) => {
    const updatedEducation = [...student.education];
    updatedEducation[index][key] = value;
    setStudent((prev) => ({
      ...prev,
      education: updatedEducation,
    }));
  };

  const addEducation = () => {
    setStudent((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { department: "", course: "" }, // Default values
      ],
    }));
  };

  const removeEducation = (index) => {
    const updatedEducation = student.education.filter((_, i) => i !== index);
    setStudent((prev) => ({
      ...prev,
      education: updatedEducation,
    }));
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Edit Profile</h1>

      {/* Basic Information */}
      {["firstName", "middleName", "lastName", "role"].map((field) => (
        <div key={field} className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">
            {field.split(/(?=[A-Z])/).join(" ")}
          </label>
          <input
            type="text"
            name={field}
            value={student[field]}
            onChange={(e) =>
              setStudent({ ...student, [field]: e.target.value })
            }
            className="w-full mt-2 p-2 border rounded-md"
          />
        </div>
      ))}

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Education</h2>
        {student.education.map((edu, index) => (
          <div
            key={index}
            className="mb-4 border p-4 rounded-md shadow-md bg-gray-50"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Education {index + 1}
              </h3>
              <button
                onClick={() => removeEducation(index)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
            {Object.entries(edu).map(([key, value]) => (
              <div key={key} className="mb-4">
                <label className="block text-lg font-semibold text-gray-700">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    handleEducationChange(index, key, e.target.value)
                  }
                  className="w-full mt-2 p-2 border rounded-md"
                />
              </div>
            ))}
          </div>
        ))}
        <button
          onClick={addEducation}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Education
        </button>
      </div>

      {/* Work Experience */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Work Experience
        </h2>
        {student.workExperience.map((experience, index) => (
          <div
            key={index}
            className="mb-4 border p-4 rounded-md shadow-md bg-gray-50"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Experience {index + 1}
              </h3>
              <button
                onClick={() => removeWorkExperience(index)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
            {Object.entries(experience).map(([key, value]) => (
              <div key={key} className="mb-4">
                <label className="block text-lg font-semibold text-gray-700">
                  {key.split("_").join(" ")}
                </label>
                <input
                  type={key.includes("date") ? "date" : "text"}
                  value={value}
                  onChange={(e) =>
                    handleWorkExperienceChange(index, key, e.target.value)
                  }
                  className="w-full mt-2 p-2 border rounded-md"
                />
              </div>
            ))}
          </div>
        ))}
        <button
          onClick={addWorkExperience}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Work Experience
        </button>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={editProfile}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Save Changes
        </button>
        <button
          onClick={() => navigate("/auth/my/profile")}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default StudentEditProfilePage;
