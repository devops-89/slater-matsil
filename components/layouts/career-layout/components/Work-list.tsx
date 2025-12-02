import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import star from "@/common/heading-star.png";
import Image from "next/image";
import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import { WORK_LIST_PROPS } from "@/utils/types";
const WorkList = ({ title }: WORK_LIST_PROPS) => {
  return (
    <Box
      sx={{
        backgroundColor: "#ECF8F8",
        borderRadius: "12px",
        padding: "15px",
        // minHeight: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
      }}
    >
      <Box
        sx={{
          width: 50,
          height: 50,
          backgroundColor: COLORS.PRIMARY_GREEN,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Image src={star} alt="" width={15} height={15} />
      </Box>
      <Typography
        sx={{
          color: COLORS.PRIMARY_BLUE,
          fontFamily: adelle.style.fontFamily,
          fontSize: 15,
          fontWeight: 600,
          lineHeight: "24px",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default WorkList;
