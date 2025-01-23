import React, { useEffect, useRef, useState } from "react";
import { getRequest } from "../../api/apiHelpers";
import Page from "../../components/common/Page";
import Loader from "../../components/common/Loader";
import { getCoverImage, getProfileImage } from "../../utils/imageHelpers";
import { useReactToPrint } from "react-to-print";
import { renderSelfProfileHeader } from "../../renders/renderProfileHeader";
import { Link } from "react-router-dom";
import { Button } from "@headlessui/react";
import { Download, Edit, Plus } from "lucide-react";
import Text from "../../components/common/Text";
import "../../download.css";
import { renderSelfMainProfileContent } from "../../renders/RenderMainProfileContent";

/**
 * Allowed Roles:
 * - Admin
 * - Dean
 * - Chairperson
 * - Coordinator
 * - Supervisor
 * - Student
 * - OSA
 */
const SelfProfile = ({ authorizeRole }) => {
  // Path towards to backend
  const resourcePath = `/api/v1/profiles/self?requestedBy=${authorizeRole}`;

  // FOR PRINTING PURPOSES
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: `${authorizeRole} Profile`,
    contentRef: componentRef,
  });

  // State
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});

  // Fetch User Profile
  const fetchProfile = async () => {
    // Set Loading State
    setLoading(true);
    try {
      const response = await getRequest({
        url: resourcePath,
      });

      if (response) {
        setProfile(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <Page className="bg-gray-100 min-h-screen">
      <Loader loading={loading} />

      {/* Header Section */}

      <div className="relative w-full h-72 bg-gray-200">
        <img
          src={getCoverImage(profile.cover_image_url)} // Use external default cover image URL
          alt={`${authorizeRole} Cover Photo`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Profile Information Section */}
      <div ref={componentRef}>
        <div className="flex items-center justify-between w-full bg-white shadow-lg">
          <div className="flex items-center gap-6 bg-opacity-80 px-6 py-4 rounded-lg">
            <img
              src={getProfileImage(profile.profile_image_url)} // Use external default profile image URL
              alt={`${authorizeRole} Profile`}
              className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
            />
            <div className="text-gray-900">
              {renderSelfProfileHeader({
                authorizeRole,
                profile,
              })}
            </div>
          </div>

          <div className="flex gap-2 justify-end px-3">
            <Link
              to={`${location.pathname}/edit`}
              state={{
                id: profile.id,
                profile: profile,
              }}
            >
              <Button className="download-profile-section | whitespace-nowrap  flex items-center gap-2 px-4 py-2 border rounded-sm text-gray-700 border-gray-300 hover:bg-gray-100">
                <Edit size={20} />
                <Text>Edit Profile</Text>
              </Button>
            </Link>

            {/* For Company Only */}
            {authorizeRole === "company" && (
              <Link to="/auth/company/offices/add">
                <Button className="whitespace-nowrap flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700">
                  <Plus size={20} />
                  <Text>Add Office</Text>
                </Button>
              </Link>
            )}

            {/* Action Buttons (Export Profile): EVERYONE */}
            <div className="flex gap-2 justify-end px-3">
              <Button
                onClick={() => handlePrint()}
                className="download-profile-section | whitespace-nowrap  flex items-center gap-2 px-4 py-2 border rounded-sm text-gray-700 border-gray-300 hover:bg-gray-100"
              >
                <Download size={20} />
                <Text>Download Profile</Text>
              </Button>
            </div>
          </div>
        </div>

        {/* Render Main Profile Content */}
        {renderSelfMainProfileContent({
          authorizeRole,
          profile,
        })}
      </div>
    </Page>
  );
};

export default SelfProfile;
