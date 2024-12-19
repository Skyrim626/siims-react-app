import { useState } from 'react'

// Custom hook for managing form state
const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState)

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  // Function to set the form values manually
  const setFormValues = (newValues) => {
    setFormData(newValues)
  }

  return [formData, handleInputChange, setFormValues] // Return the necessary values
}

export default useForm
