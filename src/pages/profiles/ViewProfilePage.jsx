import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getRequest } from "../../api/apiHelpers";
import Page from "../../components/common/Page";
import { getCoverImage, getProfileImage } from "../../utils/imageHelpers";
import Loader from "../../components/common/Loader";
import { Button } from "@headlessui/react";
import { Download, Edit, GraduationCap, Mail, Phone, Plus } from "lucide-react";
import Text from "../../components/common/Text";
import AddressItem from "../../components/profiles/AddressItem";
import { getFullAddress } from "../../utils/formatAddress";
import { formatDateOnly } from "../../utils/formatDate";

import { useReactToPrint } from "react-to-print";

import "../../download.css";
import StudentSideProfileInfo from "../../components/profiles/StudentSideProfileInfo";
import ProfileContent from "../../containers/Profiles/components/ProfileContent";

/**
 * Routes for Path of different user to be view
 */
const USER_TYPE_VIEW = {
  dean: "/api/v1/profiles/views/deans",
  chairperson: "/api/v1/profiles/views/chairpersons",
  coordinator: "/api/v1/profiles/views/coordinators",
  company: "/api/v1/profiles/views/companies",
  student: "/api/v1/profiles/views/students",
};

/**
 * Authorize Role:
 *
 * Viewing User: What type of user is to be viewed. (admin, dean, chairperson, osa, coordinator, company, supervisor, student)
 */
