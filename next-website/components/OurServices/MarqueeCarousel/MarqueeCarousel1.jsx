import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import botpress from "../../../assets/marqueelogo1/botpress.png";
import github_copilot from "../../../assets/marqueelogo1/github_copilot.png";
import microsoft_azure from "../../../assets/marqueelogo1/microsoft_azure.png";
import n8n from "../../../assets/marqueelogo1/n8n.png";
import openai from "../../../assets/marqueelogo1/openai.png";
import Zapier from "../../../assets/marqueelogo1/Zapier.png";
import LLama from "../../../assets/marqueelogo1/LLama.png";

const MarqueeCarousel1 = () => {
   const theme = useTheme();
   const isSpecified = useMediaQuery(theme.breakpoints.up("md"));
   const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
   const isXtraLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));
  const technologies = [
    {
      name: "Technology 1",
      content: (
        <Box
          sx={{
            backgroundColor: "gray.700",
            height: 48,
            width: 96,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
          }}
        >
          <img
            src={botpress}
            alt="Logo"
            style={{ height: 70, width: "auto", marginRight: "3rem" }}
          />
        </Box>
      ),
    },
    {
      name: "Technology 2",
      content: (
        <Box
          sx={{
            backgroundColor: "gray.700",
            height: 48,
            width: 96,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
          }}
        >
            <img
              src={github_copilot}
              alt="Logo"
              style={{ height: 20, width: "auto" }}
            />
        </Box>
      ),
    },
    {
      name: "Technology 3",
      content: (
        <Box
          sx={{
            backgroundColor: "gray.700",
            height: 48,
            width: 96,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
          }}
        >
          <img
            src={microsoft_azure}
            alt="Logo"
            style={{ height: 90, width: "auto" }}
          />
        </Box>
      ),
    },
    {
      name: "Technology 4",
      content: (
        <Box
          sx={{
            backgroundColor: "gray.700",
            height: 48,
            width: 96,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
          }}
        >
          <img src={n8n} alt="Logo" style={{ height: 60, width: "auto", marginLeft: "-2rem" }} />
        </Box>
      ),
    },
    {
      name: "Technology 5",
      content: (
        <Box
          sx={{
            backgroundColor: "gray.700",
            height: 48,
            width: 96,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
          }}
        >
          <img src={openai} alt="Logo" style={{ height: 40, width: "auto" }} />
        </Box>
      ),
    },
    {
      name: "Technology 6",
      content: (
        <Box
          sx={{
            backgroundColor: "gray.700",
            height: 48,
            width: 96,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
          }}
        >
          <img src={Zapier} alt="Logo" style={{ height: 40, width: "auto" }} />
        </Box>
      ),
    },
    {
      name: "Technology 7",
      content: (
        <Box
          sx={{
            backgroundColor: "gray.700",
            height: 48,
            width: 96,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
          }}
        >
          <img src={LLama} alt="Logo" style={{ height: 30, width: "auto" }} />
        </Box>
      ),
    },
  ];

 return (
   <Box
     sx={{
       backgroundColor: "black",
       position: "relative",
       zIndex: 1,
     }}
   >
     <Box
       sx={{
         position: "relative",
         display: "flex",
         alignItems: "center",
         top: 0,
         bottom: 0,
       }}
     >
       <Box
         className="animate-marquee"
         sx={{ display: "flex", whiteSpace: "nowrap" }}
       >
         {technologies.concat(technologies).map((tech, index) => (
           <Box key={index} sx={{ flex: "none", mx: {xs: 4, sm: 4,md: 4, lg: 6, xl: 8}, px: {xs: 4, sm: 4,md: 4,lg: 6, xl: 9} }}>
             {tech.content}
           </Box>
         ))}
       </Box>
     </Box>
     <style jsx>{`
       @keyframes marquee {
         0% {
           transform: translateX(0%);
         }
         100% {
           transform: translateX(-100%);
         }
       }
       .animate-marquee {
         display: flex;
         white-space: nowrap;
         animation: marquee 30s linear infinite;
       }
     `}</style>
   </Box>
 );
};

export default MarqueeCarousel1;
