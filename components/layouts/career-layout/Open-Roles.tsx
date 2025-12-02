import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import CareerTabSection from "./components/Career-Tab-Section";

const OpenRoles = () => {
  const { details } = usePageData();

  const data = details?.careerPage?.career_open_roles;

  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid size={11} margin={"auto"}>
            <Typography
              sx={{
                fontSize: 50,
                fontWeight: 700,
                fontFamily: tradeGothic.style.fontFamily,
                lineHeight: "72px",
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
                  height: "20px",
                  backgroundColor: COLORS.PRIMARY_GREEN,
                  opacity: 0.4,
                  zIndex: -1,
                  transform: "rotate(-1deg)",
                  width: 800,
                  borderRadius: 8,
                  margin: "auto",
                },
              }}
            >
              {data?.title}
            </Typography>
            <Typography
              sx={{
                fontSize: 24,
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
            fontSize: 24,
            fontFamily: adelle.style.fontFamily,
            fontWeight: 500,
            lineHeight: "40px",
            color: COLORS.PRIMARY_BLUE,
          }}
        >
          {data?.description}
        </Typography>

        <Grid container sx={{ mt: 2 }}>
          <Grid size={10} margin={"auto"}>
            <CareerTabSection />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default OpenRoles;
