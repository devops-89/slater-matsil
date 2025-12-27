"use client";
import HeadingStar from "@/components/widgets/Heading-star";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import React from "react";
import banner from "@/about/heroImage.jpg";
const AboutHerosection = () => {
  const { details } = usePageData();

  const phone = useMediaQuery("(max-width:600px)");
  return (
    <Box sx={{ py: { lg: 8, xs: 4 } }}>
      <Container maxWidth="lg">
        <HeadingStar
          title={details?.aboutPage?.heroSection?.sectionTitle || ""}
        />

        <Grid container sx={{ mt: 4 }} spacing={{ lg: 4, xs: 2 }}>
          <Grid size={{ lg: 6, xs: 12 }}>
            <Typography
              sx={{
                fontSize: { lg: 30, xs: 20 },
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 600,
                color: COLORS.PRIMARY_BLUE,
              }}
            >
              {details?.aboutPage?.heroSection?.heading}
            </Typography>
          </Grid>
          <Grid size={{ lg: 6, xs: 12 }}>
            <Typography
              sx={{
                fontSize: { lg: 20, xs: 15 },
                fontFamily: adelle.style.fontFamily,
                color: COLORS.TEXT_TERTIARY,
                fontWeight: 400,
                lineHeight: { lg: "31px", xs: "20px" },
                textAlign: "justify",
              }}
            >
              {details?.aboutPage?.heroSection?.description}
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: { lg: 10, xs: 5 } }}>
          <Image
            src={details?.aboutPage?.heroSection?.img || banner}
            alt=""
            style={{
              width: "100%",
              height: phone ? "40vh" : "90vh",
              borderRadius: "20px",
              objectFit: "cover",
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default AboutHerosection;
