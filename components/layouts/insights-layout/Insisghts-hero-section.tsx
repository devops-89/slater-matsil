import { Box, Container, Typography } from "@mui/material";
import React from "react";
import bannerSection from "@/insights/insights_hero_img.jpg";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
const InsightsHeroSection = () => {
  return (
    <Box>
      <Container maxWidth="lg">
        <Box
          sx={{
            backgroundImage: `url(${bannerSection.src})`,
            height: "500px",
            width: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: 4,
          }}
        >
          <Box
            sx={{
              backgroundColor: "rgba(0,0,0,0.5)",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
            }}
          >
            <Container maxWidth="lg">
              <Typography
                sx={{
                  color: COLORS.PRIMARY_GREEN,
                  textAlign: "center",
                  fontSize: 70,
                  fontWeight: 700,
                  fontFamily: tradeGothic.style.fontFamily,
                  lineHeight: "72px",
                }}
              >
                Insights
              </Typography>
              <Typography
                sx={{
                  fontSize: 25,
                  fontFamily: adelle.style.fontFamily,
                  textAlign: "center",
                  fontWeight: 600,
                  lineHeight: "72px",
                  color: COLORS.PRIMARY_BLUE_LIGHT,
                }}
              >
                Latest Recognition & Industry Updates
              </Typography>
            </Container>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default InsightsHeroSection;
