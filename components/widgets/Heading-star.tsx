import { COLORS } from "@/utils/enum";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import whiteStar from "@/public/images/common/heading-star.png";
import Image from "next/image";
import { adelle } from "@/utils/fonts";
const HeadingStar = () => {
  return (
    <div>
      <Stack direction={"row"} alignItems={"center"} spacing={3}>
        <Box
          sx={{
            backgroundColor: COLORS.PRIMARY_GREEN,
            width: 36,
            height: 36,
            borderRadius: "18px",
            padding: "11px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image src={whiteStar} alt="" />
        </Box>
        <Typography
          sx={{
            fontSize: 16,
            fontFamily: adelle.style.fontFamily,
            fontWeight: 400,
            color: COLORS.PRIMARY_GREEN,
            textTransform: "uppercase",
            
          }}
        >
          About Slatermatsil
        </Typography>
      </Stack>
    </div>
  );
};

export default HeadingStar;
