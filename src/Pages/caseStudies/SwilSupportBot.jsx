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

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef();

  useEffect(() => {
    // Fallback for older browsers/environments
    if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
      setIsIntersecting(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, {
      threshold: options.threshold ?? 0.45,
      rootMargin: options.rootMargin ?? '0px 0px -10% 0px',
      ...options
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, isIntersecting];
};

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2000, suffix = "" }) => {
  // Default to final value to avoid flashing 0 when observer doesn't trigger
  const [count, setCount] = useState(parseInt(value));
  const [ref, isVisible] = useIntersectionObserver();

  useEffect(() => {
    if (!isVisible) return;

    const end = parseInt(value);
    let current = 0;
    const stepMs = Math.max(10, Math.floor(duration / Math.max(end, 1)));

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

    return () => clearInterval(timer);
  }, [isVisible, value, duration]);

  return (
    <Typography
      ref={ref}
      sx={{
        color: '#8E54F7',
        fontWeight: 700,
        transition: 'all 0.3s ease'
      }}
    >
      {count}{suffix}
    </Typography>
  );
};

/**
 * SwilSupportBot Case Study Component
 * Displays a detailed case study for the Swil Support Bot project
 * Features scroll-triggered animations, metrics display, and interactive 3D elements
 * @returns {JSX.Element} Complete case study page with animations and content
 */
