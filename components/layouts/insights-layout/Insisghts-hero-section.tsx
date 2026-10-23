"use client";
import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { usePageData } from "@/store/usePageData";
import { getUpdatedDetails } from "@/utils/storeUpdater";

const InsightsHeroSection = ({ apiData }: { apiData?: any }) => {
  const { details: storeDetails } = usePageData();
  const details = apiData ? getUpdatedDetails("insights", apiData) : storeDetails;

  return (
    <Box sx={{ mt: { lg: 3, xs: 2 }, mb: { lg: 6, xs: 4 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            backgroundColor: "#ECF8F8",
            borderRadius: 4,
            px: { lg: 8, md: 6, xs: 3 },
            py: { lg: 8, md: 6, xs: 4 },
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: 56, md: 44, xs: 32 },
              fontFamily: tradeGothic.style.fontFamily,
              fontWeight: 700,
              lineHeight: { lg: "72px", md: "56px", xs: "40px" },
              color: COLORS.PRIMARY_BLUE,
              mb: { lg: 2, xs: 1.5 },
            }}
          >
            {details?.insightsPage?.heroSectionData?.heading}
          </Typography>
          <Box
            sx={{
              width: 110,
              height: 4,
              backgroundColor: COLORS.PRIMARY_GREEN,
              borderRadius: 999,
              mx: "auto",
              mb: { lg: 3, xs: 2 },
            }}
          />
          <Typography
            sx={{
              fontSize: { lg: 20, md: 18, xs: 16 },
              fontFamily: adelle.style.fontFamily,
              fontWeight: 400,
              lineHeight: { lg: "32px", md: "30px", xs: "26px" },
              color: COLORS.PRIMARY_BLUE,
              maxWidth: 760,
              mx: "auto",
            }}
          >
            {details?.insightsPage?.heroSectionData?.subHeading}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default InsightsHeroSection;
