import { createContext, useContext, useState } from "react";

const AppStateContext = createContext({
  user: {},
  token: "",
  setUser: () => {},
  setToken: () => {},
});

export const AppContextProvider = ({ children }) => {
  // States
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(
    localStorage.getItem("ACCESS_TOKEN") || ""
  );

  const setToken = (token) => {
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }

    _setToken(token);
  };

  return (
    <AppStateContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const appStateContext = () => useContext(AppStateContext);
