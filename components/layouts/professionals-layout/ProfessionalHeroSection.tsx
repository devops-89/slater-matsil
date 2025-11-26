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
          <Grid size={9} margin="auto">
            <Typography
              sx={{
                fontSize: 50,
                fontFamily: tradeGothic.style.fontFamily,
                textAlign: "center",
                color: COLORS.PRIMARY_BLUE,
                fontWeight: 700,
                lineHeight: "70px",
              }}
            >
              {details?.firm_professionals?.professionals_hero_section?.heading}
            </Typography>
          </Grid>
          <Grid size={12} margin="auto">
            <Typography
              sx={{
                color: COLORS.TEXT_TERTIARY,
                fontSize: 16,
                fontFamily: adelle.style.fontFamily,
                fontWeight: 400,
                lineHeight: "47px",
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
          <Grid size={6}>
            {details?.firm_professionals?.professionals_hero_section?.descriptions.map(
              (val, i) => (
                <Typography
                  sx={{
                    color: COLORS.TEXT_TERTIARY,
                    fontFamily: adelle.style.fontFamily,
                    fontWeight: 400,
                    lineHeight: "37px",
                    fontSize: 18,
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
          <Grid size={6}>
            <Image
              src={
                details?.firm_professionals?.professionals_hero_section?.img ||
                heroImage
              }
              alt=""
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfessionalHeroSection;
