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
  // Select State
  const [selectedTab, setSelectedTab] = useState("company");

  // Fetch State
  const [profile, setProfile] = useState({});

  // Use Effect: Fetch Profile
  useEffect(() => {
    // Method: fetchProfile
    const fetchProfile = async () => {
      const response = await getRequest({
        url: "/api/v1/company/profile",
      });

      // Set Profile State
      setProfile(response);
    };

    // Call fetchProfile
    fetchProfile();
  }, []);

  // Address Concatenation
  // Concatenate Full Address
  const fullAddress = `${profile.street}, ${profile.barangay}, ${profile.city_municipality}, ${profile.postal_code}, ${profile.province}`;

  return (
    <>
      {profile && (
        <Page>
          <Section>
            <Heading level={3} text={"Profile"} />
            <Text className="text-sm text-blue-950">
              This is where you manage your profile.
            </Text>
            <hr className="my-3" />
          </Section>
          <div className="w-full h-[320px]">
            <img
              src={coverPhoto}
              alt="Cover Photo"
              className="object-cover w-full h-full rounded-t-md"
            />
          </div>
          <div className="grid grid-cols-3 items-center ">
            <div className="flex items-center gap-2 col-span-2">
              <div>
                <div>
                  <img
                    src={profilePhoto}
                    alt="Company Profile Photo"
                    className="w-[180px] h-[150px] border-white object-cover rounded-b-md"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Text className="text-xl font-bold">
                  {profile.company_name}
                </Text>

                <div className="flex items-center text-sm">
                  <MapPin />
                  <Text className="font-bold">{fullAddress}</Text>
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-center justify-center">
              <Button className="p-2 py-3 border-2 rounded-md flex items-center gap-1 font-bold border-gray-700 transition duration-100 hover:bg-gray-700 hover:text-white">
                <Eye size={20} />
                <Text>See Public View</Text>
              </Button>
              <Button className="p-2 py-3 border-2 rounded-md flex items-center gap-1 font-bold border-gray-700 transition duration-100 hover:bg-gray-700 hover:text-white">
                <Edit size={20} />
                <Text>Edit</Text>
              </Button>
              <Link to={"/auth/company/offices/add"}>
                <Button className="p-2 py-3 border-2 rounded-md flex items-center gap-1 font-bold text-white bg-blue-600 transition duration-100 hover:bg-blue-700">
                  <Plus size={20} />
                  <Text>Add Office</Text>
                </Button>
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-3">
            <hr />
            <div className="flex items-center gap-5 mt-3">
              <Button
                onClick={() => {
                  setSelectedTab("company");
                }}
                className={`transition text-black duration-100 font-bold border-b-2 border-b-transparent ${
                  selectedTab === "company"
                    ? "text-blue-700 border-b-blue-700"
                    : "hover:border-blue-700"
                }`}
              >
                Company
              </Button>
              <Button
                onClick={() => {
                  setSelectedTab("about me");
                }}
                className={`transition text-black duration-100 font-bold border-b-2 border-b-transparent ${
                  selectedTab === "about me"
                    ? "text-blue-700 border-b-blue-700"
                    : "hover:border-blue-700"
                }`}
              >
                About Me
              </Button>
            </div>
          </div>

          {/* Section Switch Tab */}
        </Page>
      )}
    </>
  );
};

export default CompanyProfilePage;
