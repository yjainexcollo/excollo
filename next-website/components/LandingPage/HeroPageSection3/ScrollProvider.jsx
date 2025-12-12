"use client";

import React, { createContext, useState, useEffect } from "react";

export const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeScroller, setActiveScroller] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  return (
    <ScrollContext.Provider
      value={{
        scrollPosition,
        setScrollPosition,
        activeScroller,
        setActiveScroller,
        hoveredIndex,
        setHoveredIndex,
        rotation,
        setRotation,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};