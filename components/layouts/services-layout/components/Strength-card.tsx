import { COLORS } from "@/utils/enum";
import { Box, Typography } from "@mui/material";
import React from "react";
import settings from "@/icons/services/technical-expertise.svg";
import Image from "next/image";
import { adelle } from "@/utils/fonts";
import { STRENGTH_CARD_PROPS } from "@/utils/types";
const StrengthCard = ({ img, title, description }: STRENGTH_CARD_PROPS) => {
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: COLORS.PRIMARY_BLUE_LIGHT,
          borderRadius: "32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          height: 220,
        }}
      >
        <Box
          sx={{
            backgroundColor: COLORS.WHITE,
            width: 50,
            height: 50,
            padding: "13px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
          }}
        >
          <Image src={img} alt="settings" />
        </Box>
        <Typography
          sx={{
            fontSize: 20,
            fontFamily: adelle.style.fontFamily,
            fontWeight: 600,
            color: COLORS.BLACK,
            lineHeight: "43px",
            textAlign: "center",
            mt: 2,
          }}
        >
          {" "}
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: 16,
            fontFamily: adelle.style.fontFamily,
            fontWeight: 400,
            color: COLORS.TEXT_PRIMARY_4,
            lineHeight: "26px",
            textAlign: "center",
            mt: 2,
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default StrengthCard;
