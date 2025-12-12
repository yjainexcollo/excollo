// src/components/GradientBallNotification/index.jsx
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { keyframes } from "@mui/system";

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const GradientBallNotification = ({
  timeout = 8000,
  position = { bottom: 50, left: 50 },
}) => {
  const [showNotification, setShowNotification] = useState(false);
  const [lastActivity, setLastActivity] = useState(0);

  useEffect(() => {
    setTimeout(() => setLastActivity(Date.now()), 0);
  }, []);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleActivity = () => {
      setLastActivity(Date.now());
      setShowNotification(false);
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("click", handleActivity);
    window.addEventListener("keypress", handleActivity);
    window.addEventListener("scroll", handleActivity);

    const inactivityTimer = setInterval(() => {
      const timeSinceLastActivity = Date.now() - lastActivity;
      if (timeSinceLastActivity >= timeout && !isHovered) {
        setShowNotification(true);
      }
    }, 1000);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("click", handleActivity);
      window.removeEventListener("keypress", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      clearInterval(inactivityTimer);
    };
  }, [timeout, lastActivity, isHovered]);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: position.bottom,
        left: position.left,
        zIndex: 9999,
        transition: "all 0.7s ease-in-out",
        transform: showNotification ? "scale(1)" : "scale(0)",
        opacity: showNotification ? 1 : 0,
      }}
    >
      <Box
        sx={{
          width: 84,
          height: 84,
          borderRadius: "50%",
          background: "linear-gradient(180deg,  #05000A 0%, #1B1125 100%)",
          boxShadow: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "transform 0.3s ease",
          animation: `${pulse} 2s infinite ease-in-out`,
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setLastActivity(Date.now());
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontWeight: 500,
          }}
        >
          Scroll
        </Typography>
      </Box>
    </Box>
  );
};

export default GradientBallNotification;
