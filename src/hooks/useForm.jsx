import { useState } from "react";

// Custom hook for managing form state
const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
      [name]: type === "file" ? files[0] : value,
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
