import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Fade,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ThreeDE from "../ThreeDE";
import AIAutomation from "./AIAutomation";
import ProductDevelopment from "./ProductDevelopment";
import TechConsultancy from "./TechConsultancy";
import SalesChannelDevelopment from "./SalesChannelDevelopment";
import MLDrivenDataAnalysis from "./MLDrivenDataAnalysis";
import { IoLogoWhatsapp } from "react-icons/io5";
const OurServices = () => {
  const [showButton, setShowButton] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 899px)");
  const isLandscapeMedium = useMediaQuery(
    "(min-width: 625px) and (max-width: 899px) and (orientation: landscape)"
  );
  const isMediumScreen = useMediaQuery(theme.breakpoints.only("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.only("lg"));
  const isExtraLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(false);
  const aiAutomationRef = useRef(null);
  const salesChannelRef = useRef(null);
  const mlDrivenDataAnalysisRef = useRef(null);
  const productDevelopmentRef = useRef(null);
  const techConsultancyRef = useRef(null);
  const sectionRef = useRef(null);
  // Reload the page on window resize
 

   useEffect(() => {
     let resizeTimeout;
     const handleResize = () => {
       // Only reload if there's a significant change in screen width
       const currentWidth = window.innerWidth;
       const storedWidth = parseInt(
         sessionStorage.getItem("screenWidth") || "0"
       );
       // Check if width changed by more than 100px (adjust this threshold as needed)
       if (Math.abs(currentWidth - storedWidth) > 100) {
         sessionStorage.setItem("screenWidth", currentWidth.toString());
         window.location.reload();
       }
     };
     const debouncedResize = () => {
       clearTimeout(resizeTimeout);
       resizeTimeout = setTimeout(handleResize, 250); // Wait 250ms after resize ends
     };
     // Store initial width
     sessionStorage.setItem("screenWidth", window.innerWidth.toString());
     // Add debounced event listener
     window.addEventListener("resize", debouncedResize);
     return () => {
       window.removeEventListener("resize", debouncedResize);
       clearTimeout(resizeTimeout);
     };
   }, []);
   // Add orientation change handler separately if needed
   useEffect(() => {
     const handleOrientationChange = () => {
       // Wait for the orientation change to complete
       setTimeout(() => {
         window.location.reload();
       }, 100);
     };
     window.addEventListener("orientationchange", handleOrientationChange);
     return () => {
       window.removeEventListener("orientationchange", handleOrientationChange);
     };
   }, []);

   useEffect(() => {
       const handleScroll = () => {
         if (window.scrollY > 0) {
           setShowWhatsAppButton(true);
         } else {
           setShowButton(false);
         }
       };
       window.addEventListener("scroll", handleScroll);
       return () => {
         window.removeEventListener("scroll", handleScroll);
       };
     }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
      if (!isMobile) {
        if (aiAutomationRef.current) {
          aiAutomationRef.current.collapsePanel();
        }
        if (salesChannelRef.current) {
          salesChannelRef.current.collapsePanel();
        }
        if (mlDrivenDataAnalysisRef.current) {
          mlDrivenDataAnalysisRef.current.collapsePanel();
        }
        if (productDevelopmentRef.current) {
          productDevelopmentRef.current.collapsePanel();
        }
        if (techConsultancyRef.current) {
          techConsultancyRef.current.collapsePanel();
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);
  const handleScrollToTop = () => {
    // Immediately set scroll position
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleWhatsapp = () => {
    window.open(
      "https://wa.me/918890204938?text=Hey%2C%20I%20need%20help%20with%20a%20tech%20solution.%20Let’s%20talk%21",
      "_blank"
    );
  };

  return (
    <Box className="services-section">
      <Box
        sx={{
          minHeight: isLandscapeMedium ? "60vh" : "100vh",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
          position: "relative",
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: "95%", sm: "90%", md: "85%", lg: "85%", xl: "85%" },
            margin: isLandscapeMedium
              ? "120px auto 60px"
              : { xs: "20px auto", md: "0px auto" },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              minHeight: isLandscapeMedium
                ? "auto"
                : { xs: "auto", md: "auto" },
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              mt: isLandscapeMedium
                ? "0"
                : { xs: "0%", md: "-10%", lg: "-10%" },
              mb: { xs: 0, md: 0 },
              position: "relative",
            }}
          >
            <Box sx={{ width: { md: "70%", lg: "70%", xl: "70%" } }}>
              <Box
                sx={{
                  width: { xs: "100%", md: "50%", lg: "40%" },
                  height: "50vh",
                  display: { xs: "block", md: "none", lg: "none", xl: "none" },
                  // isMobile || isTablet || isLandscapeMedium ? "block" : "none",
                  top: 0,
                  left: 200,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <ThreeDE textSize="34.5" />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: { xs: "center", md: "flex-start" },
                  marginBottom: isLandscapeMedium ? "40px" : undefined,
                  marginTop: { xs: "25%", md: "0" },
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    textAlign: { xs: "center", md: "left" },
                    fontSize: {
                      xs: `clamp(1.75rem, calc(1.45rem + 2vw), 9rem)`,
                      md: `clamp(1.75rem, calc(1.25rem + 2.5vw), 9rem)`,
                      lg: `clamp(1.75rem, calc(1.37rem + 3vw), 8rem)`,
                      xl: `clamp(2.25rem, calc(2rem + 3vw), 10rem)`,
                    },
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: "600",
                    color: "#fff",
                    whiteSpace: "nowrap", // Prevent line break
                    ml: isLandscapeMedium ? "5%" : 0,
                  }}
                >
                  <span className="highlight">Our </span>
                  <span
                    style={{
                      background:
                        "linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Services
                  </span>
                </Typography>
              </Box>
              <Typography
                sx={{
                  maxWidth: isLandscapeMedium ? "90%" : { xs: "100%" },
                  fontSize: {
                    xs: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
                    md: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
                    lg: `clamp(0.5rem, calc(0.8rem + 0.7vw), 1.8rem)`,
                    xl: `clamp(0.5rem, calc(0.8rem + 0.8vw), 2.1rem)`,
                  },
                  fontWeight: 200,
                  lineHeight: 1.7,
                  textAlign: { xs: "center", md: "left" },
                  ml: isLandscapeMedium ? "5%" : { xs: 0, md: "1%" },
                  px: { xs: 2, md: 0 },
                  mt: isLandscapeMedium ? 2 : { xs: 3, md: 5 },
                }}
              >
                Excollo helps enterprises transform their digital stack using
                cutting-edge AI, automation, and consultancy. We identify
                opportunities, close gaps, and implement strategies for scalable
                success.
              </Typography>
            </Box>
            {!isMobile && !isTablet && (
              <Box
                sx={{
                  width: isLandscapeMedium ? "50%" : { md: "50%", lg: "40%" },
                  height: "100vh",
                  display: "flex",
                  "@media (min-width: 200px) and (max-width: 899px)": {
                    display: "none",
                  },
                  top: 0,
                  left: 0,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <ThreeDE textSize="34.5" />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          position: "relative",
          mt: { xs: "-20%", sm: -5, md: -30 },
          paddingTop: isTablet || isLandscapeMedium ? "10px" : { xs: 0, md: 0 },
        }}
      >
        <AIAutomation sectionRef={sectionRef} />
      </Box>
      <Box>
        <SalesChannelDevelopment sectionRef={sectionRef} />
      </Box>
      <Box>
        <MLDrivenDataAnalysis sectionRef={sectionRef} />
      </Box>
      <Box>
        <ProductDevelopment sectionRef={sectionRef} />
      </Box>
      <Box>
        <TechConsultancy sectionRef={sectionRef} />
      </Box>
      <Fade in={showButton}>
        <Button
          onClick={handleScrollToTop}
          variant="contained"
          color="primary"
          sx={{
            position: "fixed",
            height: 60,
            bottom: { xs: 100, md: 50 },
            left: { xs: 30, md: 50 },
            zIndex: 1000,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            "&:hover": {
              background: "linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)",
            },
          }}
        >
          <ArrowUpwardIcon />
        </Button>
      </Fade>
      <Fade in={showWhatsAppButton}>
        <Button
          onClick={handleWhatsapp}
          variant="contained"
          color="primary"
          sx={{
            position: "fixed",
            height: 60,
            bottom: { xs: 200, md: 100 },
            right: { xs: 24, md: 24 },
            zIndex: 1000,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            "&:hover": {
              background: "linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)",
            },
          }}
        >
          <IoLogoWhatsapp size={30} />
        </Button>
      </Fade>
    </Box>
  );
};
export default OurServices;
