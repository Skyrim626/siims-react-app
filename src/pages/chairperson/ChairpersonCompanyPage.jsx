import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Section from "../../components/common/Section";
import useSearch from "../../hooks/useSearch";
import { getRequest } from "../../api/apiHelpers";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import Table from "../../components/tables/Table";
import { Button } from "@headlessui/react";
import coverPhoto from "../../assets/images/company/company-cover-photo.jpg";
import profilePhoto from "../../assets/images/company/company-profile-photo.jpg";
import { MapPin, MessageCircle } from "lucide-react";

// Render Button Tabs
const buttonTabs = [
  {
    title: "Profile",
    value: "profile",
  },
  {
    title: "Offices",
    value: "offices",
  },
];

// Companies Page
const ChairpersonCompanyPage = () => {
  // Use params
  const { company_id } = useParams();

  // State to store the company
  const [company, setCompany] = useState({});
  // State to store the list of offices
  const [offices, setOffices] = useState([]); // Initializing state to hold office data

  // State for Button Tab Selected
  const [selectedTab, setSelectedTab] = useState(buttonTabs[0].value);

  // Custom Hook for Search Table
  const { term, filteredData, handleSearchChange } = useSearch(offices, ""); // Using the custom hook to manage search term and filtered data

  // useEffect hook to fetch company, and offices from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      // Perform GET request to retrieve company
      const companyResponse = await getRequest({
        url: `/api/v1/chairperson/companies/${company_id}`, // API endpoint for fetching company
      });

      // Update the state with the fetched company data
      setCompany(companyResponse); // Setting the fetched company data in state

      // Perform GET request to retrieve offices
      const companyOfficesResponse = await getRequest({
        url: `/api/v1/chairperson/companies/${company_id}/offices`, // API endpoint for fetching offices
      });

      // Update the state with the fetched offices data
      setOffices(companyOfficesResponse); // Setting the fetched office data in state
    };

    fetchData(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs only once on component mount

  // Concatenate Full Address
  const fullAddress = `${company.street}, ${company.barangay}, ${company.city_municipality}, ${company.postal_code}, ${company.province}`;

  return (
    <>
      {company && offices.length > 0 && (
        <>
          <Section>
            <div className="flex gap-3 mb-4">
              {buttonTabs.map((buttonTab) => (
                <Button
                  key={buttonTab.value}
                  onClick={() => setSelectedTab(buttonTab.value)}
                  className={`flex-1 text-md font-semibold text-blue-500 border-b-2 transition duration-300 ease-in-out ${
                    buttonTab.value === selectedTab
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent hover:border-blue-600"
                  }`}
                >
                  {buttonTab.title}
                </Button>
              ))}
            </div>
          </Section>

          {selectedTab === buttonTabs[0].value ? (
            <Section>
              <div className="w-full h-[320px]">
                <img
                  src={coverPhoto}
                  alt="Cover Photo"
                  className="object-cover w-full h-full rounded-t-md"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
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
                      {company.company_name}
                    </Text>

                    <div className="flex items-center text-sm">
                      <MapPin />
                      <Text className="font-bold">{fullAddress}</Text>
                    </div>
                  </div>
                </div>
                <div>
                  <Button className="p-2 py-3 border-2 rounded-md flex items-center gap-1 font-bold border-gray-700 transition duration-100 hover:bg-gray-700 hover:text-white">
                    <MessageCircle size={20} />
                    <Text>Message</Text>
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-1 mt-3 font-semibold">
                <Text>
                  Email Us:{" "}
                  <a
                    href={`mailto:${company.email}`}
                    className="text-blue-500 hover:underline"
                  >
                    {company.email}
                  </a>
                </Text>
                <Text>Contact Us: {company.phone_number}</Text>
                {/* Clickable website URL */}
                {company.website_url && (
                  <Text>
                    Visit Us:{" "}
                    <a
                      href={company.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {company.website_url}
                    </a>
                  </Text>
                )}
              </div>
            </Section>
          ) : (
            <>
              <Section>
                <Heading
                  level={3}
                  text={company ? company.company_name : "Loading"}
                />
                <Text className="text-sm text-blue-950">
                  This is where you view their offices
                </Text>
                <hr className="my-3" />
              </Section>

              {offices.length > 0 ? (
                <Table
                  data={offices}
                  searchPlaceholder="Search Office..."
                  term={term}
                  filteredData={filteredData}
                  handleSearchChange={handleSearchChange}
                />
              ) : (
                <div>No Data</div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default ChairpersonCompanyPage;
