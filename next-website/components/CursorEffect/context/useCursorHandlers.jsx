// src/hooks/useCursorHandlers.js

import { useCursor } from "./CursorContext";


export const useCursorHandlers = (cursorType = "default") => {
  const { setCursor, setHovered } = useCursor();

  return {
    handleMouseEnter: () => {
      setCursor(cursorType);
      setHovered(true);
    },
    handleMouseLeave: () => {
      setCursor("default");
      setHovered(false);
    },
  };
};
