import { configureStore } from "@reduxjs/toolkit";

import endorsementLetterReducer from "../containers/Endorsements/_redux/endorsementLetterSlice";
import { persistedEndorsementLetterDetailReducer } from "./persistConfig";

export const store = configureStore({
  reducer: {
    endorsementLetter: endorsementLetterReducer,
    endorsementLetterDetail: persistedEndorsementLetterDetailReducer,
  },
});

// store.js
import { persistStore } from "redux-persist"; // Import persistStore

export const persistor = persistStore(store); // Create persistor
