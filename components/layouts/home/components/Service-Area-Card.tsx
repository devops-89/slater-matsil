import { COLORS } from "@/utils/enum";
import { adelle, georgia, inter } from "@/utils/fonts";
import { SERVICES_AREAS_DATA } from "@/utils/types";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const ServiceAreaCard = ({
  img,
  title,
  description,
  serialNumber,
}: SERVICES_AREAS_DATA) => {
  return (
    <Box
      sx={{
        backgroundColor: COLORS.PRIMARY_BLUE_LIGHT,
        borderRadius: "10px",
        p: 3,
        position: "relative",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Image src={img} alt="" />
      </Box>
      <Typography
        sx={{
          textAlign: "center",
          color: COLORS.BLACK,
          fontFamily: georgia.style.fontFamily,
          fontSize: 20,
          fontWeight: 700,
          my: 2,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          textAlign: "justify",
          fontFamily: adelle.style.fontFamily,
          fontWeight: 400,
          fontSize: 16,
          lineHeight: "28px",
          mb:2
        }}
      >
        {description}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "20px",
          width: "20px",
          padding: "19px",
          borderRadius: "32px",
          backgroundColor: COLORS.WHITE,
          justifyContent: "center",
          position: "absolute",
          left: "50%",
          right: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Typography
          sx={{
            color: COLORS.PRIMARY_BLUE,
            fontFamily: inter.style.fontFamily,
            fontSize: 20,
            fontWeight: 500,
            lineHeight: "26px",
          }}
        >
          {serialNumber}
        </Typography>
      </Box>
    </Box>
  );
};

export default ServiceAreaCard;
