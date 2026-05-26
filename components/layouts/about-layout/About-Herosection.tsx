"use client";
import HeadingStar from "@/components/widgets/Heading-star";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import ReactPlayer from "react-player";
const AboutHerosection = () => {
  const { details } = usePageData();

  const phone = useMediaQuery("(max-width:600px)");
  return (
    <Box sx={{ py: { lg: 8, xs: 4 } }}>
      <Container maxWidth="lg">
        <HeadingStar
          title={details?.aboutPage?.heroSection?.sectionTitle || "About Slatermatsil"}
        />

        <Grid container sx={{ mt: 4 }} spacing={{ lg: 4, xs: 2 }}>
          <Grid size={{ lg: 6, xs: 12 }}>
            <Typography
              sx={{
                fontSize: { lg: 30, xs: 20 },
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 600,
                color: COLORS.PRIMARY_BLUE,
              }}
            >
              {details?.aboutPage?.heroSection?.heading || "The innovations that set you apart."}
            </Typography>
          </Grid>
          <Grid size={{ lg: 6, xs: 12 }}>
            <Typography
              sx={{
                fontSize: { lg: 20, xs: 15 },
                fontFamily: adelle.style.fontFamily,
                color: COLORS.TEXT_TERTIARY,
                fontWeight: 400,
                lineHeight: { lg: "31px", xs: "20px" },
                textAlign: "justify",
              }}
            >
              {details?.aboutPage?.heroSection?.description || "At Slater Matsil, we know what is required to invent something groundbreaking — and we know what it takes to guard and defend your company’s intellectual capital."}
            </Typography>
          </Grid>
        </Grid>
        {/* <Box sx={{ mt: { lg: 10, xs: 5 } }}>
          <Image
            src={details?.aboutPage?.heroSection?.img || banner}
            alt=""
            style={{
              width: "100%",
              height: phone ? "40vh" : "90vh",
              borderRadius: "20px",
              objectFit: "cover",
            }}
          />
        </Box> */}
        <Grid container sx={{ mt: 14,mx:12 }}>
          <Grid size={12}>
            <ReactPlayer
              src={details?.aboutPage?.heroSection?.videoUrl || "https://q2mvljsahlkv8cmn.public.blob.vercel-storage.com/SlaterMatsil%20Website%20Video%20%28online-video-cutter.com%29.mp4"}
              width={"100%"}
              height={"100%"}
              autoPlay
              muted
              loop
              style={{ borderRadius: 10 }}
              // controls
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutHerosection;
