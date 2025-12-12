import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  styled,
  useTheme,
  useMediaQuery,
  Button,
  Fade,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import HowWeWork from "./HowWeWork";
import NavBar from "@/components/NavBar/NavBar";
import ThreeDE from "@/components/ThreeDE";
import Footer from "@/components/Footer/Footer";
import Excollo3D from "./Excollo3D";
import { IoLogoWhatsapp } from "react-icons/io5";

const ContentSection = styled("section")(({ theme }) => ({
  display: "flex",
  width: "85%",
  margin: "auto",
  padding: "100px 0 0px 0",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("lg")]: {
    width: "90%",
    padding: "50px 0 0px 0",
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
    padding: "0px 0",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0px 0px",
  },
}));

const TitleContainer = styled("div")(({ theme }) => ({
  flex: "0 0 480px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "left",
  padding: 10,
  opacity: 1,
  "& h2": {
    textAlign: "left",
    padding: "55px",
    fontSize: "4.25rem",
    fontFamily: '"Inter", sans-serif',
    fontWeight: "bold",
    textUnderlinePosition: "from-font",
    textDecorationSkipInk: "none",
    letterSpacing: "-0.00833em",
    lineHeight: 1.2,
    "& br": {
      display: "block",
    },
  },
  [theme.breakpoints.up("xl")]: {
    flex: "0 0 400px",
    "& h2": {
      fontSize: `clamp(2.25rem, calc(2rem + 2.5vw), 10rem)`,
      paddingBottom: "-50px",
    },
  },
  [theme.breakpoints.down("xl")]: {
    flex: "0 0 400px",
    "& h2": {
      fontSize: `clamp(1.75rem, calc(1.37rem + 2.5vw), 8rem)`,
      paddingBottom: "-50px",
    },
  },
  [theme.breakpoints.down("lg")]: {
    flex: "0 0 400px",
    "& h2": {
      fontSize: `clamp(1.75rem, calc(1.25rem + 2vw), 9rem)`,
      paddingBottom: "-50px",
    },
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginBottom: "-280px",
    "& h2": {
      fontSize: `clamp(1.75rem, calc(1.15rem + 2vw), 9rem)`,
      paddingBottom: "-50px",
      textAlign: "center",
      "& br": {
        display: "none",
      },
    },
  },
  [theme.breakpoints.down("sm")]: {
    marginBottom: "-275px",
    "& h2": {
      fontSize: `clamp(1.75rem, calc(1.15rem + 2vw), 9rem)`,
    },
  },
}));

