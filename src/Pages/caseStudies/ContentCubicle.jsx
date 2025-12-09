// Import React hooks and core functionality
import React, { useEffect, useRef, useState } from "react";
// Import GSAP for animations and scroll-triggered effects
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Import Material-UI components for layout and styling
import { Box, Container, Typography, useMediaQuery, useTheme, Button, Fade } from "@mui/material";
// Import custom components
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import Excollo3DCaseStudy from "../../Components/AboutUs/Excollo3DCaseStudy";
// Import Material-UI icons for metrics display
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// Import WhatsApp icon for contact button
import { IoLogoWhatsapp } from "react-icons/io5";

// Register GSAP ScrollTrigger plugin for scroll-based animations
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for intersection observer
 * Tracks when elements enter/exit the viewport for scroll-based animations
 * @param {Object} options - Configuration options for the intersection observer
 * @param {number} options.threshold - Minimum percentage of element visible to trigger
 * @param {string} options.rootMargin - Margin around the root element
 * @returns {Array} [ref, isIntersecting] - Reference to element and intersection state
 */
const useIntersectionObserver = (options = {}) => {
  // State to track if element is currently intersecting with viewport
  const [isIntersecting, setIsIntersecting] = useState(false);
  // Ref to attach to the element we want to observe
  const ref = useRef();

  useEffect(() => {
    // Fallback for older browsers/environments that don't support IntersectionObserver
    if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
      setIsIntersecting(true);
      return;
    }
    
    // Create intersection observer with custom options
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, {
      threshold: options.threshold ?? 0.45, // Default 45% visibility threshold
      rootMargin: options.rootMargin ?? '0px 0px -10% 0px', // Default bottom margin
      ...options
    });

    // Start observing the element if ref is available
    if (ref.current) {
      observer.observe(ref.current);
    }

    // Cleanup: disconnect observer when component unmounts
    return () => observer.disconnect();
  }, []);

  return [ref, isIntersecting];
};

/**
 * Animated Counter Component
 * Displays a number that animates from 0 to target value when it comes into view
 * Used for displaying metrics and statistics with smooth counting animation
 * @param {string|number} value - Target number to count up to
 * @param {number} duration - Animation duration in milliseconds (default: 2000ms)
 * @param {string} suffix - Text to append after the number (e.g., "%", "x")
 * @returns {JSX.Element} Typography component with animated counter
 */
