"use client";

import slider4 from "@/home/slider/slider4.jpg";
import slider5 from "@/home/slider/slider5.jpg";
import slider6 from "@/home/slider/slider6.jpg";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

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
        "Strategic IP counsel for innovations derived from the world's largest R&D investments.",
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
        height: { lg: "70vh", xs: "auto" },
        minHeight: { xs: "85vh", lg: "auto" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 2,
        mb: 4,
        py: { xs: 5, lg: 0 },
        backgroundColor: COLORS.LIGHT_GREY,
        borderTop: "1px solid #000 ",
        borderBottom: "1px solid #000 ",
      }}
    >
      <Container maxWidth="lg">
        <Swiper
          onSwiper={setSwiperInstance}
          modules={[Autoplay]}
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          spaceBetween={20}
          loop={true}
          grabCursor
        >
          {banners.map((val, i) => (
            <SwiperSlide key={i}>
              <Grid
                container
                alignItems={"center"}
                spacing={{ lg: 5, xs: 4 }}
                direction={{ xs: "column-reverse", lg: "row" }}
              >
                <Grid size={{ lg: 6, xs: 12 }}>
                  <Typography
                    sx={{
                      fontSize: { lg: 50, xs: 28 },
                      color: COLORS.PRIMARY_BLUE,
                      lineHeight: 1.2,
                      fontWeight: 700,
                      fontFamily: tradeGothic.style.fontFamily,
                      textAlign: { xs: "center", lg: "left" },
                    }}
                  >
                    {val.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { lg: 20, xs: 16 },
                      color: COLORS.BLACK,
                      fontWeight: 500,
                      lineHeight: 1.5,
                      mt: 3,
                      width: { lg: "80%", xs: "100%" },
                      textAlign: { xs: "center", lg: "justify" },
                    }}
                  >
                    {val.description}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: { xs: "center", lg: "flex-start" } }}>
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
                          mt: { lg: 3, xs: 4 },
                          borderRadius: 20,
                          width: { lg: 200, xs: 180 },
                          p: 1.5,
                          "&:hover": {
                            backgroundColor: COLORS.PRIMARY_BLUE,
                          }
                        }}
                      >
                        Learn More
                      </Button>
                    </Link>
                  </Box>
                </Grid>
                <Grid size={{ lg: 6, xs: 12 }} sx={{ width: "100%" }}>
                  <Image
                    src={val.img}
                    alt="slider image"
                    style={{
                      width: "100%",
                      height: "100%",
                      minHeight: "250px",
                      maxHeight: "450px",
                      borderRadius: 20,
                      objectFit: "cover",
                    }}
                  />
                </Grid>
              </Grid>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
};

export default HeroSection3;
