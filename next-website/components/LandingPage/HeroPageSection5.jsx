import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HeroPageSection5.css";

gsap.registerPlugin(ScrollTrigger);

const HeroPageSection5 = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [windowSize, setWindowSize] = useState(0);

  useEffect(() => {
    setWindowSize(window.innerWidth);
    const handleResize = () => setWindowSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cards = [
    {
      title: "Discover Your Needs",
      description: "In-depth discovery to align with your business goals.",
      icon: SearchRoundedIcon,
    },
    {
      title: "Craft a Tailored Plan",
      description:
        "Strategy, implementation, and optimization designed for measurable outcomes.",
      icon: AssignmentRoundedIcon,
    },
    {
      title: "Deliver and Iterate",
      description:
        "Continuous improvement ensures solutions stay ahead of the curve.",
      icon: AutorenewRoundedIcon,
    },
  ];

  // GSAP Animation Logic
  const initializeAnimations = () => {
    if (isDesktop) {
      cardRefs.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { x: "70%", opacity: 0 },
          {
            x: "0%",
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 70%",
              scrub: true,
            },
          }
        );
      });
    }
  };

  return (
    <Box
      ref={sectionRef}
      sx={{
        minHeight: { md: "80vh", xl: "100vh" },
        fontFamily: '"Inter", sans-serif',
        position: "relative",
        bgcolor: "#000",
      }}
    >
      {/* Background gradient */}
      <Box
        sx={{
          position: "relative",
          top: "20%",
          left: "0",
          right: "0%",
          bottom: 0,
          height: "60%",
          background: `radial-gradient(closest-corner, rgba(115, 80, 190, 0.6) 0%, rgba(0, 0, 0, 0) 100%)`,
          zIndex: -1,
          pointerEvents: "none",
          transformOrigin: "center center",
        }}
      />
      {/* Title Section */}
      <Box sx={{ marginTop: { xs: "10%", sm: "15%", md: "0" }, marginBottom: { xs: "20%", sm: "10%", md: "0%", xl: "1%" } }}>
        <Box
          sx={{
            position: "absolute",
            top: { xs: "-10%", md: "-20%" },
            left: "0",
            right: "0%",
            bottom: 0,
            height: "50%",
            background: `radial-gradient(closest-corner, rgba(115, 80, 190, 0.28) 0%, rgba(0, 0, 0, 0) 50%)`,
            zIndex: 999,
            pointerEvents: "none",
            transformOrigin: "center center",
          }}
        />
        <Typography
          sx={{
            color: "#fff",
            fontWeight: 600,
            lineHeight: 1.167,
            letterSpacing: "-0.01562em",
            fontSize: {
              xs: `clamp(1.75rem, calc(1.15rem + 2vw), 9rem)`,
              md: `clamp(1.75rem, calc(1.25rem + 2vw), 9rem)`,
              lg: `clamp(1.75rem, calc(1.37rem + 2.5vw), 8rem)`,
              xl: `clamp(2.25rem, calc(2rem + 2.5vw), 10rem)`,
            },
            position: "relative",
            top: "0px",
            background: "black",
            textAlign: "center",
          }}
        >
          How We{" "}
          <Box
            component="span"
            fontWeight="bold"
            sx={{
              background: "linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Work?
          </Box>
        </Typography>
      </Box>
      {/* Mobile/Tablet Cards */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 3, sm: 4, md: 6 },
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 2, sm: 4, md: 6 },
          position: "relative",
          zIndex: 1,
        }}
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            sx={{
              width: { xs: "100%", sm: "80%", md: "30%" },
              maxWidth: { xs: "350px", md: "400px" },
              background: "transparent",
              backdropFilter: "blur(10px)",
              borderRadius: 2,
              overflow: "visible",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                p: { xs: 3, sm: 4 },
                "&:last-child": { pb: { xs: 3, sm: 4 } },
              }}
            >
              {React.createElement(card.icon, {
                sx: {
                  color: "#8E54F7",
                  fontSize: { xs: 40, sm: 48 },
                  mb: 2,
                },
              })}
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  mb: 2,
                  fontWeight: 500,
                }}
              >
                {card.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  lineHeight: 1.6,
                }}
              >
                {card.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Desktop Layout */}
      <Box className="row" sx={{ display: { xs: "none", md: "block" } }}>
        <div className="col-md-12">
          <div className="gradientCardBox">
            {cards.map((card, index) => (
              <div
                className="box aos-init aos-animate"
                data-aos="fade-left"
                data-aos-easing="linear"
                data-aos-duration={`${500 + index * 100}`}
                ref={(el) => (cardRefs.current[index] = el)}
                key={index}
              >
                <span></span>
                <div className="content">
                  <h2>{card.title}</h2>
                  <p>{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default HeroPageSection5;
