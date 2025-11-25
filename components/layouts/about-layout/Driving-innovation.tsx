"use client";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import drivingInnovation from "@/about/driving-vector.png";
const DrivingInnovation = () => {
  const { details } = usePageData();
  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid size={6}>
            <Typography
              sx={{
                fontSize: 50,
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                lineHeight: "65px",
                color: COLORS.PRIMARY_BLUE,
              }}
            >
              {details?.aboutPage?.drivingInnovationEverywhere?.heading}
            </Typography>
            <Typography
              sx={{
                fontSize: 20,
                fontFamily: adelle.style.fontFamily,
                color: COLORS.TEXT_TERTIARY,
                fontWeight: 400,
                lineHeight: "31px",
                textAlign: "justify",
                mt: 2,
              }}
            >
              {details?.aboutPage?.drivingInnovationEverywhere?.description}
            </Typography>
          </Grid>
          <Grid size={6}>
            <Image
              src={
                details?.aboutPage?.drivingInnovationEverywhere?.img ||
                drivingInnovation
              }
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DrivingInnovation;