const SwilSupportBot = () => {
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

  useEffect(() => {
    // Clean up any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Only apply complex animations on desktop
    if (!isMobile) {
      // Hero animation
      if (heroRef?.current) {
        gsap.fromTo(
          heroRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top 80%',
              once: true
            }
          }
        );
      }

      // About section animation (removed pinning)
      if (aboutContainerRef.current) {
        // Animate about section entrance
        gsap.fromTo(
          aboutContainerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
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
        // Animate process line
        if (processLineRef.current) {
          gsap.fromTo(processLineRef.current,
            { scaleY: 0, transformOrigin: 'top' },
            {
              scaleY: 1,
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

        // Animate process steps
        if (processStepsRef.current?.length) {
          processStepsRef.current.forEach((step, index) => {
            if (step) {
              gsap.fromTo(step,
                { y: 30, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.6,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: step,
                    start: 'top 80%',
                    once: true
                  },
                  delay: index * 0.1
                }
              );
            }
          });
        }

        // Process content opacity animation based on scroll
        if (processContentRef.current) {
          ScrollTrigger.create({
            trigger: processContainerRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
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

      // Refresh ScrollTrigger on resize
      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, [isMobile, isTablet]);

  const handle3DMouseMove = (e) => {
    if (!ex3dTiltRef.current || isMobile) return;
    const rect = ex3dTiltRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
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
  };

  const handle3DMouseLeave = () => {
    if (!ex3dTiltRef.current) return;
    gsap.to(ex3dTiltRef.current, {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      ease: 'power3.out',
      duration: 0.35
    });
  };

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

  const process = [
    {
      title: "Discover",
      description: `We mapped SWIL’s support traffic over several weeks. The patterns were clear:
• hundreds of messages about basic issues (billing, setup, feature usage)
• leads lost because nobody saw interested messages quickly enough
• non-English / regional language support requests getting delayed

The goal became obvious: reduce friction and make support reliable, instant.`
    },
    {
      title: "Define",
      description: `SWIL needed a bot to:
• recognize and resolve FAQs instantly
• detect when someone is a potential buyer and log that lead automatically
• engage outside business hours without sounding robotic
• handle multiple languages and content types (text, screenshots etc.)

In short: make support feel always-on, human enough, and flawless.`
    },
    {
      title: "Design",
      description: `We designed the SWIL Support Bot flow to mimic a helpful human agent:
• Warm greeting (including regional language options)
• FAQ handling: e.g. billing, installation, how-to’s
• Lead detection: if a user asks about purchasing or modules, bot flags and pushes to Zoho CRM
• Seamless handover: if the issue is complex or AI is unsure, escalate to human agent—with context preserved`
    },
    {
      title: "Develop",
      description: `Implementation focused on reliability and ease of use:
• WhatsApp Cloud API integration ensures native, fast messaging
• CRM (Zoho) sync: leads logged automatically
• Conversation memory: users don’t repeat themselves
• Fallback prompts: if AI confidence is low, bot suggests agent support
• Modular framework so new FAQs, languages, or product changes can be added easily`
    },
    {
      title: "Deliver (Impact & Results)",
      description: `The difference was striking:
• 60% of incoming queries resolved instantly by the bot, cutting agent load double-digit amounts
• Average response time dropped to under 15 seconds, even during off-hours
• 100% of sales leads were captured—no more “I asked, but nobody followed up” complaints
• Support became round-the-clock and multilingual, improving satisfaction and brand trust`
    }
  ];

  return (
    <Box sx={{
      minHeight: "100vh",
      background: "#000",
      color: "#fff",
      fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      position: 'relative'
    }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "88%",
          height: { xs: "12%", md: "8%" },
          background: `radial-gradient(ellipse at top, rgba(154, 106, 255, 0.6) 0%, rgba(0, 0, 0, 0) 60%)`,
          zIndex: 1,
          opacity: 1,
        }}
      />
      <Box sx={{ position: "relative", zIndex: 3 }}>
        <NavBar />
      </Box>

      {/* Hero Section */}
      <Container maxWidth="xl" sx={{ pt: { xs: 2, sm: 3, md: 6 }, px: { xs: 2, sm: 3 } }}>
        <Box
          ref={heroRef}
          sx={{
            height: { xs: 'auto', sm: 120, md: 160 },
            minHeight: { xs: 80, sm: 120, md: 160 },
            borderRadius: { xs: 2, md: 4 },
            overflow: 'hidden',
            background: '#000',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: { xs: 4, sm: 0 },
            // Remove hover effects on mobile
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
            <Typography sx={{
              fontWeight: 700,
              fontSize: { xs: 32, sm: 40, md: 62 },
              textAlign: 'center',
              transition: 'all 0.3s ease',
              px: { xs: 2, sm: 0 },
              lineHeight: { xs: 1.2, sm: 1.1 }
            }}>
              SWIL{' '}
              <Box component="span" sx={{
                background: 'linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Support Bot
              </Box>
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* About Product Section */}
      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 4, sm: 6, md: 8 },
          background: '#000',
          zIndex: 2,
          px: { xs: 2, sm: 3, md: 17 }
        }}
        ref={aboutContainerRef}
      >
        <Box>
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
            <Box component="span" sx={{
              background: 'linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Product
            </Box>
          </Typography>

          {/* About details grid (Story followed by Key insights in a separate row) */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr' },
            gap: { xs: 3, md: 6 },
            mb: { xs: 4, md: 6 }
          }}>
            {/* Story Section */}
            <Box>
              <Typography sx={{
                color: '#fff',
                fontWeight: 600,
                fontSize: { xs: 15, sm: 16, md: 25 },
                mb: { xs: 1, md: 2 },
                // Remove hover effects on mobile
                ...(!isMobile && {
                  transition: 'color 0.3s ease',
                  '&:hover': { color: 'rgba(255,255,255,0.9)' }
                })
              }}>Story</Typography>
              <Typography sx={{
                fontSize: { xs: 14, sm: 16, md: 20 },
                color: 'rgba(255,255,255,0.85)',
                fontStyle: 'italic',
                mb: 1,
                lineHeight: 1.5,
                textAlign: 'justify',
                // Remove hover effects on mobile
                ...(!isMobile && {
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: 'rgba(255,255,255,0.95)',
                    transform: 'translateX(5px)'
                  }
                })
              }}>
                "SWIL serves businesses with ERP solutions in retail, pharma, distribution, and more. Over time, their WhatsApp support channel became overloaded: the same billing, installation, usage questions bounced around, leads got ignored, and responses lagged, especially after hours. "
              </Typography>
              <Typography sx={{
                fontSize: { xs: 13, sm: 13 },
                color: '#fff',
                lineHeight: 1.6,
                textAlign: 'justify',
                mb: 1,
                // Remove hover effects on mobile
                ...(!isMobile && {
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: 'rgba(255,255,255,0.9)',
                    transform: 'translateX(3px)'
                  }
                })
              }}>
                Customers were frustrated: “I sent this last night… is someone going to reply?” Meanwhile, SWIL's team was buried under repetitive queries, missing chances to make sales, and stretched thin.
              </Typography>
              <Typography sx={{
                fontSize: { xs: 13, sm: 13 },
                color: '#fff',
                lineHeight: 1.6,
                textAlign: 'justify',
                // Remove hover effects on mobile
                ...(!isMobile && {
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: 'rgba(255,255,255,0.9)',
                    transform: 'translateX(3px)'
                  }
                })
              }}>
                So, SWIL decided: if WhatsApp is where customers live — let’s make it work smarter. Enter the SWIL Support Bot. It wasn’t about replacing humans — but about giving them breathing space, while making sure:
                - routine questions got answered instantly,
                - every sales lead was captured,
                - and support was consistent, no matter the hour or language.



              </Typography>
            </Box>

            {/* Key insights section */}
            <Box sx={{ mt: { xs: 2, md: 2 } }}>
              <Typography sx={{
                color: '#fff',
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: 15, sm: 16, md: 25 },
                // Remove hover effects on mobile
                ...(!isMobile && {
                  transition: 'color 0.3s ease',
                  '&:hover': { color: '#8E54F7' }
                })
              }}>Key insights</Typography>
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr 1fr 1fr 1fr', sm: '1fr 1fr 1fr 1fr', md: '1fr 1fr 1fr 1fr' },
                gap: { xs: 2, md: 3 }
              }}>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  // Remove hover effects on mobile
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
                  }}>Query Automation Rate</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1 } }}>
                    <ArrowUpwardIcon className="metric-icon" sx={{
                      color: '#8E54F7',
                      fontSize: { xs: 16, sm: 18 },
                      transition: isMobile ? 'none' : 'all 0.5s ease'
                    }} />
                    <AnimatedCounter value="60" suffix="%" />
                  </Box>
                </Box>

                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  // Remove hover effects on mobile
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
                  }}>Average Response Time</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1 } }}>
                    <ArrowUpwardIcon className="metric-icon" sx={{
                      color: '#8E54F7',
                      fontSize: { xs: 16, sm: 18 },
                      transition: isMobile ? 'none' : 'all 0.5s ease'
                    }} />
                    <AnimatedCounter value="15" suffix="Seconds" />
                  </Box>
                </Box>

                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  // Remove hover effects on mobile
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
                  }}>Lead Capture Rate</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1 } }}>
                    <ArrowUpwardIcon className="metric-icon" sx={{
                      color: '#8E54F7',
                      fontSize: { xs: 16, sm: 18 },
                      transition: isMobile ? 'none' : 'all 0.5s ease'
                    }} />
                    <AnimatedCounter value="100" suffix="%" />
                  </Box>
                </Box>

                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  // Remove hover effects on mobile
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
                  }}>   Multi-Lingual Support</Typography>
                  <Typography className="multiplier" sx={{
                    color: '#8E54F7',
                    fontWeight: 700,
                    fontSize: { xs: 14, sm: 16 },
                    transition: isMobile ? 'none' : 'all 0.3s ease'
                  }}>24×7</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Process Section */}
      <Container
        maxWidth="xl"
        sx={{
          pt: { xs: 2, md: 3 },
          pb: { xs: 4, md: 6 },
          minHeight: { xs: 'auto', md: '100vh' },
          px: { xs: 2, sm: 3, md: 17 }
        }}
        ref={processContainerRef}
      >
        <Box>
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
            <Box component="span" sx={{
              background: 'linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Process
            </Box>
          </Typography>

          <Box
            ref={processContentRef}
            sx={{
              position: 'relative',
              pl: 0,
              pr: { xs: 2, md: 15 },
              pb: { xs: 4, md: 10 },
              '--line-left': { xs: '32px', sm: '40px', md: '56px' }
            }}
          >
            <Box ref={processLineRef} sx={{
              position: 'absolute',
              left: 'var(--line-left)',
              top: 8,
              bottom: 'auto',
              height: { xs: 'calc(100% - 200px)', md: 'calc(100% - 340px)' },
              width: { xs: 1.5, md: 2 },
              background: 'linear-gradient(180deg, rgba(142,84,247,0.8) 0%, rgba(255,255,255,0.15) 50%, rgba(142,84,247,0.3) 100%)',
              transformOrigin: 'top'
            }} />

            <Box sx={{
              display: 'grid',
              rowGap: { xs: 3, sm: 4, md: 7 }
            }}>
              {process.map((item, idx) => (
                <Box key={idx} ref={(el) => setProcessStepRef(el, idx)} sx={{
                  position: 'relative',
                  pl: { xs: 'calc(var(--line-left) + 24px)', md: 'calc(var(--line-left) + 24px)' },
                  // Remove hover effects on mobile
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
                  <Box className="process-dot" sx={{
                    position: 'absolute',
                    left: { xs: 'calc(var(--line-left) - 7px)', md: 'calc(var(--line-left) - 8px)' },
                    top: { xs: '0.15em', md: '0.15em' },
                    width: { xs: 14, md: 16 },
                    height: { xs: 14, md: 16 },
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #8E54F7 0%, #6A3BBA 100%)',
                    boxShadow: '0 0 0 4px rgba(142,84,247,0.25)',
                    transition: isMobile ? 'none' : 'all 0.3s ease'
                  }} />
                  <Typography sx={{
                    fontWeight: 700,
                    fontSize: { xs: 15, sm: 16, md: 25 },
                    mb: 1,
                    textAlign: 'left',
                    color: '#fff',
                    lineHeight: 1.05,
                    mt: { xs: -0.3, md: -0.25 },
                    display: 'inline-block',
                    // Remove hover effects on mobile
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
                  <Typography sx={{
                    color: '#fff',
                    fontSize: { xs: 14, sm: 16, md: 20 },
                    lineHeight: 1.6,
                    whiteSpace: 'pre-line',
                    textAlign: 'justify',
                    transition: isMobile ? 'none' : 'color 0.3s ease',
                    '&:hover': { color: '#fff' }
                  }}>
                    {item.description}
                  </Typography>
                </Box>
              ))}
              <Box sx={{ height: { xs: 4, md: 12 } }} />
            </Box>
          </Box>
        </Box>
      </Container>

      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 17 } }}>
        <Box
          ref={ex3dTiltRef}
          onMouseMove={handle3DMouseMove}
          onMouseLeave={handle3DMouseLeave}
          sx={{
            mt: { xs: -60, md: -20 },
            mb: { xs: 0, md: 3 },
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

// Export the SwilSupportBot component as default
export default SwilSupportBot;