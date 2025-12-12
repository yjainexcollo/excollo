// src/context/CursorContext.js
import React, { createContext, useContext, useState } from "react";

const CursorContext = createContext();

export const CursorProvider = ({ children }) => {
  const [cursorType, setCursorType] = useState("default");
  const [isHovered, setIsHovered] = useState(false);

  const setCursor = (type) => setCursorType(type);
  const setHovered = (value) => setIsHovered(value);

  return (
    <CursorContext.Provider
      value={{ cursorType, setCursor, isHovered, setHovered }}
    >
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);
