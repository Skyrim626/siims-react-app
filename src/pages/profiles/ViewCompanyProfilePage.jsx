import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getRequest } from "../../api/apiHelpers";
import { MapPin, Mail, Phone, Eye, Edit, Plus } from "lucide-react";
import Loader from "../../components/common/Loader";
import Page from "../../components/common/Page";
import { getCoverImage, getProfileImage } from "../../utils/imageHelpers";
import Text from "../../components/common/Text";
import AddressItem from "../../components/profiles/AddressItem";
import { Button } from "@headlessui/react";

const ViewCompanyProfilePage = ({ authorizeRole }) => {
  // ! FOR ADMIN, DEAN, CHAIRPERSON, STUDENT
  const { company_id } = useParams();

  // State
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});

  // Fetch Chairperson Profile
  useEffect(() => {
    const fetchMyProfile = async () => {
      setLoading(true);
      try {
        const response = await getRequest({
          url: `/api/v1/profiles/views/companies/my`,
        });
        if (response) {
          // console.log(response);
          setProfile(response);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // ! OTHER USERS
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await getRequest({
          url: `/api/v1/profiles/views/companies/${company_id}`,
        });
        if (response) setProfile(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // ! CALL METHOD FOR COMPANY USER ONLY
    if (authorizeRole === "company") {
      fetchMyProfile();
    } else {
      fetchProfile();
    }
  }, [company_id]);

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
      <div className="flex items-center justify-between w-full bg-white shadow-lg">
        <div className="flex items-center gap-6 bg-opacity-80 px-6 py-4 rounded-lg  w-full">
          <img
            src={getProfileImage(profile.profile_image_url)} // Use external default profile image URL
            alt="Dean Profile"
            className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
          />
          <div className="text-gray-900">
            <h1 className="text-xl font-semibold max-w-2xl">{profile.name}</h1>
          </div>
        </div>

        {/* Action Buttons */}
        {(authorizeRole === "company" || authorizeRole === "admin") && (
          <div className="flex gap-2 justify-end px-3">
            {/* <Button className="whitespace-nowrap  flex items-center gap-2 px-4 py-2 border rounded-sm text-gray-700 border-gray-300 hover:bg-gray-100">
              <Eye size={20} />
              <Text>Public View</Text>
            </Button> */}
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
      </div>

      {/* Main Profile Content */}
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
    </Page>
  );
};

export default ViewCompanyProfilePage;
