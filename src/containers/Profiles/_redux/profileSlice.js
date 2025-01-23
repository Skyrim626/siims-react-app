import { createSlice } from "@reduxjs/toolkit";
import { setFormValues } from "../../Endorsements/_redux/endorsementLetterDetailSlice";

const initialState = {
  id: "",
  first_name: "",
  middle_name: "",
  last_name: "",
  avatar: "",
  email: "",
  gender: "",
  phone_number: "",
  street: "",
  barangay: "",
  city_municipality: "",
  postal_code: "",
  profile_image_url: "",
  cover_image_url: "",
  student: {},
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileValues: (state, action) => {
      state.id = action.payload.id;
      state.first_name = action.payload.first_name;
      state.middle_name = action.payload.middle_name;
      state.last_name = action.payload.last_name;
      state.avatar = action.payload.avatar;
      state.email = action.payload.email;
      state.gender = action.payload.gender;
      state.phone_number = action.payload.phone_number;
      state.street = action.payload.street;
      state.barangay = action.payload.barangay;
      state.city_municipality = action.payload.city_municipality;
      state.postal_code = action.payload.postal_code;
      state.profile_image_url = action.payload.profile_image_url;
      state.cover_image_url = action.payload.cover_image_url;
      
      state.student = action.payload.student;
    },
  },
});

export const {setProfileValues} = profileSlice.actions;
export default profileSlice.reducer;
