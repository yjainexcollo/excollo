"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ScrollContext } from "./ScrollProvider";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const mqOpts = { noSsr: true, defaultMatches: false };

// Dynamic card width and gap based on screen size
const getCardDimensions = (width) => {
  if (width >= 2001 && width <= 2600) {
    return { CARD_WIDTH: 1000, GAP: 1400 }; // Adjusted for larger screens
  } else if (width >= 1536 && width <= 2000) {
    return { CARD_WIDTH: 800, GAP: 1200 }; // Adjusted for larger screens
  } else if (width >= 1200 && width < 1536) {
    return { CARD_WIDTH: 600, GAP: 1000 }; // Adjusted for medium-large screens
  } else if (width >= 900 && width < 1200) {
    return { CARD_WIDTH: 400, GAP: 800 }; // Adjusted for medium screens
  }
  return { CARD_WIDTH: 620, GAP: 950 }; // Default for smaller screens
};

const SCROLL_COOLDOWN = 800;
const INITIAL_SCROLL_THRESHOLD = 20;

const Feature = ({ title, description, isMobile, isTablet }) => {
  const cardStyles = {
    background: "linear-gradient(180deg, #05000A 0%, #1B1125 100%)",
    borderRadius: "12px",
    textAlign: "center",
    padding: "1",
    width: "100%",
    height: isMobile ? "150px" : isTablet ? "200px" : "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #7e22ce",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#000000",
      transform: "translateY(-5px)",
      boxShadow: "rgba(133, 86, 245, 0.4) 0px 0px 100px 0px",
    },
  };

  const titleStyles = {
    background: isMobile
      ? "linear-gradient(90deg, #2579e3, #8e54f7)"
      : "linear-gradient(90deg, #2579e3, #8e54f7)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "inline-block",
    marginBottom: isMobile ? "0.5rem" : "1rem",
    marginTop: isMobile ? "0" : isTablet ? "0" : "2rem",
    transition: "margin-top 0.5s ease",
    fontSize:
      isMobile
        ? `clamp(1.35rem, calc(0.5rem + 1vw), 9rem)`
        : isTablet
          ? `clamp(1.35rem, calc(1rem + 1vw), 9rem)`
          : {
            md: `clamp(0.25rem,calc(1rem + 0.5vw),2.2rem)`,
            lg: `clamp(0.25rem,calc(1rem + 0.8vw),2.2rem)`,
            xl: `clamp(0.25rem,calc(1rem + 1vw),3rem)`,
          },
    fontWeight: 400,
  };

  return (
    <Paper elevation={6} sx={cardStyles}>
      <Typography gutterBottom className="feature-title" sx={titleStyles}>
        {title}
      </Typography>
      {((!isMobile && !isTablet) ||
        (isMobile && description) ||
        (isTablet && description)) && (
          <Typography
            fontWeight={100}
            color="white"
            className="feature-description"
            sx={{
              fontSize: {
                xs: `clamp(0.8rem, calc(0.5rem + 1vw), 9rem)`,
                md: `clamp(0.5rem, calc(0.6rem + 0.4vw), 1.5rem)`,
                lg: `clamp(0.5rem, calc(0.6rem + 0.6vw), 1.8rem)`,
                xl: `clamp(0.25rem, calc(0.5rem + 0.8vw), 3rem)`,
              },
              fontWeight: 200,
              lineHeight: "1.7",
              fontFamily: '"Inter", sans-serif',
              maxWidth: "80%",
              opacity: 1,
              transition: "opacity 0.5s ease",
            }}
          >
            {description}
          </Typography>
        )}
    </Paper>
  );
};

const carouselContent = [
  {
    title: "AI & Automation",
    description:
      "Identify gaps in processes, align technology to bridge those gaps, and implement transformative solutions tailored for success.",
    link: "/services",
  },
  {
    title: "Sales Channel Development",
    description:
      "Scalable websites and applications on both, web and mobile, tailored to meet your business’s unique challenges and goals.",
    link: "/services",
  },
  {
    title: "ML Driven Analysis",
    description:
      "Harness cutting-edge machine learning to decode data, predict trends, and empower precise, forward-thinking business strategies.",
    link: "/services",
  },
  {
    title: "Product Development",
    description:
      "Set up or enhance e-commerce and WhatsApp sales channels to unlock new growth opportunities and expand reach.",
    link: "/services",
  },
  {
    title: "Tech Consultancy",
    description:
      "From intelligent chatbots to workflow automation, we bring AI solutions that optimize operations and reduce costs.",
    link: "/services",
  },
];

