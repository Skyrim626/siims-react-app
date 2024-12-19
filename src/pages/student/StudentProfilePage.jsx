import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { formatDateOnly } from "../../utils/formatDate";
import { getFullAddress } from "../../utils/formatAddress";
import useForm from "../../hooks/useForm";
import Loader from "../../components/common/Loader";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../api/apiHelpers";
import SectionCard from "../../components/profiles/SectionCard";
import Text from "../../components/common/Text";
import { Button, Input } from "@headlessui/react";
import { Edit3, Check, X, Trash2 } from "lucide-react";
import WorkExperiencesSection from "../../components/profiles/WorkExperiencesSection";
import ContactInformationSection from "../../components/profiles/ContactInformationSection";
import AboutMeSection from "../../components/profiles/AboutMeSection";
import EducationSection from "../../components/profiles/EducationSection";

const StudentProfilePage = () => {
  const [loading, setLoading] = useState(false);

  // User Information State
  const {
    formData: user,
    handleInputChange: handleUserChange,
    resetForm,
    setFormValues,
  } = useForm({
    id: 2024301502,
    first_name: "John",
    middle_name: "Doe",
    last_name: "Ramirez",
    email: "rodriguez@email.com",
    gender: "Male",
    phone_number: "987-654-3210",
    street: "Main St",
    barangay: "Barangay Central",
    city_municipality: "Metro City",
    province: "Central Province",
    postal_code: "45678",
    profile_image_url: null,
    program: "Bachelor of Science in Information Technology",
    college: "College of Information Technology and Computing",
  });

  const [workExperiences, setWorkExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [profilePic, setProfilePic] = useState(
    user.profile_image_url || "/default-profile.png"
  );

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

  // Education states
  const [newEducation, setNewEducation] = useState({
    school_name: "",
    full_address: "",
    start_date: "",
    end_date: "",
  });
  const [editingEducation, setEditingEducation] = useState(null);
  const [editingEducationData, setEditingEducationData] = useState({});

  // Fetch Profile Data
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await getRequest({ url: "/api/v1/profiles/student" });
        if (response) {
          setFormValues(response);
          setWorkExperiences(response.work_experiences);
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const marginLeft = 15;
    let y = 20;

    // Set a professional, minimal font
    doc.setFont("helvetica", "normal");

    // HEADER: Full Name and Title
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text(`${user.first_name} ${user.last_name}`, marginLeft, y);
    y += 8;

    doc.setFontSize(12);
    doc.setFont("helvetica", "italic");
    doc.text(user.program, marginLeft, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.text(user.college, marginLeft, y);
    y += 8;
    doc.line(marginLeft, y, 195, y); // Line separator
    y += 8;

    // CONTACT INFORMATION
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Contact Information", marginLeft, y);
    y += 7;

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Email: ${user.email}`, marginLeft, y);
    y += 6;
    doc.text(`Phone: ${user.phone_number}`, marginLeft, y);
    y += 6;
    doc.text(`Address: ${getFullAddress(user)}`, marginLeft, y);
    y += 8;
    doc.line(marginLeft, y, 195, y); // Line separator
    y += 8;

    // WORK EXPERIENCE SECTION
    if (workExperiences.length > 0) {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Work Experience", marginLeft, y);
      y += 7;

      workExperiences.forEach((work) => {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(`${work.job_position}`, marginLeft, y);
        y += 5;

        doc.setFont("helvetica", "normal");
        doc.text(`${work.company_name}`, marginLeft, y);
        y += 5;
        doc.text(
          `${formatDateOnly(work.start_date)} - ${formatDateOnly(
            work.end_date
          )}`,
          marginLeft,
          y
        );
        y += 5;
        doc.text(`${work.full_address}`, marginLeft, y);
        y += 10;
      });
      doc.line(marginLeft, y, 195, y); // Line separator
      y += 8;
    }

    // EDUCATION SECTION
    if (educations.length > 0) {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Education", marginLeft, y);
      y += 7;

      educations.forEach((education) => {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(`${education.school_name}`, marginLeft, y);
        y += 5;

        doc.setFont("helvetica", "normal");
        doc.text(
          `${formatDateOnly(education.start_date)} - ${formatDateOnly(
            education.end_date
          )}`,
          marginLeft,
          y
        );
        y += 5;
        doc.text(`${education.full_address}`, marginLeft, y);
        y += 10;
      });
      doc.line(marginLeft, y, 195, y); // Line separator
      y += 8;
    }

    // SKILLS SECTION (example)
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Skills", marginLeft, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(
      "JavaScript, React, Node.js, HTML/CSS, Tailwind CSS",
      marginLeft,
      y
    );
    y += 8;

    // FOOTER
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text(
      `Generated on: ${new Date().toLocaleDateString()} | Page 1`,
      marginLeft,
      290
    );

    // Save the file
    doc.save(`${user.first_name}_${user.last_name}_Resume.pdf`);
  };

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

  // Edit work experience
  const handleEdit = (work) => {
    setEditingWork(work.id);
    setEditingData({ ...work });
  };

  const handleEditEducation = (education) => {
    setEditingEducation(education.id);
    setEditingEducationData({ ...education });
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

  const cancelEdit = () => {
    setEditingWork(null);
    setEditingData({});
  };

  const cancelEditEducation = () => {
    setEditingEducation(null);
    setEditingEducationData({});
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
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4">
            {/* Profile Sidebar */}
            <div className="col-span-1">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <img
                    src={profilePic}
                    alt={`${user.first_name}'s profile`}
                    className="w-32 h-32 bg-gray-300 rounded-full mb-4"
                  />
                  <h1 className="text-xl font-bold">
                    {user.first_name} {user.last_name}
                  </h1>
                  <Text className="text-gray-700">{user.program}</Text>
                  <Text className="text-sm text-gray-500">{user.college}</Text>
                  <div className="mt-6 flex flex-wrap gap-4 justify-center">
                    <Button
                      onClick={exportToPDF}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    >
                      Download Profile
                    </Button>
                    <label className="cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      Change Picture
                    </label>
                  </div>
                </div>
                {/* <hr className="mt-3" />
                <div className="flex flex-col mt-2">
                  <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                    Skills
                  </span>
                  <ul>
                    <li>JavaScript</li>
                    <li>React</li>
                    <li>Node.js</li>
                    <li>HTML/CSS</li>
                    <li>Tailwind CSS</li>
                  </ul>
                </div> */}
              </div>
            </div>
            {/* Main Content */}
            <div className="col-span-3">
              <div className="bg-white shadow rounded-lg p-6 space-y-3">
                {/* About Me Section */}
                <AboutMeSection user={user} />
                {/* Contact Information Section */}
                <ContactInformationSection user={user} />
                {/* Work Experience Section */}
                <WorkExperiencesSection
                  workExperiences={workExperiences}
                  editingData={editingData}
                  setEditingData={setEditingData}
                  saveEdit={saveEdit}
                  cancelEdit={cancelEdit}
                  deleteWorkExperience={deleteWorkExperience}
                  handleEdit={handleEdit}
                  newWork={newWork}
                  setNewWork={setNewWork}
                  addWorkExperience={addWorkExperience}
                  editingWork={editingWork}
                />
                {/* Education Section */}
                <EducationSection
                  educations={educations}
                  editingEducationData={editingEducationData}
                  setEditingEducationData={setEditingEducationData}
                  editingEducation={editingEducation}
                  saveEditEducation={saveEditEducation}
                  cancelEditEducation={cancelEditEducation}
                  deleteEducation={deleteEducation}
                  handleEditEducation={handleEditEducation}
                  newEducation={newEducation}
                  setNewEducation={setNewEducation}
                  addEducation={addEducation}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePage;
