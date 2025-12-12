import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { m } from "framer-motion";

const MobileCards = [
  {
    title: "Iterative Excellence",
    description:
      "Our solutions evolve with your business, ensuring long-term success.",
  },
  {
    title: "Outcome as a Service",
    description: "We deliver tangible results not just digital products.",
  },
  {
    title: "Future-Forward Strategies",
    description:
      "Cutting-edge AI and automation drive scalable, innovative solutions.",
  },
];

const responsive = {
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    partialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30,
  },
};

const CustomDot = ({ onClick, active }) => (
  <span
    onClick={onClick}
    style={{
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      backgroundColor: active ? "#8e54f7" : "rgba(142, 84, 247, 0.3)",
      margin: "1px 4px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      transform: active ? "scale(1.2)" : "scale(1)",
      display: "inline-block",
    }}
  />
);

const ResponsiveCarousel = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1000px",
        mx: "auto",
        textAlign: "center",
      }}
    >
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={4000}
        keyBoardControl
        customTransition="transform 500ms ease-in-out"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        centerMode
        showDots
        customDot={<CustomDot />}
      >
        {MobileCards.map((item, index) => (
          <Box key={index} sx={{ p: 2 }}>
            <Card
              sx={{
                boxShadow: "rgba(133, 86, 245, 0.4) 0px 0px 20px 0px",
                border: "1px solid #7e22ce",
                borderRadius: 3,
                backgroundColor: "#0A0A0A",
                color: "white",
                maxWidth: "90%",
                height: "100%",
                mx: "auto",
                mb: "10%",
                p: 1,
                textAlign: "center",
                "&:hover": {
                  backgroundColor: "#000000",
                  transform: "translateY(-5px)",
                  boxShadow: "rgba(133, 86, 245, 0.4) 0px 0px 25px 0px",
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 100,
                    fontSize: {
                      xs: `clamp(1.35rem, calc(0.5rem + 1vw), 9rem)`,
                      md: `clamp(0.25rem,calc(1rem + 0.5vw),2.2rem)`,
                      lg: `clamp(0.25rem,calc(1rem + 0.8vw),2.2rem)`,
                      xl: `clamp(0.25rem,calc(1rem + 1vw),3rem)`,
                    },
                    background: "linear-gradient(90deg, #2579e3, #8e54f7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: 400,
                    color: "white",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      xs: `clamp(0.5rem, calc(0.6rem + 0.6vw), 1.5rem)`,
                      md: `clamp(0.5rem, calc(0.6rem + 0.4vw), 1.5rem)`,
                      lg: `clamp(0.5rem, calc(0.6rem + 0.6vw), 1.8rem)`,
                      xl: `clamp(0.25rem, calc(0.5rem + 0.8vw), 3rem)`,
                    },
                    fontWeight: 100,
                    lineHeight: "1.5",
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default ResponsiveCarousel;
