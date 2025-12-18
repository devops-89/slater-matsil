import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { adelle, tradeGothic } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";

const WhyChooseUs = () => {
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
              "The Foundation Behind Global Innovation"
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
              Why Choose{" "}
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
                Slater Matsil
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
              We don’t just protect ideas we empower innovation. With deep
              technical expertise and a history of success across industries, we
              ensure your intellectual property stands the test of time.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyChooseUs;
