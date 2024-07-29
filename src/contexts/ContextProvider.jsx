import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: {},
  token: null,
  setUser: () => {},
  setToken: () => {},
});

export const ContextProvider = ({ children }) => {
  // User State
  const [user, setUser] = useState({
    roles: ["student"],
  });
  // Token State
  const [token, setToken] = useState("12");

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const userStateContext = () => useContext(StateContext);