const Card = styled("div")(
  ({ theme, direction = "90deg", isMobile = false }) => ({
    width: "50%",
    background: `linear-gradient(${direction}, rgba(142, 84, 247, 0.5), rgba(51, 46, 108, 0.8), rgba(0, 0, 0, 1))`,
    borderRadius: "60px",
    padding: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    border: "10px solid #090101",

    "&::before": {
      content: '""',
      position: "absolute",
      top: -1,
      left: -1,
      right: -1,
      bottom: -1,
      borderRadius: "61px",
      background: `linear-gradient(${direction}, rgba(142, 84, 247, 0.3), rgba(51, 46, 108, 0.4), rgba(0, 0, 0, 0.5))`,
      zIndex: -1,
      filter: "blur(1px)",
    },

    "& p": {
      alignItems: "center",
      justifyContent: "center",
      alignText: "center",
      fontFamily: '"Inter", sans-serif',
      color: "#D1D1E2",
      lineHeight: 1.7,
      fontWeight: 200,
      textAlign: "left",
      padding: 20,
      margin: 15,
    },

    [theme.breakpoints.up("xl")]: {
      height: "400px",
      fontSize: `clamp(0.5rem, calc(0.8rem + 0.8vw), 2.1rem)`,
    },

    [theme.breakpoints.down("xl")]: {
      height: "300px",
      fontSize: `clamp(0.5rem, calc(0.8rem + 0.7vw), 1.8rem)`,
    },

    [theme.breakpoints.down("lg")]: {
      height: "200px",
      fontSize: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
    },

    [theme.breakpoints.down("md")]: {
      width: "90%",
      marginBottom: "20px",
      fontSize: `clamp(0.8rem, calc(0.6rem + 1vw), 9rem)`,
      background: `linear-gradient(${direction}, rgba(142, 84, 247, 0.5), rgba(51, 46, 108, 0.8), rgba(0, 0, 0, 1))`,
      padding: isMobile ? "0" : "30px",
      "&::before": {
        display: isMobile ? "none" : "block",
      },
      "& p": {
        padding: "15px",
        margin: "10px",
        textAlign: "center",
      },
    },

    [theme.breakpoints.down("sm")]: {
      width: "80%",
      borderRadius: "30px",
      background: `linear-gradient(${direction},rgba(0, 0, 0, 1), rgba(51, 46, 108, 0.8), rgba(51, 46, 108, 0.8), rgba(0, 0, 0, 1))`,
      fontSize: `clamp(0.8rem, calc(0.6rem + 1vw), 9rem)`,
      padding: isMobile ? "0" : "0px 20px",
      "&::before": {
        borderRadius: "31px",
      },
      "& p": {
        padding: "0px",
        margin: "0px",
      },
    },

    "@media (min-width: 769px) and (max-width:899px) ": {
      width: "95%",
      height: "fit-content",
    },
  })
);

