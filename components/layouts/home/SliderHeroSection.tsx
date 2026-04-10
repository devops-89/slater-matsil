"use client";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import slider1 from "@/home/slider/slider1.jpg";
import slider2 from "@/home/slider/slider2.jpg";
import slider3 from "@/home/slider/slider3.jpg";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import Aos from "aos";

const SliderHeroSection = () => {
  const banners = [
    {
      img: slider1.src,
      title: "FLUENT IN TECHNOLOGY. PROVEN IN LAW.",
      description:
        "Partnering with the world's leading innovators to protect their most valuable intellectual property and secure their competitive advantage globally.",
    },
    {
      img: slider2.src,
      title: "UNMATCHED PATENT PROTECTION",
      description:
        "Securing patents for breakthrough innovations arising from billions of dollars in research and development investment across diverse technical fields.",
    },
    {
      img: slider3.src,
      title: "GLOBAL REACH & PRECISION",
      description:
        "Delivering strategic intellectual property solutions and successful patent prosecutions for top-tier clients in over 150 countries.",
    },
  ];

  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <Box>
      <Swiper
        effect="fade"
        modules={[EffectFade, Autoplay]}
        autoplay={{
          delay: 2000,
        }}
      >
        {banners.map((val, i) => (
          <SwiperSlide key={i}>
            <Box
              sx={{
                backgroundImage: `url(${val.img})`,
                height: "100vh",
                width: "100%",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Container maxWidth="lg">
                  <Grid container>
                    <Grid size={6}>
                      <Typography
                        sx={{
                          fontSize: 40,
                          color: COLORS.WHITE,
                          fontFamily: tradeGothic.style.fontFamily,
                        }}
                      >
                        {val.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 20,
                          color: COLORS.WHITE,
                          fontFamily: adelle.style.fontFamily,
                          mt: 3,
                        }}
                      >
                        {val.description}{" "}
                      </Typography>
                      <Button
                        sx={{
                          backgroundColor: COLORS.PRIMARY_BLUE,
                          color: COLORS.WHITE,
                          fontFamily: tradeGothic.style.fontFamily,
                          fontSize: 16,
                          fontWeight: 700,
                          lineHeight: "26px",
                          textTransform: "uppercase",
                          mt: 3,
                          borderRadius: 20,
                          width: 250,
                          p: 1.5,
                        }}
                      >
                        Learn More
                      </Button>
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default SliderHeroSection;
