"use client";

import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import React from "react";

import { COLORS } from "@/utils/enum";

// Bypassing TypeScript intrinsic element errors by using React.createElement directly
const SwiperContainer = React.forwardRef((props: any, ref: any) => React.createElement('swiper-container', { ...props, ref }));
const SwiperSlideNode = (props: any) => React.createElement('swiper-slide', props);

const HeroSwiper = ({ banners, SlideContent, onReady }: { banners: any[], SlideContent: any, onReady: () => void }) => {
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    import("swiper/element/bundle").then(({ register }) => {
      register();
      if (swiperRef.current) {
        const swiperContainer = swiperRef.current;
        const params = {
          autoplay: { delay: 7000, disableOnInteraction: false },
          spaceBetween: 20,
          loop: true,
          grabCursor: true,
          on: {
            init: onReady,
          },
        };

        Object.assign(swiperContainer, params);
        swiperContainer.initialize();
      }
    });
  }, [onReady]);

  return (
    <Box 
      sx={{ 
        width: "100%",
        "& swiper-container": { display: "flex", width: "100%", overflow: "hidden" },
        "& swiper-slide": { display: "block", flexShrink: 0, width: "100%", height: "auto" }
      }}
    >
      <SwiperContainer init="false" ref={swiperRef}>
        {banners.map((val, i) => (
          <SwiperSlideNode key={i}>
            <SlideContent val={val} priority={i === 0} />
          </SwiperSlideNode>
        ))}
      </SwiperContainer>
    </Box>
  );
};

export default HeroSwiper;
