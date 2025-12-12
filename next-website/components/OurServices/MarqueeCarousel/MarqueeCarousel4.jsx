import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import figma from "../../../assets/marqueelogo4/figma.png";
import nextjs from "../../../assets/marqueelogo4/nextjs.png";
import nodejs from "../../../assets/marqueelogo4/nodejs.png";
import postgresql from "../../../assets/marqueelogo4/postgresql.png";
import react from "../../../assets/marqueelogo4/react.png";
import reactnative from "../../../assets/marqueelogo4/reactnative.png";
import webflow from "../../../assets/marqueelogo4/webflow.png";
import wix from "../../../assets/marqueelogo4/wix.png";

const MarqueeCarousel4 = () => {
   const theme = useTheme();
   const isSpecified = useMediaQuery(theme.breakpoints.up("md"));
   const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
   const isXtraLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));
  const technologies = [
    {
      name: "Technology 1",
      content: (
        <Box
          sx={{
            backgroundColor: "gray.700",
            height: 48,
            width: 96,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
          }}
        >
          <img src={figma} alt="Logo" style={{ height: 90, width: "auto" }} />
        </Box>
      ),
    },
    {
      name: "Technology 2",
      content: (
        <Box
          sx={{
            backgroundColor: "gray.700",
            height: 48,
            width: 96,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
          }}
        >
            <img
              src={nextjs}
              alt="Logo"
              style={{ height: 50, width: "auto", marginLeft: "-2rem", marginRight: "-2rem" }}
            />
        </Box>
      ),
    },
    {
      name: "Technology 3",
      content: (
        <Box
          sx={{
            backgroundColor: "gray.700",
            height: 48,
            width: 96,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
          }}
        >
          <img
            src={postgresql}
            alt="Logo"
            style={{ height: 50, width: "auto" }}
          />
        </Box>
      ),
    },
    {
      name: "Technology 4",
      content: (
        <Box
          sx={{
            backgroundColor: "gray.700",
            height: 48,
            width: 96,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
          }}
        >
          <img src={react} alt="Logo" style={{ height: 50, width: "auto" }} />
        </Box>
      ),
    },
    {
      name: "Technology 5",
      content: (
        <Box
          sx={{
            backgroundColor: "gray.700",
            height: 48,
            width: 96,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
          }}
        >
          <img src={nodejs} alt="Logo" style={{ height: 50, width: "auto" }} />
        </Box>
      ),
    },
    {
      name: "Technology 6",
      content: (
        <Box
          sx={{
            backgroundColor: "gray.700",
            height: 48,
            width: 96,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
          }}
        >
          <img
            src={reactnative}
            alt="Logo"
            style={{ height: 50, width: "auto" }}
          />
        </Box>
      ),
    },
    {
      name: "Technology 7",
      content: (
        <Box
          sx={{
            backgroundColor: "gray.700",
            height: 48,
            width: 96,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
          }}
        >
          <img src={webflow} alt="Logo" style={{ height: 30, width: "auto", marginRight: "2rem" }} />
        </Box>
      ),
    },
    {
      name: "Technology 8",
      content: (
        <Box
          sx={{
            backgroundColor: "gray.700",
            height: 48,
            width: 96,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
          }}
        >
          <img
            src={wix}
            alt="Logo"
            style={{ height: 30, width: "auto" }}
          />
        </Box>
      ),
    },
  ];

  return (
    <Box
      sx={{
        overflow: "hidden",
        backgroundColor: "black",
        position: "relative",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          top: 0,
          bottom: 0,
        }}
      >
        <Box
          className="animate-marquee"
          sx={{ display: "flex", whiteSpace: "nowrap" }}
        >
          {technologies.concat(technologies).map((tech, index) => (
            <Box
              key={index}
              sx={{
                flex: "none",
                mx: {xs:4,sm: 4, md: 4, lg: 6, xl: 8 },
                px: {xs:4,sm:4, md: 4, lg: 6, xl: 9 },
              }}
            >
              {tech.content}
            </Box>
          ))}
        </Box>
      </Box>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 16s linear infinite;
        }
      `}</style>
    </Box>
  );
};

export default MarqueeCarousel4;
