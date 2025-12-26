import HeadingStar from "@/components/widgets/Heading-star";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const HeroServicesSection = () => {
  const { details } = usePageData();

  const service_heroSection_data = details?.servicesPage?.heroSection;
  return (
    <Box sx={{ mt: 10 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ lg: 6, xs: 12 }}>
            {details?.servicesPage?.pageTitle && (
              <HeadingStar title={details?.servicesPage?.pageTitle} />
            )}
            <Typography
              sx={{
                fontSize: { lg: 45, xs: 30 },
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                color: COLORS.BLACK,
                lineHeight: { lg: "71px", xs: "45px" },
                letterSpacing: "-1.68px",
                mt: 2,
              }}
            >
              {service_heroSection_data?.heading1}{" "}
              <Typography
                sx={{
                  fontSize: { lg: 45, xs: 30 },
                  fontFamily: tradeGothic.style.fontFamily,
                  color: COLORS.PRIMARY_BLUE,
                  fontWeight: 700,
                  lineHeight: { lg: "71px", xs: "45px" },
                  letterSpacing: "-1.68px",
                }}
                component={"span"}
              >
                {service_heroSection_data?.heading2}
              </Typography>
            </Typography>
            <Typography
              sx={{
                fontSize: { lg: 20, xs: 16 },
                fontFamily: adelle.style.fontFamily,
                color: COLORS.TEXT_PRIMARY_4,
                fontWeight: 400,
                lineHeight: { lg: "30px", xs: "24px" },
                mt: 2,
              }}
            >
              {service_heroSection_data?.description}
            </Typography>
          </Grid>
          <Grid size={{ lg: 6, xs: 12 }}>
            {service_heroSection_data?.img && (
              <Image
                src={service_heroSection_data?.img}
                alt=""
                style={{ width: "100%", height: "auto" }}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroServicesSection;
