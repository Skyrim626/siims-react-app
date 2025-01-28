import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  current_date: new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  requested_by_id: "",
  greeting_message: "Dear Mr John Doe",
  company_name: "XYZ Company",
  company_address: "Street, Barangay, Province, City, Postal Code",
  recipient_name: "JOHN DOE",
  recipient_position: "HR Specialist",
  program: "Bachelor of Science in Information Technology",
  college: "College of Information Technology and Computing",
  dean_full_name: "DR. JUNAR A. LANDICHO",
  chairperson_full_name: "ENGR. JAY NOEL ROJO",
  ojt_coordinator_full_name: "",
  ojt_coordinator_email: "",
  dean_office_number: "088-857-1739",
  local_number: "1153",
  file_name: "endorsement-letter.pdf",
  job_type: "intern",

  students: [],
};

const endorsementLetterSlice  = createSlice({
  name: "endorsementLetter",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    addStudent: (state, action) => {

      // console.log(action.payload);

      state.students.push(action.payload);
    },
    removeStudent: (state, action) => {

      // console.log(action);

      state.students = state.students.filter((student) => student.id !== action.payload)
    },
    clearStudents: (state) => {
      state.students = [];
    },
    resetForm: (state) => {

      // Reset the form fields except for the ones you want to keep
      state.requested_by_id = "";
      state.greeting_message = "Dear ";
      state.company_name = "";
      state.company_address = "";
      state.recipient_name = "";
      state.recipient_position = "";
      state.ojt_coordinator_full_name = "";
      state.ojt_coordinator_email = "";
      state.students=[];
      
      // Keep these fields intact
      state.current_date = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      state.program = "Bachelor of Science in Information Technology";
      state.college = "College of Information Technology and Computing";
      state.dean_full_name = "Dr. Junar A. Landicho";
      state.chairperson_full_name = "Engr. Jay Noel Rojo";
      state.dean_office_number = "088-857-1739";
      state.local_number = "1153";
      state.job_type = "intern";
      state.file_name = "endorsement-letter.pdf";

    }
  }
})

export const { updateField, addStudent, removeStudent, clearStudents, resetForm  } = endorsementLetterSlice.actions;
export default endorsementLetterSlice.reducer;