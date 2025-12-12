import React, { useEffect, useRef } from "react";
import {
  Box,
  Typography,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const WorkTable = styled("section")({
  width: "100%",
  position: "relative",
});

const TableGrid = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
  position: "relative",
  justifyContent: "center", // Center items on all screens
  alignItems: "center", // Center vertically in column layout
  flexDirection: "column",
  [theme.breakpoints.up("xs")]: {
    width: "70%", // Changed from maxWidth: "50%" to width: "100%"
    margin: "auto"
  },
  [theme.breakpoints.up("sm")]: {
    width: "80%", // Changed from maxWidth: "50%" to width: "100%"
  },
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    justifyContent: "center", // Changed from space-evenly to center
    alignItems: "stretch",
    width: "fit-content",
    margin: "0 auto",
  },
}));

const TableContent = styled("div")(({ theme }) => ({
  flex: "1 1",
  margin: "0 0",
  padding: "10px",
  height: "auto",
  opacity: 1,
  transform: "none",
  visibility: "visible",
  transition: "border-color 0.3s ease",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "20px",
  borderRadius: "20px",
  background: "linear-gradient(180deg, #05000A 0%, #1B1125 100%)",
  color: "#fff",
  m: 2,
  border: "2px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.up("md")]: {
    width: "14vw",
    height: "60vh",
    opacity: 0,
    transform: "translateY(100%)",
    visibility: "hidden",
    marginBottom: 0,
    borderRadius: 0,
    padding: "1vw 1vw",
    background: "transparent",
    margin: 0,
    borderLeft: "none",
    "&:first-of-type": {
      borderLeft: "1px solid #7E22CE", // Add back left border only to first card
    },
  },
  [theme.breakpoints.up("lg")]: {
    width: "15vw",
    height: "50vh",
    opacity: 0,
    transform: "translateY(100%)",
    visibility: "hidden",
    marginBottom: 0,
    padding: "1vw 1vw",
    borderRadius: 0,
    background: "transparent",
    margin: 0, // Remove any margin
    borderLeft: "none", // Remove left border
    "&:first-of-type": {
      borderLeft: "1px solid #7E22CE", // Add back left border only to first card
    },
  },
  [theme.breakpoints.up("xl")]: {
    width: "15vw",
    height: "50vh",
    opacity: 0,
    transform: "translateY(100%)",
    visibility: "hidden",
    marginBottom: 0,
    padding: "2vw 1vw",
    borderRadius: 0,
    background: "transparent",
    margin: 0,
    borderLeft: "none",
    "&:first-of-type": {
      borderLeft: "1px solid #7E22CE",
    },
    "& > div": {
      marginTop: "calc(25vh - 100%)",
    },
  },

  "&:hover": {
    borderColor: "#7E22CE !important",
    background: "linear-gradient(180deg, #05000A 0%,#1B1125 50%)",
    zIndex: 1000,
  },

  "& h3": {
    fontFamily: "Inter, sans-serif",
    fontWeight: 500,
    lineHeight: "37.5px",
    margin: "10px auto",
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: "1rem", // default size
    [theme.breakpoints.up("xs")]: {
      fontSize: "clamp(1.35rem, calc(0.5rem + 1vw), 9rem)",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "clamp(0.25rem, calc(1rem + 2vw), 1.7rem)",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "clamp(0.25rem, calc(1.2rem + 4vw), 2.5rem)",
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "clamp(0.25rem, calc(1.4rem + 6vw), 3.3rem)",
    },
  },

  "& p": {
    fontFamily: "Inter, sans-serif",
    fontWeight: 300,
    color: "#9EA4AA",
    margin: "10px",
    lineHeight: 1.6,
    textAlign: "center",
    fontSize: "1rem", // default size
    [theme.breakpoints.up("xs")]: {
      fontSize: "clamp(0.8rem, calc(0.5rem + 1vw), 9rem)",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "clamp(0.5rem, calc(0.6rem + 0.7vw), 1.3rem)",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "clamp(0.5rem, calc(0.5rem + 0.9vw), 1.5rem)",
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "clamp(0.5rem, calc(0.5rem + 1vw), 2.1rem)",
    },
  },
}));

