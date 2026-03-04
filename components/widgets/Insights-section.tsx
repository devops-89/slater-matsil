"use client";
import HeadingStar from "@/components/widgets/Heading-star";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import React, { useRef } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import InsightsCard from "@/components/layouts/insights-layout/components/Insights-Card";

const InsightsSection = () => {
  const { details } = usePageData();
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <Box sx={{ py: 10 }}>
      <Grid container>
        <Grid
          size={{ lg: 5, xs: 12 }}
          sx={{ px: { lg: 10, xs: 2 } }}
          data-aos="fade-right"
        >
          <HeadingStar
            title={details?.homepage?.insights_section?.sectionTitle || ""}
          />

          <Typography
            sx={{
              fontSize: { lg: 30, xs: 25 },
              fontFamily: tradeGothic.style.fontFamily,
              color: COLORS.PRIMARY_BLUE,
              fontWeight: 700,
              mt: 2,
            }}
          >
            {details?.homepage?.insights_section?.heading}
          </Typography>

          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={3}
            sx={{ mt: 3 }}
          >
            <IconButton
              onClick={() => swiperRef.current?.slidePrev()}
              sx={{
                backgroundColor: COLORS.PRIMARY_BLUE,
                color: COLORS.WHITE,
                ":hover": {
                  backgroundColor: COLORS.PRIMARY_GREEN,
                },
              }}
            >
              <ArrowBack />
            </IconButton>
            <IconButton
              onClick={() => swiperRef.current?.slideNext()}
              sx={{
                backgroundColor: COLORS.PRIMARY_BLUE,
                color: COLORS.WHITE,
                ":hover": {
                  backgroundColor: COLORS.PRIMARY_GREEN,
                },
              }}
            >
              <ArrowForward />
            </IconButton>
          </Stack>
        </Grid>
        <Grid size={{ lg: 7, xs: 12 }} data-aos="fade-left">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
          >
            {details?.insightsPage?.insightsData?.map((val, i) => (
              <SwiperSlide key={i}>
                <InsightsCard
                  title={val.title}
                  category={val.category}
                  bgColor={val.bgColor}
                  slug={val.slug}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InsightsSection;
