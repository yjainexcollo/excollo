import React, { useState, useEffect } from "react";
import { Box, Container, Typography, TextField, Button, Fade, Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IoLogoWhatsapp } from "react-icons/io5";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import Excollo3DCaseStudy from "../../Components/AboutUs/Excollo3DCaseStudy";

const resolveWebhookEndpoint = () => {
  // Use proxy in development, direct URL in production
  return import.meta.env.DEV
    ? '/api/seo-feedback'
    : 'https://n8n-excollo.azurewebsites.net/webhook/528aa770-e351-4ae0-9626-38b398e40487';
};

const SEOFeedback = () => {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submittedDetails, setSubmittedDetails] = useState(null);
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(false);
  const [showStatusDialog, setShowStatusDialog] = useState(false);

  const webhookEndpoint = resolveWebhookEndpoint();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedUrl = url.trim();
    const trimmedEmail = email.trim();

    if (!trimmedUrl || !trimmedEmail) {
      setError("Please enter both a valid URL and an email address.");
      setSuccessMessage("");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(webhookEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ url: trimmedUrl, email: trimmedEmail }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to submit request. Please try again.");
      }

      setSubmittedDetails({ url: trimmedUrl, email: trimmedEmail });
      setSuccessMessage("Report PDF will be sent to the entered email. Please check again in approximately 10 minutes.");
      setShowStatusDialog(true);
      setUrl("");
      setEmail("");
    } catch (err) {
      console.error("Error submitting SEO feedback request:", err);
      setError(err.message || "Failed to submit URL. Please try again.");
      setShowStatusDialog(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowWhatsAppButton(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-close dialog after 15 seconds
  useEffect(() => {
    if (showStatusDialog) {
      const timer = setTimeout(() => {
        setShowStatusDialog(false);
      }, 15000); // 15 seconds

      return () => clearTimeout(timer);
    }
  }, [showStatusDialog]);

  const handleWhatsapp = () => {
    window.open(
      "https://wa.me/918890204938?text=Hey%2C%20I%20need%20help%20with%20a%20tech%20solution.%20Let's%20talk%21",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const isSubmitDisabled = loading || !url.trim() || !email.trim();

  return (
    <Box sx={{ minHeight: "100vh", background: "#000", color: "#fff", position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: { xs: "100%", md: "88%" },
          height: { xs: "120px", sm: "140px", md: "160px" },
          background: `radial-gradient(ellipse at top, rgba(154, 106, 255, 0.6) 0%, rgba(0, 0, 0, 0) 60%)`,
          zIndex: 1,
          opacity: 1,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 3 }}>
        <NavBar />
      </Box>

      <Container
        maxWidth="xl"
        sx={{
          pt: { xs: 4, sm: 6, md: 10 },
          px: { xs: 1, sm: 2, md: 3 },
          position: "relative",
          zIndex: 2,
        }}
      >
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: { xs: 28, sm: 36, md: 48, lg: 62 },
            textAlign: "center",
            fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
            lineHeight: { xs: 1.1, sm: 1.2 },
            mb: { xs: 1, sm: 2 },
          }}
        >
          SEO{" "}
          <Box
            component="span"
            sx={{
              background: "linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Feedback
          </Box>
        </Typography>

        <Typography
          sx={{
            mt: { xs: 1, sm: 2 },
            color: "rgba(255,255,255,0.85)",
            maxWidth: { xs: "100%", sm: 800, md: 900 },
            textAlign: { xs: "left", sm: "justify" },
            mx: "auto",
            fontSize: { xs: 14, sm: 16 },
            lineHeight: { xs: 1.4, sm: 1.6 },
            px: { xs: 1, sm: 0 },
          }}
        >
          Submit the website you want us to analyse along with your email. Our SEO workflow will
          run in the background and email you a PDF report in roughly ten minutes. Watch your inbox
          for the download link—no need to stay on this page.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: { xs: 3, sm: 4, md: 5 },
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 600,
            mx: "auto",
          }}
        >
          <TextField
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="Enter website URL (e.g., https://example.com)"
            fullWidth
            variant="outlined"
            InputProps={{
              sx: {
                color: "#fff",
                fontSize: { xs: 14, sm: 16 },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.2)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#7e22ce",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#7e22ce",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "rgba(255,255,255,0.5)",
                  opacity: 1,
                },
              },
            }}
          />

          <TextField
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email address"
            type="email"
            fullWidth
            variant="outlined"
            InputProps={{
              sx: {
                color: "#fff",
                fontSize: { xs: 14, sm: 16 },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.2)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#7e22ce",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#7e22ce",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "rgba(255,255,255,0.5)",
                  opacity: 1,
                },
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitDisabled}
            sx={{
              mt: 1,
              background: "linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)",
              "&:hover": {
                background: "linear-gradient(180deg, #1d60b8 0%, #7543d1 100%)",
              },
              "&:disabled": {
                background: "rgba(126, 34, 206, 0.3)",
                opacity: 0.5,
              },
            }}
          >
            {loading ? "Submitting..." : "Send me the report"}
          </Button>
        </Box>

      </Container>

      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 1, sm: 2, md: 3 },
          mt: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            mt: { xs: 1, md: 2 },
            mb: { xs: 0, md: 0 },
            position: "relative",
            zIndex: 1,
            background: "#000",
          }}
        >
          <Excollo3DCaseStudy disableScroll />
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

      {/* Status Dialog Popup */}
      <Dialog
        open={showStatusDialog}
        onClose={() => setShowStatusDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: "rgba(0,0,0,0.95)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(126, 34, 206, 0.3)",
            borderRadius: 2,
          },
        }}
      >
        <DialogContent sx={{ p: { xs: 2, sm: 3, md: 4 }, position: "relative" }}>
          <IconButton
            onClick={() => setShowStatusDialog(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "rgba(255,255,255,0.7)",
              "&:hover": {
                color: "#fff",
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            sx={{
              fontSize: { xs: 18, sm: 20, md: 24 },
              fontWeight: 600,
              color: "#7e22ce",
              mb: 2,
              textAlign: "center",
            }}
          >
            Status
          </Typography>

          {submittedDetails && (
            <Box sx={{ mb: 2, color: "rgba(255,255,255,0.85)" }}>
              <Typography variant="body2">
                <strong>URL:</strong> {submittedDetails.url}
              </Typography>
              <Typography variant="body2">
                <strong>Email:</strong> {submittedDetails.email}
              </Typography>
            </Box>
          )}

          {successMessage && (
            <Box
              sx={{
                mb: 2,
                p: 2,
                borderRadius: 1,
                backgroundColor: "rgba(34,197,94,0.12)",
                border: "1px solid rgba(34,197,94,0.2)",
                color: "rgba(209,250,229,0.9)",
              }}
            >
              <Typography variant="body2">{successMessage}</Typography>
            </Box>
          )}

          {error && (
            <Box
              sx={{
                p: 2,
                borderRadius: 1,
                backgroundColor: "rgba(220,38,38,0.12)",
                border: "1px solid rgba(220,38,38,0.2)",
                color: "rgba(254,226,226,0.9)",
              }}
            >
              <Typography variant="body2">{error}</Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SEOFeedback;