"use client";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";

const InsightsInnovation = () => {
  const { details } = usePageData();
  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid
            size={{ lg: 10, xs: 12 }}
            margin="auto"
            sx={{ textAlign: "center" }}
          >
            <Typography
              sx={{
                fontSize: { lg: 50, xs: 25 },
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                lineHeight: { lg: "52px", xs: "32px" },
                color: COLORS.TEXT_TERTIARY,
              }}
            >
              {details?.aboutPage?.innovationInsights?.heading}
            </Typography>
            <Typography
              sx={{
                fontSize: { lg: 20, xs: 15 },
                fontFamily: adelle.style.fontFamily,
                fontWeight: 400,
                lineHeight: { lg: "28px", xs: "25px" },
                color: COLORS.TEXT_TERTIARY,
                mt: { lg: 4, xs: 2 },
              }}
            >
              {details?.aboutPage?.innovationInsights?.description}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default InsightsInnovation;
