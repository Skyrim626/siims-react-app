import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequest } from "../../api/apiHelpers";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import coverPhoto from "../../assets/images/company/company-cover-photo.jpg";
import profilePhoto from "../../assets/images/company/company-profile-photo.jpg";
import Text from "../../components/common/Text";
import { MapPin, MessageCircle } from "lucide-react";
import { Button } from "@headlessui/react";

// Companies Page
const DeanCompanyPage = () => {
  // Param
  const { company_id } = useParams();

  // State
  const [company, setCompany] = useState({});

  // Get Company
  useEffect(() => {
    const fetchCompany = async () => {
      const response = await getRequest({
        url: `/api/v1/dean/companies/${company_id}`,
      });

      // Set Company
      console.log(response);
      setCompany(response);
    };

    // Call
    fetchCompany();
  }, []);

  // Concatenate Full Address
  const fullAddress = `${company.street}, ${company.barangay}, ${company.city_municipality}, ${company.postal_code}, ${company.province}`;

  return (
    <>
      {company && (
        <Page className="p-0">
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
        </Page>
      )}
    </>
  );
};

export default DeanCompanyPage;
