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
import { Link } from "react-router-dom";
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
import ExcolloWebsiteLogo from "../assets/logo/ExcolloWebsiteLogo.png";

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const commonLinkStyles = {
    textDecoration: "none",
    fontSize: "calc(0.7vw + 0.7vh)",
    position: "relative",
    padding: "0px 15px",
    color: "white",
    // "&:hover": {
    //   background:
    //     "linear-gradient(180deg, rgba(170, 63, 255, 0.9) 0%, rgba(94, 129, 235, 0.9) 100%)",
    //   borderRadius: "40px",
    // },
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
        width: 250,
        height: "100%",
        bgcolor: "#262427",
        color: "white",
        p: 2,
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
            style={{ width: "60%", height: "auto" }} // Adjust values as needed
            src={ExcolloWebsiteLogo}
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
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{
              mb: 2,
              color: "#fff",
              "&:hover": {
                background: "gray",
                color: "#fff",
                // border: "1px solid transparent",
                // borderRadius: "40px",
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
            width: "85%",
            margin: "auto",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            sx={{ position: "relative", zIndex: 0 }}
          >
            <Link to="/">
              <img
                style={{
                  width: "auto", // Will adjust based on container size
                  height: "5vh", // Fixed height
                  maxWidth: "100%", // Prevents the image from exceeding its container
                }}
                src={ExcolloWebsiteLogo}
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
                  md: "1rem", // Larger screens
                  lg: "1.5rem", // Extra-large screens
                  xl: "3rem", // Extra-extra-large screens
                },
              }}
            >
              <Typography
                component={Link}
                to="/"
                sx={{
                  ...commonLinkStyles,
                  height: "100%",
                  fontWeight: "200",
                  mt: 1,
                  padding: {
                    md: "0.5vw 0.8vw",
                  },
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
                to="/about"
                sx={{
                  ...commonLinkStyles,
                  height: "100%",
                  fontWeight: "200",
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
                to="/services"
                sx={{
                  ...commonLinkStyles,
                  height: "100%",
                  fontWeight: "200",
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
                to="/our-work"
                sx={{
                  ...commonLinkStyles,
                  height: "100%",
                  fontWeight: "200",
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
                to="/tools"
                sx={{
                  ...commonLinkStyles,
                  height: "100%",
                  fontWeight: "200",
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
                to="/product"
                sx={{
                  ...commonLinkStyles,
                  height: "100%",
                  fontWeight: "200",
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
                to="/contact"
                sx={{
                  ...commonLinkStyles,
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  fontWeight: "100",
                  padding: {
                    md: "0.1vw",
                    xl: "0.25vw",
                  },
                  borderRadius: "40px",
                  background: "transparent",
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
                  component={Link}
                  to="/contact"
                  sx={{
                    ...commonLinkStyles,
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "100",
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
            width: 270,
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
