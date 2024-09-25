import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Section from "../../components/common/Section";
import Page from "../../components/common/Page";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import CompanyOfficeFormAdd from "../../components/users/company/forms/CompanyOfficeFormAdd";
import useForm from "../../hooks/useForm";
import { getRequest, postRequest } from "../../api/apiHelpers";
import { ChevronLeft } from "lucide-react";
import { stripLocation } from "../../utils/strip";
import OfficeForm from "../../components/forms/OfficeForm";
import ContentLoader from "../../components/atoms/ContentLoader";

const CompanyAddOfficePage = () => {
  // Open Location
  const location = useLocation();
  const strippedPath = stripLocation(location.pathname, "/add");

  // Fetch State
  const [officeTypes, setOfficeTypes] = useState([]);
  const [supervisors, setSupervisors] = useState([]);

  // Form State
  // Using the custom hook for Office Information (Add)
  const [officeInfo, handleOfficeInfoChange, resetOfficeInfo] = useForm({
    office_type_id: "",
    supervisor_id: "",
    name: "",
    phone_number: "",
    street: "",
    barangay: "",
    city_municipality: "",
    province: "",
    postal_code: "",
  });

  // Use Effect: Fetching Data
  useEffect(() => {
    // Method: fetchData
    const fetchData = async () => {
      const officeTypeResponse = await getRequest({
        url: "/api/v1/company/office-types",
      });

      // Set States
      setOfficeTypes(officeTypeResponse);
    };

    // Call Method: fetchData
    fetchData();
  }, []);

  // Handle Submit Form
  const handleSubmit = async () => {
    // Ready Payload
    const payload = officeInfo;

    // Submit Request
    const response = await postRequest({
      url: "/api/v1/company/offices",
      data: payload,
    });

    // console.log(response);
    // Reset Form
    resetOfficeInfo();
  };

  return (
    <>
      {officeTypes.length !== 0 ? (
        <Page>
          <Section>
            <Link
              to={strippedPath}
              className="flex items-center text-sm font-bold text-blue-500"
            >
              <ChevronLeft size={20} />
              Go Back
            </Link>
          </Section>

          <Section>
            <Heading level={3} text={"Add Office"} />
            <Text className="text-sm text-blue-950">
              This is where you add an office for your company.
            </Text>
            <hr className="my-3" />
          </Section>

          <Section>
            <OfficeForm
              userRole="company"
              officeTypes={officeTypes}
              supervisors={supervisors}
              officeInfo={officeInfo}
              handleOfficeInfoChange={handleOfficeInfoChange}
              handleSubmit={handleSubmit}
            />
          </Section>
        </Page>
      ) : (
        <ContentLoader />
      )}
    </>
  );
};

export default CompanyAddOfficePage;
