import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import ServiceFrameworkCard from "./components/Service-framework-card";
import { usePageData } from "@/store/usePageData";

const OurserviceFramework = () => {
  const { details } = usePageData();

  const serviceFrameWorkData = details?.servicesPage?.service_framework_props;

  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid size={{ lg: 8, xs: 12 }} mx="auto">
            <Typography
              sx={{
                fontSize: { lg: 50, xs: 35 },
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
                  width: { lg: 800, xs: 250 },
                  borderRadius: 8,
                  margin: { lg: "auto", xs: "0" },
                },
              }}
            >
              {serviceFrameWorkData?.heading}{" "}
              <Typography
                sx={{
                  fontSize: { lg: 50, xs: 35 },
                  fontFamily: tradeGothic.style.fontFamily,
                  fontWeight: 700,
                  lineHeight: { lg: "72px", xs: "50px" },
                  color: COLORS.BLACK,
                }}
                component={"span"}
              >
                {serviceFrameWorkData?.spanHeading}
              </Typography>
            </Typography>
            <Typography
              sx={{
                color: COLORS.TEXT_PRIMARY_4,
                fontSize: { lg: 24, xs: 16 },
                fontFamily: adelle.style.fontFamily,
                fontWeight: 400,
                lineHeight: { lg: "36px", xs: "24px" },
                textAlign: { lg: "center", xs: "justify" },
                mt: 5,
              }}
            >
              {serviceFrameWorkData?.description}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          {serviceFrameWorkData?.data.map((val, i) => (
            <Grid size={{ lg: 3, xs: 12 }} key={i}>
              <ServiceFrameworkCard heading={val.heading} data={val.data} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default OurserviceFramework;
