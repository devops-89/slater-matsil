"use client";

import { usePageData } from "@/store/usePageData";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useRef } from "react";

import { clientLocations } from "@/public/data/client-locations";
import { COLORS } from "@/utils/enum";
import { CircularProgress } from "@mui/material";
import { Public } from "@mui/icons-material";
import { adelle, tradeGothic } from "@/utils/fonts";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const GlobeFallbackLoader = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 2,
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(10px)",
      padding: "24px 36px",
      borderRadius: "24px",
      boxShadow: "0px 16px 40px rgba(0, 32, 64, 0.12)",
      border: "1.5px solid rgba(0, 177, 176, 0.25)",
      textAlign: "center",
      minWidth: "230px",
    }}
  >
    <style>{`
      @keyframes globe-pulse {
        0% { transform: scale(0.95); opacity: 0.8; }
        50% { transform: scale(1.05); opacity: 1; }
        100% { transform: scale(0.95); opacity: 0.8; }
      }
    `}</style>
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        size={64}
        thickness={4}
        sx={{ color: COLORS.PRIMARY_GREEN }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Public sx={{ color: COLORS.PRIMARY_BLUE, fontSize: 28, animation: "globe-pulse 2s ease-in-out infinite" }} />
      </Box>
    </Box>
    <Typography
      sx={{
        fontFamily: tradeGothic.style.fontFamily,
        fontWeight: 700,
        fontSize: 16,
        color: COLORS.PRIMARY_BLUE,
      }}
    >
      Loading 3D Globe...
    </Typography>
  </Box>
);

const ThreeEarth = dynamic(() => import("@/components/widgets/Three-Earth"), {
  ssr: false,
  loading: () => <GlobeFallbackLoader />,
});

const LazyThreeEarth = () => {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        height: "550px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {visible ? (
        <ThreeEarth height="550px" />
      ) : (
        <GlobeFallbackLoader />
      )}
    </Box>
  );
};

const Award = () => {
  const { details } = usePageData();


  return (
    <Box sx={{ pb: { lg: 10, xs: 5 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={7} alignItems="center">
          <Grid
            size={{ lg: 6, xs: 12 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "550px",
            }}
          >
            <LazyThreeEarth />
          </Grid>

          <Grid size={{ lg: 6, xs: 12 }}>
            <Typography
              sx={{
                fontSize: { lg: "40px", xs: "25px" },
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                letterSpacing: "-3px",
                lineHeight: { lg: "55px", xs: "35px" },
                color: COLORS.PRIMARY_BLUE,
              }}
            >
              {details?.aboutPage?.AWARDSPROPS?.heading1}
            </Typography>
            <Typography
              sx={{
                color: COLORS.BLACK,
                fontSize: { lg: 35, xs: 25 },
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                letterSpacing: "-2px",
                lineHeight: { lg: "55px", xs: "35px" },
                ml: 1,
                position: "relative",
                zIndex: 1,
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "10px",
                  left: "-4px",
                  right: "-8px",
                  height: { lg: "20px", xs: "10px" },
                  backgroundColor: COLORS.PRIMARY_GREEN,
                  opacity: 0.4,
                  zIndex: -1,
                  transform: "rotate(-2deg)",
                  width: { lg: 350, xs: 200 },
                  borderRadius: "20px",
                },
              }}
            >
              {details?.aboutPage?.AWARDSPROPS?.heading2}
            </Typography>
            <Grid container spacing={3} sx={{ mt: 5 }}>
              {(details?.aboutPage?.AWARDSPROPS?.awards_img || []).map((val: any, i: number) => (
                <Grid size={{ lg: 4, xs: 6 }} key={i}>
                  <Box sx={{
                    height: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {(val?.imageDownloadUrl || val?.img?.src || val?.img) ? (
                      <Image
                        src={val?.imageDownloadUrl || val?.img?.src || val?.img}
                        alt=""
                        width={100}
                        height={100}
                        unoptimized={true}
                        style={{ 
                          objectFit: "contain",
                          maxWidth: '100%',
                          maxHeight: '100%'
                        }}
                      />
                    ) : null}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Award;
