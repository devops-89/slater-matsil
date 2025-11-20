import HeadingStar from "@/components/widgets/Heading-star";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import lightLogo from "@/public/images/home/slater-matsil-logo-light.png";
import ServiceAreaCard from "./components/Service-Area-Card";
const ServiceAreas = () => {
  const { details } = usePageData();
  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box>
            <HeadingStar
              title={details?.homepage?.service_area?.sectionTitle || ""}
            />
            <Typography
              sx={{
                color: COLORS.PRIMARY_BLUE,
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                fontSize: 42,
                width: "70%",
              }}
            >
              {details?.homepage?.service_area?.heading}
            </Typography>
          </Box>
          {details?.homepage?.service_area?.img && (
            <Image src={details?.homepage?.service_area?.img} alt="" />
          )}
        </Stack>

        <Grid container>
          {details?.homepage?.service_area?.section_Data.map((val, i) => (
            <Grid size={4} key={i}>
              <ServiceAreaCard
                img={val.img}
                title={val.title}
                description={val.description}
                serialNumber={val.serialNumber}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ServiceAreas;
