import HeadingStar from "@/components/widgets/Heading-star";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";

const HeroServicesSection = () => {
  return (
    <Box>
      <Container maxWidth="lg">
        <Grid container>
          <Grid size={6}>
            <HeadingStar title="Services" />
            <Typography
              sx={{
                fontSize: 45,
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                color: COLORS.BLACK,
                lineHeight: "71px",
                letterSpacing: "-1.68px",
                mt: 2,
              }}
            >
              Evolving Legal Services for a{" "}
              <Typography
                sx={{
                  fontSize: 45,
                  fontFamily: tradeGothic.style.fontFamily,
                  color: COLORS.PRIMARY_BLUE,
                  fontWeight: 700,
                  lineHeight: "71px",
                  letterSpacing: "-1.68px",
                }}
                component={"span"}
              >
                Global IP World
              </Typography>
            </Typography>
            <Typography
              sx={{
                fontSize: 20,
                fontFamily: adelle.style.fontFamily,
                color: COLORS.TEXT_PRIMARY_4,
                fontWeight: 400,
                lineHeight: "30px",
                mt: 2,
              }}
            >
              Technology and globalization are changing the way you do business.
              Our firm bridges law, innovation, and technical expertise to
              protect your ideas.
            </Typography>
          </Grid>
          <Grid size={6}></Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroServicesSection;
