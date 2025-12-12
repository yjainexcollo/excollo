import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import AnimatedCTA from "../AnimatedCTAButton";
const HeroPageSection6 = () => {
  const circleRef = useRef(null);
  const containerRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const timelineRef = useRef(null);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const targetLetters = ["e", "a", "d", "y", "o", "n", "s"];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const router = useRouter();
  const shuffleArray = (array) => {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  };
  const createAnimation = () => {
    if (
      !textRef1.current ||
      !textRef2.current ||
      !circleRef.current ||
      !containerRef.current
    )
      return;
    // Kill previous timeline if it exists
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    const splitTextIntoSpans = (textRef) => {
      const text = textRef.textContent;
      textRef.innerHTML = text
        .split("")
        .map((char) => {
          const isTarget = targetLetters.includes(char.toLowerCase());
          return `<span class="${isTarget ? "target-letter" : "letter"
            }" data-letter="${char}">${char}</span>`;
        })
        .join("");
    };
    splitTextIntoSpans(textRef1.current);
    splitTextIntoSpans(textRef2.current);
    const letters1 = textRef1.current.querySelectorAll(".target-letter");
    const letters2 = textRef2.current.querySelectorAll(".target-letter");
    const allLetters = [...letters1, ...letters2];
    const offsetY = 8;
    const containerRect = containerRef.current.getBoundingClientRect();
    let letterPositions = allLetters.map((letter) => {
      const rect = letter.getBoundingClientRect();
      return {
        element: letter,
        x:
          rect.left -
          containerRect.left +
          containerRef.current.scrollLeft +
          rect.width / 2,
        y:
          rect.top -
          containerRect.top +
          containerRef.current.scrollTop +
          rect.height / 2 +
          offsetY,
      };
    });
    if (letterPositions.length === 0) return;
    letterPositions = shuffleArray(letterPositions);
    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: "power2.inOut" },
    });
    timelineRef.current = tl;
    letterPositions.forEach((pos, index) => {
      const prevPos = index > 0 ? letterPositions[index - 1] : null;
      tl.to(circleRef.current, {
        x: pos.x,
        y: pos.y,
        duration: 0.8,
        onStart: () => {
          gsap.to(pos.element, { opacity: 0, duration: 0.4 });
          if (prevPos) {
            gsap.to(prevPos.element, {
              opacity: 1,
              duration: 0.3,
              delay: 0.2,
            });
          }
        },
      });
      tl.to(
        circleRef.current,
        {
          scale: 1.3,
          duration: 0.3,
          ease: "power2.out",
        },
        ">"
      );
      tl.to(
        circleRef.current,
        {
          scale: 1,
          duration: 0.3,
          ease: "power2.in",
        },
        ">"
      );
      tl.to({}, { duration: 0.4 });
      if (index === letterPositions.length - 1) {
        tl.add(() => {
          gsap.to(pos.element, {
            opacity: 1,
            duration: 0.3,
            delay: 0.2,
          });
        });
      }
    });
    gsap.set(circleRef.current, {
      x: letterPositions[0].x,
      y: letterPositions[0].y,
    });
  };
  useEffect(() => {
    // Initial animation creation
    createAnimation();
    // Debounce function to prevent too many rapid updates
    const debounce = (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    };
    // Handle resize with debounce
    const handleResize = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      createAnimation();
    }, 250);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);
  const handleClick = (e) => {
    e.preventDefault();
    router.push("/contact");
    // window.scrollTo(0, 0);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight: "40vh",
        padding: { xs: "2rem 1rem", md: "0rem 2rem" },
        color: "#fff",
      }}
    >
      <Box
        ref={containerRef}
        sx={{
          position: "relative",
          width: "100%",
          marginBottom: "4rem",
        }}
      >
        <Box
          ref={circleRef}
          sx={{
            marginTop: "-0.3rem",
            width: { xs: "17px", sm: "25px", md: "35px", lg: "40px", xl: "50px" },
            height: { xs: "17px", sm: "25px", md: "35px", lg: "40px", xl: "50px" },
            background: "linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)",
            borderRadius: "50%",
            position: "absolute",
            zIndex: 2,
            boxShadow: "0 0 15px rgba(147, 112, 219, 0.5)",
            transform: "translate(-50%, -50%)",
          }}
        />
        <Typography
          variant="h1"
          fontWeight="500"
          sx={{
            letterSpacing: "0.001em",
            fontSize: `clamp(2rem, calc(2rem + 3.5vw), 10rem)`,
            lineHeight: `clamp(2.5rem, calc(2rem + 3vw), 10rem)`,
            "& .letter": {
              display: "inline-block",
              position: "relative",
              transition: "opacity 0.2s",
            },
            "& .target-letter": {
              display: "inline-block",
              position: "relative",
              transition: "opacity 0.2s",
              color: "linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)",
            },
          }}
        >
          <Box
            ref={textRef1}
            sx={{
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            Ready&nbsp;for&nbsp;your
          </Box>
          <Box
            ref={textRef2}
            sx={{
              color: "linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor:
                "linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)",
            }}
          >
            digital&nbsp;Transformation?
          </Box>
        </Typography>
      </Box>
      <AnimatedCTA />
    </Box>
  );
};
export default HeroPageSection6;
