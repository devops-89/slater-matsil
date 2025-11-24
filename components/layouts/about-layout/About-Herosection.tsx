"use client";
import HeadingStar from "@/components/widgets/Heading-star";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import banner from "@/about/heroImage.jpg";
const AboutHerosection = () => {
  const { details } = usePageData();
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <HeadingStar
          title={details?.aboutPage?.heroSection?.sectionTitle || ""}
        />

        <Grid container sx={{ mt: 4 }} spacing={4}>
          <Grid size={6}>
            <Typography
              sx={{
                fontSize: 30,
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 600,
                color: COLORS.PRIMARY_BLUE,
              }}
            >
              {details?.aboutPage?.heroSection?.heading}
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography
              sx={{
                fontSize: 20,
                fontFamily: adelle.style.fontFamily,
                color: COLORS.PRIMARY_BLUE,
                fontWeight: 400,
                lineHeight: "31px",
                textAlign: "justify",
              }}
            >
              {details?.aboutPage?.heroSection?.description}
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4 }}>
          <Image
            src={details?.aboutPage?.heroSection?.img || banner}
            alt=""
            style={{
              width: "100%",
              height: "90vh",
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
