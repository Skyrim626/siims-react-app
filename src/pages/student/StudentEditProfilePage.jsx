import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
    console.log("Updated User:", user);
    console.log("Updated Work Experiences:", workExperiences);
    console.log("Updated Educations:", educations);
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg space-y-8">
      <h1 className="text-4xl font-extrabold text-gray-800">Edit Profile</h1>
      <ProfileForm user={user} setUser={setUser} />
      <WorkExperienceForm
        workExperiences={workExperiences}
        setWorkExperiences={setWorkExperiences}
      />
      <EducationForm educations={educations} setEducations={setEducations} />
      <button
        className="mt-6 w-full p-4 bg-indigo-600 text-white font-semibold rounded-lg"
        onClick={editProfile}
      >
        Save Changes
      </button>
    </div>
  );
};

export default StudentEditProfilePage;
