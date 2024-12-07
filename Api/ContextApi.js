import React, { createContext, useContext, useState } from "react";
const NameContext = createContext();
export const useName = () => useContext(NameContext);
export const NameProvider = ({ children }) => {
  const [name, setName] = useState("unknown");
  return (
    <NameContext.Provider value={{ name, setName }}>
      {children}
    </NameContext.Provider>
  );
};
