import React, { useState, createContext } from "react";
import { login, signup } from "../api/movies-api";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(!!existingToken);
  const [authToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState("");

  // Function to store JWT token in local storage
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  };

  const authenticate = async (username, password) => {
    const result = await login(username, password);
    if (result.token) {
      setToken(result.token);
      setIsAuthenticated(true);
      setUserName(username);
    }
  };

  const register = async (username, password) => {
    const result = await signup(username, password);
    return result.code === 201;
  };

  const signout = () => {
    setTimeout(() => {
      setIsAuthenticated(false);
      localStorage.removeItem("token"); // Clear token from local storage on sign out
    }, 100);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        signout,
        userName,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
