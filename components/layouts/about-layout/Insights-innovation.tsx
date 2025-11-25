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
          <Grid size={10} margin="auto" sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: 50,
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                lineHeight: "52px",
                color: COLORS.TEXT_TERTIARY,
              }}
            >
              {details?.aboutPage?.innovationInsights?.heading}
            </Typography>
            <Typography
              sx={{
                fontSize: 20,
                fontFamily: adelle.style.fontFamily,
                fontWeight: 400,
                lineHeight: "28px",
                color: COLORS.TEXT_TERTIARY,
                mt: 4,
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
