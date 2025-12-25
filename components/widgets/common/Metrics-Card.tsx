import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { METRICSPROPS } from "@/utils/types";
import { ArrowUpward } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const MetricsCard = ({ title, count }: METRICSPROPS) => {
  return (
    <Box>
      <Typography
        sx={{
          color: "#2D2C2B",
          fontFamily: adelle.style.fontFamily,
          fontSize: { lg: 14, xs: 12 },
          fontWeight: 400,
          lineHeight: { lg: "154px 140px 155.875px 130px", xs: "20px" },
        }}
      >
        {title}
      </Typography>
      <Stack direction="row" alignItems={"flex-start"} spacing={2} mt={2}>
        <ArrowUpward sx={{ color: COLORS.PRIMARY_GREEN }} />
        <Typography
          sx={{
            color: COLORS.PRIMARY_BLUE,
            fontFamily: tradeGothic.style.fontFamily,
            fontSize: { lg: 40, xs: 20 },
            fontWeight: 700,
            lineHeight: { lg: "55px", xs: "20px" },
            letterSpacing: "-2px",
            textAlign: "center",
          }}
        >
          {count}
        </Typography>
      </Stack>
    </Box>
  );
};

export default MetricsCard;
