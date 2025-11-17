import Image from "next/image";
import { Box, Typography, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import HeroImage from "@/public/images/home/banner.png";

const HeroSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "60vh", md: "90vh" },
        overflow: "hidden",
      }}
    >
      {/* Background image */}
      <Image
        src={HeroImage}
        alt="Slater Matsil banner"
        fill
        priority
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      {/* Text overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 2,
            px: 2,
            fontFamily: "var(--font-tradegothic)",
            fontSize: 64,
          }}
        >
          A unique team of patent professionals
        </Typography>
        <Box
          sx={{
            width: { xs: "60%", sm: "50%", md: "66%" },
            height: "2px",
            backgroundColor: "rgba(255,255,255,0.8)",
            mb: 2,
            mt: 1,
          }}
        />

        <Typography
          variant="h6"
          sx={{
            // maxWidth: "600px",
            px: 2,
            fontFamily: "var(--font-adelle)",
            fontSize: 30,
            fontStyle: "italic",
          }}
        >
          Safegaurding innovation through legal insight.
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mt: { xs: 1, md: 2 },
            opacity: 0.95,
          }}
        >
          <IconButton
            aria-label="watch video"
            sx={{
              border: "2px solid #72B52B",
              width: 56,
              height: 56,
            }}
          >
            <PlayArrowIcon sx={{ fontSize: 30, color: "#72B52B" }} />
          </IconButton>

          <Box sx={{ textAlign: "left" }}>
            <Typography
              sx={{
                fontSize: 13,
                color: "#F4F8EC",
                fontWeight: 700,
                fontFamily: "var(--font-adelle)",
              }}
            >
              Watch
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                color: "#F4F8EC",
                fontWeight: 400,
                fontFamily: "var(--font-adelle)",
              }}
            >
              That’s how we make it work
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default HeroSection;
