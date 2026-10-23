"use client";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import CareerTabSection from "./components/Career-Tab-Section";
import { ArrowForward } from "@mui/icons-material";
import StarPara from "./components/Star-Para";

const OpenRoles = () => {
  const { details } = usePageData();

  const data = details?.careerPage?.career_open_roles;

  return (
    <Box sx={{ py: { lg: 10, xs: 5 } }}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid size={{ lg: 11, xs: 12 }} margin={"auto"}>
            <Typography
              sx={{
                fontSize: { lg: 50, xs: 30 },
                fontWeight: 700,
                fontFamily: tradeGothic.style.fontFamily,
                lineHeight: { lg: "72px", xs: "40px" },
                color: COLORS.PRIMARY_BLUE,
                textAlign: "center",
                position: "relative",
                zIndex: 1,
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "10px",
                  left: "-4px",
                  right: "-8px",
                  height: { lg: "20px", xs: "10px" },
                  backgroundColor: COLORS.PRIMARY_GREEN,
                  opacity: 0.4,
                  zIndex: -1,
                  transform: "rotate(-1deg)",
                  width: { lg: 800, xs: 250 },
                  borderRadius: 8,
                  margin: "auto",
                },
              }}
            >
              {data?.title}
            </Typography>
            <Typography
              sx={{
                fontSize: { lg: 24, xs: 16 },
                fontFamily: adelle.style.fontFamily,
                fontWeight: 400,
                color: COLORS.TEXT_PRIMARY_24,
                textAlign: "center",
                mt: 2,
              }}
            >
              {data?.shortDescription}
            </Typography>
          </Grid>
        </Grid>
        <Typography
          sx={{
            mt: 3,
            fontSize: { lg: 24, xs: 16 },
            fontFamily: adelle.style.fontFamily,
            fontWeight: 500,
            lineHeight: { lg: "40px", xs: "24px" },
            color: COLORS.PRIMARY_BLUE,
          }}
        >
          {data?.description}
        </Typography>
        <Box sx={{ mt: 3 }}>
          <CareerTabSection />
        </Box>
      </Container>
    </Box>
  );
};

export default OpenRoles;
