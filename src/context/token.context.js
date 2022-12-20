import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { editUrl } from "../urls";

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token"));

  const changeToken = (token) => {
    setToken(token);
  };

  useEffect(() => {
    if (token === "") {
      navigate("/login");
    }
  }, [token, navigate]);

  

  return (
    <TokenContext.Provider value={{ token, changeToken }}>
      {children}
    </TokenContext.Provider>
  );
};