const AnimatedCounter = ({ value, duration = 2000, suffix = "" }) => {
  // Default to final value to avoid flashing 0 when observer doesn't trigger
  const [count, setCount] = useState(parseInt(value));
  // Use intersection observer to trigger animation when component becomes visible
  const [ref, isVisible] = useIntersectionObserver();

  useEffect(() => {
    // Only start animation when component is visible
    if (!isVisible) return;

    const end = parseInt(value);
    let current = 0;
    // Calculate step interval based on duration and target value
    const stepMs = Math.max(10, Math.floor(duration / Math.max(end, 1)));

    // Reset counter to 0 and start animation
    setCount(0);
    const timer = setInterval(() => {
      current += 1;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, stepMs);

    // Cleanup timer on unmount or dependency change
    return () => clearInterval(timer);
  }, [isVisible, value, duration]);

  return (
    <Typography 
      ref={ref}
      sx={{ 
        color: '#8E54F7', // Purple color for metrics
        fontWeight: 700,
        transition: 'all 0.3s ease'
      }}
    >
      {count}{suffix}
    </Typography>
  );
};

/**
 * ContentCubicle Case Study Component
 * Displays a detailed case study for the Content Cubicle project
 * Features scroll-triggered animations, metrics display, and interactive 3D elements
 * @returns {JSX.Element} Complete case study page with animations and content
 */
const ContentCubicle = () => {
  // Material-UI theme and responsive breakpoints
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  // Refs for animation triggers and DOM elements
  const [heroRef] = useIntersectionObserver(); // Hero section animation trigger
  const aboutContainerRef = useRef(null); // About section container
  const processContainerRef = useRef(null); // Process section container
  const processLineRef = useRef(null); // Animated process line
  const processStepsRef = useRef([]); // Array of process step elements
  const processContentRef = useRef(null); // Process content container
  const ex3dTiltRef = useRef(null); // 3D element for mouse interaction
  
  // State for WhatsApp button visibility
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(false);

  /**
   * Helper function to set process step references
   * Used to collect all process step elements for batch animation
   * @param {HTMLElement} el - DOM element reference
   * @param {number} idx - Index of the process step
   */
  const setProcessStepRef = (el, idx) => {
    if (processStepsRef.current) {
      processStepsRef.current[idx] = el;
    }
  };

  /**
   * Main animation setup effect
   * Configures GSAP ScrollTrigger animations for the entire page
   * Only applies complex animations on desktop to maintain performance
   */
  useEffect(() => {
    // Clean up any existing ScrollTriggers to prevent memory leaks
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Only apply complex animations on desktop (skip on mobile for performance)
    if (!isMobile) {
      // Hero section entrance animation
      if (heroRef?.current) {
        gsap.fromTo(
          heroRef.current,
          { opacity: 0, y: 50 }, // Start state: invisible and moved down
          {
            opacity: 1,
            y: 0, // End state: visible and in position
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top 80%', // Start animation when top of element hits 80% of viewport
              once: true // Only animate once
            }
          }
        );
      }

      // About section entrance animation
      if (aboutContainerRef.current) {
        gsap.fromTo(
          aboutContainerRef.current,
          { opacity: 0, y: 30 }, // Start state: invisible and slightly moved down
          {
            opacity: 1,
            y: 0, // End state: visible and in position
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: aboutContainerRef.current,
              start: 'top 80%',
              once: true
            }
          }
        );
      }

      // Process section animations
      if (processContainerRef.current) {
        // Animate the vertical process line
        if (processLineRef.current) {
          gsap.fromTo(processLineRef.current,
            { scaleY: 0, transformOrigin: 'top' }, // Start: line is collapsed
            {
              scaleY: 1, // End: line is fully expanded
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: processContainerRef.current,
                start: 'top center',
                once: true
              }
            }
          );
        }

        // Animate individual process steps with staggered timing
        if (processStepsRef.current?.length) {
          processStepsRef.current.forEach((step, index) => {
            if (step) {
              gsap.fromTo(step,
                { y: 30, opacity: 0 }, // Start: moved down and invisible
                {
                  y: 0,
                  opacity: 1, // End: in position and visible
                  duration: 0.6,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: step,
                    start: 'top 80%',
                    once: true
                  },
                  delay: index * 0.1 // Stagger animation by 0.1s per step
                }
              );
            }
          });
        }

        // Process content opacity animation based on scroll position
        if (processContentRef.current) {
          ScrollTrigger.create({
            trigger: processContainerRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1, // Smooth scrubbing animation
            onUpdate: (self) => {
              gsap.to(processContentRef.current, {
                opacity: 1,
                filter: 'none',
                duration: 0.2,
                ease: 'none'
              });
            }
          });
        }
      }

      // Handle window resize to refresh ScrollTrigger calculations
      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', handleResize);

      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize);
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, [isMobile, isTablet]);

  /**
   * Handle 3D mouse movement for interactive 3D element
   * Creates a tilt effect based on mouse position relative to the element
   * @param {MouseEvent} e - Mouse move event
   */
  const handle3DMouseMove = (e) => {
    // Skip on mobile or if element doesn't exist
    if (!ex3dTiltRef.current || isMobile) return;
    
    // Get element's bounding rectangle
    const rect = ex3dTiltRef.current.getBoundingClientRect();
    // Calculate relative mouse position (-0.5 to 0.5)
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Apply 3D transform based on mouse position
    gsap.to(ex3dTiltRef.current, {
      x: relX * 24, // Horizontal translation
      y: relY * 24, // Vertical translation
      rotateY: relX * 10, // Y-axis rotation
      rotateX: -relY * 10, // X-axis rotation (inverted)
      transformPerspective: 700, // 3D perspective
      transformOrigin: 'center',
      ease: 'power2.out',
      duration: 0.25
    });
  };

  /**
   * Handle mouse leave event for 3D element
   * Resets the element to its original position
   */
  const handle3DMouseLeave = () => {
    if (!ex3dTiltRef.current) return;
    
    // Reset all transforms to original state
    gsap.to(ex3dTiltRef.current, {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      ease: 'power3.out',
      duration: 0.35
    });
  };

  /**
   * Handle WhatsApp contact button click
   * Opens WhatsApp with pre-filled message in new tab
   */
  const handleWhatsapp = () => {
    window.open(
      "https://wa.me/918890204938?text=Hey%2C%20I%20need%20help%20with%20a%20tech%20solution.%20Let's%20talk%21",
      "_blank"
    );
  };

  /**
   * Scroll event handler for WhatsApp button visibility
   * Shows/hides the floating WhatsApp button based on scroll position
   */
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowWhatsAppButton(true);
      } else {
        setShowWhatsAppButton(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    
    // Cleanup scroll listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /**
   * Process data for the case study
   * Defines the 5-step process: Discover, Define, Design, Develop, Deliver
   * Each step contains a title, description, and optional points array
   */
  const process = [
    {
      title: "Discover",
      description: `We spoke with Content Cubicle's team about their biggest bottlenecks in onboarding new clients.
Challenges were clear:
- Repetitive discovery calls draining senior time
- Inconsistent notes making admin handoffs difficult
- Delays in preparing creative briefs and campaign decks`,
    },
    {
      title: "Define",
      description: `The problem was mapped:
Agencies needed a consistent, time‑saving system to capture brand details and convert them into structured creative briefs without manual rewriting.`,
    },
    {
      title: "Design",
      description: `We designed a two‑part solution:`,
      points: [
        `Smart Intake Form – dynamic, context‑aware questions that adapt to client responses (e.g., ask about design inspiration only if visual branding is mentioned).`,
        `AI‑Powered Brief Generator – converts inputs into a clear, agency‑branded brief with sections for vision, audience, deliverables, tone, and goals.`,
      ],
    },
    {
      title: "Develop",
      description: `The platform was built with:
- Adaptive form logic for varied project types (content, social, ads, web)
- AI summarization tuned for marketing language
- Auto‑sync to internal tools (Google Docs / Notion)
- Export‑ready formats (PDF / Word) for pitches and client sharing`,
    },
    {
      title: "Deliver",
      description: `Results were immediate:
- Onboarding reduced from multiple calls to one streamlined session
- Creative briefs standardized, improving cross‑team collaboration
- Faster pitch preparation; more time on strategy, less on admin
- Clients praised the smooth intake experience and increased trust from day one`,
    },
  ];

  return (
    // Main container with dark theme and full viewport height
    <Box sx={{ 
      minHeight: "100vh", 
      background: "#000", // Black background
      color: "#fff", // White text
      fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
      WebkitFontSmoothing: 'antialiased', // Better font rendering on WebKit
      MozOsxFontSmoothing: 'grayscale', // Better font rendering on Firefox
      position: 'relative'
    }}>
      {/* Background gradient overlay for visual depth */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "88%",
          height: { xs: "6%", md: "8%" },
          background: `radial-gradient(ellipse at top, rgba(154, 106, 255, 0.6) 0%, rgba(0, 0, 0, 0) 60%)`,
          zIndex: 1,
          opacity: 1,
        }}
      />
      {/* Navigation bar with higher z-index */}
      <Box sx={{ position: "relative", zIndex: 3 }}>
        <NavBar />
      </Box>

      {/* Hero Section - Main title and project introduction */}
      <Container maxWidth="xl" sx={{ pt: { xs: 2, sm: 3, md: 6 }, px: { xs: 2, sm: 3 } }}>
        <Box 
          ref={heroRef} // Animation trigger reference
          sx={{
            height: { xs: 'auto', sm: 120, md: 160 },
            minHeight: { xs: 80, sm: 120, md: 160 },
            borderRadius: { xs: 2, md: 4 },
            overflow: 'hidden',
            background: 'transparent',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: { xs: 4, sm: 0 },
            // Remove hover effects on mobile for better performance
            ...(!isMobile && {
              '&:hover': {
                transform: 'scale(1.02)',
                transition: 'transform 0.3s ease'
              }
            })
          }}
        >
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1, sm: 1.5 },
          }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: { xs: 1, sm: 1.5 }
            }}>
              {/* Main project title with gradient text effect */}
              <Typography sx={{
                fontWeight: 700,
                fontSize: { xs: 32, sm: 40, md: 62 },
                textAlign: 'center',
                transition: 'all 0.3s ease',
                px: { xs: 2, sm: 0 },
                lineHeight: { xs: 1.2, sm: 1.1 }
              }}>
                Smart Intake &{' '}
                {/* Gradient text for "Brief Assistant" */}
                <Box component="span" sx={{
                  background: 'linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Brief Assistant
                </Box>
              </Typography>
             
            </Box>
          </Box>
        </Box>
      </Container>

      {/* About Product Section - Project story and key metrics */}
      <Container 
        maxWidth="xl" 
        sx={{ 
          py: { xs: 4, sm: 6, md: 8 },
          background: 'transparent',
          zIndex: 2,
          px: { xs: 2, sm: 3, md: 17 }
        }}
        ref={aboutContainerRef} // Animation trigger reference
      >
        <Box>
          {/* Section title with gradient underline and text effect */}
          <Typography sx={{
            fontWeight: 700,
            fontSize: { xs: 24, sm: 32, md: 40 }, 
            mb: { xs: 2, md: 3 },
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: 0,
              width: { xs: 20, sm: 30, md: 40 },
              height: 3,
              background: 'linear-gradient(90deg, #8E54F7, transparent)',
              borderRadius: 2
            }
          }}>
            About{' '}
            {/* Gradient text for "Product" */}
            <Box component="span" sx={{
              background: 'linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Product
            </Box>
          </Typography>
          
          {/* About details grid - Story and Key insights sections */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr' },
            gap: { xs: 3, md: 6 },
            mb: { xs: 4, md: 6 }
          }}>
            {/* Story Section - Project background and context */}
            <Box>
              {/* Story section title */}
              <Typography sx={{
                color: '#fff', 
            fontWeight: 600,
                fontSize: { xs: 15, sm: 16, md: 25 },
                mb: { xs: 1, md: 2 },
                // Remove hover effects on mobile for better performance
                ...(!isMobile && {
                  transition: 'color 0.3s ease',
                  '&:hover': { color: 'rgba(255,255,255,0.9)' }
                })
              }}>Story</Typography>
              {/* Main story text with italic styling */}
              <Typography sx={{ 
                fontSize: { xs: 14, sm: 16, md: 20 }, 
                color: 'rgba(255,255,255,0.85)', 
                fontStyle: 'italic', 
                mb: 1, 
                lineHeight: 1.5, 
                textAlign: 'justify',
                // Remove hover effects on mobile for better performance
                ...(!isMobile && {
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: 'rgba(255,255,255,0.95)',
                    transform: 'translateX(5px)'
                  }
                })
              }}>
                Every great campaign begins with a clear brief. But for creative agencies like Content Cubicle, getting there isn’t always simple. Early discovery calls, scattered client notes, and inconsistent intake formats meant hours spent just to capture the basics  brand goals, tone, audience, and deliverables.
              </Typography>
            {/* Additional story context */}
            <Typography sx={{
                fontSize: { xs: 13, sm: 13 }, 
                color: '#fff', 
                lineHeight: 1.6, 
                textAlign: 'justify',
                mb: 1,
                // Remove hover effects on mobile for better performance
                ...(!isMobile && {
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: 'rgba(255,255,255,0.9)',
                    transform: 'translateX(3px)'
                  }
                })
              }}>
                 At Excollo, we asked: why should creativity be slowed down by admin?
                 The Smart Intake & Brief Assistant was designed to solve this. It’s an intelligent system that takes client inputs brand name, target market, product info, colors, themes, and goals  and turns them into a structured, agency-ready brief in minutes.
            </Typography>
          </Box>

            {/* Key insights section - Metrics and statistics */}
            <Box sx={{ mt: { xs: 2, md: 2 } }}>
              {/* Key insights title */}
              <Typography sx={{
                color: '#fff', 
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: 15, sm: 16, md: 25 },
                // Remove hover effects on mobile for better performance
                ...(!isMobile && {
                  transition: 'color 0.3s ease',
                  '&:hover': { color: '#8E54F7' }
                })
              }}>Key insights</Typography>
              {/* Metrics grid - 4 columns on all screen sizes */}
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr 1fr 1fr 1fr', sm: '1fr 1fr 1fr 1fr', md: '1fr 1fr 1fr 1fr' },
                gap: { xs: 2, md: 3 }
              }}>
                {/* First metric: Time to Client Onboarding */}
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  // Remove hover effects on mobile for better performance
                  ...(!isMobile && {
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      '& .metric-icon': {
                        transform: 'rotate(360deg)',
                        color: '#8E54F7'
                      }
                    }
                  })
                }}>
                <Typography sx={{
                    color: '#fff', 
                    fontSize: { xs: 14, sm: 16 },
                    mb: 1
                  }}>Time to Client Onboarding</Typography>
                  {/* Metric value with animated counter and arrow icon */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1 } }}>
                    <ArrowDownwardIcon className="metric-icon" sx={{ 
                      color: '#8E54F7', 
                      fontSize: { xs: 16, sm: 18 },
                      transition: isMobile ? 'none' : 'all 0.5s ease'
                    }} />
                    <AnimatedCounter value="60" suffix="%" />
                  </Box>
                </Box>

                {/* Second metric: Brief Standardization */}
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  // Remove hover effects on mobile for better performance
                  ...(!isMobile && {
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      '& .metric-icon': {
                        transform: 'rotate(360deg)',
                        color: '#8E54F7'
                      }
                    }
                  })
                }}>
                <Typography sx={{
                    color: '#fff', 
                    fontSize: { xs: 14, sm: 16 },
                    mb: 1
                  }}>Brief Standardization</Typography>
                  {/* Metric value with animated counter (no arrow for 100%) */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1 } }}>
                    {/* <ArrowDownwardIcon className="metric-icon" sx={{ 
                      color: '#8E54F7', 
                      fontSize: { xs: 16, sm: 18 },
                      transition: isMobile ? 'none' : 'all 0.5s ease'
                    }} /> */}
                    <AnimatedCounter value="100" suffix="%" /> 
                  </Box>
                </Box>

                {/* Third metric: Pitch & Proposal Efficiency */}
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  // Remove hover effects on mobile for better performance
                  ...(!isMobile && {
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      '& .metric-icon': {
                        transform: 'rotate(-360deg)',
                        color: '#8E54F7'
                      }
                    }
                  })
                }}>
                  <Typography sx={{
                    color: '#fff', 
                    fontSize: { xs: 14, sm: 16 },
                    mb: 1
                  }}>Pitch & Proposal Efficiency</Typography>
                  {/* Metric value with animated counter and upward arrow */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1 } }}>
                    <ArrowUpwardIcon className="metric-icon" sx={{ 
                      color: '#8E54F7', 
                      fontSize: { xs: 16, sm: 18 },
                      transition: isMobile ? 'none' : 'all 0.5s ease'
                    }} />
                    <AnimatedCounter value="40" suffix="%" />
                </Box>
              </Box>

              {/* Fourth metric: Client Onboarding Satisfaction */}
              <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  // Remove hover effects on mobile for better performance
                  ...(!isMobile && {
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      '& .multiplier': {
                        transform: 'scale(1.2)',
                        color: '#8E54F7'
                      }
                    }
                  })
                }}>
                  <Typography sx={{ 
                    color: '#fff', 
                    fontSize: { xs: 14, sm: 16 },
                    mb: 1
                  }}>Client Onboarding Satisfaction</Typography>
                   {/* Metric value with animated counter and upward arrow */}
                   <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1 } }}>
                    <ArrowUpwardIcon className="metric-icon" sx={{ 
                      color: '#8E54F7', 
                      fontSize: { xs: 16, sm: 18 },
                      transition: isMobile ? 'none' : 'all 0.5s ease'
                    }} />
                    <AnimatedCounter value="30" suffix="%" />
                </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Process Section - 5-step development process */}
      <Container 
        maxWidth="xl" 
        sx={{ 
          pt: { xs: 2, md: 3 },
          pb: { xs: 5, md: 6 },
          minHeight: 'auto',
          px: { xs: 2, sm: 3, md: 17 },
          overflow: 'visible'
        }}
        ref={processContainerRef} // Animation trigger reference
      >
        <Box>
          {/* Process section title with gradient underline and text effect */}
          <Typography sx={{ 
            fontWeight: 800, 
            fontSize: { xs: 24, sm: 32, md: 40 }, 
            mt: { xs: 0, md: 1 },
            mb: { xs: 5, md: 7 },
            color: '#fff',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: 0,
              width: { xs: 20, sm: 30, md: 40 },
              height: 3,
              background: 'linear-gradient(90deg, #8E54F7, transparent)',
              borderRadius: 2
            }
          }}>
            The{' '}
            {/* Gradient text for "Process" */}
            <Box component="span" sx={{
              background: 'linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Process
            </Box>
            </Typography>
          
          {/* Process content container with animated timeline */}
          <Box 
            ref={processContentRef} // Animation trigger reference
            sx={{ 
              position: 'relative', 
              pl: 0, 
              pr: { xs: 2, md: 15 }, 
              pb: { xs: 6, md: 10 },
              overflow: 'visible'
            }}
          >
            {/* Animated vertical timeline line */}
            <Box ref={processLineRef} sx={{
              position: 'absolute', 
              left: { xs: '32px', sm: '40px', md: '56px' }, 
              top: 0, 
              bottom: 0,
              height: 'auto',
              width: { xs: 1.5, md: 2 }, 
              background: 'linear-gradient(180deg, rgba(142,84,247,0.8) 0%, rgba(255,255,255,0.15) 50%, rgba(142,84,247,0.3) 100%)',
              transformOrigin: 'top'
            }} />
            
            {/* Process steps grid container */}
            <Box sx={{ 
              display: 'grid', 
              rowGap: { xs: 4, sm: 4, md: 7 }
            }}>
              {/* Render each process step */}
              {process.map((item, idx) => (
                <Box key={idx} ref={(el) => setProcessStepRef(el, idx)} sx={{ 
                  position: 'relative', 
                  pl: { xs: 'calc(32px + 24px)', sm: 'calc(40px + 24px)', md: 'calc(56px + 24px)' }, 
                  // Remove hover effects on mobile for better performance
                  ...(!isMobile && {
                    transition: 'all 0.4s ease',
                    '&:hover': {
                      transform: 'translateX(10px)',
                      '& .process-dot': {
                        transform: 'scale(1.3)',
                        boxShadow: '0 0 0 8px rgba(142,84,247,0.4)'
                      }
                    }
                  })
                }}>
                  {/* Process step indicator dot */}
                  <Box className="process-dot" sx={{
                    position: 'absolute', 
                    left: { xs: 'calc(32px - 7px)', sm: 'calc(40px - 7px)', md: 'calc(56px - 8px)' }, 
                    top: { xs: '0.15em', md: '0.15em' },
                    width: { xs: 14, md: 16 }, 
                    height: { xs: 14, md: 16 }, 
                    borderRadius: '50%', 
                    background: 'radial-gradient(circle, #8E54F7 0%, #6A3BBA 100%)',
                    boxShadow: '0 0 0 4px rgba(142,84,247,0.25)',
                    transition: isMobile ? 'none' : 'all 0.3s ease'
                  }} />
                  {/* Process step title */}
                  <Typography sx={{
                    fontWeight: 700, 
                    fontSize: { xs: 15, sm: 16, md: 25 }, 
                    mb: 1, 
                    textAlign: 'left',
                    color: '#fff',
                    lineHeight: 1.05,
                    mt: { xs: -0.3, md: -0.25 },
                    display: 'inline-block',
                    // Remove hover effects on mobile for better performance
                    ...(!isMobile && {
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'linear-gradient(90deg, #8E54F7, transparent)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }
                    })
                  }}>
                    {item.title}
            </Typography>
                  {/* Process step description */}
                  <Typography sx={{ 
                    color: '#fff', 
                    fontSize: { xs: 14, sm: 16, md: 20 }, 
                    lineHeight: 1.6, 
                    textAlign: 'justify',
                    overflowWrap: 'anywhere',
                    wordBreak: 'break-word',
                    transition: isMobile ? 'none' : 'color 0.3s ease',
                    '&:hover': { color: '#fff' }
                  }}>
                    {item.description}
                  </Typography>

                  {/* Process step bullet points (if available) */}
                  {Array.isArray(item.points) && (
                    <Box component="ul" sx={{ mt: 1.5, pl: 2.5, color: '#fff' }}>
                      {item.points.map((p, i) => (
                        <Box component="li" key={i} sx={{
                          fontSize: { xs: 14, sm: 16, md: 20 },
                          lineHeight: 1.6,
                          mb: 0.5,
                        }}>
                          {p}
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              ))}
              {/* Bottom spacing for process section */}
              <Box sx={{ height: { xs: 4, md: 12 } }} />
            </Box>
          </Box>
          </Box>
        </Container>

      {/* 3D Interactive Section */}
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 17 } }}>
        <Box 
          ref={ex3dTiltRef} // 3D tilt animation reference
          onMouseMove={handle3DMouseMove} // Mouse move handler for 3D effect
          onMouseLeave={handle3DMouseLeave} // Mouse leave handler to reset position
          sx={{ 
            mt: { xs: 0, md: -20 }, // Negative margin for overlap effect
            mb: { xs: 0, md: 0 },
            position: 'relative',
            zIndex: 1,
            background: '#000',
            willChange: 'transform' // Optimize for transform animations
          }}
        >
          {/* 3D Excollo logo component */}
          <Excollo3DCaseStudy isStatic />
        </Box>
      </Container>
      
      {/* Footer component */}
      <Footer />
      
      {/* Floating WhatsApp contact button */}
      <Fade in={showWhatsAppButton}>
        <Button
          onClick={handleWhatsapp}
          variant="contained"
          color="primary"
          sx={{
            position: "fixed",
            height: 60,
            bottom: { xs: 200, md: 100 }, // Higher on mobile to avoid conflicts
            right: { xs: 24, md: 24 },
            zIndex: 1000, // Above all other content
            borderRadius: "50%", // Circular button
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

// Export the ContentCubicle component as default
export default ContentCubicle;