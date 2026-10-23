import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";
import star from "@/common/heading-star.png";
import { COLORS } from "@/utils/enum";
const StarBox = ({ bgColor }: { bgColor: string }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bgColor,
        width: 40,
        height: 40,
        borderRadius: "50%",
      }}
    >
      <Image src={star} alt="heading-star" />
    </Box>
  );
};

export default StarBox;
