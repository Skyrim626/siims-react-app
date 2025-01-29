import { useState } from "react";

// Custom hook for managing form state
const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      // Auto-calculate hours_received
      if (updatedData.time_in && updatedData.time_out) {
        const timeIn = new Date(`1970-01-01T${updatedData.time_in}:00`);
        const timeOut = new Date(`1970-01-01T${updatedData.time_out}:00`);
        const diffInMilliseconds = timeOut - timeIn;

        if (diffInMilliseconds > 0) {
          updatedData.hours_received = (
            diffInMilliseconds /
            (1000 * 60 * 60)
          ).toFixed(2);
        } else {
          updatedData.hours_received = "0.00";
        }
      }

      return updatedData;
    });
  };

  // Function to set the form values manually
  const setFormValues = (newValues) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newValues,
    }));
  };

  // Function to reset the form fields to the initial state
  const resetForm = () => {
    setFormData(initialState);
  };

  return { formData, handleInputChange, resetForm, setFormValues };
};

export default useForm;
