import React, { useEffect, useState } from "react";
import { getRequest } from "../../api/apiHelpers";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import coverPhoto from "../../assets/images/company/company-cover-photo.jpg";
import profilePhoto from "../../assets/images/company/company-profile-photo.jpg";
import { Edit, Eye, MapPin, MessageCircle, Plus } from "lucide-react";
import { Button } from "@headlessui/react";
import { Link } from "react-router-dom";

const CompanyProfilePage = () => {
  // Tab and Profile State
  const [selectedTab, setSelectedTab] = useState("company");
  const [profile, setProfile] = useState({});

  // Fetch company profile
  useEffect(() => {
    const fetchProfile = async () => {
      const response = await getRequest({
        url: "/api/v1/company/profile",
      });
      setProfile(response);
    };
    fetchProfile();
  }, []);

  // Full address concatenation
  const fullAddress = `${profile.street}, ${profile.barangay}, ${profile.city_municipality}, ${profile.postal_code}, ${profile.province}`;

  return (
    <Page>
      {profile && (
        <>
          {/* Profile Header */}
          <Section className="mb-6">
            <Heading level={3} text="Company Profile" />
            <Text className="text-sm text-gray-600">
              Manage your company profile and settings.
            </Text>
            <hr className="my-4" />
          </Section>

          {/* Cover Photo */}
          <div className="relative w-full h-80 overflow-hidden rounded-t-md">
            <img
              src={coverPhoto}
              alt="Company Cover"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Profile Info */}
          <div className="grid grid-cols-3 items-center gap-4 p-4 bg-white shadow-md rounded-b-md">
            {/* Profile Photo and Company Info */}
            <div className="grid col-span-2 gap-4">
              <img
                src={profilePhoto}
                alt="Company Profile"
                className="w-36 h-36 object-cover rounded-md border-4 border-white shadow-lg"
              />
              <div className="flex flex-col">
                <Text className="text-2xl font-bold text-gray-900">
                  {profile.company_name}
                </Text>
                <div className="flex items-center gap-2 text-gray-700 max-w-">
                  <MapPin className="text-blue-600" size={18} />
                  <Text className="text-sm">{fullAddress}</Text>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 justify-end">
              <Button className="whitespace-nowrap  flex items-center gap-2 px-4 py-2 border rounded-sm text-gray-700 border-gray-300 hover:bg-gray-100">
                <Eye size={20} />
                <Text>Public View</Text>
              </Button>
              <Button className="whitespace-nowrap  flex items-center gap-2 px-4 py-2 border rounded-sm text-gray-700 border-gray-300 hover:bg-gray-100">
                <Edit size={20} />
                <Text>Edit Profile</Text>
              </Button>
              <Link to="/auth/company/offices/add">
                <Button className="whitespace-nowrap flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700">
                  <Plus size={20} />
                  <Text>Add Office</Text>
                </Button>
              </Link>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-6">
            <hr />
            <div className="flex gap-6 mt-4">
              <Button
                onClick={() => setSelectedTab("company")}
                className={`text-md font-semibold pb-2 border-b-2 transition duration-150 ${
                  selectedTab === "company"
                    ? "text-blue-600 border-blue-600"
                    : "text-gray-600 border-transparent hover:border-blue-600 hover:text-blue-600"
                }`}
              >
                Company
              </Button>
              <Button
                onClick={() => setSelectedTab("about me")}
                className={`text-md font-semibold pb-2 border-b-2 transition duration-150 ${
                  selectedTab === "about me"
                    ? "text-blue-600 border-blue-600"
                    : "text-gray-600 border-transparent hover:border-blue-600 hover:text-blue-600"
                }`}
              >
                About Me
              </Button>
            </div>
          </div>

          {/* Dynamic Content Based on Tab */}
          <div className="mt-6">
            {selectedTab === "company" && (
              <Section>
                <Heading level={4} text="Company Overview" />
                <Text>This is the company information...</Text>
              </Section>
            )}
            {selectedTab === "about me" && (
              <Section>
                <Heading level={4} text="About Me" />
                <Text>This is the personal information...</Text>
              </Section>
            )}
          </div>
        </>
      )}
    </Page>
  );
};

export default CompanyProfilePage;
