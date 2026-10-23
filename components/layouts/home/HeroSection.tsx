import Image from "next/image";
import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Container,
  Divider,
  Stack,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";
import heroImage from "@/public/images/home/banner.webp";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { usePageData } from "@/store/usePageData";
import { HOMEPAGE_DATA_PROPS } from "@/utils/types";

const HeroSection = () => {
  const { details } = usePageData();
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      <Box>
        <Box
          sx={{
            position: "relative",
            height: { lg: "110vh", xs: "60vh" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Video Background */}
          <Box
            component="video"
            autoPlay
            muted
            loop
            playsInline
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
            }}
          >
            <source
              src="https://q2mvljsahlkv8cmn.public.blob.vercel-storage.com/SlaterMatsil%20Website%20Video%20%28online-video-cutter.com%29.mp4"
              type="video/mp4"
            />
          </Box>

          {/* Dark overlay for text readability */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.45)",
              zIndex: 1,
            }}
          />
          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
            <Typography
              sx={{
                color: COLORS.WHITE,
                fontSize: { lg: 53, xs: 30 },
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                textAlign: "center",
                textShadow: "0px 4px 10px rgba(0,0,0,0.5)",
              }}
            >
              {details?.homepage?.heroSection?.heading}
            </Typography>
            <Divider sx={{ borderColor: COLORS.WHITE, mb: 4, width: "100%" }} />

            <Typography
              sx={{
                color: COLORS.WHITE,
                fontSize: { lg: 25, xs: 15 },
                fontFamily: adelle.style.fontFamily,
                fontStyle: "italic",
                fontWeight: 300,
                lineHeight: "32px",
                textAlign: "center",
                textShadow: "0px 2px 5px rgba(0,0,0,0.5)",
              }}
            >
              {details?.homepage?.heroSection?.subHeading}
            </Typography>

            {/* <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              spacing={3}
              sx={{ mt: 10 }}
            >
              <IconButton
                onClick={() => setVideoOpen(true)}
                sx={{
                  border: `1px solid ${COLORS.PRIMARY_GREEN}`,
                  cursor: "pointer",
                }}
              >
                <PlayArrowIcon
                  sx={{ fontSize: 40, color: COLORS.PRIMARY_GREEN }}
                />
              </IconButton>
              <Box>
                <Typography
                  sx={{
                    color: COLORS.OFF_WHITE,
                    fontFamily: adelle.style.fontFamily,
                    fontSize: 16,
                    fontWeight: 700,
                    lineHeight: "24px",
                  }}
                >
                  {details?.homepage?.heroSection?.videoHeading?.title}
                </Typography>
                <Typography
                  sx={{
                    color: COLORS.OFF_WHITE,
                    fontFamily: adelle.style.fontFamily,
                    fontSize: 16,
                    fontWeight: 400,
                    lineHeight: "24px",
                  }}
                >
                  {details?.homepage?.heroSection?.videoHeading?.subTitle}
                </Typography>
              </Box>
            </Stack> */}
          </Container>
        </Box>
      </Box>
    </>
  );
};
export default HeroSection;
