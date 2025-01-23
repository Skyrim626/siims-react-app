import { configureStore } from "@reduxjs/toolkit";

import profileReducer from "../containers/Profiles/_redux/profileSlice";
import endorsementLetterReducer from "../containers/Endorsements/_redux/endorsementLetterSlice";
import { persistedEndorsementLetterDetailReducer } from "./persistConfig";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    endorsementLetter: endorsementLetterReducer,
    endorsementLetterDetail: persistedEndorsementLetterDetailReducer,
  },
});

// store.js
import { persistStore } from "redux-persist"; // Import persistStore

export const persistor = persistStore(store); // Create persistor
