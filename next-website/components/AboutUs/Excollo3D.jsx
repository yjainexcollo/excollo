import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo/excollo3d.png";
import { m } from "framer-motion";
const Excollo3D = () => {
  const theme = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const isSpecified = useMediaQuery("(max-width: 899px)");
  const isSmallerLaptop = useMediaQuery(theme.breakpoints.up("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const is1300pxto1535px = useMediaQuery(
    "(min-width:1300px) and (max-width:1535px)"
  );
  const isXtraLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));
  const is1750to2000px = useMediaQuery(
    "(min-width:1750px) and (max-width:2000px)"
  );
  const is2001to2300px = useMediaQuery(
    "(min-width:2001px) and (max-width:2300px)"
  );
  const is2301to2600px = useMediaQuery(
    "(min-width:2301px) and (max-width:2600px)"
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
      setIsTablet(window.innerWidth > 480 && window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (!isMobile && !isTablet) {
      const handleScroll = () => {
        setScrollY(window.scrollY);
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isMobile, isTablet]);
  const handleMouseMove = (e) => {
    if (isMobile || isTablet) return;
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width - 0.5) * 30;
    const y = ((clientY - rect.top) / rect.height - 0.5) * -30;
    setRotation({ x, y });
  };
  const handleMouseLeave = () => {
    if (isMobile || isTablet) return;
    setRotation({ x: 0, y: 0 });
  };
  const translateYImage = is2301to2600px
    ? Math.max(3600 - scrollY * 0.5, 0)
    : is2001to2300px
    ? Math.max(3100 - scrollY * 0.5, 0)
    : is1750to2000px
    ? Math.max(2800 - scrollY * 0.5, 0)
    : isXtraLargeScreen
    ? Math.max(2300 - scrollY * 0.5, 0)
    : is1300pxto1535px
    ? Math.max(1900 - scrollY * 0.5, 0)
    : isLargeScreen
    ? Math.max(1900 - scrollY * 0.5, 0)
    : isSmallerLaptop
    ? Math.max(1800 - scrollY * 0.5, 0)
    : Math.max(100 - scrollY * 0.5, 0);
  const gradientOpacity =
    scrollY > 100 ? Math.min((scrollY - 800) / 300, 1) : 1;
  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        zIndex={2}
        sx={{
          height: "60vh",
          width: "100%",
          overflow: "hidden",
          "@media (max-width: 899px)": {
            width: "100%",
            marginTop: "-5%",
          },
          "@media (max-width: 768px)": {
            width: "100%",
            margin: "-15% auto",
          },
          "@media (max-width: 480px)": {
            width: "100%",
            height: "400px",
            margin: " -25% 0 -25%  0",
          },
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            height: "auto",
            width: "80%",
            transform:
              isMobile || isTablet
                ? "none"
                : `translateY(${Math.min(translateYImage, 1000)}px) rotateX(${
                    rotation.y
                  }deg) rotateY(${rotation.x}deg)`,
            transformStyle: "preserve-3d",
            willChange: "transform",
            transition: "transform 0.2s ease-out",
            "@media (max-width: 1200px)": {
              width: "80%",
            },
            "@media (max-width: 768px)": {
              width: "80%",
            },
            "@media (max-width: 480px)": {
              width: "80%",
            },
          }}
        />
      </Box>
      {/* Gradient Animation Section */}
      {!isMobile && !isTablet && (
        <Box
          position="relative"
          zIndex={0}
          sx={{
            left: 0,
            right: 0,
            width: "100%",
            height: "0px",
            background: `radial-gradient(ellipse at bottom, rgba(196, 188, 213, ${gradientOpacity}) 0%, rgba(0, 0, 0, 0) 60%)`,
            transition: "background 0.3s ease-in-out",
          }}
        />
      )}
      <Divider
        sx={{
          backgroundColor: "#000000",
          height: "2px",
          width: "100%",
          position: "relative",
          display: isMobile || isTablet ? "none" : "block",
        }}
      />
    </Box>
  );
};
export default Excollo3D;
