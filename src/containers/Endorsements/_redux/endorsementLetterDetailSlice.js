import { createSlice } from "@reduxjs/toolkit"


/**
 * 
 * 
 * 
 * 
 * ! TBD !
 * 
 * 
 * 
 */

const initialState = {
  name: "",
  student_id: "",
  letter_status_id: 0,
  letter_status_name: "",
  students: [],
  company_address: "",
  company_name: "",
  recipient_name: "",
  recipient_position: "",
  endorse_students_count: 0,
}

const endorsementLetterDetailSlice = createSlice({
  name: "endorsementLetterDetail",
  initialState,
  reducers: {
    setFormValues: (state, action) => {
      // Correctly update the properties of state
      state.name = action.payload.name;
      state.student_id = action.payload.student_id;
      state.letter_status_id = action.payload.letter_status_id;
      state.letter_status_name = action.payload.letter_status_name;
      state.students = action.payload.students;
      state.company_address = action.payload.company_address;
      state.company_name = action.payload.company_name;
      state.recipient_name = action.payload.recipient_name;
      state.recipient_position = action.payload.recipient_position;
      state.endorse_students_count = action.payload.endorse_students_count;
    }
  }
})


export const {setFormValues} = endorsementLetterDetailSlice.actions;
export default endorsementLetterDetailSlice.reducer;