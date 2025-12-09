import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import Logo from "../../assets/logo/excollo3d.png";

const Excollo3DCaseStudy = ({ isStatic = false, disableScroll = false }) => {
  const theme = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  
  // Simplified breakpoint detection
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // 0-599px
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600-959px
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // 960px+
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up('xl')); // 1536px+

  // Scroll handler with throttling for better performance
  const handleScroll = useCallback(() => {
    if (!isStatic && isDesktop && !disableScroll) {
      setScrollY(window.scrollY);
    }
  }, [isStatic, isDesktop, disableScroll]);

  useEffect(() => {
    if (!isStatic && isDesktop && !disableScroll) {
      let ticking = false;
      const throttledScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };
      
      window.addEventListener("scroll", throttledScroll, { passive: true });
      return () => window.removeEventListener("scroll", throttledScroll);
    }
  }, [handleScroll, isStatic, isDesktop, disableScroll]);

  // Mouse interaction handlers
  const handleMouseMove = useCallback((e) => {
    if (!isDesktop || (isStatic && !disableScroll)) return;
    
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width - 0.5) * 30;
    const y = ((clientY - rect.top) / rect.height - 0.5) * -30;
    setRotation({ x, y });
  }, [isDesktop, isStatic, disableScroll]);

  const handleMouseLeave = useCallback(() => {
    if (isDesktop && (!isStatic || disableScroll)) {
      setRotation({ x: 0, y: 0 });
    }
  }, [isDesktop, isStatic, disableScroll]);

  // Calculate transforms based on screen size and scroll
  const getTransforms = () => {
    if (!isDesktop) {
      return "none";
    }
    // If scroll-based motion is disabled, only apply rotation for hover effect
    if (disableScroll || isStatic) {
      return `rotateX(${rotation.y}deg) rotateY(${rotation.x}deg)`;
    }
    // Simplified scroll-based translation calculation
    const baseTranslate = isLargeDesktop ? 2500 : 1800;
    const translateY = Math.max(baseTranslate - scrollY * 0.5, 0);
    const clampedTranslateY = Math.min(translateY, 1000);
    return `translateY(${clampedTranslateY}px) rotateX(${rotation.y}deg) rotateY(${rotation.x}deg)`;
  };

  // Calculate gradient opacity
  const gradientOpacity = scrollY > 100 ? Math.min((scrollY - 800) / 300, 1) : 1;

  return (
    <Box>
      {/* Main Logo Container */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        zIndex={2}
        sx={{
          height: {
            xs: "50vh", // Mobile
            sm: "55vh", // Tablet
            md: "60vh", // Desktop
            lg: "65vh", // Large desktop
          },
          width: "100%",
          overflow: "hidden",
          // Dynamic margins based on screen size and static mode
          mt: {
            xs: isStatic ? 0 : -8,  // Mobile: -64px when not static
            sm: isStatic ? 0 : -6,  // Tablet: -48px when not static
            md: isStatic ? 0 : -4,  // Desktop: -32px when not static
            lg: isStatic ? 0 : -2,  // Large desktop: -16px when not static
          },
          mb: {
            xs: isStatic ? 0 : -8,  // Mobile: -64px when not static
            sm: isStatic ? 0 : -6,  // Tablet: -48px when not static
            md: 0,                  // Desktop: no bottom margin
          },
        }}
      >
        <Box
          component="img"
          src={Logo}
          alt="Excollo 3D Logo"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          sx={{
            height: "auto",
            width: {
              xs: "90%", // Mobile: 90% width
              sm: "85%", // Tablet: 85% width
              md: "80%", // Desktop: 80% width
              lg: "75%", // Large desktop: 75% width
              xl: "70%", // Extra large: 70% width
            },
            maxWidth: "800px", // Prevent logo from getting too large
            transform: getTransforms(),
            transformStyle: "preserve-3d",
            willChange: isDesktop && (!isStatic || disableScroll) ? "transform" : "auto",
            transition: isDesktop && (!isStatic || disableScroll) ? "transform 0.2s ease-out" : "none",
            cursor: isDesktop && (!isStatic || disableScroll) ? "pointer" : "default",
            // Ensure good performance on mobile
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        />
      </Box>

      {/* Gradient Animation Section - Desktop Only */}
      {isDesktop && !isStatic && (
        <Box
          position="relative"
          zIndex={0}
          sx={{
            width: "100%",
            height: "0px",
            background: `radial-gradient(ellipse at bottom, rgba(196, 188, 213, ${gradientOpacity}) 0%, rgba(0, 0, 0, 0) 60%)`,
            transition: "background 0.3s ease-in-out",
          }}
        />
      )}

      {/* Divider - Desktop Only */}
      {isDesktop && (
        <Divider
          sx={{
            backgroundColor: "#000000",
            height: "2px",
            width: "100%",
            position: "relative",
          }}
        />
      )}
    </Box>
  );
};

export default Excollo3DCaseStudy;