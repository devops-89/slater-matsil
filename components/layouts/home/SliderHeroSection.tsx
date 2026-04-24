"use client";
import slider4 from "@/home/slider/slider7.jpg";
import slider5 from "@/home/slider/slider8.jpg";
import slider6 from "@/home/slider/slider9.jpg";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Aos from "aos";
import { useEffect } from "react";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const SliderHeroSection = () => {
  const banners = [
    {
      img: slider4.src,
      title: "Protecting the Ideas That Change the World.",
      description:
        "Partnering with the world’s leading innovators to protect their most valuable intellectual property and secure their competitive advantage globally. ",
    },
    {
      img: slider5.src,
      title: "Leadership for the Technologies of Tomorrow",
      description:
        "Strategic IP counsel for innovations born from the world's largest R&D investments.",
    },
    {
      img: slider6.src,
      title: "IP Without Borders. Strategy Without Compromise.",
      description:
        "Delivering intellectual property solutions for clients across more than 50 countries.",
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
          delay: 4000,
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
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
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
                          textShadow: "2px 2px 10px rgba(0,0,0,0.9)",
                          lineHeight: "1.3",
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
                          textShadow: "1px 1px 8px rgba(0,0,0,0.8)",
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
