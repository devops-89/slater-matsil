import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import work from "@/career/work-with-us.jpg";
const WhyWorkWithus = () => {
  return (
    <Box>
      <Container maxWidth="lg">
        <Typography
          sx={{
            fontSize: 64,
            fontFamily: tradeGothic.style.fontFamily,
            fontWeight: 700,
            lineHeight: "72px",
          }}
        >
          Why Work{" "}
          <Typography
            component={"span"}
            sx={{
              color: COLORS.PRIMARY_GREEN,
              fontSize: 64,
              fontFamily: tradeGothic.style.fontFamily,
              fontWeight: 700,
              lineHeight: "72px",
            }}
          >
            With Us
          </Typography>{" "}
        </Typography>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          spacing={2}
          mt={2}
        >
          <Box
            sx={{
              backgroundColor: COLORS.PRIMARY_BLUE,
              width: 10,
              height: 10,
              borderRadius: "50%",
            }}
          ></Box>

          <Box
            sx={{
              backgroundColor: COLORS.PRIMARY_BLUE,
              width: 50,
              height: 10,
              borderRadius: 20,
            }}
          ></Box>
        </Stack>
        <Typography
          sx={{
            fontSize: 24,
            color: COLORS.PRIMARY_BLUE,
            fontWeight: 400,
            lineHeight: "36px",
            mt: 2,
          }}
        >
          Where Your Talent Meets Purpose
        </Typography>

        <Grid container>
          <Grid size={6}></Grid>
          <Grid size={6}></Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyWorkWithus;
