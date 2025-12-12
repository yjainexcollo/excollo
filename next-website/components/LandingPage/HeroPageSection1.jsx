"use client";

import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

const HeroPageSection1 = ({ animationComplete }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isSmallerLaptop = useMediaQuery(theme.breakpoints.up("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isXtraLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));
  const isTabletOrMobile = isMobile || isTablet;

  return (
    <Box
      sx={{
        color: "#fff",
        display: "flex",
        textAlign: isTabletOrMobile ? "center" : "left",
        justifyContent: isTabletOrMobile ? "center" : "left",
        width: {
          xs: "100%",
          sm: "95%",
          md: "100%",
        },
        px: {
          xs: 1.5,
          sm: 3,
          md: 0,
        },
        marginLeft: {
          xs: "0%",
          sm: "2.5%",
          md: "7.5%",
        },
        marginRight: {
          xs: "0%",
          sm: "2.5%",
          md: "0%",
        },
        position: "relative",
        minHeight: {
          xs: "auto",
          sm: "50vh",
          md: "60vh",
        },
        zIndex: 2,
        marginTop: {
          xs: 0,
          sm: 0,
          md: "calc(45vh - 7%)",
          lg: "calc(47.5vh - 8%)",
          xl: "calc(50vh - 10%)",
        },
      }}
    >
      <Box
        sx={{
          maxWidth: {
            xs: "100%",
            sm: "100%",
            md: "85%",
          },
          padding: {
            xs: 1,
            sm: 0,
            md: 0,
          },
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 400,
            fontSize: {
              xs: `clamp(1.5rem, 8vw, 3rem)`,
              sm: `clamp(1.75rem, 6vw, 3.5rem)`,
              md: `clamp(1.75rem, calc(1.25rem + 2.5vw), 9rem)`,
              lg: `clamp(1.75rem, calc(1.37rem + 3vw), 8rem)`,
              xl: `clamp(2.25rem, calc(2rem + 3vw), 10rem)`,
            },
            lineHeight: { xs: 1.2, sm: 1.167, md: 1.167 },
            letterSpacing: "-0.01562em",
            mt: {
              xs: 8,
              sm: 12,
              md: 0,
            },
          }}
        >
          Shaping the Future With
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 600,
            lineHeight: 1.167,
            letterSpacing: "-0.01562em",
            fontSize: {
              xs: `clamp(1.5rem, 8vw, 3rem)`,
              sm: `clamp(1.75rem, 6vw, 3.5rem)`,
              md: `clamp(1.75rem, calc(1.25rem + 2.5vw), 9rem)`,
              lg: `clamp(1.75rem, calc(1.37rem + 3vw), 8rem)`,
              xl: `clamp(2.25rem, calc(2rem + 3vw), 10rem)`,
            },
          }}
        >
          <Box
            component="span"
            fontWeight="bold"
            sx={{
              background: "linear-gradient(180deg, #2579e3 0%, #8e54f7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
              wordBreak: "break-word",
              mb: {
                xs: 2,
                sm: 2.5,
                md: 3,
              },
            }}
          >
            <span
              style={{
                background: "linear-gradient(180deg, #2579e3 0%, #8e54f7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                wordBreak: "break-word",
              }}
            >
              Outcome Driven{" "}
            </span>
            &nbsp;
            <span
              style={{
                background: "linear-gradient(180deg, #2579e3 0%, #8e54f7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                wordBreak: "break-word",
              }}
            >
              {" "}
              Innovation{" "}
            </span>
          </Box>
        </Typography>

        <Typography
          variant="h5"
          component="h5"
          sx={{
            fontSize: {
              xs: `clamp(0.875rem, 4vw, 1.125rem)`,
              sm: `clamp(0.9rem, 3vw, 1.2rem)`,
              md: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
              lg: `clamp(0.5rem, calc(0.8rem + 0.7vw), 1.8rem)`,
              xl: `clamp(0.5rem, calc(0.8rem + 0.8vw), 2.1rem)`,
            },
            fontWeight: 400,
            lineHeight: { xs: 1.5, sm: 1.6, md: 1.7 },
            marginLeft: isTabletOrMobile ? 0 : "1%",
            mb: {
              xs: 3,
              sm: 4,
              md: 4.5,
            },
            textAlign: isTabletOrMobile ? "center" : "left",
          }}
        >
          Unlock the potential of AI to transform your business and redefine
          success.
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: isTabletOrMobile ? "center" : "flex-start",
            width: "100%",
          }}
        >
          <Typography
            component="a"
            href="/contact"
            sx={{
              display: "inline-block",
              color: "#ffffff",
              textDecoration: "none",
              fontWeight: 400,
              fontSize: {
                xs: `clamp(0.875rem, 3.5vw, 1rem)`,
                sm: `clamp(0.9rem, 2.5vw, 1.1rem)`,
                md: `clamp(0rem, calc(0.5rem + 0.8vw), 5rem)`,
                xl: `clamp(0rem, calc(0.5rem + 0.8vw), 5rem)`,
              },
              border: "1px solid transparent",
              padding: {
                xs: "12px 24px",
                sm: "14px 28px",
                md: "1vw 2vw",
              },
              borderRadius: { xs: "80px", md: "80px", xl: "80px" },
              background:
                "linear-gradient(to right, #000, #000) padding-box, linear-gradient(180deg, rgba(170, 63, 255, 0.9) 0%, rgba(94, 129, 235, 0.9) 100%) border-box",
              zIndex: 3,
              position: "relative",
              transition: "all 0.3s ease",
              width: { xs: "auto", sm: "auto" },
              minHeight: "44px",
              textAlign: "center",
              "&:hover": {
                background:
                  "linear-gradient(180deg, rgba(170, 63, 255, 0.9) 0%, rgba(94, 129, 235, 0.9) 100%)",
                color: "#ffffff",
                transform: "scale(1.05)",
              },
            }}
          >
            Schedule a Call
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroPageSection1;
