"use client";

import React, { useState, useEffect, useRef } from "react";
import { Box, Fade, Button, useTheme, useMediaQuery } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import ThreeDE from "@/components/ThreeDE";
import NavBar from "@/components/NavBar/NavBar";
import HeroPageSection1 from "@/components/LandingPage/HeroPageSection1";
import HeroPageSection2 from "@/components/LandingPage/HeroPageSection2";
import HeroPageSection3 from "@/components/LandingPage/HeroPageSection3/HeroPageSection3";
import HeroPageSection4 from "@/components/LandingPage/HeroPageSection4";
import HeroPageSection5 from "@/components/LandingPage/HeroPageSection5";
import Footer from "@/components/Footer/Footer";
import HeroPageSection6 from "@/components/LandingPage/HeroPageSection6";
import HeroPageSection7 from "@/components/LandingPage/HeroPageSection7";
import { ErrorBoundary } from "@/components/ErrorBoundaryClient";
import { IoLogoWhatsapp } from "react-icons/io5";

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, MotionPathPlugin);
}

const HeroPage = () => {
  const [showThreeDE, setShowThreeDE] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(false);
  const [hero1Complete, setHero1Complete] = useState(false);
  const [hero2Complete, setHero2Complete] = useState(false);
  const threeDERef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isSpecificSize = useMediaQuery(theme.breakpoints.up("md"));
  const isLargeScreenSize = useMediaQuery(theme.breakpoints.up("lg"));
  const isXtraLargeScreenSize = useMediaQuery(theme.breakpoints.up("xl"));
  const isDesktop = !isMobile && !isTablet;

  // Initialize state from local storage safely
  const [hasAnimationPlayed, setHasAnimationPlayed] = useState(false);
  const [threeDEPosition, setThreeDEPosition] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Set mounted state on client-side only
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ANIMATION_SESSION_DURATION = 1 * 60 * 60 * 1000;
      const lastAnimationTime = localStorage.getItem("lastAnimationTime");

      if (lastAnimationTime) {
        const timeSinceLastAnimation = Date.now() - parseInt(lastAnimationTime);
        if (timeSinceLastAnimation < ANIMATION_SESSION_DURATION) {
          setHasAnimationPlayed(true);
        }
      }

      const savedPosition = localStorage.getItem("threeDEPosition");
      if (savedPosition) setThreeDEPosition(JSON.parse(savedPosition));
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let resizeTimeout;
    const handleResize = () => {
      // Only reload if there's a significant change in screen width
      const currentWidth = window.innerWidth;
      const storedWidth = parseInt(
        sessionStorage.getItem("screenWidth") || "0"
      );
      // Check if width changed by more than 100px
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

  // Add orientation change handler
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleOrientationChange = () => {
      setTimeout(() => {
        window.location.reload();
      }, 100);
    };
    window.addEventListener("orientationchange", handleOrientationChange);
    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  // Scroll logic
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }

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

  const ANIMATION_SESSION_DURATION = 1 * 60 * 60 * 1000;

  // Body overflow handling
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!hero1Complete || showThreeDE) {
      document.body.style.overflow = "hidden";
    } else {
      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 100);
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [hero1Complete, showThreeDE]);

  // ThreeDE toggle logic
  useEffect(() => {
    if (hasAnimationPlayed) {
      setShowThreeDE(false);
    } else {
      const rotationDuration = 1;
      const timer = setTimeout(() => {
        setShowThreeDE(false);
      }, rotationDuration * 1000);
      return () => clearTimeout(timer);
    }
  }, [hasAnimationPlayed]);

  // Main Animation Logic
  useEffect(() => {
    if (typeof window === "undefined") return;

    const runAnimation = () => {
      const timeline = gsap.timeline();

      if (isDesktop) {
        if (isSpecificSize) {
          timeline.to(".threeDE", {
            x: "32%",
            y: "0%",
            duration: 0.7,
            ease: "power2.out",
            onComplete: () => {
              localStorage.setItem(
                "threeDEPosition",
                JSON.stringify({ x: "32%", y: "0%" })
              );
            },
          });
        } else {
          timeline.to(".threeDE", {
            x: "28%",
            y: "0%",
            duration: 0.7,
            ease: "power2.out",
            onComplete: () => {
              localStorage.setItem(
                "threeDEPosition",
                JSON.stringify({ x: "28%", y: "0%" })
              );
            },
          });
        }

        timeline.add([
          gsap.fromTo(
            [".gradient-background", ".navbar", ".hero-content"],
            {
              opacity: 0,
              x: -100,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              ease: "power2.out",
              onComplete: () => {
                setAnimationComplete(true);
                setTimeout(() => {
                  setHero1Complete(true);
                  // Save animation timestamp
                  localStorage.setItem(
                    "lastAnimationTime",
                    Date.now().toString()
                  );
                  setHasAnimationPlayed(true);
                }, 500);
              },
            }
          ),
        ]);
      }
    };

    const skipAnimation = () => {
      setAnimationComplete(true);
      setHero1Complete(true);

      const elements = {
        navbar: document.querySelector(".navbar"),
        heroContent: document.querySelector(".hero-content"),
        gradientBackground: document.querySelector(".gradient-background"),
      };

      Object.values(elements).forEach((element) => {
        if (element) {
          element.style.opacity = "1";
          if (element !== elements.gradientBackground) {
            element.style.transform = "translateX(0)";
          }
        }
      });
    };

    if (!showThreeDE) {
      // We need to check if we should run or skip
      const lastAnimationTime = localStorage.getItem("lastAnimationTime");
      const timeSinceLastAnimation = lastAnimationTime
        ? Date.now() - parseInt(lastAnimationTime)
        : ANIMATION_SESSION_DURATION + 1;

      if (
        !lastAnimationTime ||
        timeSinceLastAnimation >= ANIMATION_SESSION_DURATION
      ) {
        runAnimation();
      } else {
        skipAnimation();
      }
    }

    ScrollTrigger.refresh();

  }, [
    showThreeDE,
    isSpecificSize,
    isTablet,
    isMobile,
    isDesktop,
    // hasAnimationPlayed, 
  ]);

  // Set ThreeDE position on mount if played
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (hasAnimationPlayed && threeDEPosition) {
      const threeDE = document.querySelector(".threeDE");
      if (threeDE) {
        threeDE.style.transform = `translate(${threeDEPosition.x}, ${threeDEPosition.y})`;
      }
    }
  }, [hasAnimationPlayed, threeDEPosition]);

  // Section 2 Animation
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (hero1Complete && isDesktop) {
      gsap.fromTo(
        ".hero-section-2",
        {
          x: "50%",
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,  // Slowed down from 0.1 to 1.2 for smoother transition
          ease: "power3.out",  // Smoother easing
          scrollTrigger: {
            trigger: ".hero-section-2",
            start: "top 80%",  // Start earlier
            end: "top 50%",
            toggleActions: "play none none reverse",
            onEnter: () => setHero2Complete(true),
          },
        }
      );

      if (isXtraLargeScreenSize) {
        gsap.to(threeDERef.current, {
          scrollTrigger: {
            trigger: ".hero-section-2",
            start: "top 80%",
            end: "center 40%",
            scrub: 1.5,
          },
          motionPath: {
            path: [
              { x: "33%", y: "0%" },
              { x: "12%", y: "50%" },
              { x: "-28vw", y: "70vh" },  // Adjusted for better vertical alignment
            ],
            curviness: 1.5,
          },
          duration: 3,
          ease: "power6.out",
        });
      } else if (isLargeScreenSize) {
        gsap.to(threeDERef.current, {
          scrollTrigger: {
            trigger: ".hero-section-2",
            start: "top 80%",
            end: "center 40%",
            scrub: 1.5,
          },
          motionPath: {
            path: [
              { x: "33%", y: "0%" },
              { x: "12%", y: "50%" },
              { x: "-28vw", y: "65vh" },  // Adjusted for better vertical alignment
            ],
            curviness: 1.5,
          },
          duration: 3,
          ease: "power6.out",
        });
      } else if (isSpecificSize) {
        gsap.to(threeDERef.current, {
          scrollTrigger: {
            trigger: ".hero-section-2",
            start: "top 80%",
            end: "center 40%",
            scrub: 1.5,
          },
          motionPath: {
            path: [
              { x: "33%", y: "0%" },
              { x: "12%", y: "50%" },
              { x: "-28vw", y: "80vh" },  // Adjusted for better vertical alignment
            ],
            curviness: 1.5,
          },
          duration: 3,
          ease: "power6.out",
        });
      }
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };

    } else if (hero1Complete && !isDesktop) {
      setHero2Complete(true);
      const heroSection2 = document.querySelector(".hero-section-2");
      if (heroSection2) {
        heroSection2.style.opacity = "1";
        heroSection2.style.transform = "translateX(0)";
      }
    }
  }, [hero1Complete, isDesktop, isSpecificSize, isLargeScreenSize, isXtraLargeScreenSize]);

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
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
        overflowY: "auto",
        background: "#000000",
        overscrollBehavior: "none",
        overscrollBehaviorY: "none",
      }}
    >
      <Fade in={showButton}>
        <Button
          onClick={handleScrollToTop}
          variant="contained"
          color="primary"
          sx={{
            position: "fixed",
            width: { xs: 50, sm: 56, md: 60 },
            height: { xs: 50, sm: 56, md: 60 },
            minWidth: "44px",
            minHeight: "44px",
            bottom: { xs: 80, sm: 90, md: 50 },
            left: { xs: 20, sm: 30, md: 50 },
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
            width: { xs: 50, sm: 56, md: 60 },
            height: { xs: 50, sm: 56, md: 60 },
            minWidth: "44px",
            minHeight: "44px",
            bottom: { xs: 20, sm: 24, md: 24 },
            right: { xs: 20, sm: 24, md: 24 },
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

      {/* Desktop ThreeDE - Hidden on mobile/tablet */}
      <Box
        className="threeDE"
        ref={threeDERef}
        suppressHydrationWarning
        sx={{
          width: "100vw",
          height: "100vh",
          display: { xs: "none", md: "flex" },
          justifyContent: "left",
          alignItems: "left",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 2,
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
        className="gradient-background"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "90%",
          height: { xs: "5%", md: "4%" },
          background: `radial-gradient(ellipse at top, rgba(154, 106, 255, 0.6) 0%, rgba(0, 0, 0, 0) 60%)`,
          zIndex: 1,
          opacity: isMobile || isTablet ? 1 : 0,
        }}
      />
      <Box
        className="navbar"
        sx={{
          position: "relative",
          zIndex: 10,
          opacity: isMobile || isTablet ? 1 : 0,
          transform:
            isMobile || isTablet ? "translateX(0)" : "translateX(-100px)",
        }}
      >
        <NavBar />
      </Box>
      {/* Mobile ThreeDE - CSS-only visibility control */}
      <Box
        suppressHydrationWarning
        sx={{
          width: { xs: "100%", sm: "80%", md: "50%", lg: "40%" },
          height: { xs: "40vh", sm: "45vh", md: "55vh" },
          maxHeight: "500px",
          display: { xs: "block", sm: "block", md: "none" },
          position: "relative",
          top: 0,
          margin: "0 auto",
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
        className="hero-content"
        sx={{
          display: "flex",
          position: "relative",
          zIndex: 3,
          marginTop: { xs: "-15%", sm: "-10%", md: "-6rem" },
          opacity: isMobile || isTablet ? 1 : 0,
          transform:
            isMobile || isTablet ? "translateX(0)" : "translateX(-100px)",
        }}
      >
        <HeroPageSection1 />
      </Box>
      <Box
        className="hero-section-2"
        sx={{
          position: "relative",
          zIndex: 3,
          marginBottom: { xs: "1rem", md: "2rem", lg: "5rem" },  // Add spacing before "Our Services"
          ...(isMobile || isTablet
            ? {
              opacity: 1,
              transform: "none",
            }
            : {
              opacity: 0,  // Start hidden, GSAP will animate
              // Removed transform to prevent glitching
            }),
        }}
      >
        <HeroPageSection2 onAnimationComplete={() => setHero2Complete(true)} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 3, sm: 4, md: 5, lg: 6 },
          marginTop: { xs: 2, sm: 3, md: 4 },
          px: { xs: 0, sm: 0 },
          zIndex: 1,
        }}
      >
        <Box>
          <HeroPageSection3 />
        </Box>
        <ErrorBoundary>
          <HeroPageSection4 />
        </ErrorBoundary>
        <HeroPageSection5 />
        <HeroPageSection6 />
        <HeroPageSection7 />
      </Box>
      <Footer />
    </Box>
  );
};
export default HeroPage;
