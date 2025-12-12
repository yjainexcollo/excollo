import React from "react";
import {
  Typography,
  Container,
  Box,
  Link,
  CssBaseline,
  Container,
  Box,
  Link,
  CssBaseline,
} from "@mui/material";
import NavBar from "@/components/NavBar/NavBar";
const PrivacyPolicy = () => {
  return (
    <>
      <CssBaseline />

      <NavBar />
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: "#000",
          color: "#fff",
          textAlign: "center",
          padding: "60px 20px",
          marginBottom: "40px",
          borderBottom: "1px solid #ddd",
          fontFamily: '"Inter", sans-serif',
          fontWeight: "600",
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: "1.5rem",
              md: `clamp(1rem, calc(0.5rem + 1vw), 9rem)`,
              lg: `clamp(1rem, calc(1.25rem + 2vw), 9rem)`,
              xl: `clamp(1rem, calc(1rem + 2vw), 8rem)`,
            },
            fontFamily: '"Inter", sans-serif',
            fontWeight: "600",

            color: "#fff",
            mb: 2,
          }}
        >
          Privacy Policy
        </Typography>
        {/* <Typography variant="subtitle1" sx={{ color: "#fff" }}>
          Effective Date: January 10, 2025
        </Typography> */}
      </Box>
      {/* Content Section */}
      <Container maxWidth="lg">
        <Box
          sx={{
            backgroundColor: "#000",
            color: "#fff",
            padding: "40px 20px",
            borderRadius: "10px",
            marginBottom: "40px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              position: "fixed",
              top: "55%",
              left: "50%",
              width: "80%",
              height: "100%",
              background: `radial-gradient(closest-corner, rgba(115, 80, 190, 0.22) 0%, rgba(0, 0, 0, 0) 60%)`,
              transform: "translate(-50%, -50%)",
              zIndex: 0,
            }}
          />
          {/* Introduction */}
          <Typography
            component="h2"
            sx={{
              fontSize: {
                xs: "1.5rem",
                md: `clamp(1rem, calc(0.5rem + 0.8vw), 5rem)`,
                lg: `clamp(1rem, calc(1.25rem + 1.5vw), 5rem)`,
                xl: `clamp(1rem, calc(1rem + 1.5vw), 4.5rem)`,
              },
              fontFamily: '"Inter", sans-serif',
              fontWeight: "600",

              color: "#fff",
              mb: 2,
            }}
          >
            Introduction
          </Typography>
          <Typography
            sx={{
              // fontSize: "1rem",
              color: "#fff",
              mb: 3,
              fontSize: {
                md: `clamp(0.2rem, calc(0.5rem + 0.6vw), 1rem)`,
                lg: `clamp(0.2rem, calc(0.5rem + 0.7vw), 1.2rem)`,
                xl: `clamp(0.2rem, calc(0.5rem + 0.8vw), 1.5rem)`,
              },
              fontFamily: '"Inter", sans-serif',
              fontWeight: 200,
            }}
          >
            At Excollo, we value your privacy and are committed to protecting
            your personal information. This Privacy Policy outlines how we
            collect, use, and safeguard your information when you visit our
            website or interact with us.
          </Typography>

          {/* Information We Collect */}
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontSize: {
                xs: "1.5rem",
                md: `clamp(1rem, calc(0.5rem + 0.8vw), 5rem)`,
                lg: `clamp(1rem, calc(1.25rem + 1.5vw), 5rem)`,
                xl: `clamp(1rem, calc(1rem + 1.5vw), 4.5rem)`,
              },
              fontFamily: '"Inter", sans-serif',
              fontWeight: "600",

              color: "#fff",
              mb: 2,
            }}
          >
            Information We Collect
          </Typography>
          {/* <Typography sx={{ fontSize: "1rem", color: "#fff", mb: 2 }}>
            We collect various types of information to provide and improve our
            services:
          </Typography> */}
          <ul style={{ marginLeft: "3%" }}>
            <li>
              <Typography
                sx={{
                  color: "#fff",
                  mb: 1,
                  fontSize: {
                    md: `clamp(0.2rem, calc(0.5rem + 0.6vw), 1rem)`,
                    lg: `clamp(0.2rem, calc(0.5rem + 0.7vw), 1.2rem)`,
                    xl: `clamp(0.2rem, calc(0.5rem + 0.8vw), 1.5rem)`,
                  },
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 200,
                }}
              >
                <strong>Personal Information:</strong> When you use our contact
                form, we collect your name, email address, phone number, and any
                additional information you provide in your message.
              </Typography>
            </li>
            <li>
              <Typography
                sx={{
                  color: "#fff",
                  mb: 1,
                  fontSize: {
                    md: `clamp(0.2rem, calc(0.5rem + 0.6vw), 1rem)`,
                    lg: `clamp(0.2rem, calc(0.5rem + 0.7vw), 1.2rem)`,
                    xl: `clamp(0.2rem, calc(0.5rem + 0.8vw), 1.5rem)`,
                  },
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 200,
                }}
              >
                <strong>Non-Personal Information:</strong> We may collect
                technical data such as your IP address, browser type, and the
                pages you visit on our site, which helps us understand website
                usage and improve functionality.
              </Typography>
            </li>
            <li>
              <Typography
                sx={{
                  color: "#fff",
                  mb: 1,
                  fontSize: {
                    md: `clamp(0.2rem, calc(0.5rem + 0.6vw), 1rem)`,
                    lg: `clamp(0.2rem, calc(0.5rem + 0.7vw), 1.2rem)`,
                    xl: `clamp(0.2rem, calc(0.5rem + 0.8vw), 1.5rem)`,
                  },
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 200,
                }}
              >
                <strong>Cookies :</strong> We use cookies to enhance your
                browsing experience, track website performance, and analyze
                trends.
              </Typography>
            </li>
          </ul>

          {/* How We Use Your Information */}
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontSize: {
                xs: "1.5rem",
                md: `clamp(1rem, calc(0.5rem + 0.8vw), 5rem)`,
                lg: `clamp(1rem, calc(1.25rem + 1.5vw), 5rem)`,
                xl: `clamp(1rem, calc(1rem + 1.5vw), 4.5rem)`,
              },
              fontFamily: '"Inter", sans-serif',
              fontWeight: "600",

              color: "#fff",
              mb: 2,
            }}
          >
            How We Use Your Information
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              mb: 2,
              fontSize: {
                md: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
                lg: `clamp(0.5rem, calc(0.8rem + 0.7vw), 1.8rem)`,
                xl: `clamp(0.5rem, calc(0.8rem + 0.8vw), 2.1rem)`,
              },
              fontFamily: '"Inter", sans-serif',
              fontWeight: 200,
            }}
          >
            We use the information we collect for the following purposes:
          </Typography>
          <ul style={{ marginLeft: "3%" }}>
            <li>
              <Typography
                sx={{
                  color: "#fff",
                  mb: 1,
                  fontSize: {
                    md: `clamp(0.2rem, calc(0.5rem + 0.6vw), 1rem)`,
                    lg: `clamp(0.2rem, calc(0.5rem + 0.7vw), 1.2rem)`,
                    xl: `clamp(0.2rem, calc(0.5rem + 0.8vw), 1.5rem)`,
                  },
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 200,
                }}
              >
                To respond to inquiries and communicate with you regarding our
                services.
              </Typography>
            </li>
            <li>
              <Typography
                sx={{
                  color: "#fff",
                  mb: 1,
                  fontSize: {
                    md: `clamp(0.2rem, calc(0.5rem + 0.6vw), 1rem)`,
                    lg: `clamp(0.2rem, calc(0.5rem + 0.7vw), 1.2rem)`,
                    xl: `clamp(0.2rem, calc(0.5rem + 0.8vw), 1.5rem)`,
                  },
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 200,
                }}
              >
                To analyze website usage and improve the user experience.
              </Typography>
            </li>
            <li>
              <Typography
                sx={{
                  color: "#fff",
                  mb: 1,
                  fontSize: {
                    md: `clamp(0.2rem, calc(0.5rem + 0.6vw), 1rem)`,
                    lg: `clamp(0.2rem, calc(0.5rem + 0.7vw), 1.2rem)`,
                    xl: `clamp(0.2rem, calc(0.5rem + 0.8vw), 1.5rem)`,
                  },
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 200,
                }}
              >
                To send you updates about our services or promotional materials
                (only if you opt in).
              </Typography>
            </li>
            {/* <li>
              <Typography sx={{ color: "#fff", mb: 1 }}>
                To monitor and analyze usage patterns to enhance your
                experience.
              </Typography>
            </li>
            <li>
              <Typography sx={{ color: "#fff", mb: 1 }}>
                To comply with legal obligations and protect the rights and
                safety of our users.
              </Typography>
            </li> */}
          </ul>

          {/* Sharing Your Information */}
          <Typography
            sx={{
              fontSize: {
                xs: "1.5rem",
                md: `clamp(1rem, calc(0.5rem + 0.8vw), 5rem)`,
                lg: `clamp(1rem, calc(1.25rem + 1.5vw), 5rem)`,
                xl: `clamp(1rem, calc(1rem + 1.5vw), 4.5rem)`,
              },
              fontFamily: '"Inter", sans-serif',
              fontWeight: "600",

              color: "#fff",
              mb: 2,
            }}
          >
            Sharing Your Information
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              mb: 2,
              fontSize: {
                md: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
                lg: `clamp(0.5rem, calc(0.8rem + 0.7vw), 1.8rem)`,
                xl: `clamp(0.5rem, calc(0.8rem + 0.8vw), 2.1rem)`,
              },
              fontFamily: '"Inter", sans-serif',
              fontWeight: 200,
            }}
          >
            We do not sell or rent your personal information. However, we may
            share your data with:
          </Typography>
          <ul style={{ marginLeft: "3%" }}>
            <li>
              <Typography
                sx={{
                  color: "#fff",
                  mb: 1,
                  fontSize: {
                    md: `clamp(0.2rem, calc(0.5rem + 0.6vw), 1rem)`,
                    lg: `clamp(0.2rem, calc(0.5rem + 0.7vw), 1.2rem)`,
                    xl: `clamp(0.2rem, calc(0.5rem + 0.8vw), 1.5rem)`,
                  },
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 200,
                }}
              >
                Trusted third-party service providers assisting with website
                analytics or communication.
              </Typography>
            </li>
            <li>
              <Typography
                sx={{
                  color: "#fff",
                  mb: 1,
                  fontSize: {
                    md: `clamp(0.2rem, calc(0.5rem + 0.6vw), 1rem)`,
                    lg: `clamp(0.2rem, calc(0.5rem + 0.7vw), 1.2rem)`,
                    xl: `clamp(0.2rem, calc(0.5rem + 0.8vw), 1.5rem)`,
                  },
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 200,
                }}
              >
                Authorities, if required by law or to protect our rights.
              </Typography>
            </li>
            {/* <li>
              <Typography sx={{ color: "#fff", mb: 1 }}>
                <strong>Business Transfers:</strong> In the event of a merger,
                acquisition, or sale of assets, your information may be
                transferred as part of the transaction.
              </Typography>
            </li> */}
          </ul>
          {/* your rights */}
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontSize: {
                xs: "1.5rem",
                md: `clamp(1rem, calc(0.5rem + 0.8vw), 5rem)`,
                lg: `clamp(1rem, calc(1.25rem + 1.5vw), 5rem)`,
                xl: `clamp(1rem, calc(1rem + 1.5vw), 4.5rem)`,
              },
              fontFamily: '"Inter", sans-serif',
              fontWeight: "600",

              color: "#fff",
              mb: 2,
            }}
          >
            Your Rights
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              mb: 2,
              fontSize: {
                md: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
                lg: `clamp(0.5rem, calc(0.8rem + 0.7vw), 1.8rem)`,
                xl: `clamp(0.5rem, calc(0.8rem + 0.8vw), 2.1rem)`,
              },
              fontFamily: '"Inter", sans-serif',
              fontWeight: 200,
            }}
          >
            <strong>Access and Correction: </strong>You can request access to
            your personal data and update inaccuracies.
          </Typography>
          <ul style={{ marginLeft: "3%" }}>
            <li>
              <Typography
                sx={{
                  color: "#fff",
                  mb: 1,
                  fontSize: {
                    md: `clamp(0.2rem, calc(0.5rem + 0.6vw), 1rem)`,
                    lg: `clamp(0.2rem, calc(0.5rem + 0.7vw), 1.2rem)`,
                    xl: `clamp(0.2rem, calc(0.5rem + 0.8vw), 1.5rem)`,
                  },
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 200,
                }}
              >
                <strong>Deletion: </strong>You can request the deletion of your
                personal data, subject to applicable legal obligations.
              </Typography>
            </li>
            <li>
              <Typography
                sx={{
                  color: "#fff",
                  mb: 1,
                  fontSize: {
                    md: `clamp(0.2rem, calc(0.5rem + 0.6vw), 1rem)`,
                    lg: `clamp(0.2rem, calc(0.5rem + 0.7vw), 1.2rem)`,
                    xl: `clamp(0.2rem, calc(0.5rem + 0.8vw), 1.5rem)`,
                  },
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 200,
                }}
              >
                <strong>Opt-Out : </strong> You can unsubscribe from promotional
                communications at any time.
              </Typography>
            </li>
            {/* <li>
              <Typography sx={{ color: "#fff", mb: 1 }}>
                <strong>Business Transfers:</strong> In the event of a merger,
                acquisition, or sale of assets, your information may be
                transferred as part of the transaction.
              </Typography>
            </li> */}
          </ul>

          {/* Data Security */}
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontSize: {
                xs: "1.5rem",
                md: `clamp(1rem, calc(0.5rem + 0.8vw), 5rem)`,
                lg: `clamp(1rem, calc(1.25rem + 1.5vw), 5rem)`,
                xl: `clamp(1rem, calc(1rem + 1.5vw), 4.5rem)`,
              },
              fontFamily: '"Inter", sans-serif',
              fontWeight: "600",

              color: "#fff",
              mb: 2,
            }}
          >
            Data Security
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              mb: 3,
              fontSize: {
                md: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
                lg: `clamp(0.5rem, calc(0.8rem + 0.7vw), 1.8rem)`,
                xl: `clamp(0.5rem, calc(0.8rem + 0.8vw), 2.1rem)`,
              },
              fontFamily: '"Inter", sans-serif',
              fontWeight: 200,
            }}
          >
            We implement reasonable security measures to protect your
            information. However, no system is entirely secure, and we cannot
            guarantee absolute security.
          </Typography>
          {/* third party links */}
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontSize: {
                xs: "1.5rem",
                md: `clamp(1rem, calc(0.5rem + 0.8vw), 5rem)`,
                lg: `clamp(1rem, calc(1.25rem + 1.5vw), 5rem)`,
                xl: `clamp(1rem, calc(1rem + 1.5vw), 4.5rem)`,
              },
              fontFamily: '"Inter", sans-serif',
              fontWeight: "600",

              color: "#fff",
              mb: 2,
            }}
          >
            Third-Party Links
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              mb: 3,
              fontSize: {
                md: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
                lg: `clamp(0.5rem, calc(0.8rem + 0.7vw), 1.8rem)`,
                xl: `clamp(0.5rem, calc(0.8rem + 0.8vw), 2.1rem)`,
              },
              fontFamily: '"Inter", sans-serif',
              fontWeight: 200,
            }}
          >
            Our website may include links to third-party websites. Excollo is
            not responsible for the privacy practices or content of these sites.
          </Typography>

          {/* Changes to This Policy */}
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontSize: {
                xs: "1.5rem",
                md: `clamp(1rem, calc(0.5rem + 0.8vw), 5rem)`,
                lg: `clamp(1rem, calc(1.25rem + 1.5vw), 5rem)`,
                xl: `clamp(1rem, calc(1rem + 1.5vw), 4.5rem)`,
              },
              fontFamily: '"Inter", sans-serif',
              fontWeight: "600",

              color: "#fff",
              mb: 2,
            }}
          >
            Policy Updates
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              mb: 3,
              fontSize: {
                md: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
                lg: `clamp(0.5rem, calc(0.8rem + 0.7vw), 1.8rem)`,
                xl: `clamp(0.5rem, calc(0.8rem + 0.8vw), 2.1rem)`,
              },
              fontFamily: '"Inter", sans-serif',
              fontWeight: 200,
            }}
          >
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with an updated &quot;last revised&quot; date.
          </Typography>

          {/* Contact Us */}
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontSize: {
                xs: "1.5rem",
                md: `clamp(1rem, calc(0.5rem + 0.8vw), 5rem)`,
                lg: `clamp(1rem, calc(1.25rem + 1.5vw), 5rem)`,
                xl: `clamp(1rem, calc(1rem + 1.5vw), 4.5rem)`,
              },
              fontFamily: '"Inter", sans-serif',
              fontWeight: "600",

              color: "#fff",
              mb: 2,
            }}
          >
            Contact Us
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              fontSize: {
                md: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
                lg: `clamp(0.5rem, calc(0.8rem + 0.7vw), 1.8rem)`,
                xl: `clamp(0.5rem, calc(0.8rem + 0.8vw), 2.1rem)`,
              },
              fontFamily: '"Inter", sans-serif',
              fontWeight: 200,
            }}
          >
            If you have questions or concerns about this Privacy Policy, please
            contact us at:
          </Typography>
          <Typography>
            <ul style={{ marginLeft: "3%" }}>
              <li>
                <Typography
                  sx={{
                    // fontSize: "1rem",
                    color: "#fff",
                    fontSize: {
                      md: `clamp(0.2rem, calc(0.5rem + 0.6vw), 1rem)`,
                      lg: `clamp(0.2rem, calc(0.5rem + 0.7vw), 1.2rem)`,
                      xl: `clamp(0.2rem, calc(0.5rem + 0.8vw), 1.5rem)`,
                    },
                    fontFamily: '"Inter", sans-serif',
                    // fontWeight: 200,
                  }}
                >
                  <strong>Email :</strong>
                  <Link
                    href="mailto:info@excollo.com"
                    sx={{
                      color: "#0D6EFD",
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    info@excollo.com
                  </Link>
                </Typography>
              </li>
              <li>
                <Typography
                  sx={{
                    // fontSize: "1rem",
                    color: "#fff",
                    fontSize: {
                      md: `clamp(0.2rem, calc(0.5rem + 0.6vw), 1rem)`,
                      lg: `clamp(0.2rem, calc(0.5rem + 0.7vw), 1.2rem)`,
                      xl: `clamp(0.2rem, calc(0.5rem + 0.8vw), 1.5rem)`,
                    },
                    fontFamily: '"Inter", sans-serif',
                    // fontWeight: 200,
                  }}
                >
                  <strong>Phone :</strong>+91-8890204938
                </Typography>
              </li>
            </ul>
          </Typography>
        </Box>
      </Container>
      {/* Footer */}
      <Box
        sx={{
          textAlign: "center",
          backgroundColor: "#000",
          color: "#FFFFFF",
          padding: "20px 0",
          fontSize: "0.9rem",
          fontFamily: '"Inter", sans-serif',
          fontWeight: "600",
        }}
      >
        <Typography>&copy; 2025 Excollo. All rights reserved.</Typography>
      </Box>
    </>
  );
};
export default PrivacyPolicy;
