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

const HeroSection = () => {
  return (
    // <Box
    //   sx={{
    //     position: "relative",
    //     width: "100%",
    //     height: { xs: "60vh", md: "90vh" },
    //     overflow: "hidden",
    //   }}
    // >
    //   <Image
    //     src={HeroImage}
    //     alt="Slater Matsil banner"
    //     fill
    //     priority
    //     style={{
    //       objectFit: "cover",
    //       objectPosition: "center",
    //     }}
    //   />

    //   <Box
    //     sx={{
    //       position: "absolute",
    //       top: 0,
    //       left: 0,
    //       width: "100%",
    //       height: "100%",
    //       display: "flex",
    //       flexDirection: "column",
    //       alignItems: "center",
    //       justifyContent: "center",
    //       textAlign: "center",
    //       color: "#fff",
    //     }}
    //   >
    //     <Typography
    //       variant="h3"
    //       sx={{
    //         fontWeight: 700,
    //         mb: 2,
    //         px: 2,
    //         fontFamily: "var(--font-tradegothic)",
    //         fontSize: 64,
    //       }}
    //     >
    //       A unique team of patent professionals
    //     </Typography>
    //     <Box
    //       sx={{
    //         width: { xs: "60%", sm: "50%", md: "66%" },
    //         height: "2px",
    //         backgroundColor: "rgba(255,255,255,0.8)",
    //         mb: 2,
    //         mt: 1,
    //       }}
    //     />

    //     <Typography
    //       variant="h6"
    //       sx={{
    //         px: 2,
    //         fontFamily: "var(--font-adelle)",
    //         fontSize: 30,
    //         fontStyle: "italic",
    //       }}
    //     >
    //       Safegaurding innovation through legal insight.
    //     </Typography>
    //     <Box
    //       sx={{
    //         display: "flex",
    //         alignItems: "center",
    //         gap: 1.5,
    //         mt: { xs: 1, md: 2 },
    //         opacity: 0.95,
    //       }}
    //     >
    //       <IconButton
    //         aria-label="watch video"
    //         sx={{
    //           border: "2px solid #72B52B",
    //           width: 56,
    //           height: 56,
    //         }}
    //       >
    //         <PlayArrowIcon sx={{ fontSize: 30, color: "#72B52B" }} />
    //       </IconButton>

    //       <Box sx={{ textAlign: "left" }}>
    //         <Typography
    //           sx={{
    //             fontSize: 13,
    //             color: "#F4F8EC",
    //             fontWeight: 700,
    //             fontFamily: "var(--font-adelle)",
    //           }}
    //         >
    //           Watch
    //         </Typography>
    //         <Typography
    //           sx={{
    //             fontSize: 12,
    //             color: "#F4F8EC",
    //             fontWeight: 400,
    //             fontFamily: "var(--font-adelle)",
    //           }}
    //         >
    //           That’s how we make it work
    //         </Typography>
    //       </Box>
    //     </Box>
    //   </Box>
    // </Box>
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
            A unique team of patent professionals
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
            Safegaurding innovation through legal insight.
          </Typography>

          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={3}
            sx={{ mt: 10}}
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
                Watch
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
                Thats how we make it work?
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};
export default HeroSection;
