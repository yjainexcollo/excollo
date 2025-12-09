// Import React hooks for state management and side effects
import React, { useRef, useCallback, useState, useEffect } from "react";
// Import React Router for navigation
import { useNavigate } from "react-router-dom";
// Import GSAP for animations
import { gsap } from "gsap";
// Import Material-UI components for UI layout and styling
import { Box, Container, Grid, Typography, IconButton, Button, Fade, useMediaQuery, useTheme } from "@mui/material";
// Import Material-UI icons
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// Import custom components
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Excollo3DCaseStudy from "../Components/AboutUs/Excollo3DCaseStudy";
// Import WhatsApp icon for contact button
import { IoLogoWhatsapp } from "react-icons/io5";

// Import case study images
import image1 from "../assets/OurWork/MrCoconut.png";
import image2 from "../assets/OurWork/ContentCubicle.png";
import image3 from "../assets/OurWork/SupportBot.png";
import image4 from "../assets/OurWork/InsightIQ.png";
import image5 from "../assets/OurWork/InternalSupportBot.png";
import image6 from "../assets/OurWork/Phyllo.png";
import image7 from "../assets/OurWork/PdfSummarizer.png";

// Case studies data array with project information
const caseStudies = [
  { 
    id: 1, 
    title: "Mr.Coconut", 
    subtitle: "WhatsApp Ordering Assistant", 
    image: image1,
    logo: "Coconut",
    description: "Automating F&B orders through WhatsApp with instant support and event booking."
  },
  { 
    id: 2, 
    title: "Content Cubicle",
    subtitle: "Smart Intake Form", 
    image: image2,
    logo: "Content Cubicle",
    description: "AI-powered intake system capturing client details and generating structured briefs"
  },
  { 
    id: 3, 
    title: "SWIL Support Bot", 
    subtitle: "ERP customer service", 
    image: image3,
    logo: "SWIL Support Bot",
    description: "AI-powered support bot resolving ERP queries, FAQs, and troubleshooting in seconds."
  },
  { 
    id: 4, 
    title: "InsightIQ", 
    subtitle: "Brand Discovery assistant", 
    image: image4,
    logo: "InsightIQ",
    description: "Conversational AI assistant guiding clients to define vision, tone, and positioning."
  },
  { 
    id: 5, 
    title: "SWIL Internal Knowledge Bot", 
    //subtitle: "Digital Innovation", 
    image: image5,
    logo: "SWIL Internal Knowledge Bot",
    description: "Internal AI assistant for staff training, quick answers, and knowledge access."
  },
  
  { 
  id: 6, 
  title: "Phyllo", 
  subtitle: "Employee On Boarding AI", 
  image: image6,
  logo: "Phyllo",
  description: "Smart onboarding assistant automating forms, FAQs, and personalized checklists."
  },
  { 
    id: 7, 
    title: "PDF Summarizer", 
    subtitle: "Document Intelligence", 
  image: image7,
    logo: "PDF Summarizer",
    description: "Turning complex PDFs into clear, structured summaries in minutes."
  }
];

/**
 * CaseStudyCard Component
 * Individual case study card with hover effects and click handling
 * @param {Object} caseStudy - Case study data object
 * @param {boolean} isMainCard - Whether this is the main featured card
 * @param {boolean} fillHeight - Whether to fill available height
 * @param {Function} onClick - Click handler function
 * @param {boolean} isMobile - Whether in mobile view
 * @returns {JSX.Element} Case study card component
 */
