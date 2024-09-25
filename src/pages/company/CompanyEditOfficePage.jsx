import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getRequest, putRequest } from "../../api/apiHelpers";
import useForm from "../../hooks/useForm";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import { stripLocation } from "../../utils/strip";
import { ChevronLeft } from "lucide-react";
import OfficeForm from "../../components/forms/OfficeForm";
import Heading from "../../components/common/Heading";
import ContentLoader from "../../components/atoms/ContentLoader";
import Text from "../../components/common/Text";

const CompanyEditOfficePage = () => {
  // Use Params
  const { id } = useParams();

  // Open Location
  const location = useLocation();
  const strippedPath =
    stripLocation(location.pathname, `/edit-office/${id}`) + `/${id}`;

  // Form State
  // Using the custom hook for Office Information (Add)
  const [officeInfo, handleOfficeInfoChange, resetOfficeInfo, setOfficeInfo] =
    useForm({
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

  // Fetch State
  const [officeTypes, setOfficeTypes] = useState([]);
  const [supervisors, setSupervisors] = useState([]);

  // UseEffect: Fetch Office
  useEffect(() => {
    // Method: fetchOffice
    const fetchOffice = async () => {
      const response = await getRequest({
        url: `/api/v1/company/offices/${id}`,
      });

      // Set Office
      setOfficeInfo({
        office_type_id: response.office_type_id,
        supervisor_id: response.supervisor_id,
        name: response.name,
        phone_number: response.phone_number,
        street: response.street,
        barangay: response.barangay,
        city_municipality: response.city_municipality,
        province: response.province,
        postal_code: response.postal_code,
      });

      // Office Types

      const officeTypeResponse = await getRequest({
        url: "/api/v1/company/office-types",
      });

      // Set States
      setOfficeTypes(officeTypeResponse);
    };

    // Call Method: fetchOffice
    fetchOffice();
  }, []);

  // Handle Submit Form
  const handleSubmit = async () => {
    // Ready Payload
    const payload = officeInfo;

    // Submit Request
    const response = await putRequest({
      url: `/api/v1/company/offices/${id}`,
      data: payload,
    });

    console.log(response);
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
              className="flex items-center text-sm font-bold text-blue-500 hover:underline"
            >
              <ChevronLeft size={20} />
              Go Back
            </Link>
          </Section>

          <Section>
            <Heading level={3} text={"Edit Office"} />
            <Text className="text-sm text-blue-950">
              This is where you add an office for your company.
            </Text>
            <hr className="my-3" />
          </Section>

          <Section>
            <OfficeForm
              method="put"
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

export default CompanyEditOfficePage;
