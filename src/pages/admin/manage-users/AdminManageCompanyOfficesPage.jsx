import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Page from "../../../components/common/Page";
import Section from "../../../components/common/Section";
import Heading from "../../../components/common/Heading";
import Text from "../../../components/common/Text";
import ManageHeader from "../../../components/common/ManageHeader";
import AdminCompanyOfficesTable from "../../../components/users/admin/table/AdminCompanyOfficesTable";
import FormModal from "../../../components/modals/FormModal";
import AdminCompanyOfficeForm from "../forms/AdminCompanyOfficeForm";
import {
  deleteRequest,
  postRequest,
  putRequest,
} from "../../../api/apiHelpers";

const AdminManageCompanyOfficesPage = () => {
  // Fetch initial offices and company (owner)
  const { initial_offices, company, office_types, supervisors } =
    useLoaderData();

  // State for offices and form modal
  const [offices, setOffices] = useState(initial_offices);
  const [isOpen, setIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);

  // Form input and errors
  const [officeTypeId, setOfficeTypeId] = useState(null);
  const [officeName, setOfficeName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [barangay, setBarangay] = useState("");
  const [cityMunicipality, setCityMunicipality] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [supervisorId, setSupervisorId] = useState(null);
  const [errors, setErrors] = useState({});

  // console.log(initial_offices);
  // console.log(company);

  // Select State
  const [selectedOffice, setSelectedOffice] = useState(null);

  // Delete office
  const deleteOffice = async (id) => {
    try {
      // console.log(id);

      // Make the DELETE request
      const response = await deleteRequest({
        url: `/api/v1/admin/users/companies/${company.id}/offices/${id}`,
      });

      setOffices((prevOffices) =>
        prevOffices.filter((office) => office.id !== id)
      );
    } catch (error) {
      console.log(`Cannot delete a office: `, error);
    }
  };

  // Update office
  const updateOffice = async () => {
    try {
      // Ready Payload
      const payload = {
        office_type_id: officeTypeId,
        name: officeName,
        phone_number: phoneNumber,
        street: street,
        barangay: barangay,
        city_municipality: cityMunicipality,
        province: province,
        postal_code: postalCode,
        supervisor_id: supervisorId,
      };

      // console.log(payload);
      // Send update request to the backend
      const response = await putRequest({
        url: `/api/v1/admin/users/companies/${company.id}/offices/${selectedOffice.id}`,
        data: payload,
      });

      // Update the office in the state
      setOffices((prevOffices) =>
        prevOffices.map((office) =>
          office.id === selectedOffice["id"]
            ? { ...office, ...response.data }
            : office
        )
      );

      setEditIsOpen(false);
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

  // Grab office
  const grabOffice = async (office) => {
    // console.log(office);

    // Set selected office
    setSelectedOffice(office);

    // Set values
    setOfficeTypeId(office["office_type_id"]);
    setOfficeName(office["name"]);
    setBarangay(office["barangay"]);
    setPhoneNumber(office["phone_number"]);
    setCityMunicipality(office["city_municipality"]);
    setProvince(office["province"]);
    setPostalCode(office["postal_code"]);
    setSupervisorId(office["supervisor_id"]);

    // Open Modal
    setEditIsOpen(true);
  };

  // Add office
  const addOffice = async () => {
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

      // Make the POST request
      const response = await postRequest({
        url: `/api/v1/admin/users/companies/${company.id}/offices`,
        data: payload,
      });

      // console.log(response.data);

      // Add the new office to the local state
      setOffices((prevOffices) => [...prevOffices, response.data]);

      // Reset form fields and errors on success
      setOfficeTypeId(null);
      setOfficeName("");
      setPhoneNumber("");
      setStreet("");
      setBarangay("");
      setCityMunicipality("");
      setProvince("");
      setPostalCode("");
      setErrors({});

      // Close modal
      setIsOpen(false);
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
    <Page>
      <Section>
        <Heading level={3} text={`${company.name} - Offices`} />
        <Text className="text-sm text-blue-950">
          This is where you manage the offices.
        </Text>
        <hr className="my-3" />
      </Section>

      <ManageHeader
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addPlaceholder="Add New Office"
        showExportButton={false}
        showImportButton={false}
      />

      {/* Table */}
      <AdminCompanyOfficesTable
        data={offices}
        handleEdit={grabOffice}
        handleArchive={deleteOffice}
      />

      {/* Modals */}
      <FormModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalTitle="Add Office"
        onSubmit={addOffice}
      >
        <AdminCompanyOfficeForm
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
      </FormModal>

      {selectedOffice && (
        <FormModal
          isOpen={editIsOpen}
          setIsOpen={setEditIsOpen}
          modalTitle="Edit Office"
          onSubmit={updateOffice}
        >
          <AdminCompanyOfficeForm
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
            supervisorId={supervisorId}
            setSupervisorId={setSupervisorId}
            displayFields={{
              officeTypeId: true,
              supervisorId: true,
            }}
            supervisors={supervisors}
          />
        </FormModal>
      )}
    </Page>
  );
};

export default AdminManageCompanyOfficesPage;
