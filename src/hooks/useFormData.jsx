import { useState } from "react";

function useFormData(initialData = {}) {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to set data based on an object, such as when selecting a job
  const setFormDataFromObject = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const reset = () => {
    setFormData(initialData);
  };

  return {
    formData,
    handleChange,
    setFormDataFromObject,
    reset,
  };
}

export default useFormData;
