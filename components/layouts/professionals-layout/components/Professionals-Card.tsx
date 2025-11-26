import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import professional1 from "@/professionals/professional1.jpg";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { PROFESSIONALS_CARD_PROPS } from "@/utils/types";
const ProfessionalsCard = ({
  img,
  name,
  designation,
}: PROFESSIONALS_CARD_PROPS) => {
  return (
    <Box>
      <Box sx={{ position: "relative", height: "100%" }}>
        <Image
          src={img}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "16px",
          }}
        />
        <Box
          sx={{
            backgroundColor: COLORS.WHITE,
            borderRadius: "16px",
            position: "absolute",
            bottom: -100,
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
          }}
        >
          <Box sx={{}}>
            <Typography
              sx={{
                fontSize: 20,
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                color: COLORS.PRIMARY_BLUE,
                textAlign: "center",
              }}
            >
              {name}
            </Typography>
            <Typography
              sx={{
                fontSize: 18,
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                color: COLORS.PRIMARY_BLUE,
                textAlign: "center",
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
