// Import your reducers
import persistReducer from "redux-persist/es/persistReducer";
import endorsementLetterDetailReducer from "../containers/Endorsements/_redux/endorsementLetterDetailSlice";
import storage from "redux-persist/lib/storage"; // LocalStorage

// Persist configuration
const endorsementLetterDetailPersistConfig = {
  key: "endorsementLetterDetail",
  storage,
 
};

// Persist reducers
const persistedEndorsementLetterDetailReducer = persistReducer(
  endorsementLetterDetailPersistConfig,
  endorsementLetterDetailReducer
);

export { persistedEndorsementLetterDetailReducer };
