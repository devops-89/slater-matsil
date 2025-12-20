import HeadingStar from "@/components/widgets/Heading-star";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import lightLogo from "@/public/images/home/slater-matsil-logo-light.png";
import ServiceAreaCard from "./common/Service-Area-Card";
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

        <Grid container spacing={4} sx={{ mt: 7 }}>
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
        <Stack direction={"row"} alignItems={"center"} spacing={2} my={5}>
          <Divider
            sx={{ flex: 1, borderColor: COLORS.PRIMARY_BLUE, opacity: 1 }}
          />
          <Button
            sx={{
              color: COLORS.PRIMARY_BLUE,
              fontFamily: adelle.style.fontFamily,
              textDecoration: "underline",
              fontWeight: 600,
              fontSize: 16,
              lineHeight: "28px",
            }}
          >
            View More
          </Button>
          <Divider
            sx={{ flex: 1, borderColor: COLORS.PRIMARY_BLUE, opacity: 1 }}
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default ServiceAreas;
