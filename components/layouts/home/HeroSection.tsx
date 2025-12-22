import Image from "next/image";
import {
  Box,
  Typography,
  IconButton,
  Container,
  Divider,
  Stack,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import heroImage from "@/public/images/home/banner.png";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { usePageData } from "@/store/usePageData";
import { HOMEPAGE_DATA_PROPS } from "@/utils/types";

const HeroSection = () => {
  const { details } = usePageData();

  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url(${heroImage.src})`,
          height: "110vh",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            sx={{
              color: COLORS.WHITE,
              fontSize: 53,
              fontFamily: tradeGothic.style.fontFamily,
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            {details?.homepage?.heroSection?.heading}
          </Typography>
          <Divider sx={{ borderColor: COLORS.WHITE, mb: 4, width: "100%" }} />

          <Typography
            sx={{
              color: COLORS.WHITE,
              fontSize: 25,
              fontFamily: adelle.style.fontFamily,
              fontStyle: "italic",
              fontWeight: 300,
              lineHeight: "32px",
              textAlign: "center",
            }}
          >
            {details?.homepage?.heroSection?.subHeading}
          </Typography>

          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={3}
            sx={{ mt: 10 }}
          >
            <IconButton sx={{ border: `1px solid ${COLORS.PRIMARY_GREEN}` }}>
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
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};
export default HeroSection;
