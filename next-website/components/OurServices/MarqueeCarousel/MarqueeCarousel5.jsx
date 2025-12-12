import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import github_copilot from "../../../assets/marqueelogo5/github_copilot.png";
import microsoft365 from "../../../assets/marqueelogo5/microsoft365.png";
import openai from "../../../assets/marqueelogo5/openai.png";
import shopify from "../../../assets/marqueelogo5/shopify.png";
import zoho from "../../../assets/marqueelogo5/zoho.png";
import claude from "../../../assets/marqueelogo5/claude.png";
import microsoft_azure from "../../../assets/marqueelogo5/microsoft_azure.png";

const MarqueeCarousel5 = () => {
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
          <img
            src={github_copilot}
            alt="Logo"
            style={{ height: 20, width: "auto" }}
          />
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
          <Typography sx={{ color: "gray.300", fontSize: "0.875rem" }}>
            <img
              src={microsoft365}
              alt="Logo"
              style={{ height: 100, width: "auto" }}
            />
          </Typography>
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
          <img src={openai} alt="Logo" style={{ height: 40, width: "auto" }} />
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
          <img src={shopify} alt="Logo" style={{ height: 70, width: "auto" }} />
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
          <img src={zoho} alt="Logo" style={{ height: 40, width: "auto" }} />
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
          <img src={claude} alt="Logo" style={{ height: 30, width: "auto" }} />
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
          <img src={microsoft_azure} alt="Logo" style={{ height: 70, width: "auto" }} />
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
                mx: {xs:4,sm:4, md: 4, lg: 6, xl: 8 },
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

export default MarqueeCarousel5;
