import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useParams,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
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
import { Button } from "@headlessui/react";

const CompanyEditOfficePage = () => {
  // Fetch office
  const { initial_office, office_types } = useLoaderData();
  // console.log(initial_office);

  // Form input and errors
  const [officeTypeId, setOfficeTypeId] = useState(
    initial_office.office_type_id
  );
  const [officeName, setOfficeName] = useState(initial_office.name || "");
  const [phoneNumber, setPhoneNumber] = useState(
    initial_office.phone_number || ""
  );
  const [street, setStreet] = useState(initial_office.street || "");
  const [barangay, setBarangay] = useState(initial_office.barangay || "");
  const [cityMunicipality, setCityMunicipality] = useState(
    initial_office.city_municipality || ""
  );
  const [province, setProvince] = useState(initial_office.province || "");
  const [postalCode, setPostalCode] = useState(
    initial_office.postal_code || ""
  );
  const [errors, setErrors] = useState({});

  // Open Location and naviate
  const location = useLocation();
  const navigate = useNavigate();

  // Update office
  const updateOffice = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        office_type_id: officeTypeId,
        name: officeName,
        phone_number: phoneNumber,
        street: street,
        barangay: barangay,
        city_municipality: cityMunicipality,
        province: province,
        postal_code: postalCode,
      };

      // console.log(payload);

      // Make the PUT request
      const response = await putRequest({
        url: `/api/v1/company/offices/${initial_office.id}`,
        data: payload,
      });

      // navigate("/auth/company/offices");
      navigate(-1);
    } catch (error) {
      // Handle and set errors
      if (error.response && error.response.data && error.response.data.errors) {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors); // Assuming validation errors are in `errors`
      } else {
        console.error("An unexpected error occurred:", error);
        setErrors({
          general: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };
  return (
    <>
      <Page>
        <Section>
          <Button
            onClick={() => navigate(-1)}
            className="flex items-center text-sm font-bold text-blue-500 hover:underline"
          >
            <ChevronLeft size={20} />
            Go Back
          </Button>
        </Section>

        <Section>
          <Heading level={3} text={"Edit Office"} />
          <Text className="text-sm text-blue-950">
            This is where you edit an office for your company.
          </Text>
          <hr className="my-3" />
        </Section>

        <Section>
          <form onSubmit={updateOffice}>
            <OfficeForm
              isModal={true}
              officeTypeId={officeTypeId}
              setOfficeTypeId={setOfficeTypeId}
              officeName={officeName}
              setOfficeName={setOfficeName}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              street={street}
              setStreet={setStreet}
              barangay={barangay}
              setBarangay={setBarangay}
              cityMunicipality={cityMunicipality}
              setCityMunicipality={setCityMunicipality}
              province={province}
              setProvince={setProvince}
              postalCode={postalCode}
              setPostalCode={setPostalCode}
              officeTypes={office_types}
            />
          </form>
        </Section>
      </Page>
    </>
  );
};

export default CompanyEditOfficePage;