const ResponsiveView = ({ type, isTablet }) => {
  const [direction, setDirection] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), mqOpts);
  const [key, setKey] = useState(0);

  const router = useRouter();

  const handleCardClick = () => {
    router.push("/services");
  };

  const cards = [
    {
      title: "AI & Automation",
      description:
        "Identify gaps in processes, align technology to bridge those gaps, and implement transformative solutions tailored for success.",
    },
    {
      title: "Sales Channel Development",
      description:
        "Scalable websites and applications on both, web and mobile, tailored to meet your business’s unique challenges and goals.",
    },
    {
      title: "ML Driven Analysis",
      description:
        "Harness cutting-edge machine learning to decode data, predict trends, and empower precise, forward-thinking business strategies.",
    },
    {
      title: "Product Development",
      description:
        "Set up or enhance e-commerce and WhatsApp sales channels to unlock new growth opportunities and expand reach.",
    },
    {
      title: "Tech Consultancy",
      description:
        "From intelligent chatbots to workflow automation, we bring AI solutions that optimize operations and reduce costs.",
    },
  ];

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + cards.length) % cards.length
    );
  };

  return (
    <Box
      key={key}
      sx={{
        minHeight: {
          xs: "100vh",
        },
        color: "#fff",
        fontFamily: '"Inter", sans-serif',
        position: "relative",
        marginTop: {
          xs: "20%",
          sm: "10%",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          position: "relative",
          backgroundColor: "black",
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? "100%" : "-100%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: direction > 0 ? "-100%" : "100%" }}
            transition={{ duration: 0.5 }}
            style={{
              width: "80%",
              position: "absolute",
              left: "10%",
              x: "-50%",
              cursor: "pointer",
            }}
            onClick={handleCardClick}
          >
            <Feature
              title={cards[currentIndex].title}
              description={cards[currentIndex].description}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          </motion.div>
        </AnimatePresence>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "30%",
              mt: isMobile ? 22 : 32,
              gap: 1,
            }}
          >
            <Box
              sx={{
                borderRadius: "50%",
                border: "1px solid rgb(206, 84, 247)",
                height: "40px",
                width: "40px",
              }}
            >
              <IconButton
                onClick={handlePrev}
                sx={{ ml: 0.5, p: 1, color: "white" }}
              >
                <ArrowBackIosIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                borderRadius: "50%",
                border: "1px solid rgb(206, 84, 247)",
                height: "40px",
                width: "40px",
              }}
            >
              <IconButton
                onClick={handleNext}
                sx={{ ml: 0.2, p: 1, color: "white" }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const DesktopCarousel = ({ isReverse, type = "title", mounted = true }) => {
  const containerRef = useRef(null);
  const {
    scrollPosition,
    setScrollPosition,
    activeScroller,
    setActiveScroller,
    hoveredIndex,
    setHoveredIndex,
    rotation,
    setRotation,
  } = useContext(ScrollContext);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isOverCard, setIsOverCard] = useState(false);
  const lastScrollTime = useRef(Date.now());
  const initialScrollDirection = useRef(null);
  const router = useRouter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), mqOpts);
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"), mqOpts);
  const isLargeScreen = useMediaQuery(
    "(min-width: 1536px) and (max-width: 2600px)",
    mqOpts
  );
  const issmallLaptop = useMediaQuery(theme.breakpoints.up("md"), mqOpts);
  const islaptop = useMediaQuery(theme.breakpoints.up("lg"), mqOpts);
  const isXtraLargeLaptop = useMediaQuery(theme.breakpoints.up("xl"), mqOpts);

  // Dynamic card dimensions
  const { CARD_WIDTH, GAP } = getCardDimensions(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const TOTAL_WIDTH = CARD_WIDTH + GAP;

  const handleMouseMove = useCallback(
    (e, index) => {
      if (isMobile || isTablet) return;

      const { clientX, clientY, currentTarget } = e;
      const rect = currentTarget.getBoundingClientRect();
      const isCursorOverCard =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

      setIsOverCard(isCursorOverCard);

      if (isCursorOverCard) {
        if (type === "title") {
          const x = ((clientX - rect.left) / rect.width - 0.5) * 15;
          const y = ((clientY - rect.top) / rect.height - 0.5) * -15;
          setRotation({ x, y });
          setHoveredIndex(index);
        }
      } else {
        setRotation({ x: 0, y: 0 });
        setHoveredIndex(null);
      }
    },
    [isMobile, isTablet, type]
  );

  const handleMouseLeave = useCallback(() => {
    setRotation({ x: 0, y: 0 });
    setHoveredIndex(null);
    setIsOverCard(false);
  }, []);

  const handleContainerMouseLeave = useCallback(() => {
    setIsOverCard(false);
  }, []);

  const CAROUSEL_TIMING = {
    duration: 800,
    cooldown: 850,
  };

  const smoothScrollTo = (element, targetPosition, duration) => {
    const start = element.scrollLeft;
    const distance = targetPosition - start;
    const startTime = performance.now();

    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animation = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      element.scrollLeft = start + distance * easeInOutCubic(progress);

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const handleWheelEvent = useCallback(
    (e) => {
      if (isMobile || isTablet) return;

      const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);

      if (!isOverCard) {
        if (isHorizontalScroll) {
          e.preventDefault();
          e.stopPropagation();
        }
        return;
      }

      if (isHorizontalScroll) {
        e.stopPropagation();
        e.preventDefault();
      } else {
        return;
      }

      if (!containerRef.current || isScrolling) return;

      const currentTime = Date.now();
      if (currentTime - lastScrollTime.current < CAROUSEL_TIMING.cooldown) return;

      if (
        !isScrolling &&
        (Math.abs(e.deltaY) > INITIAL_SCROLL_THRESHOLD ||
          Math.abs(e.deltaX) > INITIAL_SCROLL_THRESHOLD)
      ) {
        const delta =
          Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        const direction = delta > 0 ? 1 : -1;

        const targetDirection = direction;
        const currentPosition = containerRef.current.scrollLeft;
        const currentIndex = Math.round(currentPosition / TOTAL_WIDTH);
        const targetIndex = Math.max(
          0,
          Math.min(carouselContent.length - 1, currentIndex + targetDirection)
        );
        const targetPosition = targetIndex * TOTAL_WIDTH;

        if (targetPosition !== currentPosition) {
          setIsScrolling(true);
          lastScrollTime.current = currentTime;
          setActiveScroller(isReverse ? "reverse" : "normal");
          setScrollPosition(targetPosition);

          smoothScrollTo(
            containerRef.current,
            targetPosition,
            CAROUSEL_TIMING.duration
          );

          setTimeout(() => {
            setIsScrolling(false);
            setActiveScroller(null);
          }, CAROUSEL_TIMING.cooldown);
        }
      }
    },
    [
      isMobile,
      isTablet,
      isOverCard,
      isScrolling,
      setActiveScroller,
      setScrollPosition,
      CAROUSEL_TIMING.cooldown,
      CAROUSEL_TIMING.duration,
      TOTAL_WIDTH,
      isReverse,
      INITIAL_SCROLL_THRESHOLD,
      carouselContent.length,
      isLargeScreen,
    ]
  );

  const handleTouchMove = useCallback((e) => e.preventDefault(), []);

  // Update button click handler
  const handleButtonClick = (direction) => {
    if (!containerRef.current || isScrolling) return;

    const currentPosition = containerRef.current.scrollLeft;
    const currentIndex = Math.round(currentPosition / TOTAL_WIDTH);
    const targetIndex = Math.max(
      0,
      Math.min(carouselContent.length - 1, currentIndex + direction)
    );
    const targetPosition = targetIndex * TOTAL_WIDTH;

    if (targetPosition !== currentPosition) {
      setIsScrolling(true);
      setActiveScroller(isReverse ? "reverse" : "normal");
      setScrollPosition(targetPosition);

      smoothScrollTo(
        containerRef.current,
        targetPosition,
        CAROUSEL_TIMING.duration
      );

      setTimeout(() => {
        setIsScrolling(false);
        setActiveScroller(null);
      }, CAROUSEL_TIMING.cooldown);
    }
  };

  // Update dot click handler
  const handleDotClick = (index) => {
    if (!containerRef.current || isScrolling) return;

    const targetPosition = index * TOTAL_WIDTH;

    setIsScrolling(true);
    setActiveScroller(isReverse ? "reverse" : "normal");
    setScrollPosition(targetPosition);

    smoothScrollTo(
      containerRef.current,
      targetPosition,
      CAROUSEL_TIMING.duration
    );

    setTimeout(() => {
      setIsScrolling(false);
      setActiveScroller(null);
    }, CAROUSEL_TIMING.cooldown);
  };

  // Update the useEffect for scroll position changes
  useEffect(() => {
    if (containerRef.current) {
      const targetPosition = isReverse
        ? (carouselContent.length - 1) * TOTAL_WIDTH - scrollPosition
        : scrollPosition;

      if (activeScroller) {
        smoothScrollTo(
          containerRef.current,
          targetPosition,
          CAROUSEL_TIMING.duration
        );
      } else {
        containerRef.current.scrollLeft = targetPosition;
      }
    }
  }, [scrollPosition, activeScroller]);

  useEffect(() => {
    if (!isOverCard) {
      setRotation({ x: 0, y: 0 });
      setHoveredIndex(null);
    }
  }, [isOverCard]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleWheelEvent, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    container.addEventListener("mouseleave", handleContainerMouseLeave);

    return () => {
      container.removeEventListener("wheel", handleWheelEvent);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("mouseleave", handleContainerMouseLeave);
    };
  }, [handleWheelEvent, handleTouchMove, handleContainerMouseLeave]);

  useEffect(() => {
    if (containerRef.current) {
      const position = isReverse
        ? (carouselContent.length - 1) * TOTAL_WIDTH - scrollPosition
        : scrollPosition;

      containerRef.current.scrollTo({
        left: position,
        behavior: activeScroller ? "smooth" : "auto",
      });
    }
  }, [scrollPosition, activeScroller]);

  const getCardStyle = (index) => {
    const isHovered = hoveredIndex === index;
    const baseStyle = {
      flex: "0 0 auto",
      width: isMobile || isTablet ? "80%" : `${CARD_WIDTH}px`,
      height: issmallLaptop
        ? "calc(40vh + 5vw)"
        : isMobile || isTablet
          ? "auto"
          : "calc(60vh + 5vw)",
      marginTop: isLargeScreen
        ? "4rem"
        : islaptop
          ? "2rem"
          : isMobile || isTablet
            ? "1rem"
            : "4rem",
      marginBottom: isLargeScreen
        ? "4rem"
        : islaptop
          ? "2rem"
          : isMobile || isTablet
            ? "1rem"
            : "4rem",
      padding: isMobile || isTablet ? "1rem" : "1rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: type === "description" ? "60px" : "20px",
      scrollSnapAlign: "center",
      cursor: type === "title" ? "pointer" : "default",
      color: isReverse ? "white" : "black",
      textAlign: "center",
      marginLeft: index === 0 ? (type === "title" ? "40%" : "30%") : "0",
      marginRight: index === carouselContent.length - 1 ? "40%" : "0",
      transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      transformStyle: "preserve-3d",
      backgroundColor:
        type === "description" ? "rgba(255, 255, 255, 0.1)" : "transparent",
      boxShadow:
        type === "description" ? "0 10px 30px -15px rgba(0,0,0,0.3)" : "none",
      transform: isHovered
        ? `perspective(1000px) scale(1) rotateX(${rotation.y}deg) rotateY(${rotation.x
        }deg) translateZ(${type === "title" ? "100px" : "50px"})`
        : `perspective(1000px) scale(1.05) rotateX(${rotation.y}deg) rotateY(${rotation.x
        }deg) translateZ(${type === "title" ? "30px" : "10px"})`,
      "& .MuiTypography-h3": {
        fontSize: {
          xs: "2.5rem",
          md: "clamp(0.25rem, calc(1rem + 2vw), 1.9rem)",
          lg: "clamp(0.25rem, calc(1.5rem + 4vw), 2.8rem)",
          xl: "clamp(0.25rem, calc(2rem + 6vw), 3.7rem)",
        },
        fontWeight: "400",
        background: "linear-gradient(180deg, #2579e3, #8e54f7)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline-block",
        transform: "translateZ(60px)",
        marginBottom: "1rem",
        textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
      },

      "& .MuiTypography-h5": {
        fontSize: {
          xs: "1rem",
          md: "clamp(0.5rem, calc(0.7rem + 0.7vw), 1.3rem)",
          lg: "clamp(0.5rem, calc(0.7rem + 0.9vw), 1.8rem)",
          xl: "clamp(0.5rem, calc(0.7rem + 1.1vw), 2.1rem)",
        },
        fontWeight: "100",
        color: "#ddd",
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: "95%",
        marginTop: "12%",
        transform: "translateZ(40px)",
        transition: "transform 0.3s ease-out",
      },
    };

    return baseStyle;
  };

  if (!mounted) return null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        touchAction: "none",
        position: "relative",
        perspective: "1000px",
      }}
    >
      {!isMobile && !isTablet && (
        <IconButton
          onClick={() => handleButtonClick(-1)}
          disabled={scrollPosition === 0}
          sx={{
            position: "absolute",
            left: { xs: "10px", md: "10px" },
            zIndex: 3,
            color: "white",
            marginLeft: { xs: "2rem", md: "5rem", lg: "7rem" }, // Adjusted for larger screens
            fontSize: { xs: "1.2rem", md: "1.5rem", lg: "2rem", xl: "2.5rem" },
            "&.Mui-disabled": {
              color: "#716b6b",
            },
          }}
        >
          <ArrowBackIosIcon
            sx={{
              fontSize: {
                xs: "1.2rem",
                md: "1.5rem",
                lg: "2rem",
                xl: "2.5rem",
              },
            }}
          />
        </IconButton>
      )}
      <Box
        ref={containerRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          width: "100%",
          height: "auto",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": { display: "none" },
          touchAction: "pan-x pinch-zoom",
          gap: isMobile || isTablet ? "1rem" : `${GAP}px`, // Dynamic gap
          paddingLeft: isLargeScreen ? "20%" : "15%", // Adjusted for larger screens
          paddingRight: isLargeScreen ? "20%" : "30%", // Adjusted for larger screens
        }}
      >
        {carouselContent.map((item, index) => (
          <Box
            key={index}
            className="carousel-card"
            sx={getCardStyle(index)}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
              if (type === "title") {
                router.push(item.link || "#");
                // window.scrollTo(0, 0); // Next.js handles this by default usually, but we can keep it if needed
              }
            }}
          >
            {type === "title" ? (
              <Link
                href={item.link || "#"}
                style={{
                  marginTop: isXtraLargeLaptop
                    ? "-6rem"
                    : islaptop
                      ? "-5rem"
                      : issmallLaptop
                        ? "-6rem"
                        : isLargeScreen
                          ? "-10rem"
                          : "-6rem",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    background: "linear-gradient(180deg, #2579e3, #8e54f7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                    transform: "translateZ(60px)",
                    marginBottom: "1rem",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  {item.title}
                </Typography>
              </Link>
            ) : (
              <Typography
                variant="h5"
                sx={{
                  color: "#fff",
                  marginLeft: "auto",
                  marginRight: "auto",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  width: "95%",
                  marginTop: "12%",
                  transform: "translateZ(40px)",
                  transition: "transform 0.3s ease-out",
                }}
              >
                {item.description}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
      {!isMobile && !isTablet && (
        <IconButton
          onClick={() => handleButtonClick(1)}
          disabled={
            scrollPosition === (carouselContent.length - 1) * TOTAL_WIDTH
          }
          sx={{
            position: "absolute",
            right: { xs: "10px", md: "10px" },
            zIndex: 3,
            color: "white",
            "&.Mui-disabled": {
              color: "#716b6b",
            },
            marginRight: { md: "5rem", lg: "7rem" },
            fontSize: { md: "1.5rem", lg: "2rem", xl: "2.5rem" },
          }}
        >
          <ArrowForwardIosIcon
            sx={{
              fontSize: {
                xs: "1.2rem",
                md: "1.5rem",
                lg: "2rem",
                xl: "2.5rem",
              },
            }}
          />
        </IconButton>
      )}

      <Box
        sx={{
          position: "absolute",
          bottom: { xs: "-2rem", md: "-3rem", lg: "-4rem" },
          display: "flex",
          justifyContent: "center",
          width: "100%",
          zIndex: 3,
        }}
      >
        {carouselContent.map((_, index) => (
          <Box
            key={index}
            onClick={() => handleDotClick(index)}
            sx={{
              width: { xs: "8px", md: "10px", lg: "12px" },
              height: { xs: "8px", md: "10px", lg: "12px" },
              borderRadius: "50%",
              backgroundColor:
                scrollPosition / TOTAL_WIDTH === index ? "white" : "gray",
              margin: { xs: "0 5px", md: "0 8px", lg: "0 10px" },
              cursor: "pointer",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

const Carousel = ({ isReverse, type = "title" }) => {
  const [mounted, setMounted] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), mqOpts);
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"), mqOpts);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Since this component is now dynamically imported with ssr: false,
  // we can safely use conditional rendering
  if (isMobile || isTablet) {
    return <ResponsiveView type={type} isTablet={isTablet} />;
  }

  return <DesktopCarousel isReverse={isReverse} type={type} mounted={mounted} />;
};

export const TitleCarousel = () => <Carousel isReverse={false} type="title" />;
export const DescriptionCarousel = () => (
  <Carousel isReverse={true} type="description" />
);

export default Carousel;
