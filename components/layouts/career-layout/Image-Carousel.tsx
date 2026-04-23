import slide1 from "@/career/slider/slide1.jpg";
import slide2 from "@/career/slider/slide2.jpg";
import slide3 from "@/career/slider/slide3.jpg";
import slide10 from "@/career/slider/slider10.jpg";
import slide4 from "@/career/slider/slider4.jpg";
import slide5 from "@/career/slider/slider5.jpg";
import slide6 from "@/career/slider/slider6.jpg";
import slide8 from "@/career/slider/slider8.jpg";
import slide9 from "@/career/slider/slider9.jpg";
import { COLORS } from "@/utils/enum";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const sliderImages = [slide1, slide2, slide3, slide4, slide5, slide6, slide8, slide9,slide10];

const ImageCarousel = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        py: { xs: 4, md: 10 },
        overflow: "hidden",
        "& .swiper": {
          overflow: "visible !important",
          width: "100%",
          maxWidth: "1600px",
          margin: "0 auto",
          px: { xs: 2, md: 4 },
        },
        "& .swiper-slide": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          opacity: 0.4,
          transform: "scale(0.85)",
          height: { xs: "350px", md: "500px" },
        },
        "& .swiper-slide-active": {
          opacity: 1,
          transform: "scale(1.05)",
          zIndex: 2,
        },
        // Custom Pagination Styling
        "& .swiper-pagination-bullet": {
          width: "10px",
          height: "10px",
          backgroundColor: COLORS.PRIMARY_BLUE,
          opacity: 0.2,
          transition: "all 0.3s ease",
        },
        "& .swiper-pagination-bullet-active": {
          width: "35px",
          borderRadius: "10px",
          opacity: 1,
          backgroundColor: COLORS.PRIMARY_BLUE,
        },
      }}
    >
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        grabCursor={true}
        loop={true}
        centeredSlides={true}
        slidesPerView={isMobile ? 1.5 : isTablet ? 2.5 : 1.5}
        spaceBetween={isMobile ? 20 : 40}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: ".prev-btn",
          nextEl: ".next-btn",
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        className="multiSwiper"
      >
        {sliderImages.map((img, i) => (
          <SwiperSlide key={i}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: { xs: "25px", md: "50px" },
                overflow: "hidden",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.2)",
                position: "relative",
                transition: "box-shadow 0.4s ease",
                ".swiper-slide-active &": {
                  boxShadow: "0 40px 80px -20px rgba(0, 56, 101, 0.35)",
                },
              }}
            >
              <Image
                src={img}
                alt={`Slide ${i + 1}`}
                fill
                priority={i < 4}
                style={{
                  objectFit: "cover",
                  objectPosition: i === 4 ? "top center" : "center", 
                }}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      {!isMobile && (
        <>
          <IconButton
            className="prev-btn"
            sx={{
              position: "absolute",
              left: "40px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: "55px",
              height: "55px",
              backgroundColor: "white",
              boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
              color: COLORS.PRIMARY_BLUE,
              "&:hover": {
                backgroundColor: COLORS.PRIMARY_BLUE,
                color: "white",
                transform: "translateY(-50%) scale(1.1)",
              },
            }}
          >
            <IoArrowBack size={24} />
          </IconButton>
          <IconButton
            className="next-btn"
            sx={{
              position: "absolute",
              right: "40px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: "55px",
              height: "55px",
              backgroundColor: "white",
              boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
              color: COLORS.PRIMARY_BLUE,
              "&:hover": {
                backgroundColor: COLORS.PRIMARY_BLUE,
                color: "white",
                transform: "translateY(-50%) scale(1.1)",
              },
            }}
          >
            <IoArrowForward size={24} />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export default ImageCarousel;
