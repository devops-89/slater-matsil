import React from "react";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import unparalleledLegalServiceimage from "@/services/unparalled-legal-services.png";
import Image from "next/image";
import { usePageData } from "@/store/usePageData";
const UnParalleledLegalService = () => {
  const { details } = usePageData();

  const unparalled = details?.servicesPage?.unparalleled_props;

  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            backgroundColor: COLORS.PRIMARY_BLUE_LIGHT,
            borderRadius: "32px",
            height: { lg: "348px", xs: "420px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 5,
          }}
        >
          <Grid container alignItems={"center"}>
            <Grid size={{ lg: 8, xs: 12 }}>
              <Typography
                sx={{
                  fontSize: { lg: 25, xs: 20 },
                  color: COLORS.BLACK,
                  fontWeight: 700,
                  lineHeight: { lg: "35px", xs: "25px" },
                  fontFamily: tradeGothic.style.fontFamily,
                  textAlign: "center",
                }}
              >
                "{unparalled?.title}"
              </Typography>
            </Grid>
            <Grid size={{ lg: 4, xs: 12 }}>
              {unparalled?.img && (
                <Image
                  src={unparalled?.img}
                  alt=""
                  style={{ width: "100%", height: "auto" }}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default UnParalleledLegalService;
