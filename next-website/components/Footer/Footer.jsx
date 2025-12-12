import React from "react";
import {
  Box,
  Typography,
  Grid,
  Link,
  Divider,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LaunchIcon from "@mui/icons-material/Launch";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ExcolloWebsiteLogo from "../../assets/logo/ExcolloWebsiteLogo.png";

const Footer = () => {
  const isTablet = useMediaQuery("(min-width:480px) and (max-width:899px)");
  const specificCondition = useMediaQuery(
    "(min-width: 1800px) and (max-width: 2600px) and (max-height:1700px)"
  );

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  const TabletLayout = () => (
    <Box sx={{ width: "80%", margin: "auto", marginLeft: "15%" }}>
      {/* Excollo Section */}
      <Box sx={{ display: "flex", mb: 4 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ width: "30%", fontWeight: "500" }}
        >
          <Box
            display="flex"
            alignItems="center"
            sx={{ position: "relative", zIndex: 0, width: "100%" }}
          >
            <Link to="/">
              <Image
                src={ExcolloWebsiteLogo}
                alt="excollo"
                width={500}
                height={200}
                style={{ width: "50%", height: "auto" }}
                sizes="(max-width: 899px) 200px, 320px"
                priority
              />
            </Link>
          </Box>
        </Typography>
        <Box sx={{ width: "70%" }}>
          <Typography variant="body2" color="grey.400" gutterBottom>
            AI Driven. Outcome Focused.
          </Typography>
          <Link
            href="/about"
            sx={{
              color: "grey.400",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              textDecoration: "none",
              "&:hover": { color: "#a693c1" },
              // justifyContent: { xs: "center", md: "flex-start" },
              mt: 1,
              fontSize: {
                xs: "0.875rem",
                sm: "1rem",
                xl: specificCondition
                  ? `clamp(0.5rem, calc(0.5rem + 1vw), 3rem)`
                  : "auto",
              },
            }}
          >
            Learn More{" "}
            <LaunchIcon
              sx={{
                fontSize: {
                  xs: 14,
                  sm: 16,
                  xl: specificCondition
                    ? `clamp(0.5rem, calc(0.5rem + 1vw), 3rem)`
                    : "auto",
                },
              }}
            />
          </Link>
        </Box>
      </Box>

      {/* Quick Links Section */}
      <Box sx={{ display: "flex", mb: 4 }}>
        <Typography variant="body1" sx={{ width: "30%", fontWeight: "500" }}>
          Quick Links
        </Typography>
        <Box sx={{ width: "70%" }}>
          {navigationLinks.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              sx={{
                color: "grey.400",
                textDecoration: "none",
                display: "block",
                mb: 1,
                "&:hover": { color: "#a693c1" },
              }}
            >
              {item.name}
            </Link>
          ))}
        </Box>
      </Box>

      {/* Contact Us Section */}
      <Box sx={{ display: "flex", mb: 4 }}>
        <Typography variant="body1" sx={{ width: "30%", fontWeight: "500" }}>
          Contact Us
        </Typography>
        <Box sx={{ width: "70%" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <EmailIcon sx={{ fontSize: 18, color: "grey.400" }} />
            <Link
              href="mailto:info@excollo.com"
              target="_blank" // This opens in new tab
              rel="noopener noreferrer" // Security best practice for links opening in new tab
              sx={{
                color: "grey.400",
                textDecoration: "none",
                "&:hover": { color: "#a693c1" },
              }}
            >
              info@excollo.com
            </Link>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <PhoneIcon sx={{ fontSize: 18, color: "grey.400" }} />
            <Link
              href="tel:+918890204938"
              target="_blank" // This opens in new tab
              rel="noopener noreferrer" // Security best practice for links opening in new tab
              sx={{
                color: "grey.400",
                textDecoration: "none",
                "&:hover": { color: "#a693c1" },
              }}
            >
              +91 8890204938
            </Link>
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
            <Link
              href="https://www.google.co.in/maps/place/230,+Bharat+Marg,+Singh+Bhoomi,+Khatipura,+Jaipur,+Rajasthan+302012/@26.9221888,75.7497856,14z/data=!4m5!3m4!1s0x396db368ef4a6f2f:0x8183d4a0e877ec15!8m2!3d26.9268325!4d75.7413077?entry=ttu&g_ep=EgoyMDI1MDExMC4wIKXMDSoJLDEwMjExMjMzSAFQAw%3D%3D"
              target="_blank" // This opens in new tab
              rel="noopener noreferrer" // Security best practice for links opening in new tab
              sx={{ textDecoration: "none" }}
            >
            <Typography
              variant="body2"
              component="div"
              color="grey.400"
              sx={{
                fontSize: {
                  xs: "0.875rem",
                  sm: "1rem",
                  xl: specificCondition
                    ? `clamp(0.5rem, calc(0.5rem + 1vw), 3rem)`
                    : "auto",
                },
                textAlign: "left",
              }}
            >
                <Box sx={{ display: "flex", width: "60%" }}>
                  <LocationOnIcon
                    sx={{
                      fontSize: {
                        xs: 12,
                        sm: 20,
                        md: 20,
                        lg: 16,
                        xl: specificCondition
                          ? `clamp(0.5rem, calc(0.5rem + 1vw), 3rem)`
                          : "auto",
                      },
                      color: "grey.400",
                      mr: 0.5,
                    }}
                  />
                  <Box
                    sx={{
                      ml: 0.5,
                      mt: -0.5,
                      position: "relative",
                      cursor: "pointer !important",
                      "&:hover": { color: "#a693c1" },
                    }}
                  >
                    C-230 Bharat Marg, Hanuman Nagar, Vaishali, Jaipur,
                    Rajasthan - 302021
                  </Box>
                </Box>
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>

      {/* Stay Connected Section */}
      <Box sx={{ display: "flex", mb: 4 }}>
        <Typography variant="body1" sx={{ width: "30%", fontWeight: "500" }}>
          Stay Connected
        </Typography>
        <Box sx={{ width: "70%" }}>
          <Link
            href="https://www.linkedin.com/company/excollo/posts/?feedView=all"
            target="_blank" // This opens in new tab
            rel="noopener noreferrer" // Security best practice for links opening in new tab
            sx={{
              color: "grey.400",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              textDecoration: "none",
              "&:hover": { color: "#a693c1" },
              mb: 1,
            }}
          >
            <LinkedInIcon sx={{ fontSize: 18 }} /> LinkedIn
          </Link>
          <Link
            href="/contact"
            target="_blank" // This opens in new tab
            rel="noopener noreferrer" // Security best practice for links opening in new tab
            sx={{
              color: "grey.400",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              textDecoration: "none",
              "&:hover": { color: "#a693c1" },
              mb: 1,
            }}
          >
            Schedule a Consultation <LaunchIcon sx={{ fontSize: 14 }} />
          </Link>
          <Link
            href="/services"
            target="_blank" // This opens in new tab
            rel="noopener noreferrer" // Security best practice for links opening in new tab
            sx={{
              color: "grey.400",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              textDecoration: "none",
              "&:hover": { color: "#a693c1" },
            }}
          >
            Explore our Services <LaunchIcon sx={{ fontSize: 14 }} />
          </Link>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box
      position="relative"
      zIndex={1}
      sx={{
        color: "#ffffff",
        padding: {
          xl: "4rem 0rem",
          lg: "3rem 0rem",
          md: "2.5rem 0rem",
          sm: "2rem 0rem",
          xs: "1.5rem 0rem",
        },
        width: "100%",
        margin: "auto",
        overflow: "hidden",
        lineHeight: 1.8,
        height: "auto",
        fontFamily: '"Inter", sans-serif',
      }}
    >
      {/* Gradient Effect */}
      <Box
        sx={{
          position: "absolute",
          top: -10,
          left: 0,
          right: 0,
          height: "12%",
          background: `radial-gradient(ellipse at bottom, rgba(196, 188, 213, 0.38) 0%, rgba(0, 0, 0, 0) 60%)`,
          zIndex: -1,
          "@media (max-width: 899px)": {
            display: "none",
          },
        }}
      />

      {isTablet ? (
        <TabletLayout />
      ) : (
        <Grid
          container
          spacing={{ xs: 3, sm: 4, md: 5 }}
          sx={{
            paddingTop: { xs: 1, sm: 2, md: 12 },
            flexWrap: "wrap",
            "@media (max-width: 320px)": {
              paddingLeft: 0,
              marginLeft: -3,
            },
            "@media (max-width: 480px)": {
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            },
          }}
        >
          {/* Excollo Logo & Tagline */}
          <Grid
            item
            xs={12}
            sm={6}
            md={4.5}
            sx={{
              marginLeft: "8%",
              textAlign: { xs: "center", md: "left" },
              "@media (max-width: 768px)": {
                textAlign: "center",
                marginBottom: "2rem",
              },
              "@media (min-width: 320px) and (max-width:480px)": {
                marginLeft: "0%",
              },
            }}
          >
            <Typography
              component="div"
              sx={{
                fontWeight: "500",
                mb: 2,
                fontSize: { xs: "1.1rem", sm: "1.25rem" },
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                sx={{ position: "relative", zIndex: 0, width: "100%" }}
              >
                <Link to="/">
                  <Image
                    src={ExcolloWebsiteLogo}
                    alt="excollo"
                    width={400}
                    height={200}
                    style={{
                      width: specificCondition ? "100%" : "50%",
                      height: "auto",
                    }}
                    sizes="(max-width: 768px) 220px, (max-width: 1200px) 260px, 320px"
                    priority
                  />
                </Link>
              </Box>
            </Typography>
            <Typography
              variant="body2"
              color="grey.400"
              sx={{
                fontSize: {
                  xs: "0.875rem",
                  sm: "1rem",

                  md: "1rem",
                  lg: "1rem",
                  xl: "2rem",
                },
              }}
              gutterBottom
            >
              AI Driven. Outcome Focused.
            </Typography>
            <Link
              href="/about"
              sx={{
                color: "grey.400",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                textDecoration: "none",
                "&:hover": { color: "#a693c1" },
                justifyContent: { xs: "center", md: "flex-start" },
                mt: 1,
                fontSize: {
                  xs: "0.875rem",
                  sm: "1rem",
                  xl: specificCondition
                    ? `clamp(0.5rem, calc(0.5rem + 1vw), 3rem)`
                    : "auto",
                },
                "@media (max-width: 768px)": {
                  justifyContent: "center",
                },
              }}
            >
              Learn More{" "}
              <LaunchIcon
                sx={{
                  fontSize: {
                    xs: 14,
                    sm: 16,
                    xl: "2rem",
                  },
                }}
              />
            </Link>
          </Grid>

          {/* Quick Links */}
          <Grid
            item
            xs={12}
            sm={6}
            md={2}
            sx={{
              textAlign: { xs: "center", md: "left" },
              ml: { md: -10, xs: 0 },
              "@media (max-width: 768px)": {
                textAlign: "center",
                marginBottom: "2rem",
              },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: "500",
                mb: 2,
                fontSize: {
                  xs: "1rem",
                  sm: "1.1rem",
                  xl: "2rem",
                },
              }}
            >
              Quick Links
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                alignItems: { xs: "center", md: "flex-start" },
                "@media (max-width: 768px)": {
                  alignItems: "center",
                },
              }}
            >
              {navigationLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  sx={{
                    color: "grey.400",
                    textDecoration: "none",
                    display: "block",
                    fontSize: {
                      xs: "1rem",
                      sm: "1rem",
                      xl: "1.5rem",
                    },
                    mb: 1,
                    "&:hover": { color: "#a693c1" },
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contact Us */}
          <Grid
            item
            xs={12}
            sm={6}
            md={2}
            sx={{
              textAlign: { xs: "center", md: "left" },
              "@media (max-width: 768px)": {
                textAlign: "center",
                marginBottom: "2rem",
              },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: "500",
                mb: 2,
                fontSize: {
                  xs: "1rem",
                  sm: "1.1rem",
                  xl: "2rem",
                },
              }}
            >
              Contact Us
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                alignItems: { xs: "center", md: "flex-start" },
                "@media (max-width: 768px)": {
                  alignItems: "center",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <EmailIcon
                  sx={{
                    fontSize: {
                      xs: 18,
                      sm: 20,
                      xl: "1.5rem",
                    },
                    color: "grey.400",
                  }}
                />
                <Link
                  href="mailto:info@excollo.com"
                  target="_blank" // This opens in new tab
                  rel="noopener noreferrer" // Security best practice for links opening in new tab
                  sx={{
                    color: "grey.400",
                    textDecoration: "none",
                    "&:hover": { color: "#a693c1" },
                    fontSize: {
                      xs: "0.875rem",
                      sm: "1rem",
                      xl: "1.5rem",
                    },
                  }}
                >
                  info@excollo.com
                </Link>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <PhoneIcon
                  sx={{
                    fontSize: {
                      xs: 18,
                      sm: 20,
                      xl: "1.5rem",
                    },
                    color: "grey.400",
                  }}
                />
                <Link
                  href="tel:+918890204938"
                  target="_blank" // This opens in new tab
                  rel="noopener noreferrer" // Security best practice for links opening in new tab
                  sx={{
                    color: "grey.400",
                    textDecoration: "none",
                    "&:hover": { color: "#a693c1" },
                    fontSize: {
                      xs: "0.875rem",
                      sm: "1rem",
                      xl: "1.5rem",
                    },
                  }}
                >
                  +91 8890204938
                </Link>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1,
                  justifyContent: { xs: "center", md: "flex-start" },
                  maxWidth: { xs: "250px", sm: "300px", md: "100%" },
                  margin: { xs: "0 auto", md: 0 },
                }}
              >
                <Link
                  href="https://www.google.co.in/maps/place/230,+Bharat+Marg,+Singh+Bhoomi,+Khatipura,+Jaipur,+Rajasthan+302012/@26.9221888,75.7497856,14z/data=!4m5!3m4!1s0x396db368ef4a6f2f:0x8183d4a0e877ec15!8m2!3d26.9268325!4d75.7413077?entry=ttu&g_ep=EgoyMDI1MDExMC4wIKXMDSoJLDEwMjExMjMzSAFQAw%3D%3D"
                  target="_blank" // This opens in new tab
                  rel="noopener noreferrer" // Security best practice for links opening in new tab
                  sx={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="body2"
                    component="div"
                    color="grey.400"
                    sx={{
                      fontSize: {
                        xs: "0.875rem",
                        sm: "1rem",
                        xl: "1.5rem",
                      },
                      textAlign: { xs: "center", md: "left" },
                    }}
                  >
                    <Box sx={{ display: "flex" }}>
                      <LocationOnIcon
                        sx={{
                          display: {
                            xs: "none",
                            sm: "block",
                            md: "block",
                            lg: "block",
                            xl: "block",
                          },
                          fontSize: {
                            xs: 20,
                            sm: 20,
                            md: 20,
                            lg: 16,
                            xl: "1.5rem",
                          },
                          color: "grey.400",
                          mr: 0.5,
                        }}
                      />
                      <Box
                        sx={{
                          ml: 0.5,
                          mt: -0.5,
                          position: "relative",
                          cursor: "pointer !important",
                          "&:hover": { color: "#a693c1" },
                        }}
                      >
                        <LocationOnIcon
                          sx={{
                            display: {
                              xs: "flex",
                              sm: "none",
                              md: "none",
                              lg: "none",
                              xl: "none",
                            },
                            position: "absolute",
                            right: "98%",
                            fontSize: {
                              xs: 20,
                              sm: 20,
                              md: 20,
                              lg: 16,
                              xl: "1.5rem",
                            },
                            color: "grey.400",
                            mr: 0.5,
                          }}
                        />{" "}
                        C-230 Bharat Marg, Hanuman Nagar, Vaishali, Jaipur,
                        Rajasthan - 302021
                      </Box>
                    </Box>
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Stay Connected */}
          <Grid
            item
            xs={12}
            sm={6}
            md={2.1}
            sx={{
              textAlign: { xs: "center", md: "left" },
              marginLeft: { md: 5, xs: 0 },
              "@media (max-width: 768px)": {
                textAlign: "center",
                marginBottom: "2rem",
              },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: "500",
                mb: 2,
                fontSize: {
                  xs: "1rem",
                  sm: "1.1rem",
                  xl: "2rem",
                },
              }}
            >
              Stay Connected
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                alignItems: { xs: "center", md: "flex-start" },
                "@media (max-width: 768px)": {
                  alignItems: "center",
                },
              }}
            >
              <Link
                href="https://www.linkedin.com/company/excollo/posts/?feedView=all"
                // target="_blank" // This opens in new tab
                // rel="noopener noreferrer" // Security best practice for links opening in new tab
                sx={{
                  color: "grey.400",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  textDecoration: "none",
                  "&:hover": { color: "#a693c1" },
                  justifyContent: { xs: "center", md: "flex-start" },
                  fontSize: {
                    xs: "0.875rem",
                    sm: "1rem",
                    xl: "1.5rem",
                  },
                }}
              >
                <LinkedInIcon
                  sx={{
                    fontSize: {
                      xs: 18,
                      sm: 20,
                      xl: "1.5rem",
                    },
                  }}
                />{" "}
                LinkedIn
              </Link>
              <Link
                href="/contact"
                // target="_blank" // This opens in new tab
                // rel="noopener noreferrer" // Security best practice for links opening in new tab
                sx={{
                  color: "grey.400",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  textDecoration: "none",
                  "&:hover": { color: "#a693c1" },
                  justifyContent: { xs: "center", md: "flex-start" },
                  fontSize: {
                    xs: "0.875rem",
                    sm: "1rem",
                    xl: "1.5rem",
                  },
                }}
              >
                Schedule a Call{" "}
                <LaunchIcon
                  sx={{
                    fontSize: {
                      xs: 14,
                      sm: 16,
                      xl: "1.5rem",
                    },
                  }}
                />
              </Link>
              <Link
                href="/services"
                target="_blank" // This opens in new tab
                rel="noopener noreferrer" // Security best practice for links opening in new tab
                sx={{
                  color: "grey.400",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  textDecoration: "none",
                  "&:hover": { color: "#a693c1" },
                  justifyContent: { xs: "center", md: "flex-start" },
                  fontSize: {
                    xs: "0.875rem",
                    sm: "1rem",
                    xl: "1.5rem",
                  },
                }}
              >
                Explore our Services{" "}
                <LaunchIcon
                  sx={{
                    fontSize: {
                      xs: 14,
                      sm: 16,
                      xl: "1.5rem",
                    },
                  }}
                />
              </Link>
            </Box>
          </Grid>
        </Grid>
      )}
      <Divider
        sx={{
          backgroundColor: "grey.800",
          my: 3,
          width: "100%",
          mx: "auto",
        }}
      />

      {/* Copyright */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          color: "grey.400",
          px: { xs: 2, sm: 3 },
          gap: { xs: 2, sm: 0 },
          "@media (max-width: 768px)": {
            flexDirection: "row",
            px: 2,
          },
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontSize: {
              xs: "0.75rem",
              sm: "0.875rem",
              xl: "1.5rem",
            },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          © {new Date().getFullYear()} Excollo Inc. All Rights
          Reserved.
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
            mr: { md: 6, xs: 6 },
            "@media (max-width: 768px)": {
              justifyContent: "space-between",
              // marginTop: "1rem",
            },
          }}
        >
          <Link
            variant="caption"
            href="/privacy&policy"
            target="_blank" // This opens in new tab
            rel="noopener noreferrer" // Security best practice for links opening in new tab
            sx={{
              color: "grey.400",
              textDecoration: "none",
              "&:hover": { color: "#a693c1" },
              fontSize: {
                xs: "0.75rem",
                sm: "0.8rem",
                xl: "1.5rem",
              },
            }}
          >
            Privacy Policy
          </Link>
          <Link
            variant="caption"
            href="/termsofservice"
            target="_blank" // This opens in new tab
            rel="noopener noreferrer" // Security best practice for links opening in new tab
            sx={{
              color: "grey.400",
              textDecoration: "none",
              "&:hover": { color: "#a693c1" },
              fontSize: {
                xs: "0.75rem",
                sm: "0.8rem",
                xl: "1.5rem",
              },
            }}
          >
            Terms of Service
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;