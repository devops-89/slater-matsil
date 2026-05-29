"use client";

import { usePageData } from "@/store/usePageData";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useRef } from "react";

import { clientLocations } from "@/public/data/client-locations";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

const Award = () => {
  const { details } = usePageData();
  const globeRef = useRef<any>(null);
  const [canRenderGlobe, setCanRenderGlobe] = useState(false);

useEffect(() => {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");

    if (gl) setCanRenderGlobe(true);
  } catch {
    setCanRenderGlobe(false);
  }
}, []);

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
            {canRenderGlobe && (
  <Globe
    rendererConfig={{ antialias: false }}
    ref={globeRef}
    onGlobeReady={() => {
      if (globeRef.current) {
        globeRef.current.controls().autoRotate = true;
        globeRef.current.controls().autoRotateSpeed = 0.5;
        globeRef.current.pointOfView({
          lat: 39,
          lng: -98,
          altitude: 2.5,
        });
      }
    }}
    globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
    bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
    pointsData={clientLocations}
    pointLat={(d: any) => d.lat}
    pointLng={(d: any) => d.lng}
    pointColor={() => "#4facfe"}
    pointAltitude={0.01}
    pointRadius={0.5}
    width={550}
    height={550}
    backgroundColor="rgba(0,0,0,0)"
  />
)}
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
              {details?.aboutPage?.AWARDSPROPS?.heading1 || "Distinction Defined By"}
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
                  width: { lg: 420, xs: 100 },
                  borderRadius: "20px",
                },
              }}
            >
              {details?.aboutPage?.AWARDSPROPS?.heading2 || "Dedication And Results."}
            </Typography>
            <Grid container>
              {details?.aboutPage?.AWARDSPROPS?.awards_img?.map((val, i) => (
                <Grid size={{ lg: 4, xs: 6 }} key={i}>
                  <Image
                    src={val.img}
                    alt=""
                    unoptimized={true}
                    style={{ width: "100%", height: "auto" }}
                  />
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
