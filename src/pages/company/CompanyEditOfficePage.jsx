import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequest } from "../../api/apiHelpers";
import useForm from "../../hooks/useForm";

const CompanyEditOfficePage = () => {
  // Use Params
  const { id } = useParams();

  // Form State
  // Using the custom hook for Office Information (Add)
  const [
    officeInfo,
    handleOfficeInfoChange,
    resetOfficeInfo,
    setEditOfficeInfo,
  ] = useForm({
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

  // UseEffect: Fetch Office
  useEffect(() => {
    // Method: fetchOffice
    const fetchOffice = async () => {
      const response = await getRequest({
        url: `/api/v1/company/offices/${id}`,
      });

      // Set Office
      setEditOfficeInfo({
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
    };

    // Call Method: fetchOffice
    fetchOffice();
  }, []);

  return <div>{id}</div>;
};

export default CompanyEditOfficePage;
