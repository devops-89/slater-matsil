"use client";
import InsightsCard from "@/components/layouts/insights-layout/components/Insights-Card";
import HeadingStar from "@/components/widgets/Heading-star";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useRef } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const InsightsSection = () => {
  const { details } = usePageData();
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <Box sx={{ py: 10 }}>
      <Grid container>
        <Grid
        suppressHydrationWarning
          size={{ lg: 5, xs: 12 }}
          sx={{ px: { lg: 10, xs: 2 } }}
          data-aos="fade-up"
        >
          <HeadingStar
            title={details?.homepage?.insights_section?.sectionTitle || "Insights"}
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
            {details?.homepage?.insights_section?.heading || "Recently Published Insights."}
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
        <Grid size={{ lg: 7, xs: 12 }} suppressHydrationWarning data-aos="fade-down">
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
            {(details?.homepage?.insights_section?.insights_data || details?.insightsPage?.insightsData || [])
              .slice(0, 3)
              .map((val: any, i: number) => (
              <SwiperSlide key={i}>
                <InsightsCard
                  title={val.heading || val.title || ""}
                  category={val.category?.text || val.category || "news"}
                  bgColor={val.bgColor || (i % 2 === 0 ? COLORS.LIGHT_GREY : COLORS.PRIMARY_BLUE)}
                  slug={val.slug || ""}
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
