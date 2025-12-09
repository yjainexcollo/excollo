import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const typeColorMap = {
  creators: "#a78bfa",
  developers: "#60a5fa",
  marketers: "#4ade80",
};

const AIToolCard = ({
  icon,
  title,
  description,
  suitableFor,
  suitableForType,
  onClick,
}) => {
  const chipColor = typeColorMap[suitableForType] || "#a78bfa";

  return (
    <Card
      elevation={0}
      onClick={onClick}
      sx={{
        backgroundColor: "#000000",
        borderRadius: "12px",
        border: "1px solid #7e22ce",
        transition: "all 0.3s ease",
        height: { xs: "150px", sm: "200px", md: "100%" },
        display: "flex",
        flexDirection: "column",
        cursor: onClick ? "pointer" : "default",
        '&:hover': {
          background: "linear-gradient(180deg, #05000A 0%, #1B1125 100%)",
          transform: "translateY(-5px)",
          boxShadow: {
            xs: "rgba(133, 86, 245, 0.4) 0px 0px 20px 0px",
            md: "rgba(133, 86, 245, 0.4) 0px 0px 100px 0px",
          },
        },

        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1rem",
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 }, display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Icon */}
        <Box sx={{ mb: { xs: 1.5, sm: 2 }, display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 },
              backgroundColor: "#2a2d3e",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.10)",
              fontSize: { xs: 20, sm: 24 },
              mx: 'auto'
            }}
          >
            {icon}
          </Box>
        </Box>

        {/* Title */}
        <Typography
          component="h3"
          sx={{
            color: "#ffffff",
            fontWeight: 600,
            fontSize: { xs: "1.05rem", sm: "1.2rem" },
            mb: { xs: 1, sm: 1.25 },
            lineHeight: 1.3,
          }}
        >
          {title}
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            color: "rgba(255,255,255,0.70)",
            fontSize: { xs: "0.9rem", sm: "0.95rem" },
            lineHeight: 1.6,
            mb: { xs: 1.25, sm: 1.5 },
            flexGrow: 1,
          }}
        >
          {description}
        </Typography>

        {/* Suitable for */}
        <Typography sx={{ fontSize: { xs: "0.85rem", sm: "0.9rem" } }}>
          <Box component="span" sx={{ color: "rgba(255,255,255,0.6)" }}>Suitable for: </Box>
          <Box component="span" sx={{ fontWeight: 500, color: chipColor }}>{suitableFor}</Box>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AIToolCard;
