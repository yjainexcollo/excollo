"use client";

import React, { useRef } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { gsap } from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const HeroPageSection2 = ({ onAnimationComplete }) => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const gradientRef = useRef(null);
  const contentRef = useRef(null);
  const router = useRouter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  useGSAP(() => {
    // Skip animations for mobile and tablet devices
    if (isMobile || isTablet) {
      onAnimationComplete?.();
      return;
    }

    const section = sectionRef.current;

    // Safety check for cleanup
    if (!section) return;

    // Kill any existing ScrollTriggers on this element to prevent duplicates
    const existingTriggers = ScrollTrigger.getAll();
    existingTriggers.forEach(trigger => {
      if (trigger.vars.trigger === section) {
        trigger.kill();
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 0%",
        end: "center 40%",
        scrub: true,
        markers: true,
        id: "hero-section-2-timeline", // Add ID for debugging
        onComplete: () => {
          setTimeout(() => {
            onAnimationComplete?.();
          }, 100);
        },
      },
    });

    tl.fromTo(
      gradientRef.current,
      {
        opacity: 0,
        scale: 0.5,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
      }
    );

    tl.fromTo(
      contentRef.current,
      {
        opacity: 0,
        x: 100,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.5"
    );

    // Cleanup function to prevent memory leaks and duplicate animations
    return () => {
      tl.kill();
    };

  }, { scope: containerRef, dependencies: [isMobile, isTablet, onAnimationComplete] });

  const handleClick = (e) => {
    e.preventDefault();
    router.push("/services");
  };

  return (
    <Box ref={containerRef}>
      <Box
        ref={sectionRef}
        sx={{
          color: "#fff",
          overflow: "hidden",
          minHeight: {
            xs: "10vh",
            sm: isTablet ? "50vh" : "50vh",
            md: "90vh",
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: {
            xs: "90%",
            sm: isTablet ? "90%" : "90%",
            md: "85%",
          },
          margin: "0 auto",
          padding: {
            xs: "1rem",
            sm: isTablet ? "1.5rem" : "2rem",
            md: "4rem",
          },
          fontFamily: '"Inter", sans-serif',
          position: "relative",
          zIndex: 2,
          marginTop: {
            xs: "-20%",
            sm: "-60px",
            md: "0rem",
          },
        }}
      >
        <Box
          ref={gradientRef}
          sx={{
            position: "absolute",
            top: {
              xs: "20%",
              md: "-10%",
              lg: "0%",
            },
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(closest-corner, rgba(115, 80, 190, 0.6) 0%, rgba(0, 0, 0, 0) 50%)`,
            zIndex: 1,
            pointerEvents: "none",
            transformOrigin: "center center",
            ...(isMobile || isTablet
              ? {
                opacity: 1,
                transform: "scale(1)",
              }
              : {}),
          }}
        />

        <Box
          ref={contentRef}
          sx={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            gap: { md: "2rem", lg: "3rem", xl: "4rem" },
            ...(isMobile || isTablet
              ? {
                opacity: 1,
                transform: "translateX(0)",
              }
              : {}),
          }}
        >
          {/* Left Column - ThreeDE Placeholder */}
          <Box
            className="threede-placeholder"
            sx={{
              flex: { md: "0 0 40%", lg: "0 0 45%", xl: "0 0 45%" },
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
              minHeight: { md: "50vh", lg: "60vh", xl: "65vh" },
              position: "relative",
            }}
          >
            {/* ThreeDE will be positioned here via GSAP animation */}
          </Box>

          {/* Right Column - Content */}
          <Box
            sx={{
              flex: { md: "0 0 55%", lg: "0 0 50%", xl: "0 0 50%" },
              display: "flex",
              flexDirection: "column",
              alignItems: {
                xs: "center",
                md: "flex-start",
              },
              textAlign: {
                xs: "center",
                md: "left",
              },
              paddingLeft: { md: "0", lg: "1rem", xl: "2rem" },
              width: { xs: "100%", md: "auto" },
              mt: {
                xs: 10,
                sm: isTablet ? 8 : 0,
                md: 0,
              },
            }}
          >
            <Typography
              variant="h5"
              component="h5"
              sx={{
                fontSize: {
                  xs: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
                  md: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
                  lg: `clamp(0.5rem, calc(0.8rem + 0.7vw), 1.8rem)`,
                  xl: `clamp(0.5rem, calc(0.8rem + 0.8vw), 2.1rem)`,
                },
                fontWeight: 400,
                lineHeight: 1.7,
                mb: {
                  xs: 4,
                  sm: isTablet ? 5 : 6,
                  md: 6,
                  xl: 8,
                },
                maxWidth: {
                  xs: "90%",
                  sm: isTablet ? "90%" : "100%",
                  md: "100%",
                },
                margin: {
                  xs: "0 auto 2rem auto",
                  md: "0 0 2rem 0",
                },
              }}
            >
              Excollo delivers outcomes, leveraging AI to make businesses
              future-ready, boosting productivity and efficiency at every step.
            </Typography>

            <Typography
              component={Link}
              href="/services"
              onClick={handleClick}
              sx={{
                display: "inline-block",
                color: "#ffffff",
                textDecoration: "none",
                fontWeight: 400,
                fontSize: {
                  xs: `clamp(0rem, calc(0.5rem + 0.8vw), 5rem)`,
                  md: `clamp(0rem, calc(0.5rem + 0.8vw), 5rem)`,
                  xl: `clamp(0rem, calc(0.5rem + 0.8vw), 5rem)`,
                },
                border: "1px solid transparent",
                padding: {
                  xs: "12px 24px",
                  sm: "14px 28px",
                  md: "12px 32px",
                  lg: "14px 36px",
                },
                minHeight: "44px",
                borderRadius: { xs: "80px", md: "80px", xl: "80px" },
                background:
                  "linear-gradient(to right, #000, #000) padding-box, linear-gradient(180deg, rgba(170, 63, 255, 0.9) 0%, rgba(94, 129, 235, 0.9) 100%) border-box",
                zIndex: 3,
                position: "relative",
                transition: "all 0.3s ease",
                textAlign: "center",
                "&:hover": {
                  background:
                    "linear-gradient(180deg, rgba(170, 63, 255, 0.9) 0%, rgba(94, 129, 235, 0.9) 100%)",
                  color: "#ffffff",
                  transform: "scale(1.05)",
                },
                cursor: "pointer !important",
              }}
            >
              Explore Our Services
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroPageSection2;
