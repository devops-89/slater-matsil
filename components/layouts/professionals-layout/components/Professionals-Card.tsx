import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { PROFESSIONALS_CARD_PROPS } from "@/utils/types";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
const ProfessionalsCard = ({
  img,
  name,
  designation,
  slug,
}: PROFESSIONALS_CARD_PROPS) => {
  return (
    <Link
      href={`/firm-professionals/professionals/${slug}`}
      style={{
        textDecoration: "none",
      }}
    >
      <Box>
        <Box
          sx={{
            position: "relative",
            height: "100%",
            cursor: "pointer",
            "&:hover": {
              "& .info-box": {
                transform: "translateX(-50%)",
                borderTop: `5px solid ${COLORS.PRIMARY_BLUE}`,
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              },
            },
          }}
        >
          <Box
            sx={{
              height: { lg: "380px", md: "340px", sm: "300px", xs: "280px" },
              width: "100%",
              overflow: "hidden",
              borderRadius: "16px",
              position: "relative",
              "& .profile-image": {
                transform: "none",
                transformOrigin: "bottom center",
                transition: "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              },
              "&:hover": {
                "& .profile-image": {
                  transform: "scale(1.05)",
                },
              },
            }}
          >
            <Image
              className="profile-image"
              src={img}
              alt={name || ""}
              fill
              unoptimized
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                objectFit: "cover",
              }}
            />
          </Box>
          <Box
            className="info-box"
            sx={{
              backgroundColor: COLORS.WHITE,
              borderRadius: "16px",
              position: "absolute",
              bottom: { lg: -80, md: -70, sm: -60, xs: -50 },
              width: "80%",
              zIndex: 999,
              p: 1.5,
              borderTop: `5px solid ${COLORS.PRIMARY_GREEN}`,
              left: "50%",
              transform: "translateX(-50%)",
              height: { lg: "134px", md: "120px", sm: "110px", xs: "100px" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            }}
          >
            <Box sx={{}}>
              <Typography
                sx={{
                  fontSize: { lg: 18, md: 16, sm: 15, xs: 14 },
                  fontFamily: tradeGothic.style.fontFamily,
                  fontWeight: 700,
                  color: COLORS.PRIMARY_BLUE,
                  textAlign: "center",
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: COLORS.PRIMARY_GREEN,
                  },
                }}
              >
                {name}
              </Typography>

              <Typography
                sx={{
                  fontSize: { lg: 15, md: 14, sm: 13, xs: 12 },
                  fontFamily: tradeGothic.style.fontFamily,
                  fontWeight: 700,
                  color: COLORS.PRIMARY_BLUE,
                  textAlign: "center",
                  opacity: 0.8,
                  mt: 0.5,
                }}
              >
                {designation}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default ProfessionalsCard;
