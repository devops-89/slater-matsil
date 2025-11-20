import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { METRICSPROPS } from "@/utils/types";
import { ArrowUpward } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const MetricsCard = ({title,count}:METRICSPROPS) => {
  return (
    <Box>
      <Typography
        sx={{
          color: "#2D2C2B",
          fontFamily: adelle.style.fontFamily,
          fontSize: 14,
          fontWeight: 400,
          lineHeight: "30px",
        }}
      >
        {title}
      </Typography>
      <Stack direction="row" alignItems={"flex-start"} spacing={2}>
        <ArrowUpward sx={{ color: COLORS.PRIMARY_GREEN }} />
        <Typography
          sx={{
            color: COLORS.PRIMARY_BLUE,
            fontFamily: tradeGothic.style.fontFamily,
            fontSize: 40,
            fontWeight: 700,
            lineHeight: "55px",
            letterSpacing: "-2px",
          }}
        >
          {count}
        </Typography>
      </Stack>
    </Box>
  );
};

export default MetricsCard;
