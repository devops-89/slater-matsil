import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import career from "@/career/CAREERS.png";
import { adelle, tradeGothic } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";
import careerimage from "@/career/hero-image.png";
import Image from "next/image";
const HeroSection = () => {
  return (
    <Box sx={{ py: 10 }}>
      <Box
        sx={{
          backgroundImage: `url(${career.src})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          height: "100px",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Typography
          sx={{
            fontSize: 70,
            fontFamily: tradeGothic.style.fontFamily,
            textAlign: "center",
            color: COLORS.PRIMARY_BLUE,
            fontWeight: 700,
            lineHeight: "80px",
          }}
        >
          Your Journey Starts Here
        </Typography>
      </Box>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={2}
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

      <Box sx={{ py: 4 }}>
        <Image
          src={careerimage}
          alt=""
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
      <Container maxWidth="lg">
        <Box>
          <Typography
            sx={{
              fontSize: 25,
              fontFamily: adelle.style.fontFamily,
              fontWeight: 500,
              color: COLORS.PRIMARY_BLUE,
              textAlign: "justify",
              lineHeight: "45px",
            }}
          >
            At Slater Matsil, we work at the intersection of technology and law
            to protect the world’s most ambitious ideas. Our team is built with
            engineers, inventors, legal strategists, and IP specialists who turn
            complex innovations into powerful intellectual property. We serve
            global technology leaders, high-growth startups, and visionary
            founders — and we’re always looking for exceptional minds to join
            us.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
