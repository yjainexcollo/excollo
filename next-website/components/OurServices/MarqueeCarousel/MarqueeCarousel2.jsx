import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import canva from "../../../assets/marqueelogo2/canva-seeklogo.png";
import google_analytics from "../../../assets/marqueelogo2/google_analytics.png";
import hubspot from "../../../assets/marqueelogo2/hubspot.png";
import meta from "../../../assets/marqueelogo2/meta.png";
import shopify from "../../../assets/marqueelogo2/shopify.png";
import whatsapp from "../../../assets/marqueelogo2/whatsapp.png";
import zoho from "../../../assets/marqueelogo2/zoho.png";
import aisensy from "../../../assets/marqueelogo2/aisensy.png";

const MarqueeCarousel2 = () => {
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
          <img src={canva} alt="Logo" style={{ height: 45, width: "auto" }} />
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
            src={google_analytics}
            alt="Logo"
            style={{ height: 40, width: "auto" }}
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
          <img src={hubspot} alt="Logo" style={{ height: 40, width: "auto" }} />
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
          <img src={meta} alt="Logo" style={{ height: 60, width: "auto" }} />
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
          <img src={shopify} alt="Logo" style={{ height: 80, width: "auto" }} />
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
            src={whatsapp}
            alt="Logo"
            style={{ height: 40, width: "auto" }}
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
          <img src={zoho} alt="Logo" style={{ height: 40, width: "auto" }} />
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
          <img src={aisensy} alt="Logo" style={{ height: 60, width: "auto" }} />
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
                mx: {xs:4, sm: 4, md: 4, lg: 6, xl: 8 },
                px: {xs:4, sm:4, md: 4, lg: 6, xl: 9 },
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

export default MarqueeCarousel2;
