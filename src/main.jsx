// Other Libraries
import React from "react";
import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";

// CSS
import "./index.css";
import "react-toastify/dist/ReactToastify.css"; // React-Toastify

// Other imports
import router from "./routes/router";
import { AuthProvider } from "./hooks/useAuth";

// Import Components
import LoadingScreen from "./components/common/LoadingScreen";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <RouterProvider
            router={router}
            fallbackElement={<LoadingScreen />}
            future={{ v7_startTransition: true, v7_partialHydration: true }}
          />
        </AuthProvider>
        <ToastContainer />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
