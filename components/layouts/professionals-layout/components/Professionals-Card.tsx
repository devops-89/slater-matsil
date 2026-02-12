import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import professional1 from "@/professionals/professional1.jpg";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { PROFESSIONALS_CARD_PROPS } from "@/utils/types";
import Link from "next/link";
const ProfessionalsCard = ({
  img,
  name,
  designation,
  slug,
}: PROFESSIONALS_CARD_PROPS) => {
  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          height: "100%",
          cursor: "pointer",
          "&:hover": {
            "& .profile-image": {
              transform: "scale(1.05)",
            },
            "& .info-box": {
              transform: "translateX(-50%) translateY(-10px)",
              borderTop: `5px solid ${COLORS.PRIMARY_BLUE}`,
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            },
          },
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
            overflow: "hidden",
            borderRadius: "16px",
          }}
        >
          <Image
            className="profile-image"
            src={img}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          />
        </Box>
        <Box
          className="info-box"
          sx={{
            backgroundColor: COLORS.WHITE,
            borderRadius: "16px",
            position: "absolute",
            bottom: { lg: -100, xs: -120 },
            width: "80%",
            zIndex: 999,
            p: 1,
            borderTop: `5px solid ${COLORS.PRIMARY_GREEN}`,
            left: "50%",
            transform: "translateX(-50%)",
            height: "134px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          }}
        >
          <Box sx={{}}>
            <Link
              href={`/firm-professionals/professionals/${slug}`}
              style={{
                textDecoration: "none", // Removed underline for cleaner look
              }}
            >
              <Typography
                sx={{
                  fontSize: { lg: 20, xs: 15 },
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
            </Link>
            <Typography
              sx={{
                fontSize: { lg: 18, xs: 14 },
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                color: COLORS.PRIMARY_BLUE, // Keeping consistent color
                textAlign: "center",
                opacity: 0.8,
              }}
            >
              {designation}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfessionalsCard;
