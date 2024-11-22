import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditStudentProfilePage = () => {
  const navigate = useNavigate();

  // Initial student data (can be fetched from API or props)
  const [student, setStudent] = useState({
    firstName: "Jane",
    middleName: "Marie",
    lastName: "Smith",
    role: "IT Intern",
    profilePic: "/src/assets/images/company/company-profile-photo.jpg",
    education: {
      department: "College of Information Technology and Computing",
      course: "Bachelor of Science in Computer Science",
    },
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
  });

  const editProfile = () => {
 
    const payload = { ...student };
     
      
    console.log("Updated Student Data:", student);
    // Add API call or state management logic here

    // Navigate back to the profile page
    navigate("/auth/my/profile");

    console.log(payload);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // // Save changes (update state or send to API)
  // const handleSaveChanges = () => {
  //   console.log("Updated Student Data:", student);
  //   // Add API call or state management logic here

  //   // Navigate back to the profile page
  //   navigate("/auth/my/profile");
  // };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Edit Profile</h1>

     {/* Profile Picture */}
    <div className="mb-4">
      <label className="block text-lg font-semibold text-gray-700">
        Profile Picture
      </label>
      <input
        type="file"
        name="profilePic"
        accept="image/png, image/jpeg"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const fileUrl = URL.createObjectURL(file);
            setStudent((prev) => ({
              ...prev,
              profilePic: fileUrl,
            }));
          }
        }}
        className="w-full mt-2 p-2 border rounded-md"
      />
      {student.profilePic && (
        <div className="mt-4">
          <img
            src={student.profilePic}
            alt="Profile Preview"
            className="h-20 w-20 object-cover rounded-full"
          />
          <p className="text-gray-600 mt-2">Profile Preview</p>
        </div>
      )}
    </div>


      {/* Basic Information */}
      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-700">
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          value={student.firstName}
          onChange={handleInputChange}
          className="w-full mt-2 p-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-700">
          Middle Name
        </label>
        <input
          type="text"
          name="middleName"
          value={student.middleName}
          onChange={handleInputChange}
          className="w-full mt-2 p-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-700">
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          value={student.lastName}
          onChange={handleInputChange}
          className="w-full mt-2 p-2 border rounded-md"
        />
      </div>

      {/* Role */}
      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-700">Role</label>
        <input
          type="text"
          name="role"
          value={student.role}
          onChange={handleInputChange}
          className="w-full mt-2 p-2 border rounded-md"
        />
      </div>

      {/* Education */}
      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-700">
          Department
        </label>
        <input
          type="text"
          name="education.department"
          value={student.education.department}
          onChange={(e) =>
            setStudent((prev) => ({
              ...prev,
              education: { ...prev.education, department: e.target.value },
            }))
          }
          className="w-full mt-2 p-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-700">Course</label>
        <input
          type="text"
          name="education.course"
          value={student.education.course}
          onChange={(e) =>
            setStudent((prev) => ({
              ...prev,
              education: { ...prev.education, course: e.target.value },
            }))
          }
          className="w-full mt-2 p-2 border rounded-md"
        />
      </div>

      {/* Contact */}
      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-700">Email</label>
        <input
          type="email"
          name="contact.email"
          value={student.contact.email}
          onChange={(e) =>
            setStudent((prev) => ({
              ...prev,
              contact: { ...prev.contact, email: e.target.value },
            }))
          }
          className="w-full mt-2 p-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-700">Phone</label>
        <input
          type="text"
          name="contact.phone"
          value={student.contact.phone}
          onChange={(e) =>
            setStudent((prev) => ({
              ...prev,
              contact: { ...prev.contact, phone: e.target.value },
            }))
          }
          className="w-full mt-2 p-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-700">Address</label>
        <input
          type="text"
          name="contact.address"
          value={student.contact.address}
          onChange={(e) =>
            setStudent((prev) => ({
              ...prev,
              contact: { ...prev.contact, address: e.target.value },
            }))
          }
          className="w-full mt-2 p-2 border rounded-md"
        />
      </div>

      {/* About Me */}
      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-700">
          About Me
        </label>
        <textarea
          name="aboutMe"
          value={student.aboutMe}
          onChange={handleInputChange}
          className="w-full mt-2 p-2 border rounded-md"
          rows="4"
        />
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

export default EditStudentProfilePage;