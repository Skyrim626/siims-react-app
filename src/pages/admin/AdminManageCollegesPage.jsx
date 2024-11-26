import React, { useEffect, useState } from "react";
import Page from "../../components/common/Page";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../api/apiHelpers";
import Section from "../../components/common/Section";
import Text from "../../components/common/Text";
import Heading from "../../components/common/Heading";
import FormModal from "../../components/modals/FormModal";
import AdminCollegeFormAdd from "./forms/AdminCollegeFormAdd";
import AdminCollegeFormEdit from "./forms/AdminCollegeFormEdit";
import useForm from "../../hooks/useForm";
import AdminCollegesTable from "../../components/users/admin/table/AdminCollegesTable";
import useHandleSubmit from "../../hooks/useHandleSubmit";
import ManageHeader from "../../components/common/ManageHeader";
import { useLoaderData, useNavigate, useLocation } from "react-router-dom";
import Table from "../../components/tables/Table";
import CollegeForm from "../../components/forms/CollegeForm";
import Loader from "../../components/common/Loader";

const AdminManageCollegesPage = () => {
  // Retrieve the user_roles data from the loader
  const { initial_colleges, list_of_deans } = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();

  // Loader state
  const [loading, setLoading] = useState(false);

  // console.log(list_of_deans);

  // State for colleges and form modal
  const [colleges, setColleges] = useState(initial_colleges);
  const [isOpen, setIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);

  // Form input and errors
  const [collegeName, setCollegeName] = useState("");
  const [deanId, setDeanId] = useState(null);
  const [errors, setErrors] = useState({});

  // Select State
  const [selectedCollege, setSelectedCollege] = useState({});

  // Add new College
  const addNewCollege = async () => {
    // Set loading
    setLoading(true);

    try {
      // Payload
      const payload = {
        name: collegeName,
      };

      // Make the POST request
      const response = await postRequest({
        url: "/api/v1/colleges",
        data: payload,
      });

      // Add the new college to the local state
      setColleges((prevColleges) => [...prevColleges, response.data]);
      // Reset form and close modal on success
      setCollegeName("");
      setErrors({});
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
    } finally {
      setLoading(false);
    }
  };

  // Update College
  const updateCollege = async () => {
    // Set Loading State
    setLoading(true);

    try {
      // Ready Payload
      const payload = {
        dean_id: deanId,
        name: collegeName,
      };

      // Send update request to the backend
      const response = await putRequest({
        url: `/api/v1/colleges/${selectedCollege["id"]}`,
        data: payload,
      });

      // Update the college in the state
      setColleges((prevColleges) =>
        prevColleges.map((college) =>
          college.id === selectedCollege["id"]
            ? { ...college, ...response.data }
            : college
        )
      );

      // Reset inputs and modals
      setCollegeName("");
      setDeanId(null);
      setEditIsOpen(false);

      // Refresh Page
      if (response) {
        navigate(location.pathname, { replace: true });
      }
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
      console.error("Error updating role:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Edit Select College
  const handleEdit = (college) => {
    // Set College State
    setSelectedCollege(college);

    // Pre-fill the collegeName and dean_id
    setCollegeName(college.name);
    setDeanId(college.dean_id);
    setErrors({});

    // Open Modal
    setEditIsOpen(true);
  };

  return (
    <>
      <Page>
        <Loader loading={loading} />

        <Section>
          <Heading level={3} text={"Colleges"} />
          <Text className="text-sm text-blue-950">
            This is where you manage the colleges.
          </Text>
          <hr className="my-3" />
        </Section>

        <ManageHeader
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          addPlaceholder="Add New College"
          showExportButton={false}
          showImportButton={false}
        />

        {/* Table */}
        <Table data={colleges} handleEdit={handleEdit} />

        {/* Form Modal */}
        {/* Add Form Modal */}
        <FormModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalTitle="Add College"
          onSubmit={addNewCollege}
        >
          <CollegeForm
            collegeName={collegeName}
            setCollegeName={setCollegeName}
            errors={errors}
          />
        </FormModal>

        {/* Edit Form Modal */}
        {selectedCollege && (
          <FormModal
            isOpen={editIsOpen}
            setIsOpen={setEditIsOpen}
            modalTitle="Edit College"
            onSubmit={updateCollege}
          >
            <CollegeForm
              method="put"
              collegeName={collegeName}
              deanId={deanId}
              setDeanId={setDeanId}
              setCollegeName={setCollegeName}
              deans={list_of_deans}
              errors={errors}
            />
          </FormModal>
        )}
      </Page>
    </>
  );
};

export default AdminManageCollegesPage;