const CaseStudyCard = ({ caseStudy, isMainCard = false, fillHeight = false, onClick, isMobile = false }) => {
  // State for mobile overlay visibility
  const [showMobileOverlay, setShowMobileOverlay] = React.useState(false);
  return (
  <Box onClick={onClick} sx={{ 
    position: 'relative', 
    borderRadius: 4, 
    overflow: 'hidden', 
    border: '1px solid #7e22ce',
    height: { xs: 220, md: fillHeight ? '100%' : 260 },
    backgroundImage: `url(${caseStudy.image})`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-8px) scale(1.02)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
      '& .overlay': {
        opacity: 1,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.95) 100%)'
      },
      '& .content': {
        opacity: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      },
      '& .cta': { opacity: 1, transform: 'translateY(0)' }
    }
  }}>
    {/* Mobile toggle button to reveal overlay/content */}
    <IconButton
      aria-label="Toggle details"
      onClick={(e) => { e.stopPropagation(); setShowMobileOverlay(!showMobileOverlay); }}
      sx={{
        position: 'absolute',
        top: 10,
        right: 10,
        display: { xs: 'inline-flex', md: 'none' },
        zIndex: 21,
        width: 36,
        height: 36,
        borderRadius: '50%',
        backgroundColor: showMobileOverlay ? 'rgba(126,34,206,0.35)' : 'rgba(0,0,0,0.45)',
        border: '1px solid #7e22ce',
        color: '#fff',
        '&:hover': {
          backgroundColor: 'rgba(126,34,206,0.45)'
        }
      }}
      size="small"
    >
      <InfoOutlinedIcon fontSize="small" />
    </IconButton>
    <Box className="overlay" sx={{ 
      position: 'absolute', 
      inset: 0, 
      background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)',
      opacity: isMainCard ? 1 : (isMobile && showMobileOverlay ? 1 : 0),
      transition: 'all 0.4s ease'
    }} />
    <Box className="content" sx={{ 
      position: 'absolute', 
      inset: 0, 
      p: 3, 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between',
      opacity: isMainCard ? 1 : (isMobile && showMobileOverlay ? 1 : 0),
      transition: 'all 0.4s ease'
    }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography sx={{ 
          fontWeight: 700, 
          fontSize: { xs: 20, md: 28 }, 
          mb: 1,
          color: '#fff',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)'
        }}>
          {caseStudy.title}
        </Typography>
        <Typography sx={{ 
          fontSize: { xs: 12, md: 14 }, 
          color: 'rgba(255,255,255,0.9)',
          fontWeight: 500,
          textShadow: '0 1px 2px rgba(0,0,0,0.5)'
        }}>
          {caseStudy.subtitle}
        </Typography>
        <Typography sx={{
          mt: 1,
          fontSize: { xs: 11, md: 12 },
          color: 'rgba(255,255,255,0.85)',
          maxWidth: 560,
          mx: 'auto',
          lineHeight: 1.4,
          textShadow: '0 1px 2px rgba(0,0,0,0.35)'
        }}>
          {caseStudy.description}
        </Typography>
      </Box>
      <Box className="cta" sx={{
        position: 'absolute',
        right: { xs: 10, md: 14 },
        bottom: { xs: 10, md: 14 },
        px: 2.5,
        py: 1,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.15)',
        color: '#fff',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        opacity: 0,
        transform: 'translateY(6px)',
        transition: 'all 0.3s ease'
      }}>
        <Typography sx={{ fontSize: { xs: 11, md: 12 } }}>Read case study</Typography>
        <ArrowForwardIcon sx={{ fontSize: { xs: 16, md: 18 } }} />
      </Box>
    </Box>
  </Box>
)};

/**
 * OurWorkPage Component
 * Main page displaying case studies and portfolio work
 * Features interactive case study cards, 3D elements, and animations
 * @returns {JSX.Element} Complete portfolio page with case studies
 */
