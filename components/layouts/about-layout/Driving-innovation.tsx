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
    <Box sx={{ py: { lg: 10, xs: 4 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid size={{ lg: 6, xs: 12 }}>
            <Typography
              sx={{
                fontSize: { lg: 50, xs: 25 },
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                lineHeight: { lg: "65px", xs: "40px" },
                color: COLORS.PRIMARY_BLUE,
              }}
            >
              {details?.aboutPage?.drivingInnovationEverywhere?.heading}
            </Typography>

            {details?.aboutPage?.drivingInnovationEverywhere?.description.map(
              (val, i) => (
                <Typography
                  sx={{
                    fontSize: { lg: 20, xs: 15 },
                    fontFamily: adelle.style.fontFamily,
                    color: COLORS.TEXT_TERTIARY,
                    fontWeight: 400,
                    lineHeight: { lg: "31px", xs: "20px" },
                    textAlign: "justify",
                    mt: 2,
                  }}
                >
                  {val?.label}
                </Typography>
              ),
            )}
          </Grid>
          <Grid size={{ lg: 6, xs: 12 }}>
            <Image
              src={
                details?.aboutPage?.drivingInnovationEverywhere?.img ||
                drivingInnovation
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

export default DrivingInnovation;
