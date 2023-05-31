import React, { createContext, useState, useEffect } from "react";
import AuthService from "./auth";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (AuthService.loggedIn()) {
      const profile = AuthService.getProfile();
      setUser(profile);
    }
  }, []);

  const login = (idToken) => {
    AuthService.login(idToken);
    const profile = AuthService.getProfile();
    setUser(profile);
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
