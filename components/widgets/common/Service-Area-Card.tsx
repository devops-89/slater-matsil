import { COLORS } from "@/utils/enum";
import { adelle, georgia, inter } from "@/utils/fonts";
import { SERVICES_AREAS_DATA } from "@/utils/types";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ServiceAreaCard = ({
  img,
  title,
  description,
  serialNumber,
  slug,
}: SERVICES_AREAS_DATA) => {
  return (
    <Box
      sx={{
        backgroundColor: COLORS.PRIMARY_BLUE_LIGHT,
        borderRadius: "10px",
        p: 4,
        position: "relative",
        height: "450px",
        transition: "all 0.3s ease-in-out",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          backgroundColor: COLORS.WHITE,
          "& .serial-number-box": {
            backgroundColor: COLORS.PRIMARY_BLUE,
            color: COLORS.WHITE,
          },
          border: `1px solid ${COLORS.PRIMARY_BLUE}`,
          "& .card-title": {
            color: COLORS.PRIMARY_BLUE,
          },
        },
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Image src={img} alt="" style={{ width: 100, height: 100 }} />
      </Box>
      <Link href={`/services/${slug}`} style={{ textDecoration: "none" }}>
        <Typography
          className="card-title"
          sx={{
            textAlign: "center",
            color: COLORS.BLACK,
            fontFamily: georgia.style.fontFamily,
            fontSize: 20,
            fontWeight: 700,
            my: 2,
            transition: "color 0.3s ease-in-out",
          }}
        >
          {title}
        </Typography>
      </Link>
      <Typography
        sx={{
          textAlign: "justify",
          fontFamily: adelle.style.fontFamily,
          fontWeight: 400,
          fontSize: 16,
          lineHeight: "28px",
          mb: 2,
        }}
      >
        {description}
      </Typography>

      <Box
        className="serial-number-box"
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
          transform: "translateX(-50%)",
          bottom: "-20px",
          transition: "all 0.3s ease-in-out",
          color: COLORS.PRIMARY_BLUE,
        }}
      >
        <Typography
          sx={{
            color: "inherit",
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