const ViewProfilePage = ({ authorizeRole, viewingUser }) => {
  const { user_id } = useParams();

  // FOR PRINTING PURPOSES
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Profile",
    contentRef: componentRef,
  });

  // Open Navigation
  const navigate = useNavigate();

  // State
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});

  // Emtpy Path
  let profileResourcePath = "";

  // SELECTION TO WHO THE USER IS TO BE VIEWED
  switch (viewingUser) {
    case "dean":
      profileResourcePath = `${USER_TYPE_VIEW.dean}/${user_id}`;
      break;
    case "chairperson":
      profileResourcePath = `${USER_TYPE_VIEW.chairperson}/${user_id}`;
      break;
    case "coordinator":
      profileResourcePath = `${USER_TYPE_VIEW.coordinator}/${user_id}`;
      break;
    case "company":
      profileResourcePath = `${USER_TYPE_VIEW.company}/${user_id}`; // ID of the User
      break;
    case "student":
      profileResourcePath = `${USER_TYPE_VIEW.student}/${user_id}`;
      break;
    default:
      // Return back to the last page
      navigate(-1);
  }

  // Render Profile Header
  const renderProfileHeader = () => {
    switch (viewingUser) {
      case "company":
        return (
          <h1 className="text-xl font-semibold max-w-2xl">{profile.name}</h1>
        );
      case "dean":
        return (
          <>
            <h1 className="text-3xl font-semibold">
              {profile.first_name &&
                `${profile.first_name} ${profile.last_name}`}
            </h1>
            <Text className="text-sm text-gray-600 font-bold">
              Dean of the {profile.college_name || "College of Science"}
            </Text>
          </>
        );
      case "chairperson":
        return (
          <>
            <h1 className="text-3xl font-semibold">
              {profile.first_name &&
                `${profile.first_name} ${profile.last_name}`}
            </h1>
            <div className="flex flex-col">
              {/* Program */}
              <Text className="text-sm text-gray-600 font-bold">
                {profile.program || "No Program"}
              </Text>
            </div>
          </>
        );
      case "coordinator":
        return (
          <>
            <h1 className="text-3xl font-semibold">
              {profile.first_name &&
                `${profile.first_name} ${profile.last_name}`}
            </h1>
            <div className="flex flex-col">
              {/* College */}
              <Text className="text-sm text-gray-600 font-bold">
                {profile.college || "College of Science"}
              </Text>
              {/* Program */}
              <Text className="text-sm text-gray-600 font-bold">
                {profile.program || "No Program"}
              </Text>
            </div>
          </>
        );
      case "student":
        return (
          <>
            <h1 className="text-3xl font-semibold">
              {`${profile.first_name} ${profile.middle_name} ${profile.last_name}`}
            </h1>
          </>
        );
      default:
        // Default fallback
        return <p>No profile information available for this user.</p>;
    }
  };

  // Render main profile content
  const renderMainProfileContent = () => {
    switch (viewingUser) {
      case "student":
        return <ProfileContent profile={profile} />;
      default:
        /* Main Profile Content */
        return (
          <div className="mt-6 px-6">
            {/* Contact Info */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Contact</h2>

              <AddressItem profile={profile} />

              <div className="flex items-center gap-4 text-gray-700 mb-3">
                <Mail size={20} className="text-blue-600" />
                <Text>
                  <a
                    href={`mailto:${profile.email || "dean.email@example.com"}`}
                    className="text-blue-600 hover:underline"
                  >
                    {profile.email || "dean.email@example.com"}
                  </a>
                </Text>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <Phone size={20} className="text-blue-600" />
                <Text>{profile.phone || "+63 912 345 6789"}</Text>
              </div>
            </div>
          </div>
        );
    }
  };

  // Fetch User Profile
  useEffect(() => {
    // Fetch User Profile
    const fetchUserProfile = async () => {
      setLoading(true);

      console.log(profileResourcePath);

      try {
        const response = await getRequest({
          url: profileResourcePath,
        });

        // Check response
        if (response) {
          setProfile(response);
        }
      } catch (error) {
        console.error(error);
        // Return back to the last page
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    // Call Method
    fetchUserProfile();
  }, [profileResourcePath]);

  return (
    <Page className="bg-gray-100 min-h-screen">
      <Loader loading={loading} />

      {/* Header Section */}
      <div className="relative w-full h-72 bg-gray-200">
        <img
          src={getCoverImage(profile.cover_image_url)} // Use external default cover image URL
          alt="Dean Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Profile Information Section */}
      <div ref={componentRef}>
        <div className="flex items-center justify-between w-full bg-white shadow-lg">
          <div className="flex items-center gap-6 bg-opacity-80 px-6 py-4 rounded-lg  w-full">
            <img
              src={getProfileImage(profile.profile_image_url)} // Use external default profile image URL
              alt="Dean Profile"
              className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
            />
            <div className="text-gray-900">{renderProfileHeader()}</div>
          </div>

          {/* Action Buttons (Edit Profile, Add Office): FOR ADMIN ONLY */}
          {authorizeRole === "admin" && viewingUser === "company" && (
            <div className="flex gap-2 justify-end px-3">
              <Link
                to={`${location.pathname}/edit`}
                state={{
                  id: profile.id,
                  profile: profile,
                }}
              >
                <Button className="whitespace-nowrap  flex items-center gap-2 px-4 py-2 border rounded-sm text-gray-700 border-gray-300 hover:bg-gray-100">
                  <Edit size={20} />
                  <Text>Edit Profile</Text>
                </Button>
              </Link>
              <Link to="/auth/company/offices/add">
                <Button className="whitespace-nowrap flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700">
                  <Plus size={20} />
                  <Text>Add Office</Text>
                </Button>
              </Link>
            </div>
          )}

          {/* Action Buttons (Export Profile): EVERYONE */}
          {viewingUser === "student" && (
            <div className="flex gap-2 justify-end px-3">
              <Button
                onClick={() => handlePrint()}
                className="download-profile-section | whitespace-nowrap  flex items-center gap-2 px-4 py-2 border rounded-sm text-gray-700 border-gray-300 hover:bg-gray-100"
              >
                <Download size={20} />
                <Text>Download Profile</Text>
              </Button>
            </div>
          )}
        </div>

        {/* Render Main Profile Content */}
        {renderMainProfileContent()}
      </div>
    </Page>
  );
};

export default ViewProfilePage;
