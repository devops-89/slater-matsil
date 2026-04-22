"use client";
import slider4 from "@/home/slider/slider4.jpg";
import slider5 from "@/home/slider/slider5.jpg";
import slider6 from "@/home/slider/slider6.jpg";
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
      title: "FLUENT IN TECHNOLOGY. PROVEN IN LAW.",
      description:
        "Partnering with the world's leading innovators to protect their most valuable intellectual property and secure their competitive advantage globally.",
    },
    {
      img: slider5.src,
      title: "UNMATCHED PATENT PROTECTION",
      description:
        "Securing patents for breakthrough innovations arising from billions of dollars in research and development investment across diverse technical fields.",
    },
    {
      img: slider6.src,
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