const OurWorkPage = () => {
  // React Router navigation hook
  const navigate = useNavigate();
  // Material-UI theme and responsive breakpoints
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // Ref for 3D element interaction
  const ex3dTiltRef = useRef(null);
  // State for WhatsApp button visibility based on scroll
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(false);

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

  return (
    <Box sx={{ minHeight: "100vh", background: "#000", color: "#fff", position: 'relative' }}>
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

      <Container maxWidth="xl" sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 8, md: 12 }, px: { xs: 3, sm: 4, md: 8, lg: 14, xl: 18 } }}>
        <Box sx={{ textAlign: "center", maxWidth: 900, mx: "auto", mb: { xs: 6, md: 8 } }}>
          <Typography component="h2" sx={{ fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif', fontWeight: 600, fontSize: { xs: 32, md: 44 }, mb: 1 }}>
            Our{' '}
            <Box component="span" sx={{
              background: 'linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Work
            </Box>
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: { xs: 14, md: 16 }, maxWidth: 920, mx: 'auto', lineHeight: 1.6 }}>
          At Excollo, we transform ideas into impact by building intelligent AI solutions tailored for real-world challenges. Our case studies showcase how we collaborate with forward-thinking brands to automate workflows, enhance customer experiences, and unlock new growth opportunities. From conversational commerce to enterprise support systems, every project reflects our commitment to innovation, scalability, and measurable results.
          </Typography>
        </Box>

        {/* Main Grid Layout */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { 
            xs: '1fr', 
            md: '1fr 1fr 1fr' 
          }, 
          gridTemplateRows: { 
            xs: 'repeat(7, auto)', 
            md: 'repeat(3, 260px)' 
          },
          gap: { xs: 2, md: 3 }
        }}>
          
          {/* Tall image on LEFT spanning 2 rows */}
          <Box sx={{ 
            gridColumn: { xs: '1', md: '1' }, 
            gridRow: { xs: '1', md: '1 / 3' },
            height: { xs: 220, md: '100%' }
          }}>
            <CaseStudyCard caseStudy={caseStudies[0]} fillHeight onClick={() => { navigate('/case-study/mr-coconut'); setTimeout(() => { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); }, 0); }} />
          </Box>
          
          {/* First row - 2 images on right */}
          <Box sx={{ gridColumn: { xs: '1', md: '2' }, gridRow: { xs: '2', md: '1' } }}>
            <CaseStudyCard isMobile={isMobile} caseStudy={caseStudies[1]} onClick={() => { navigate('/case-study/content-cubicle'); setTimeout(() => { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); }, 0); }} />
          </Box>
          
          <Box sx={{ gridColumn: { xs: '1', md: '3' }, gridRow: { xs: '3', md: '1' } }}>
            <CaseStudyCard isMobile={isMobile} caseStudy={caseStudies[2]} onClick={() => { navigate('/case-study/swil-support-bot'); setTimeout(() => { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); }, 0); }} />
          </Box>

          {/* Second row - 1 image on right (tall image continues on left) */}
          <Box sx={{ gridColumn: { xs: '1', md: '2 / 4' }, gridRow: { xs: '4', md: '2' } }}>
            <CaseStudyCard isMobile={isMobile} caseStudy={caseStudies[3]} onClick={() => { navigate('/case-study/insightiq'); setTimeout(() => { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); }, 0); }} />
          </Box>

          {/* Third row - 3 images covering full width */}
          <Box sx={{ 
            gridColumn: { xs: '1', md: '1 / 4' }, 
            gridRow: { xs: '5 / 7', md: '3' },
          }}>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, 
              gap: { xs: 2, md: 3 }
            }}>
              <Box>
                <CaseStudyCard isMobile={isMobile} caseStudy={caseStudies[4]} onClick={() => { navigate('/case-study/swil-internal-knowledge-bot'); setTimeout(() => { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); }, 0); }} />
              </Box>
              <Box>
                <CaseStudyCard isMobile={isMobile} caseStudy={caseStudies[5]} onClick={() => { navigate('/case-study/phyllo'); setTimeout(() => { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); }, 0); }} />
              </Box>
              <Box>
                <CaseStudyCard isMobile={isMobile} caseStudy={caseStudies[6]} onClick={() => { navigate('/case-study/pdf-summarizer'); setTimeout(() => { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); }, 0); }} />
              </Box>
            </Box>
          </Box>
          

        </Box>
      </Container>

      {/* Excollo3D Component */}
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 17 } }}>
        <Box 
          ref={ex3dTiltRef}
          onMouseMove={handle3DMouseMove}
          onMouseLeave={handle3DMouseLeave}
          sx={{ 
            mt: { xs: -10, md: -8 },
            mb: { xs: -4, md: -2 },
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

// Export the OurWorkPage component as default
export default OurWorkPage;