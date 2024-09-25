import { useState } from "react";

/**
 * Custom hook for managing form state.
 *
 * @param {Object} initialState - The initial state of the form fields.
 * @returns {Array} An array containing:
 *   - formData: The current state of the form fields.
 *   - handleInputChange: Function to handle input changes in the form.
 *   - resetForm: Function to reset the form fields to their initial state.
 *   - setFormValues: Function to manually set form field values.
 *
 * Sample usage:
 * const [officeInfo, handleOfficeInfoChange, resetOfficeInfo] = useForm({
 *   office_type_id: "",
 *   supervisor_id: "",
 *   name: "",
 *   phone_number: "",
 *   street: "",
 *   barangay: "",
 *   city_municipality: "",
 *   province: "",
 *   postal_code: "",
 * });
 */

// Custom hook for managing form state
const useForm = (initialState) => {
  // State variable to hold the current form data
  const [formData, setFormData] = useState(initialState);

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the form data while preserving existing values
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to set the form values manually
  const setFormValues = (newValues) => {
    setFormData(newValues);
  };

  // Function to reset the form fields to the initial state
  const resetForm = () => {
    setFormData(initialState); // Reset the form to the initial state
  };

  // Return the form data, input change handler, reset function, and set values function
  return [formData, handleInputChange, resetForm, setFormValues];
};

export default useForm;
