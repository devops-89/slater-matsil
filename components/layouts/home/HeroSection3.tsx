"use client";

import slider4 from "@/home/slider/slider4_opt.webp";
import slider5 from "@/home/slider/slider5.webp";
import slider6 from "@/home/slider/slider6.webp";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { getUpdatedDetails } from "@/utils/storeUpdater";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const HeroSwiper = dynamic(() => import("./HeroSwiper"), {
  ssr: false,
});

import { useMediaQuery, useTheme } from "@mui/material";

const DelayedApiImage = ({ val, priority }: { val: any, priority: boolean }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const fallbackSrc = val.fallbackImg || slider4;
  const imageSrc = isMobile ? fallbackSrc : (val.img || fallbackSrc);

  return (
    <Box sx={{ width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Image
        src={imageSrc}
        alt={val.title || "slider image"}
        fill
        sizes="(max-width:900px) 100vw, 50vw"
        style={{ objectFit: "cover", borderRadius: 20 }}
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? "eager" : "lazy"}
        quality={45}
      />
    </Box>
  );
};


const HeroSection3 = ({ apiData }: { apiData?: any }) => {

  const { details: storeDetails } = usePageData();
  
  // Calculate details synchronously using apiData if available, otherwise fallback to store
  const details = apiData ? getUpdatedDetails("home", apiData) : storeDetails;
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
    if (!finalUrl.startsWith("http") && !finalUrl.startsWith("/") && finalUrl.includes("s3")) {
      finalUrl = "https://" + finalUrl;
    }
    return finalUrl.replace(/ /g, "%20");
  };

  const banners = defaultBanners.map((def: any, idx: number) => {
    const apiSlide = (Array.isArray(globalBanners) ? globalBanners[idx] : null) || {};
    return {
      ...def,
      title: apiSlide.title || def.title,
      description: apiSlide.description || def.description,
      img: getValidImageUrl(apiSlide.imageDownloadUrl || apiSlide.imageUrl || apiSlide.image) || def.img,
      fallbackImg: def.img,
    };
  });

  const SlideContent = ({ val, priority = false }: { val: any; priority?: boolean }) => (
    <Grid
      container
      alignItems={"center"}
      spacing={{ xs: 3, md: 4, lg: 5 }}
      direction={{ xs: "column-reverse", md: "row" }}
    >
      <Grid 
        size={{ md: 6, xs: 12 }}
        sx={{
          width: "100%",
          p: { xs: 1, md: 0 },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 24, sm: 28, md: 34, lg: 42, xl: 46 },
            color: COLORS.PRIMARY_BLUE,
            lineHeight: 1.2,
            fontWeight: 700,
            fontFamily: tradeGothic.style.fontFamily,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {val.title}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 14, sm: 15, md: 16, lg: 18 },
            color: COLORS.BLACK,
            fontWeight: 500,
            lineHeight: 1.5,
            mt: { xs: 1.5, md: 2, lg: 3 },
            width: { md: "95%", lg: "85%" },
            textAlign: { xs: "center", md: "justify" },
          }}
        >
          {val.description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          <Button
            component={Link}
            href="/about-us"
            sx={{
              backgroundColor: COLORS.PRIMARY_BLUE,
              color: COLORS.WHITE,
              fontFamily: adelle.style.fontFamily,
              fontSize: { xs: 14, md: 15, lg: 16 },
              fontWeight: 700,
              lineHeight: "24px",
              textTransform: "uppercase",
              mt: { xs: 2, md: 3 },
              borderRadius: 20,
              width: { xs: 160, md: 180, lg: 200 },
              p: 1.2,
              "&:hover": {
                backgroundColor: COLORS.PRIMARY_BLUE,
              },
            }}
          >
            Learn More
          </Button>
        </Box>
      </Grid>
      <Grid size={{ md: 6, xs: 12 }}>
        <Box
          sx={{
            width: "100%",
            height: { xs: "220px", sm: "280px", md: "320px", lg: "370px", xl: "420px" },
            maxWidth: { xs: "100%", md: "520px" },
            mx: "auto",
            position: "relative",
          }}
        >
          <DelayedApiImage val={val} priority={priority} />
        </Box>
      </Grid>
    </Grid>
  );

  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Box
      sx={{
        height: "auto",
        minHeight: { xs: "auto", md: "460px", lg: "520px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 2,
        mb: 4,
        py: { xs: 4, md: 4, lg: 5 },
        backgroundColor: COLORS.LIGHT_GREY,
        borderTop: "1px solid #000 ",
        borderBottom: "1px solid #000 ",
        position: "relative",
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative" }}>
        
        {/* Render only the Swiper. It will handle the LCP correctly if configured right. */}
        <Box sx={{ width: "100%", position: "relative", zIndex: 1 }}>
          {!mounted && banners.length > 0 ? (
            <SlideContent val={banners[0]} priority={true} />
          ) : (
            <HeroSwiper 
              banners={banners} 
              SlideContent={SlideContent} 
            />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection3;
