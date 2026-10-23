import { Box } from "@mui/material";
import React from "react";
import bannerImage from "@/animation/slatermatsil_texas_dense.svg";
const HeroSection2 = () => {
  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url(${bannerImage.src})`,
          height: "100vh",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></Box>
    </Box>
  );
};

export default HeroSection2;
