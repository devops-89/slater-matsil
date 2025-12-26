import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import heroImage from "@/professionals/hero_section.png";

const ProfessionalHeroSection = () => {
  const { details } = usePageData();
  return (
    <Box>
      <Container maxWidth="lg">
        <Grid container>
          <Grid size={{ lg: 9, xs: 12 }} margin="auto">
            <Typography
              sx={{
                fontSize: { lg: 50, xs: 25 },
                fontFamily: tradeGothic.style.fontFamily,
                textAlign: "center",
                color: COLORS.PRIMARY_BLUE,
                fontWeight: 700,
                lineHeight: { lg: "70px", xs: "30px" },
              }}
            >
              {details?.firm_professionals?.professionals_hero_section?.heading}
            </Typography>
          </Grid>
          <Grid size={12} margin="auto">
            <Typography
              sx={{
                color: COLORS.TEXT_TERTIARY,
                fontSize: { lg: 16, xs: 14 },
                fontFamily: adelle.style.fontFamily,
                fontWeight: 400,
                lineHeight: { lg: "47px", xs: "20px" },
                textAlign: "center",
                mt: 2,
              }}
            >
              {
                details?.firm_professionals?.professionals_hero_section
                  ?.description1
              }
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={10} sx={{ mt: 4 }}>
          <Grid size={{ lg: 6, xs: 12 }}>
            {details?.firm_professionals?.professionals_hero_section?.descriptions.map(
              (val, i) => (
                <Typography
                  sx={{
                    color: COLORS.TEXT_TERTIARY,
                    fontFamily: adelle.style.fontFamily,
                    fontWeight: 400,
                    lineHeight: { lg: "37px", xs: "20px" },
                    fontSize: { lg: 18, xs: 16 },
                    textAlign: "justify",
                    mt: 1,
                  }}
                  key={i}
                >
                  {val.label}
                </Typography>
              )
            )}
          </Grid>
          <Grid size={{ lg: 6, xs: 12 }}>
            <Image
              src={
                details?.firm_professionals?.professionals_hero_section?.img ||
                heroImage
              }
              alt=""
              style={{ width: "100%", height: "auto" }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfessionalHeroSection;
