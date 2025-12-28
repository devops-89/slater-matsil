import { Box, Container, Typography } from "@mui/material";
import React from "react";
import bannerSection from "@/insights/insights_hero_img.jpg";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { usePageData } from "@/store/usePageData";
const InsightsHeroSection = () => {
  const { details } = usePageData();

  return (
    <Box sx={{ my: { lg: 5, xs: 3 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            backgroundImage: `url(${details?.insightsPage?.heroSectionData?.img})`,
            height: { lg: "500px", xs: "300px" },
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
                  fontSize: { lg: 70, xs: 40 },
                  fontWeight: 700,
                  fontFamily: tradeGothic.style.fontFamily,
                  lineHeight: { lg: "72px", xs: "40px" },
                }}
              >
                {details?.insightsPage?.heroSectionData?.heading}
              </Typography>
              <Typography
                sx={{
                  fontSize: { lg: 25, xs: 20 },
                  fontFamily: adelle.style.fontFamily,
                  textAlign: "center",
                  fontWeight: 600,
                  lineHeight: { lg: "72px", xs: "25px" },
                  color: COLORS.PRIMARY_BLUE_LIGHT,
                  mt: { xs: 2, lg: 0 },
                }}
              >
                {details?.insightsPage?.heroSectionData?.subHeading}
              </Typography>
            </Container>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default InsightsHeroSection;
