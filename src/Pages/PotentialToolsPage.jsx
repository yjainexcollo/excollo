// Import React hooks for state management and side effects
import React, { useEffect, useMemo, useRef, useCallback, useState } from "react";
// Import React Router for navigation
import { useNavigate } from "react-router-dom";
// Import GSAP for animations
import { gsap } from "gsap";
// Import custom components
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Excollo3DCaseStudy from "../Components/AboutUs/Excollo3DCaseStudy";
// Import Material-UI components for UI layout and styling
import { Container, Typography, Box, Card, CardContent, Button, Fade, IconButton } from "@mui/material";
// Import Material-UI icons
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// Import WhatsApp icon for contact button
import { IoLogoWhatsapp } from "react-icons/io5";

/**
 * PotentialToolsPage Component
 * Page displaying potential AI tools and solutions
 * Features interactive carousel, tool cards, and animations
 * @returns {JSX.Element} Complete tools showcase page
 */
const PotentialToolsPage = () => {
  // React Router navigation hook
  const navigate = useNavigate();
  // Memoized AI tools data array
  const aiTools = useMemo(
    () => [
      {
        id: 1,
        icon: "🏨",
        title: "Hotel Concierge AI",
        description: "A virtual extension of the front desk, built to deliver personalized hospitality at scale. Guests can book dining, request services, plan activities, or explore local attractions in seconds. From spa bookings to room service and travel planning, the concierge responds instantly with curated options and real-time support.",
        IdealFor: "Hotels, resorts, luxury hospitality chains, and boutique stays",
        buttonText: "Contact Us"
      },
      {
        id: 2,
        icon: "🛍️",
        title: "Retail AI Suite",
        description:"An all-in-one toolkit that helps retailers boost visibility, streamline operations, and enhance shopping experiences. By connecting catalogs, sales data, and support logs, it powers SEO, instant support, and smart product search. With built-in tools like an SEO Optimizer, Support Bot, Semantic Search, and Analytics Dashboard, retail teams can refine strategy, personalize recommendations, and drive measurable growth.",
        IdealFor: "E-commerce brands, retail chains, marketplaces, D2C businesses",
        buttonText: "Contact Us"
      },
      {
        id: 3,
        icon: "🔍",
        title: "Brand Discovery AI",
        description:"Turns raw brand details into actionable strategy. By filling out a simple form or chat with essentials like name, audience, and goals, teams instantly receive a structured report with insights on messaging, positioning, and growth opportunities. From competitor analysis to creative briefs, it streamlines discovery and sets a strong foundation for campaigns.",
        IdealFor: "Agencies, marketing firms, startups, brand strategy teams",
        buttonText: "Contact Us"
      },
      {
        id: 4,
        icon: "🛡️",
        title: "Insurance Bot",
        description:
        "Delivers instant, reliable help for policyholders while easing call center load. Customers can ask about claims, renewals, or policy details and get secure, step-by-step answers in seconds. With support for claims management, onboarding, reminders, and multilingual queries, service becomes faster, simpler, and more accessible.",
        IdealFor: "Insurance providers, policy aggregators, financial service firms",
        buttonText: "Contact Us"
      },
      {
        id: 5,
        icon: "📊",
        title: "FinNewsDashboard",
        description:"Aggregates and summarizes financial news with actionable insights, helping you stay informed about market trends and investment opportunities.",
        IdealFor: "Insurance providers, policy aggregators, financial service firms",
        buttonText: "Contact Us"
      },
      {
        id: 6,
        icon: "👤",
        title: "AI Persona",
        description: "Brings role-based intelligence to enterprises by simulating specialists like HR assistants, sales heads, or analysts. Users can interact with personas for tailored insights, summaries, and recommendations. From training and HR to sales strategy and market analysis, it scales expertise across teams with ease.",
        IdealFor: "Enterprises, corporate teams, consultancies, training organizations",
        buttonText: "Contact Us"
      },
      {
        id: 7,
        icon: "🔒",
        title: "Compliance Checker",
        description:"Helps organizations ensure documents, policies, and communications meet compliance standards without manual effort. By analyzing contracts or reports, it flags missing disclaimers, risky language, and inconsistencies against regulatory frameworks — reducing risk and saving hours of review.",        
        IdealFor: "Financial institutions, insurers, healthcare, legal teams, enterprises",
        buttonText: "Contact Us"
      },
      {
        id: 8,
        icon: "📄",
        title: "Cross Document Comparison",
        description:"Simplifies tracking changes across multiple versions of critical documents. Upload drafts and the tool automatically highlights edits, additions, and inconsistencies — from numbers in statements to clauses in contracts — ensuring no change is missed.",
        IdealFor: "Law firms, financial analysts, regulators, auditors, insurers, compliance teams",
        buttonText: "Contact Us"
      },
    ],
    []
  );

  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const currentIndexRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoAdvanceRef = useRef(null);
  const isUserControlledRef = useRef(false);
  const ex3dTiltRef = useRef(null);
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(false);
  const wheelThrottleRef = useRef(false);
  
  // Touch/Swipe handling refs
  const touchStartRef = useRef({ x: 0, y: 0 });
  const touchEndRef = useRef({ x: 0, y: 0 });
  const isSwiping = useRef(false);

  const getCardPosition = (cardIndex, currentIndex, totalCards) => {
    const diff = (cardIndex - currentIndex + totalCards) % totalCards;
    if (diff === 0) return 'center';
    if (diff === 1 || diff === totalCards - 1) {
      return diff === 1 ? 'next' : 'prev';
    }
    return 'hidden';
  };

  const updateCardsPosition = useCallback((currentIndex, immediate = false) => {
    const cards = cardsRef.current.filter(Boolean);
    const duration = immediate ? 0 : 0.8;
    
    cards.forEach((card, index) => {
      const position = getCardPosition(index, currentIndex, cards.length);
      
      // Calculate the shortest path for smooth wrapping
      let diff = index - currentIndex;
      if (diff > cards.length / 2) {
        diff -= cards.length;
      } else if (diff < -cards.length / 2) {
        diff += cards.length;
      }
      
      switch (position) {
        case 'prev':
          gsap.to(card, {
            x: '-80%',
            scale: 0.75,
            opacity: 0.3,
            zIndex: 1,
            duration: duration,
            ease: "power3.out"
          });
          break;
        case 'center':
          gsap.to(card, {
            x: '0%',
            scale: 1,
            opacity: 1,
            zIndex: 10,
            duration: duration,
            ease: "power3.out"
          });
          break;
        case 'next':
          gsap.to(card, {
            x: '80%',
            scale: 0.75,
            opacity: 0.3,
            zIndex: 1,
            duration: duration,
            ease: "power3.out"
          });
          break;
        case 'hidden':
          // Improved hidden card positioning for smoother transitions
          let hiddenX;
          if (diff > 1) {
            // Cards that are far to the right
            hiddenX = `${100 + (diff - 1) * 30}%`;
          } else if (diff < -1) {
            // Cards that are far to the left  
            hiddenX = `${-100 + (diff + 1) * 30}%`;
          } else {
            hiddenX = diff > 0 ? '120%' : '-120%';
          }
          
          gsap.to(card, {
            x: hiddenX,
            scale: 0.6,
            opacity: 0,
            zIndex: 0,
            duration: duration,
            ease: "power3.out"
          });
          break;
      }
    });
  }, []);

  const startAutoAdvance = useCallback(() => {
    if (autoAdvanceRef.current) {
      clearInterval(autoAdvanceRef.current);
    }
    
    autoAdvanceRef.current = setInterval(() => {
      if (!isUserControlledRef.current) {
        const cards = cardsRef.current.filter(Boolean);
        const nextIndex = (currentIndexRef.current + 1) % cards.length;
        currentIndexRef.current = nextIndex;
        setCurrentIndex(nextIndex);
        updateCardsPosition(nextIndex);
      }
    }, 4000);
  }, [updateCardsPosition]);

  const stopAutoAdvance = useCallback(() => {
    if (autoAdvanceRef.current) {
      clearInterval(autoAdvanceRef.current);
      autoAdvanceRef.current = null;
    }
  }, []);

  const goToNext = useCallback(() => {
    const cards = cardsRef.current.filter(Boolean);
    const nextIndex = (currentIndexRef.current + 1) % cards.length;
    currentIndexRef.current = nextIndex;
    setCurrentIndex(nextIndex);
    updateCardsPosition(nextIndex);
  }, [updateCardsPosition]);

  const goToPrev = useCallback(() => {
    const cards = cardsRef.current.filter(Boolean);
    const prevIndex = (currentIndexRef.current - 1 + cards.length) % cards.length;
    currentIndexRef.current = prevIndex;
    setCurrentIndex(prevIndex);
    updateCardsPosition(prevIndex);
  }, [updateCardsPosition]);

  // Touch event handlers
  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY
    };
    isSwiping.current = false;
    
    // Stop auto-advance when user starts interacting
    isUserControlledRef.current = true;
    stopAutoAdvance();
  }, [stopAutoAdvance]);

  const handleTouchMove = useCallback((e) => {
    if (!touchStartRef.current.x) return;
    
    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);
    const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);
    
    // If horizontal movement is greater than vertical, it's a swipe
    if (deltaX > deltaY && deltaX > 10) {
      isSwiping.current = true;
      e.preventDefault(); // Prevent scrolling
    }
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (!isSwiping.current || !touchStartRef.current.x) return;
    
    const touch = e.changedTouches[0];
    touchEndRef.current = {
      x: touch.clientX,
      y: touch.clientY
    };

    const deltaX = touchStartRef.current.x - touchEndRef.current.x;
    const deltaY = Math.abs(touchStartRef.current.y - touchEndRef.current.y);
    
    // Minimum swipe distance and ensure it's more horizontal than vertical
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > deltaY) {
      if (deltaX > 0) {
        // Swiped left - go to next
        goToNext();
      } else {
        // Swiped right - go to previous
        goToPrev();
      }
    }

    // Reset touch coordinates
    touchStartRef.current = { x: 0, y: 0 };
    touchEndRef.current = { x: 0, y: 0 };
    isSwiping.current = false;
    
    // Resume auto-advance after a delay
    setTimeout(() => {
      isUserControlledRef.current = false;
      startAutoAdvance();
    }, 3000);
  }, [goToNext, goToPrev, startAutoAdvance]);

  // Mouse event handlers for desktop
  const handleMouseDown = useCallback((e) => {
    touchStartRef.current = {
      x: e.clientX,
      y: e.clientY
    };
    isSwiping.current = false;
    
    isUserControlledRef.current = true;
    stopAutoAdvance();
  }, [stopAutoAdvance]);

  const handleMouseMove = useCallback((e) => {
    if (!touchStartRef.current.x) return;
    
    const deltaX = Math.abs(e.clientX - touchStartRef.current.x);
    const deltaY = Math.abs(e.clientY - touchStartRef.current.y);
    
    if (deltaX > deltaY && deltaX > 10) {
      isSwiping.current = true;
    }
  }, []);

  const handleMouseUp = useCallback((e) => {
    if (!isSwiping.current || !touchStartRef.current.x) return;
    
    touchEndRef.current = {
      x: e.clientX,
      y: e.clientY
    };

    const deltaX = touchStartRef.current.x - touchEndRef.current.x;
    const deltaY = Math.abs(touchStartRef.current.y - touchEndRef.current.y);
    
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > deltaY) {
      if (deltaX > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

    touchStartRef.current = { x: 0, y: 0 };
    touchEndRef.current = { x: 0, y: 0 };
    isSwiping.current = false;
    
    setTimeout(() => {
      isUserControlledRef.current = false;
      startAutoAdvance();
    }, 3000);
  }, [goToNext, goToPrev, startAutoAdvance]);

  // Wheel/Trackpad horizontal scroll navigation
  const handleWheel = useCallback((e) => {
    if (wheelThrottleRef.current) return;
    const absDeltaX = Math.abs(e.deltaX);
    const absDeltaY = Math.abs(e.deltaY);
    if (absDeltaX > absDeltaY && absDeltaX > 15) {
      e.preventDefault();
      isUserControlledRef.current = true;
      stopAutoAdvance();
      if (e.deltaX > 0) {
        goToNext();
      } else {
        goToPrev();
      }
      wheelThrottleRef.current = true;
      setTimeout(() => { wheelThrottleRef.current = false; isUserControlledRef.current = false; startAutoAdvance(); }, 600);
    }
  }, [goToNext, goToPrev, startAutoAdvance, stopAutoAdvance]);

  // Keyboard navigation on focused container
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      isUserControlledRef.current = true;
      stopAutoAdvance();
      if (e.key === 'ArrowRight') {
        goToNext();
      } else {
        goToPrev();
      }
      setTimeout(() => { isUserControlledRef.current = false; startAutoAdvance(); }, 800);
    }
  }, [goToNext, goToPrev, startAutoAdvance, stopAutoAdvance]);

  // 3D mouse interaction handlers
  const handle3DMouseMove = useCallback((e) => {
    if (!ex3dTiltRef.current) return;
    const rect = ex3dTiltRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(ex3dTiltRef.current, {
      x: relX * 24,
      y: relY * 24,
      rotateY: relX * 10,
      rotateX: -relY * 10,
      transformPerspective: 700,
      transformOrigin: 'center',
      ease: 'power2.out',
      duration: 0.25
    });
  }, []);

  const handle3DMouseLeave = useCallback(() => {
    if (!ex3dTiltRef.current) return;
    gsap.to(ex3dTiltRef.current, {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      ease: 'power3.out',
      duration: 0.35
    });
  }, []);

  const handleWhatsapp = () => {
    window.open(
      "https://wa.me/918890204938?text=Hey%2C%20I%20need%20help%20with%20a%20tech%20solution.%20Let's%20talk%21",
      "_blank"
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowWhatsAppButton(true);
      } else {
        setShowWhatsAppButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    // Set initial positions with immediate flag
    updateCardsPosition(0, true);
    setCurrentIndex(0);

    // Start automatic carousel
    startAutoAdvance();

    // Add event listeners to container
    const container = containerRef.current;
    if (container) {
      // Touch events
      container.addEventListener('touchstart', handleTouchStart, { passive: false });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd, { passive: false });
      
      // Mouse events for desktop
      container.addEventListener('mousedown', handleMouseDown);
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseup', handleMouseUp);
      container.addEventListener('mouseleave', handleMouseUp); // Handle mouse leave as mouse up
      // Wheel/trackpad horizontal scroll
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      stopAutoAdvance();
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
        container.removeEventListener('mousedown', handleMouseDown);
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseup', handleMouseUp);
        container.removeEventListener('mouseleave', handleMouseUp);
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [aiTools.length, handleTouchStart, handleTouchMove, handleTouchEnd, 
      handleMouseDown, handleMouseMove, handleMouseUp, handleWheel, startAutoAdvance, stopAutoAdvance, updateCardsPosition]);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#000", color: "#fff", position: 'relative' }}>
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
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <NavBar />
      </Box>

      <Container
        maxWidth="xl"
        sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 8, md: 12 } }}
      >
        {/* Hero section */}
        <Box
          sx={{
            textAlign: "center",
            maxWidth: 900,
            mx: "auto",
            mb: { xs: 6, md: 8 },
          }}
        >
          <Typography
            component="h2"
            sx={{
              lineHeight: 1.1,
              fontFamily:
                "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
              fontWeight: 600,
              fontSize: {
                xs: "clamp(1.75rem, calc(1.25rem + 2vw), 9rem)",
                md: "clamp(1.75rem, calc(1.25rem + 2.5vw), 9rem)",
                lg: "clamp(1.75rem, calc(1.37rem + 3vw), 8rem)",
                xl: "clamp(2.25rem, calc(2rem + 3vw), 10rem)",
              },
            }}
          >
            Potential AI{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(90deg, #2579E3 0%, #8E54F7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Tools
            </Box>
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.7)",
              fontSize: { xs: 16, sm: 18, md: 20 },
              fontWeight: 400,
              fontFamily:
                "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
              mb: 2,
            }}
          >
            Discover powerful AI tools for creativity, productivity, and
            innovation. Swipe to navigate or let it auto-cycle.
          </Typography>
        </Box>

        {/* Swipe-Enabled Three-Card Carousel Container */}
        <Box
          ref={containerRef}
          sx={{
            position: "relative",
            height: { xs: 380, sm: 420, md: 450, lg: 480 },
            maxWidth: "100%",
            mx: "auto",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "grab",
            userSelect: "none",
            touchAction: "pan-y", // Allow vertical scrolling but handle horizontal
            "&:active": {
              cursor: "grabbing",
            },
            outline: 'none'
          }}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          {/* Left Arrow */}
          <IconButton
            aria-label="Previous"
            onClick={() => { isUserControlledRef.current = true; stopAutoAdvance(); goToPrev(); setTimeout(() => { isUserControlledRef.current = false; startAutoAdvance(); }, 1500); }}
            sx={{
              position: "absolute",
              left: { xs: 6, sm: 10 },
              zIndex: 20,
              color: "#fff",
              background: "rgba(0,0,0,0.35)",
              border: "1px solid #7e22ce",
              "&:hover": { background: "rgba(126,34,206,0.25)" }
            }}
            size="large"
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          {/* Right Arrow */}
          <IconButton
            aria-label="Next"
            onClick={() => { isUserControlledRef.current = true; stopAutoAdvance(); goToNext(); setTimeout(() => { isUserControlledRef.current = false; startAutoAdvance(); }, 1500); }}
            sx={{
              position: "absolute",
              right: { xs: 6, sm: 10 },
              zIndex: 20,
              color: "#fff",
              background: "rgba(0,0,0,0.35)",
              border: "1px solid #7e22ce",
              "&:hover": { background: "rgba(126,34,206,0.25)" }
            }}
            size="large"
          >
            <ArrowForwardIosIcon />
          </IconButton>

          {aiTools.map((tool, index) => (
            <Card
              key={tool.id}
              ref={(el) => (cardsRef.current[index] = el)}
              elevation={0}
              sx={{
                position: "absolute",
                width: { xs: "75vw", sm: "60vw", md: "45vw", lg: "35vw", xl: "30vw" },
                maxWidth: 450,
                height: { xs: 320, sm: 360, md: 380, lg: 400 },
                borderRadius: 3,
                background: "linear-gradient(135deg, #0f1419 0%, #1a1d29 50%, #252841 100%)",
                border: "1px solid #7e22ce",
                boxShadow: "0 20px 60px rgba(133, 86, 245, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                transition: "all 0.3s ease",
                transformOrigin: "center center",
                "&:hover": {
                  transform: "translateY(-5px) scale(1.02)",
                  boxShadow: "0 25px 70px rgba(133, 86, 245, 0.25)",
                },
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: { xs: 1.5, sm: 2, md: 2.5 },
                  px: { xs: 2.5, sm: 3, md: 4 },
                  py: { xs: 2.5, sm: 3, md: 4 },
                  width: "100%",
                  height: "100%",
                }}
              >
                {/* Icon */}
                <Box
                  sx={{
                    width: { xs: 45, sm: 55, md: 65 },
                    height: { xs: 45, sm: 55, md: 65 },
                    background: "linear-gradient(135deg, #2a2d3e 0%, #3a3d5e 100%)",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(255,255,255,0.1)",
                    fontSize: { xs: 20, sm: 24, md: 28 },
                    boxShadow: "0 6px 24px rgba(0,0,0,0.3)",
                  }}
                >
                  {tool.icon}
                </Box>

                {/* Title */}
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.4rem" },
                    fontFamily: "Inter, sans-serif",
                    textAlign: "center",
                    lineHeight: 1.2,
                  }}
                >
                  {tool.title}
                </Typography>

                {/* Description */}
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: { xs: 11, sm: 12, md: 13 },
                    lineHeight: 1.4,
                    fontFamily: "Inter, sans-serif",
                    textAlign: "center",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {tool.description}
                </Typography>

                {tool.IdealFor && (
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      fontSize: { xs: 10.5, sm: 11.5, md: 12 },
                      lineHeight: 1.3,
                      fontFamily: "Inter, sans-serif",
                      textAlign: "center",
                    }}
                  >
                    <Box component="span" sx={{ color: "rgba(255,255,255,0.55)" }}>Ideal for: </Box>
                    <Box component="span" sx={{ color: "#a78bfa", fontWeight: 500 }}>{tool.IdealFor}</Box>
                  </Typography>
                )}

                {/* CTA Text */}
                <Typography
                  sx={{
                    color: "#8E54F7",
                    fontSize: { xs: 10, sm: 11, md: 12 },
                    fontWeight: 500,
                    fontStyle: "italic",
                    fontFamily: "Inter, sans-serif",
                    textAlign: "center",
                  }}
                >
                  {tool.cta}
                </Typography>

                {/* Button */}
                <Button
                  variant="contained"
                  sx={{
                    background: "linear-gradient(135deg, #2579E3 0%, #8E54F7 100%)",
                    borderRadius: "20px",
                    px: { xs: 2.5, md: 3 },
                    py: { xs: 0.8, md: 1 },
                    fontSize: { xs: 11, sm: 12, md: 13 },
                    fontWeight: 600,
                    textTransform: "none",
                    fontFamily: "Inter, sans-serif",
                    boxShadow: "0 6px 20px rgba(133, 86, 245, 0.4)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #1e6bcc 0%, #7a48e0 100%)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 10px 30px rgba(133, 86, 245, 0.6)",
                    },
                  }}
                  onClick={() => navigate('/contact')}
                >
                  {tool.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Pagination Dots */}
        <Box sx={{
          mt: { xs: 2.5, md: 3 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1.2
        }}>
          {aiTools.map((_, i) => (
            <Box
              key={i}
              onClick={() => {
                const cards = cardsRef.current.filter(Boolean);
                if (!cards.length) return;
                isUserControlledRef.current = true;
                stopAutoAdvance();
                currentIndexRef.current = i;
                setCurrentIndex(i);
                updateCardsPosition(i);
                setTimeout(() => { isUserControlledRef.current = false; startAutoAdvance(); }, 1500);
              }}
              sx={{
                width: { xs: 8, sm: 9, md: 10 },
                height: { xs: 8, sm: 9, md: 10 },
                borderRadius: '50%',
                background: i === currentIndex
                  ? 'linear-gradient(135deg, #2579E3 0%, #8E54F7 100%)'
                  : 'rgba(255,255,255,0.25)',
                boxShadow: i === currentIndex ? '0 0 10px rgba(142,84,247,0.6)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                  background: i === currentIndex ? 'linear-gradient(135deg, #2579E3 0%, #8E54F7 100%)' : 'rgba(255,255,255,0.45)'
                }
              }}
            />
          ))}
        </Box>
      </Container>

      {/* Excollo3D Component */}
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 17 } }}>
        <Box 
          ref={ex3dTiltRef}
          onMouseMove={handle3DMouseMove}
          onMouseLeave={handle3DMouseLeave}
          sx={{ 
            mt: { xs: -2, md: 2 },
            mb: { xs: 0, md: 0 },
            position: 'relative',
            zIndex: 4,
            background: '#000',
            willChange: 'transform'
          }}
        >
          <Excollo3DCaseStudy isStatic />
        </Box>
      </Container>

      <Footer />
      
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

// Export the PotentialToolsPage component as default
export default PotentialToolsPage;