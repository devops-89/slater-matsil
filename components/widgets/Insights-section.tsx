"use client";
import InsightsCard from "@/components/layouts/insights-layout/components/Insights-Card";
import HeadingStar from "@/components/widgets/Heading-star";
import { usePageData } from "@/store/usePageData";
import { InsightControllers } from "@/api/insightControllers";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const InsightsSection = () => {
  const { details } = usePageData();
  const swiperRef = useRef<SwiperType | null>(null);
  const [insights, setInsights] = useState<any[]>([]);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await InsightControllers.getAllInsights({ limit: 1000 });
        const data = res.data?.data?.data?.insights || res.data?.data?.insights || [];
        setInsights(data);
      } catch (e) {
        console.error("Failed to fetch recent insights", e);
      }
    };
    fetchInsights();
  }, []);

  const displayInsights = insights.length > 0 ? insights.map(insight => ({
    title: insight.insightTitle || insight.title,
    category: insight.category,
    bgColor: insight.cardTheme || COLORS.PRIMARY_BLUE,
    slug: insight.id.toString(),
  })) : details?.insightsPage?.insightsData || [];

  return (
    <Box sx={{ py: 10 }}>
      <Grid container>
        <Grid
          size={{ lg: 5, xs: 12 }}
          sx={{ px: { lg: 10, xs: 2 } }}
          data-aos="fade-up"
          suppressHydrationWarning
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
        <Grid 
          size={{ lg: 7, xs: 12 }} 
          suppressHydrationWarning 
          data-aos="fade-down"
          sx={{ 
            pl: { lg: 0, xs: 2 },
            pr: { lg: 0, xs: 2 },
            mt: { xs: 4, lg: 0 },
            pb: { xs: 2, lg: 0 }
          }}
        >
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={20}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
          >
            {displayInsights.map((val: any, i: number) => (
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
