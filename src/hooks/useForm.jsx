import { useState } from "react";

// Custom hook for managing form state
const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData(initialState); // Reset the form to the initial state
  };

  return [formData, handleInputChange, resetForm];
};

export default useForm;
