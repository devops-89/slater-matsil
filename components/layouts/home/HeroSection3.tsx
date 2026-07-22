"use client";

import slider4 from "@/home/slider/slider4.webp";
import slider5 from "@/home/slider/slider5.webp";
import slider6 from "@/home/slider/slider6.webp";
import { usePageData } from "@/store/usePageData";
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
  const { details } = usePageData();
  const globalBanners = details?.homepage?.heroSection;

  const defaultBanners = [
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

  const getValidImageUrl = (imageField: any) => {
    if (!imageField || imageField === "deleted") return null;
    
    let url = "";
    if (typeof imageField === "string") {
      url = imageField;
    } else if (typeof imageField === "object" && imageField.url) {
      url = imageField.url;
    } else {
      return null;
    }

    if (url.trim() === "") return null;
    let finalUrl = url.trim();
    // Fix missing protocol for S3 or other external domains
    if (!finalUrl.startsWith("http") && !finalUrl.startsWith("/") && finalUrl.includes("s3")) {
      finalUrl = "https://" + finalUrl;
    }
    // Handle spaces in S3 filenames
    return finalUrl.replace(/ /g, "%20");
  };

  const banners = defaultBanners.map((def: any, idx: number) => {
    const apiSlide = (Array.isArray(globalBanners) ? globalBanners[idx] : null) || {};
    return {
      ...def,
      title: apiSlide.title || def.title,
      description: apiSlide.description || def.description,
      img: getValidImageUrl(apiSlide.imageDownloadUrl || apiSlide.imageUrl || apiSlide.image) || def.img,
    };
  });

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
          key={banners
            .map((b) => (typeof b.img === "string" ? b.img : b.img?.src))
            .join(",")}
          onSwiper={setSwiperInstance}
          modules={[Autoplay]}
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          spaceBetween={20}
          loop={true}
          autoHeight={true}
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
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: { xs: "center", lg: "flex-start" },
                    }}
                  >
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
                          },
                        }}
                      >
                        Learn More
                      </Button>
                    </Link>
                  </Box>
                </Grid>
                <Grid size={{ lg: 6, xs: 12 }}>
                  <Box
                    sx={{
                      width: "100%",
                      height: { lg: "450px", sm: "350px", xs: "250px" },
                      position: "relative",
                    }}
                  >
                    <Image
                      src={val.img}
                      alt="slider image"
                      fill
                      priority={i === 0}
                      unoptimized={true}
                      sizes="(max-width: 1200px) 100vw, 50vw"
                      style={{
                        borderRadius: 20,
                        objectFit: "cover",
                      }}
                    />
                  </Box>
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
