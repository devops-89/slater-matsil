import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import career from "@/career/CAREERS.png";
import { adelle, tradeGothic } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";
import careerimage from "@/career/hero-image.png";
import Image from "next/image";
import { usePageData } from "@/store/usePageData";
import StaticIndicators from "@/components/widgets/common/Indicators-static";
const HeroSection = () => {
  const { details } = usePageData();
  return (
    <Box sx={{ py: 10 }}>
      <Box
        sx={{
          backgroundImage: `url(${details?.careerPage?.career_hero_section?.bgImage})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          height: { lg: "100px", xs: "80px" },
          backgroundRepeat: "no-repeat",
        }}
      >
        <Typography
          sx={{
            fontSize: { lg: 70, xs: 50 },
            fontFamily: tradeGothic.style.fontFamily,
            textAlign: "center",
            color: COLORS.PRIMARY_BLUE,
            fontWeight: 700,
            lineHeight: { lg: "80px", xs: "50px" },
          }}
        >
          {details?.careerPage?.career_hero_section?.title}
        </Typography>
      </Box>
      <StaticIndicators sx={{ justifyContent: "center", mt: 4 }} />
      <Container maxWidth="lg">
        <Typography
          sx={{
            fontSize: { lg: 20, xs: 16 },
            fontFamily: tradeGothic.style.fontFamily,
            textAlign: "center",
            color: COLORS.PRIMARY_BLUE,
            fontWeight: 400,
            lineHeight: { lg: "35px", xs: "25px" },
            mt: 2,
          }}
        >
          {details?.careerPage?.career_hero_section?.shortDescription}
        </Typography>
        <Stack
          direction={"row"}
          alignItems="center"
          justifyContent={"center"}
          spacing={3}
          sx={{ mt: 3 }}
        >
          <Button
            sx={{
              backgroundColor: COLORS.PRIMARY_BLUE,
              borderRadius: "43px",
              color: COLORS.WHITE,
              fontWeight: 500,
              fontSize: { lg: 20, xs: 16 },
              fontFamily: adelle.style.fontFamily,
              textTransform: "uppercase",
              width: { lg: "379px", xs: "279px" },
              height: "62px",
            }}
          >
            {details?.careerPage?.career_hero_section?.ctaButton1.text}
          </Button>
          <Button
            sx={{
              borderRadius: "43px",
              color: COLORS.PRIMARY_BLUE,
              fontWeight: 500,
              fontSize: 20,
              fontFamily: adelle.style.fontFamily,
              textTransform: "uppercase",
              width: "412px",
              height: "62px",
              border: "1px solid " + COLORS.PRIMARY_BLUE,
            }}
          >
            {details?.careerPage?.career_hero_section?.ctaButton2.text}
          </Button>
        </Stack>
      </Container>

      <Box sx={{ py: 4 }}>
        {details?.careerPage?.career_hero_section?.heroImage && (
          <Image
            src={details?.careerPage?.career_hero_section?.heroImage}
            alt=""
            style={{ width: "100%", height: "auto" }}
          />
        )}
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
            {details?.careerPage?.career_hero_section?.description}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
