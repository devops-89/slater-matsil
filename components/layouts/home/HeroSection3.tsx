"use client";

import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import slider4 from "@/home/slider/slider4.jpg";
import slider5 from "@/home/slider/slider5.jpg";
import slider6 from "@/home/slider/slider6.jpg";
import { COLORS } from "@/utils/enum";
import Image from "next/image";
import { adelle, tradeGothic } from "@/utils/fonts";
import Link from "next/link";
import { useSwiper } from "swiper/react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Autoplay } from "swiper/modules";

const SwiperNavButtons = ({ swiper }: { swiper: any }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent={"flex-end"}
      spacing={2}
      sx={{ mt: 2 }}
    >
      <Button
        onClick={() => swiper?.slidePrev()}
        sx={{
          minWidth: 50,
          height: 50,
          borderRadius: "50%",
          border: `1px solid ${COLORS.PRIMARY_BLUE}`,
          color: COLORS.PRIMARY_BLUE,
          "&:hover": {
            backgroundColor: COLORS.PRIMARY_BLUE,
            color: COLORS.WHITE,
          },
        }}
      >
        <KeyboardArrowLeftIcon />
      </Button>
      <Button
        onClick={() => swiper?.slideNext()}
        sx={{
          minWidth: 50,
          height: 50,
          borderRadius: "50%",
          border: `1px solid ${COLORS.PRIMARY_BLUE}`,
          color: COLORS.PRIMARY_BLUE,
          "&:hover": {
            backgroundColor: COLORS.PRIMARY_BLUE,
            color: COLORS.WHITE,
          },
        }}
      >
        <KeyboardArrowRightIcon />
      </Button>
    </Stack>
  );
};
const HeroSection3 = () => {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const banners = [
    {
      img: slider4,
      title: "Protecting the Ideas That Change the World.",
      description:
        "Partnering with the world’s leading innovators to protect their most valuable intellectual property and secure their competitive advantage globally. ",
    },
    {
      img: slider5,
      title: "Leadership for the Technologies of Tomorrow",
      description:
        "Strategic IP counsel for innovations born from the world's largest R&D investments.",
    },
    {
      img: slider6,
      title: "IP Without Borders. Strategy Without Compromise.",
      description:
        "Delivering intellectual property solutions for clients across more than 50 countries.",
    },
  ];
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg">
        <Swiper
          onSwiper={setSwiperInstance}
          modules={[Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          spaceBetween={20}
          loop={true}
        >
          {banners.map((val, i) => (
            <SwiperSlide key={i}>
              <Grid container alignItems={"center"} spacing={5}>
                <Grid size={6}>
                  <Typography
                    sx={{
                      fontSize: { lg: 50, xs: 24 },
                      color: COLORS.PRIMARY_BLUE,
                      lineHeight: 1.2,
                      fontWeight: 700,
                      fontFamily: tradeGothic.style.fontFamily,
                    }}
                  >
                    {val.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { lg: 20, xs: 14 },
                      color: COLORS.BLACK,
                      fontWeight: 500,
                      lineHeight: 1.5,
                      mt: 3,
                      width: "80%",
                      textAlign: "justify",
                    }}
                  >
                    {val.description}
                  </Typography>
                  <Link href="/about-us">
                    <Button
                      sx={{
                        backgroundColor: COLORS.PRIMARY_BLUE,
                        color: COLORS.WHITE,
                        fontFamily: adelle.style.fontFamily,
                        fontSize: { lg: 16, xs: 14 },
                        fontWeight: 700,
                        lineHeight: "26px",
                        textTransform: "uppercase",
                        mt: 3,
                        borderRadius: 20,
                        width: { lg: 250, xs: 180 },
                        p: 1.5,
                      }}
                    >
                      Learn More
                    </Button>
                  </Link>
                </Grid>
                <Grid size={6}>
                  <Image
                    src={val.img}
                    alt="slider image"
                    style={{
                      width: "100%",
                      height: "450px",
                      borderRadius: 20,
                      objectFit: "cover",
                    }}
                  />
                </Grid>
              </Grid>
            </SwiperSlide>
          ))}
        </Swiper>

        <SwiperNavButtons swiper={swiperInstance} />
      </Container>
    </Box>
  );
};

export default HeroSection3;
