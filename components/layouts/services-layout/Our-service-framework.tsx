import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import ServiceFrameworkCard from "./components/Service-framework-card";

const OurserviceFramework = () => {
  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid size={8} mx="auto">
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
              Our Service{" "}
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
                Framework
              </Typography>
            </Typography>
            <Typography
              sx={{
                color: COLORS.TEXT_PRIMARY_4,
                fontSize: 24,
                fontFamily: adelle.style.fontFamily,
                fontWeight: 400,
                lineHeight: "36px",
                textAlign: "center",
                mt: 5,
              }}
            >
              Comprehensive intellectual property services organized across four
              strategic pillars
            </Typography>
          </Grid>
        </Grid>

        {/* <Grid container>
          <Grid size={3}>
            <ServiceFrameworkCard />
          </Grid>
        </Grid> */}
      </Container>
    </Box>
  );
};

export default OurserviceFramework;
