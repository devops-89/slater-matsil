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
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid size={10} mx={"auto"}>
            <Typography
              sx={{
                fontSize: 17,
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
                  bottom: "2px",
                  left: "-4px",
                  right: "-8px",
                  height: "20px",
                  backgroundColor: COLORS.PRIMARY_GREEN,
                  opacity: 0.4,
                  zIndex: -1,
                  transform: "rotate(-2deg)",
                  width: 800,
                  borderRadius: 8,
                  margin: "auto",
                },
              }}
            >
              {strength?.heading}{" "}
              <Typography
                sx={{
                  fontSize: 50,
                  fontFamily: tradeGothic.style.fontFamily,
                  fontWeight: 700,
                  lineHeight: "72px",
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
                textAlign: "center",
                fontFamily: adelle.style.fontFamily,
                fontSize: 20,
                fontWeight: 400,
                lineHeight: "36px",
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
            fontSize: 35,
            fontFamily: tradeGothic.style.fontFamily,
            fontWeight: 700,
            lineHeight: "60px",
            mt: 5,
          }}
        >
          {strength?.our_strength?.heading}:
        </Typography>

        <Grid container spacing={4} mt={3}>
          {strength?.our_strength?.data.map((item, index) => (
            <Grid size={3} key={index}>
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
