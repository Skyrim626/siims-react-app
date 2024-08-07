import axiosClient from "../axios";

// List of genders
const genders = [
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
  {
    value: "other",
    label: "Other",
  },
]

// List of programs
const programs = async () => {
  try {
    const response = await axiosClient.get('/programs'); 
    const data = response.data;
  
    return data.map(program => ({
      ...program,
      value: program["program_name"],
      program_name: undefined,
    }));

  } catch(error) {
    console.error("Error fetching programs:", error);
    return [];
  }
}

export {genders, programs};