"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import BuildIcon from "@mui/icons-material/Build";
import InventoryIcon from "@mui/icons-material/Inventory";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import WorkIcon from "@mui/icons-material/Work";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CloseIcon from "@mui/icons-material/Close";
import ExcolloWebsiteLogo from "../../assets/logo/ExcolloWebsiteLogo.png";

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const commonLinkStyles = {
    textDecoration: "none",
    fontSize: {
      xs: "clamp(0.875rem, 2vw, 1rem)",
      sm: "clamp(0.875rem, 1.5vw, 1rem)",
      md: "clamp(0.75rem, 0.7vw + 0.7vh, 1.1rem)",
      lg: "clamp(0.8rem, 0.7vw + 0.7vh, 1.2rem)",
      xl: "clamp(0.85rem, 0.7vw + 0.7vh, 1.3rem)",
    },
    position: "relative",
    padding: {
      xs: "8px 12px",
      sm: "8px 14px",
      md: "0px 10px",
      lg: "0px 12px",
      xl: "0px 15px",
    },
    color: "white",
  };

  const menuItems = [
    { text: "Home", path: "/", icon: <HomeIcon /> },
    { text: "About Us", path: "/about", icon: <InfoIcon /> },
    { text: "Our Services", path: "/services", icon: <BuildIcon /> },
    { text: "Our Work", path: "/our-work", icon: <WorkIcon /> },
    { text: "AI Tools", path: "/tools", icon: <SmartToyIcon /> },
    { text: "Our Product", path: "/product", icon: <InventoryIcon /> },
    { text: "Contact us", path: "/contact", icon: <ContactMailIcon /> },
  ];

  const drawer = (
    <Box
      sx={{
        width: { xs: "75vw", sm: "300px" },
        maxWidth: "300px",
        height: "100%",
        bgcolor: "#262427",
        color: "white",
        p: { xs: 2, sm: 3 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box>
          <img
            style={{
              width: "clamp(80px, 60%, 120px)",
              height: "auto",
              maxWidth: "100%"
            }}
            src={ExcolloWebsiteLogo.src}
            alt="excollo"
            loading="lazy"
          />
        </Box>
        <IconButton
          color="inherit"
          onClick={handleDrawerToggle}
          sx={{ display: { md: "none" } }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            component={Link}
            href={item.path}
            onClick={handleDrawerToggle}
            sx={{
              mb: 2,
              color: "#fff",
              minHeight: "48px",
              borderRadius: "8px",
              "&:hover": {
                background: "linear-gradient(180deg, rgba(170, 63, 255, 0.9) 0%, rgba(94, 129, 235, 0.9) 100%)",
                color: "#fff",
                textDecoration: "none",
              },
            }}
          >
            <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
            <FaChevronRight />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          position: "relative",
          width: "100%",
          zIndex: 10,
          pt: 4,
          margin: "0 auto",
          "@media (max-width: 319px)": {
            margin: "0 auto 0 -20px", // Adjust the left margin for smaller screens
          },
          "@media (min-width: 375px && max-width: 725px)": {
            margin: "0 auto", // Adjust for slightly wider but small screens
          },
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            position: "relative",
            width: "88%",
            margin: "auto",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            sx={{ position: "relative", zIndex: 0 }}
          >
            <Link href="/">
              <img
                style={{
                  width: "auto",
                  height: "clamp(32px, 5vh, 60px)",
                  maxWidth: "150px",
                  minHeight: "32px",
                }}
                src={ExcolloWebsiteLogo.src}
                alt="excollo"
                loading="lazy"
              />
            </Link>
          </Box>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: "none" } }}
            >
              <MenuIcon sx={{ color: "#fff", height: "40px", width: "40px" }} />
            </IconButton>
          ) : (
            <Box
              display="flex"
              sx={{
                position: "relative",
                zIndex: 0,
                gap: {
                  md: "0.5rem",
                  lg: "1rem",
                  xl: "2rem",
                },
                alignItems: "center",
              }}
            >
              <Typography
                component={Link}
                href="/"
                sx={{
                  ...commonLinkStyles,
                  height: "100%",
                  fontWeight: "400",
                  mt: { md: 0.5, lg: 1 },
                  padding: {
                    md: "0.4vw 0.8vw",
                    lg: "0.5vw 0.9vw",
                    xl: "0.5vw 1vw",
                  },
                  minHeight: "36px",
                  display: "flex",
                  alignItems: "center",
                  "&:hover": {
                    background:
                      "linear-gradient(180deg, rgba(170, 63, 255, 0.9) 0%, rgba(94, 129, 235, 0.9) 100%)",
                    borderRadius: "80px",
                  },
                }}
              >
                Home
              </Typography>
              <Typography
                component={Link}
                href="/about"
                sx={{
                  ...commonLinkStyles,
                  height: "100%",
                  fontWeight: "400",
                  padding: {
                    md: "0.5vw 0.8vw",
                  },
                  mt: 1,
                  "&:hover": {
                    background:
                      "linear-gradient(180deg, rgba(170, 63, 255, 0.9) 0%, rgba(94, 129, 235, 0.9) 100%)",
                    borderRadius: "80px",
                  },
                }}
              >
                About
              </Typography>
              <Typography
                component={Link}
                href="/services"
                sx={{
                  ...commonLinkStyles,
                  height: "100%",
                  fontWeight: "400",
                  padding: {
                    md: "0.5vw 0.8vw",
                  },
                  mt: 1,
                  // paddingBottom:"-10px",
                  "&:hover": {
                    background:
                      "linear-gradient(180deg, rgba(170, 63, 255, 0.9) 0%, rgba(94, 129, 235, 0.9) 100%)",
                    borderRadius: "80px",
                  },
                }}
              >
                Services
              </Typography>
              <Typography
                component={Link}
                href="/our-work"
                sx={{
                  ...commonLinkStyles,
                  height: "100%",
                  fontWeight: "400",
                  padding: {
                    md: "0.5vw 0.8vw",
                  },
                  mt: 1,
                  "&:hover": {
                    background:
                      "linear-gradient(180deg, rgba(170, 63, 255, 0.9) 0%, rgba(94, 129, 235, 0.9) 100%)",
                    borderRadius: "80px",
                  },
                }}
              >
                Our Work
              </Typography>
              <Typography
                component={Link}
                href="/tools"
                sx={{
                  ...commonLinkStyles,
                  height: "100%",
                  fontWeight: "400",
                  padding: {
                    md: "0.5vw 0.8vw",
                  },
                  mt: 1,
                  "&:hover": {
                    background:
                      "linear-gradient(180deg, rgba(170, 63, 255, 0.9) 0%, rgba(94, 129, 235, 0.9) 100%)",
                    borderRadius: "80px",
                  },
                }}
              >
                AI Tools
              </Typography>
              <Typography
                component={Link}
                href="/product"
                sx={{
                  ...commonLinkStyles,
                  height: "100%",
                  fontWeight: "400",
                  padding: {
                    md: "0.5vw 0.8vw",
                  },
                  mt: 1,
                  "&:hover": {
                    background:
                      "linear-gradient(180deg, rgba(170, 63, 255, 0.9) 0%, rgba(94, 129, 235, 0.9) 100%)",
                    borderRadius: "80px",
                  },
                }}
              >
                Our Product
              </Typography>
              <Typography
                component={Link}
                href="/contact"
                sx={{
                  ...commonLinkStyles,
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  fontWeight: "100",
                  padding: {
                    md: "0.15vw",
                    lg: "0.2vw",
                    xl: "0.25vw",
                  },
                  borderRadius: { md: "35px", lg: "40px", xl: "45px" },
                  background: "transparent",
                  minHeight: "40px",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    padding: "2px", // Adjust the thickness of the border
                    background:
                      "linear-gradient(180deg, rgba(170, 63, 255, 0.9) 0%, rgba(94, 129, 235, 0.9) 100%)",
                    borderRadius: {
                      md: "40px",
                      lg: "40px",
                      xl: "50px",
                    },
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    zIndex: -1,
                  },
                  "&:hover": {
                    "&::before": {
                      background:
                        "linear-gradient(180deg, rgba(170, 63, 255, 0.9) 0%, rgba(94, 129, 235, 0.9) 100%)",
                    },
                    background:
                      "linear-gradient(180deg, rgba(170, 63, 255, 0.9) 0%, rgba(94, 129, 235, 0.9) 100%)",
                  },
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    ...commonLinkStyles,
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "400",
                    position: "relative",
                  }}
                >
                  LET'S TALK
                </Typography>
                <Box sx={{ mt: "4%" }}>
                  <FaChevronRight
                    style={{ marginLeft: "-10px", marginRight: "10px" }}
                  />
                </Box>
              </Typography>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: { xs: "75vw", sm: "300px" },
            maxWidth: "300px",
            overflowX: "hidden",
            backgroundColor: "#1a1a1a",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default NavBar;