const HowWeWork = () => {
  const containerRef = useRef(null);
  const contentRefs = useRef([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLaptop = useMediaQuery(theme.breakpoints.up("md"));
  const isLargeLaptop = useMediaQuery(theme.breakpoints.up("lg"));
  const isXtraLargeLaptop = useMediaQuery(theme.breakpoints.up("xl"));

 useEffect(() => {
   const isDesktop = window.innerWidth >= 900;
   if (!isDesktop) return;

   const container = containerRef.current;
   const contents = contentRefs.current;

   const mainTl = gsap.timeline({
     scrollTrigger: {
       trigger: container,
       start: "top 0%",
       end: "+=400%",
       pin: true,
       scrub: 0.5,
       anticipatePin: 1,
     },
   });

   contents.forEach((content, index) => {
     if (!content) return;
     const tl = gsap.timeline();
     gsap.set(content, {
       opacity: 0,
       y: 400,
       visibility: "hidden",
       borderColor: "#7E22CE",
     });
     tl.to(content, { visibility: "visible", duration: 1 })
       .to(content, { opacity: 1, y: 0, duration: 5, ease: "power2.out" })
       .to(content, { borderColor: "#FFFFFF", duration: 2, ease: "power2.out" })
       .to(content, { duration: 3 });
     mainTl.add(tl, index * 3);
   });

   return () => ScrollTrigger.getAll().forEach((t) => t.kill());
 }, []);
  return (
    <Box
      ref={containerRef}
      sx={{
        color: "#fff",
        minHeight: "90vh",
        fontFamily: '"Inter", sans-serif',
        letterSpacing: "-0.00833em",
        mt: { xs: "10%", sm: "10%", md: "10%" },
        mb: { xs: "2rem", md: "0rem" },
      }}
    >
      <WorkTable>
        <Box
          sx={{
            mb: { xs: "4rem", md: "10%" },
            ml: { xs: "0rem", sm: "2rem", md: "0rem" },
            position: "relative",
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              lineHeight: 1.167,
              letterSpacing: "-0.01562em",
              fontSize: {
                xs: `clamp(1.75rem, calc(1.15rem + 2vw), 9rem)`,
                md: `clamp(1.75rem, calc(1.25rem + 2vw), 9rem)`,
                lg: `clamp(1.75rem, calc(1.37rem + 2.5vw), 8rem)`,
                xl: `clamp(2.25rem, calc(2rem + 2.5vw), 10rem)`,
              },
              textAlign: "center",
              position: "relative",
              top: "20px",
            }}
          >
            How We{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Work?
            </Box>
          </Typography>
        </Box>
        <TableGrid>
          {[
            {
              title: "Discover",
              content:
                "We begin by exploring your business deeply to uncover challenges, goals, and opportunities.",
            },
            {
              title: "Define",
              content:
                "Pinpoint gaps, assess needs, and identify the technologies required to address them effectively.",
            },
            {
              title: "Design",
              content:
                "Develop innovative, customized solutions specifically tailored to meet your needs and strategic objectives.",
            },
            {
              title: "Develop",
              content:
                " Implement advanced technologies and seamless processes to effectively turn strategies into reality.",
            },
            {
              title: "Deliver",
              content:
                "Execute flawlessly with measurable results and ongoing improvements for long-term success.",
            },
          ].map((step, index) => (
            <Box
              sx={{
                width: { xs: "100%", md: "auto" },
                position: "relative",
                perspective: "1000px",
              }}
              key={index}
            >
              <TableContent
                ref={(el) => (contentRefs.current[index] = el)}
                className="table-content"
              >
                <Box
                  sx={{
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <Box sx={{margin: {xs: "0", md: "10% 0"}}}>
                    <Typography variant="h3">{step.title}</Typography>
                  </Box>
                  <Typography variant="body1">{step.content}</Typography>
                </Box>
              </TableContent>
            </Box>
          ))}
        </TableGrid>
        {/* <LineBox /> */}
      </WorkTable>
    </Box>
  );
};
export default HowWeWork;