const AboutUs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isSpecificSize = useMediaQuery(
    "(min-width: 600px) and (max-width: 899px)"
  );
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 899px)");
  const isLandscapeMedium = useMediaQuery(
    "(min-width: 625px) and (max-width: 899px) and (orientation: landscape)"
  );
  const isSpecificMargin = useMediaQuery(
    "(min-width: 1800px) and (max-width: 2600px)"
  );
  const isLaptop = useMediaQuery(theme.breakpoints.up("md"));
  const isLargeLaptop = useMediaQuery(theme.breakpoints.up("lg"));
  const isXtraLargeLaptop = useMediaQuery(theme.breakpoints.up("xl"));

  const [showButton, setShowButton] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(false);

  // Handle window resize and trigger refresh if needed
  useEffect(() => {
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      const newWidth = window.innerWidth;

      // Check if we're crossing major breakpoints
      const oldBreakpoint = getBreakpoint(windowWidth);
      const newBreakpoint = getBreakpoint(newWidth);

      if (oldBreakpoint !== newBreakpoint) {
        setShouldRefresh(true);
      }

      setWindowWidth(newWidth);

      // Debounce the refresh
      resizeTimer = setTimeout(() => {
        if (shouldRefresh) {
          window.location.reload();
        }
      }, 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [windowWidth, shouldRefresh]);
  
   useEffect(() => {
     let resizeTimeout;
     const handleResize = () => {
       // Only reload if there's a significant change in screen width
       const currentWidth = window.innerWidth;
       const storedWidth = parseInt(
         sessionStorage.getItem("screenWidth") || "0"
       );
       if (Math.abs(currentWidth - storedWidth) > 100) {
         sessionStorage.setItem("screenWidth", currentWidth.toString());
         window.location.reload();
       }
     };
     const debouncedResize = () => {
       clearTimeout(resizeTimeout);
       resizeTimeout = setTimeout(handleResize, 250); 
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

  // Helper function to determine breakpoint category
  const getBreakpoint = (width) => {
    if (width < 600) return "xs";
    if (width < 900) return "sm";
    if (width < 1200) return "md";
    return "lg";
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    // Immediately set scroll position
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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

  const handleWhatsapp = () => {
    window.open(
      "https://wa.me/918890204938?text=Hey%2C%20I%20need%20help%20with%20a%20tech%20solution.%20Let’s%20talk%21",
      "_blank"
    );
  };

  const VisionSection = useCallback(
    () => (
      <div>
        <ContentSection>
          <TitleContainer>
            <h2>
              Our {!isMobile && <br />}{" "}
              <span
                style={{
                  background:
                    "linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Vision{" "}
              </span>{" "}
            </h2>
          </TitleContainer>
          <Card>
            <p>
              To empower businesses with future-ready technology that drives
              measurable results and lasting partnerships.
            </p>
          </Card>
        </ContentSection>
      </div>
    ),
    [isMobile]
  );

  const MissionSection = useCallback(
    () => (
      <div>
        <ContentSection>
          {isMobile || isTablet || isSpecificSize ? (
            <>
              <TitleContainer>
                <h2>
                  Our {!isMobile || (isSpecificSize && <br />)}{" "}
                  <span
                    style={{
                      background:
                        "linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {" "}
                    Mission{" "}
                  </span>
                </h2>
              </TitleContainer>
              <Card>
                <p>
                  To bridge the gap between technology and business objectives
                  by delivering cutting-edge solutions that guarantee outcomes.
                </p>
              </Card>
            </>
          ) : (
            <>
              <Card direction="270deg">
                <p>
                  To bridge the gap between technology and business objectives
                  by delivering cutting-edge solutions that guarantee outcomes.
                </p>
              </Card>
              <TitleContainer>
                <h2>
                  <Box sx={{ marginLeft: { md: "40%", lg: "20%", xl: "0" } }}>
                    Our <br />{" "}
                    <span
                      style={{
                        background:
                          "linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Mission
                    </span>
                  </Box>
                </h2>
              </TitleContainer>
            </>
          )}
        </ContentSection>
      </div>
    ),
    [isMobile, isTablet, isSpecificSize]
  );

  const PhilosophySection = useCallback(
    () => (
      <div>
        <ContentSection>
          <TitleContainer>
            <h2>
              Our {!isMobile && <br />}{" "}
              <span
                style={{
                  background:
                    "linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Philosophy
              </span>
            </h2>
          </TitleContainer>

          <Card>
            <p>
              At Excollo, we commit to results, not just solutions. Our "Outcome
              as a Service" (OaaS) approach <br />
              ensures every action is aligned to achieve measurable success for
              our clients.
            </p>
          </Card>
        </ContentSection>
      </div>
    ),
    [isMobile]
  );

  return (
    <Box>
      <Box
        sx={{
          minHeight: isLandscapeMedium
            ? "50vh"
            : isMobile || isSpecificSize
            ? "38vh"
            : "100vh",
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
                : { xs: "auto", sm: "auto", md: "auto" },
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              mt: isLandscapeMedium
                ? "0"
                : { xs: "0%", md: "-10%", lg: "-10%" },
              mb: { xs: 0, sm: 0, md: 0 },
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: { md: "70%", lg: "70%", xl: "70%" },
                mb: { xs: 0, sm: 0, md: 0 },
              }}
            >
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
                      xs: `clamp(1.75rem, calc(1.25rem + 2vw), 9rem)`,
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
                  <span className="highlight">About </span>
                  <span
                    style={{
                      background:
                        "linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Excollo
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
                Excollo bridges today’s challenges and tomorrow’s opportunities.
                We harness cutting-edge technology, AI, and tailored solutions
                to deliver outcomes and make businesses future-ready.
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
          width: "100%",
          marginTop: isMobile || isSpecificSize ? 0 : "-8%",
          display: isMobile || isSpecificSize ? "block" : "flex",
          flexDirection: "column",
          alignItems: "center",
          rowGap: "2rem",
        }}
      >
        <VisionSection />
        <MissionSection />
        <PhilosophySection />
      </Box>
      <Box sx={{ position: "relative" }}>
        <HowWeWork />
        <Excollo3D />
      </Box>
      <Box sx={{ position: "relative" }}>
        <Footer />
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

export default AboutUs;
