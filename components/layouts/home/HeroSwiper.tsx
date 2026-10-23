"use client";

import { Box } from "@mui/material";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

const HeroSwiper = ({
  banners,
  SlideContent,
}: {
  banners: any[];
  SlideContent: any;
}) => {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  return (
    <Box
      className="embla"
      ref={emblaRef}
      sx={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        className="embla__container"
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {banners.map((val, i) => (
          <Box
            className="embla__slide"
            key={i}
            sx={{
              flex: "0 0 100%",
              minWidth: 0,
              paddingRight: "20px",
            }}
          >
            <SlideContent val={val} priority={i === 0} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HeroSwiper;
