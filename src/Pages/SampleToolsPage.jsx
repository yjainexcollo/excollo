// Import React hooks for state management and side effects
import React, { useRef, useCallback, useState, useEffect } from "react";
// Import React Router for navigation
import { useNavigate } from "react-router-dom";
// Import GSAP for animations
import { gsap } from "gsap";
// Import custom components
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Excollo3DCaseStudy from "../Components/AboutUs/Excollo3DCaseStudy";
import AIToolCard from "../Components/AIToolCard.jsx";
// Import Material-UI components for UI layout and styling
import { Container, Grid, Typography, Box, Button, Fade } from "@mui/material";
// Import Material-UI icons
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// Import WhatsApp icon for contact button
import { IoLogoWhatsapp } from "react-icons/io5";

/**
 * SampleToolsPage Component
 * Page displaying sample AI tools and demos
 * Features interactive tool cards, 3D elements, and animations
 * @returns {JSX.Element} Complete sample tools showcase page
 */
const SampleToolsPage = () => {
  // React Router navigation hook
  const navigate = useNavigate();
  // Ref for 3D element interaction
  const ex3dTiltRef = useRef(null);
  // State for WhatsApp button visibility based on scroll
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(false);

  /**
   * Handle 3D mouse movement for interactive 3D element
   * Creates a tilt effect based on mouse position relative to the element
   * @param {MouseEvent} e - Mouse move event
   */
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

  const handleHotelConciergeClick = () => {
    window.open('/sampletools/hotelconcierge', '_blank');
  };

  const handleSEOFeedbackClick = () => {
    window.open('/sampletools/seofeedback', '_blank');
  };

  const handleSEOArticleGeneratorClick = () => {
    window.open('/sampletools/seoarticlegenerator', '_blank');
  };

  const handleFinNewsClick = () => {
    window.open('/sampletools/finnews', '_blank');
  };

  const handleECommCustomerInteractionClick = () => {
    window.open('/sampletools/ecomm-customer-interaction', '_blank');
  };

  const handlePDFtoCSVClick = () => {
    window.open('/sampletools/pdf-to-csv', '_blank');
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

  const aiTools = [
    {
      id: 1,
      icon: "🏨",
      title: "SEO Feedback",
      description: "Optimize your web pages instantly with AI-powered SEO insights. Get actionable feedback on keywords, structure, and readability to boost rankings.",
      suitableFor: "Marketers, Content Creators",
      onClick: handleSEOFeedbackClick,
      // suitableForType: "creators"
    },
    {
      id: 2,
      icon: "🛍️",
      title: "PDF to CSV for invoices",
      description: " Turn messy invoices into clean, structured CSV files in seconds. Save hours of manual data entry and simplify your finance workflows.",
      suitableFor: "Finance Teams and Operations",
      onClick: handlePDFtoCSVClick,
      // suitableForType: "creators"
    },
    {
      id: 3,
      icon: "🔍",
      title: "News for F&O investors",
      description: " Stay ahead in the markets with real-time, AI-curated insights for futures & options. Get the edge with fast, relevant news delivered in context.",
      suitableFor: "Traders, Financial Analysts",
      onClick: handleFinNewsClick,
      //suitableForType: "creators"
    },
    {
      id: 4,
      icon: "🛡️",
      title: "E-commerce customer interaction",
      description: " Automate customer chats with AI that answers queries, tracks orders, and handles returns — improving service while reducing support load.",
      suitableFor: "E-commerce Brands, Retailers",
      onClick: handleECommCustomerInteractionClick,
      // suitableForType: "creators"
    },
    {
      id: 5,
      icon: "📊",
      title: "SEO Article Generator",
      description: " Generate high-quality, keyword-rich articles tailored to your audience. Scale your content production while maintaining consistency and SEO value.",
      suitableFor: "Bloggers, Content Teams",
      onClick: handleSEOArticleGeneratorClick,
      //suitableForType: "creators"
    },
    {
      id: 6,
      icon: "👤",
      title: "Hotel Concierge",
      description: " Offer 24/7 guest support with an AI concierge that manages bookings, recommends services, and personalizes guest experiences.",
      suitableFor: "Hotels, Hospitality Teams",
      onClick: handleHotelConciergeClick,
      //suitableForType: "creators"
    }
  ];

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

      {/* Main content */}
      <Container maxWidth="xl" sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 8, md: 12 } }}>
        {/* Hero section */}
        <Box sx={{ textAlign: "center", maxWidth: 900, mx: "auto", mb: { xs: 6, md: 8 } }}>
          <Typography
            component="h2"
            sx={{
              lineHeight: 1.1,
              fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
              fontWeight: 600,
              fontSize: {
                xs: 'clamp(1.75rem, calc(1.25rem + 2vw), 9rem)',
                md: 'clamp(1.75rem, calc(1.25rem + 2.5vw), 9rem)',
                lg: 'clamp(1.75rem, calc(1.37rem + 3vw), 8rem)',
                xl: 'clamp(2.25rem, calc(2rem + 3vw), 10rem)',
              },
            }}
          >
            Sample AI <Box component="span" sx={{
              background: 'linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}>Tools</Box>
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 20, fontWeight: 400, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif' }}>
            let's create a universe of possibilities together!
          </Typography>
        </Box>

        {/* AI Tools grid */}
        <Box sx={{
          position: 'relative',
          px: { xs: 2, sm: 4, md: 8, lg: 12 },
          py: { xs: 2, md: 3 },
          borderRadius: 3,
        }}>
          <Grid
            container
            spacing={{ xs: 3, sm: 4, md: 5 }}
            
          >
          {aiTools.map((tool) => (
            <Grid item xs={12} sm={6} md={4} key={tool.id}>
              <AIToolCard
                icon={tool.icon}
                title={tool.title}
                description={tool.description}
                suitableFor={tool.suitableFor}
                suitableForType={tool.suitableForType}
                onClick={tool.onClick}
              />
            </Grid>
          ))}
          </Grid>
        </Box>

        {/* CTA Section under tool cards */}
        <Box sx={{
          mt: { xs: 8, md: 12 },
          textAlign: "center",
          py: { xs: 6, md: 8 },
          px: { xs: 2, md: 4 },
          borderRadius: 3,
        }}>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: 32, sm: 40, md: 56 },
              fontWeight: 600,
              mb: { xs: 2, md: 3 },
            }}
          >
            Check out our potential AI{' '}
            <Box component="span" sx={{
              background: 'linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}>tools</Box>
          </Typography>

          <Typography sx={{
            color: 'rgba(255,255,255,0.75)',
            fontSize: { xs: 16, sm: 18, md: 22 },
            maxWidth: 1100,
            mx: 'auto',
            lineHeight: 1.6,
            mb: { xs: 4, md: 5 },
          }}>
            Ready to transform your business with cutting-edge AI solutions? Explore our comprehensive suite of tools designed to revolutionize your workflow.
          </Typography>

          <Button
            size="large"
            endIcon={<NavigateNextIcon />}
            onClick={() => navigate('/potentialtools')}
            sx={{
              px: { xs: 3.5, md: 5 },
              py: { xs: 1.25, md: 1.75 },
              borderRadius: 3,
              fontWeight: 600,
              fontSize: { xs: 16, md: 18 },
              textTransform: 'none',
              color: '#fff',
              background: 'linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)',
              boxShadow: '0 10px 25px rgba(142,84,247,0.35)',
              '&:hover': {
                background: 'linear-gradient(180deg, #1e6bb8 0%, #7c3aed 100%)',
                boxShadow: '0 12px 30px rgba(142,84,247,0.45)'
              }
            }}
          >
            Get Started Today
          </Button>
        </Box>
      </Container>

      {/* Excollo3D Component */}
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 17 } }}>
        <Box 
          ref={ex3dTiltRef}
          onMouseMove={handle3DMouseMove}
          onMouseLeave={handle3DMouseLeave}
          sx={{ 
            mt: { xs: -16, md: -12 },
            mb: { xs: -8, md: -4 },
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

// Export the SampleToolsPage component as default
export default SampleToolsPage;
