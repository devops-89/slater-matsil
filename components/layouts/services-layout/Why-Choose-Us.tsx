import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { adelle, tradeGothic } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";
import StrengthCard from "./components/Strength-card";
import { usePageData } from "@/store/usePageData";

const WhyChooseUs = () => {
  const { details } = usePageData();

  const strength = details?.servicesPage.why_choose_strength_props;
  return (
    <Box sx={{ py: { lg: 10, xs: 5 } }}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid size={{ lg: 10, xs: 12 }} mx={"auto"}>
            <Typography
              sx={{
                fontSize: { lg: 17, xs: 15 },
                fontFamily: adelle.style.fontFamily,
                color: COLORS.TEXT_PRIMARY_4,
                fontWeight: 600,
                textAlign: "center",
                mb: 4,
              }}
            >
              "{strength?.title}"
            </Typography>
            <Typography
              sx={{
                fontSize: { lg: 50, xs: 40 },
                fontWeight: 700,
                fontFamily: tradeGothic.style.fontFamily,
                lineHeight: { lg: "72px", xs: "50px" },
                color: COLORS.PRIMARY_BLUE,
                textAlign: { lg: "center", xs: "left" },
                position: "relative",
                zIndex: 1,
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "2px",
                  left: "-4px",
                  right: "-8px",
                  height: { lg: "20px", xs: "15px" },
                  backgroundColor: COLORS.PRIMARY_GREEN,
                  opacity: 0.4,
                  zIndex: -1,
                  transform: "rotate(-2deg)",
                  width: { lg: 800, xs: 280 },
                  borderRadius: 8,
                  margin: { lg: "auto", xs: "0" },
                },
              }}
            >
              {strength?.heading}{" "}
              <Typography
                sx={{
                  fontSize: { lg: 50, xs: 40 },
                  fontFamily: tradeGothic.style.fontFamily,
                  fontWeight: 700,
                  lineHeight: { lg: "72px", xs: "50px" },
                  color: COLORS.BLACK,
                }}
                component={"span"}
              >
                {strength?.spanHeading}
              </Typography>
            </Typography>
            <Typography
              sx={{
                mt: 5,
                textAlign: { lg: "center", xs: "justify" },
                fontFamily: adelle.style.fontFamily,
                fontSize: { lg: 20, xs: 16 },
                fontWeight: 400,
                lineHeight: { lg: "36px", xs: "24px" },
                color: "#272727",
              }}
            >
              {strength?.description}
            </Typography>
          </Grid>
        </Grid>

        <Typography
          sx={{
            color: COLORS.BLACK,
            fontSize: { lg: 35, xs: 25 },
            fontFamily: tradeGothic.style.fontFamily,
            fontWeight: 700,
            lineHeight: { lg: "60px", xs: "40px" },
            mt: 5,
          }}
        >
          {strength?.our_strength?.heading}:
        </Typography>

        <Grid container spacing={4} mt={3}>
          {strength?.our_strength?.data.map((item, index) => (
            <Grid size={{ lg: 3, xs: 12 }} key={index}>
              <StrengthCard
                img={item.img}
                title={item.title}
                description={item.description}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyChooseUs;
