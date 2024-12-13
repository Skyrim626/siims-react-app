import { useState } from "react";

// Custom hook for managing form state
const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
    setFormData(initialState);
  };

  return { formData, handleInputChange, resetForm, setFormValues };
};

export default useForm;
