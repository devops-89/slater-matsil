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
        <Box sx={{ mt: 3 }}>
          <CareerTabSection />
        </Box>
        <Button
          endIcon={<ArrowForward sx={{ fontSize: 50 }} />}
          sx={{
            mt: 3,
            borderRadius: "120px",
            border: `1px solid ${COLORS.PRIMARY_BLUE}`,
            backgroundColor: COLORS.PRIMARY_BLUE_LIGHT,
            width: "286px",
            padding: "10px",
            fontSize: 20,
            fontFamily: adelle.style.fontFamily,
            fontWeight: 500,
            lineHeight: "40px",
            color: COLORS.PRIMARY_BLUE,
          }}
        >
          Submit Resume
        </Button>

        <Box sx={{ mt: 5 }}>
          <StarPara
            description={data?.description2 || ""}
            sx={{
              fontSize: 20,
              fontFamily: adelle.style.fontFamily,
              fontWeight: 400,
              color: COLORS.TEXT_TERTIARY,
              mt: 3,
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default OpenRoles;
