import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  useTheme,
  useMediaQuery,
  Fade,
} from "@mui/material";
import { Sparkles, Users, MessageSquare, TrendingUp, Zap, Target } from 'lucide-react';
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Excollo3DCaseStudy from "../Components/AboutUs/Excollo3DCaseStudy";
import { IoLogoWhatsapp } from "react-icons/io5";

const ProductPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(false);

  // WhatsApp button scroll effect
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

  const handleWhatsapp = () => {
    window.open(
      "https://wa.me/918890204938?text=Hey%2C%20I%20need%20help%20with%20a%20tech%20solution.%20Let's%20talk%21",
      "_blank"
    );
  };

  const features = [
    {
      icon: <Users size={40} />,
      title: "Hyper-Realistic AI Personas",
      description: "Create AI personas that mirror your exact Ideal Customer Profile for authentic testing"
    },
    {
      icon: <MessageSquare size={40} />,
      title: "Instant Messaging Validation",
      description: "Test and refine your messaging with AI personas before reaching out to real prospects"
    },
    {
      icon: <TrendingUp size={40} />,
      title: "Accelerate GTM Decisions",
      description: "Make data-driven go-to-market decisions without waiting on prospect feedback"
    },
    {
      icon: <Target size={40} />,
      title: "Positioning Optimization",
      description: "Validate and optimize your product positioning with AI-powered insights"
    },
    {
      icon: <Zap size={40} />,
      title: "Real-Time Testing",
      description: "Instantly test different messaging approaches and iterate based on AI feedback"
    },
    {
      icon: <Sparkles size={40} />,
      title: "On-Demand Access",
      description: "Access your ICP personas anytime, anywhere without scheduling constraints"
    }
  ];

  return (
    <Box sx={{ minHeight: "100vh", background: "#000", color: "#fff", position: 'relative' }}>
      {/* Background Gradient */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "88%",
          height: { xs: "10%", md: "10%" },
          background: `radial-gradient(ellipse at top, rgba(154, 106, 255, 0.6) 0%, rgba(0, 0, 0, 0) 60%)`,
          zIndex: 1,
          opacity: 1,
        }}
      />

      {/* NavBar */}
      <Box sx={{ position: "relative", zIndex: 3 }}>
        <NavBar />
      </Box>

      <Container maxWidth="xl" sx={{ pt: { xs: 4, md: 6 }, px: { xs: 2, sm: 3 }, position: 'relative', zIndex: 2 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          {/* CRUDO Logo */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
            <a
              href="https://www.crudo.ai"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <img
                src="/CRUDO.png"
                alt="CRUDO"
                style={{
                  width: isMobile ? "160px" : "200px",
                  height: "auto",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                }}
                loading="lazy"
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              />
            </a>
          </Box>

          {/* Main Headline */}
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: { xs: 32, sm: 40, md: 48, lg: 56 },
              fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
              mb: { xs: 2, md: 3 },
              lineHeight: 1.2
            }}
          >
            Your ICP,{' '}
            <Box component="span" sx={{
              background: 'linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              On-Demand
            </Box>
          </Typography>

          {/* Subtitle */}
          <Typography
            sx={{
              fontSize: { xs: 20, sm: 24, md: 28 },
              fontWeight: 600,
              mb: 3,
              color: 'rgba(255,255,255,0.9)'
            }}
          >
            AI Personas to Accelerate Messaging and GTM
          </Typography>

          {/* Description */}
          <Typography sx={{
            mb: 4,
            color: 'rgba(255,255,255,0.85)',
            maxWidth: 800,
            mx: 'auto',
            fontSize: { xs: 16, sm: 18 },
            lineHeight: 1.6
          }}>
            CRUDO.AI creates hyper-realistic AI personas of your Ideal Customer Profile (ICP),
            so your teams can instantly test messaging, validate positioning, and accelerate
            go-to-market decisions, all without waiting on real prospects.
          </Typography>

          {/* CTA Button */}
          <Button
            component="a"
            href="https://www.crudo.ai"
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: { xs: 16, sm: 18 },
              textTransform: 'none',
              background: 'linear-gradient(135deg, #2579E3 0%, #8E54F7 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1e6bb8 0%, #7c3aed 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(37, 121, 227, 0.4)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Check CRUDO.AI Out
          </Button>
        </Box>

        {/* Features Grid */}
        <Box sx={{ mb: { xs: 10, md: 12 }, maxWidth: 1100, mx: 'auto' }}>
          <Typography
            sx={{
              fontSize: { xs: 24, sm: 28, md: 32 },
              fontWeight: 700,
              textAlign: 'center',
              mb: 6
            }}
          >
            Key Features
          </Typography>

          <Grid container spacing={{ xs: 3, sm: 4, md: 5 }} rowSpacing={{ xs: 5, sm: 6, md: 8 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    background: 'rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(126, 34, 206, 0.2)',
                    borderRadius: 3,
                    p: 3,
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      border: '1px solid rgba(126, 34, 206, 0.4)',
                      boxShadow: '0 8px 32px rgba(126, 34, 206, 0.2)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      background: 'linear-gradient(135deg, rgba(37, 121, 227, 0.2) 0%, rgba(142, 84, 247, 0.2) 100%)'
                    }}
                  >
                    {React.cloneElement(feature.icon, { color: '#8E54F7' })}
                  </Box>
                  <Typography
                    sx={{
                      fontSize: 18,
                      fontWeight: 600,
                      mb: 1.5,
                      color: '#fff'
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: 'rgba(255,255,255,0.7)',
                      lineHeight: 1.6
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Bottom CTA Section */}
        <Box
          sx={{
            textAlign: 'center',
            py: { xs: 6, md: 8 },
            px: 3,
            borderRadius: 4,
            background: 'linear-gradient(135deg, rgba(37, 121, 227, 0.1) 0%, rgba(142, 84, 247, 0.1) 100%)',
            border: '1px solid rgba(126, 34, 206, 0.2)',
            mb: { xs: 4, md: 6 }
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 24, sm: 28, md: 32 },
              fontWeight: 700,
              mb: 2
            }}
          >
            Ready to Transform Your GTM Strategy?
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 16, sm: 18 },
              color: 'rgba(255,255,255,0.8)',
              mb: 4,
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            Experience the power of AI-driven customer personas and accelerate your
            go-to-market decisions today.
          </Typography>
          <Button
            component="a"
            href="https://www.crudo.ai"
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: { xs: 16, sm: 18 },
              textTransform: 'none',
              background: 'linear-gradient(135deg, #2579E3 0%, #8E54F7 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1e6bb8 0%, #7c3aed 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(37, 121, 227, 0.4)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Get Started with CRUDO.AI
          </Button>
        </Box>
      </Container>

      {/* Excollo 3D Logo */}
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            mt: { xs: 2, md: 2 },
            mb: { xs: 0, md: 0 },
            position: 'relative',
            zIndex: 1,
            background: '#000'
          }}
        >
          <Excollo3DCaseStudy disableScroll />
        </Box>
      </Container>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Button */}
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

export default ProductPage;
