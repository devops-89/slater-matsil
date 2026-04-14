import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { METRICSPROPS } from "@/utils/types";
import { ArrowUpward } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const MetricsCard = ({ title, count }: METRICSPROPS) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const parseCount = (str: string) => {
    const match = str.match(/(^.*?)([\d,]+(?:\.\d+)?)(.*$)/);
    if (match) {
      return {
        prefix: match[1] || "",
        value: parseFloat(match[2].replace(/,/g, "")),
        suffix: match[3] || "",
      };
    }
    return { prefix: "", value: 0, suffix: str };
  };

  const { prefix, value, suffix } = parseCount(count);

  return (
    <Box ref={ref}>
      <Typography
        sx={{
          color: "#2D2C2B",
          fontFamily: adelle.style.fontFamily,
          fontSize: { lg: 14, xs: 10 },
          fontWeight: 400,
          lineHeight: { lg: "154px 140px 155.875px 130px", xs: "18px" },
          textTransform: "uppercase",
        }}
      >
        {title}
      </Typography>
      <Stack
        direction="row"
        alignItems={"flex-start"}
        justifyContent={{ xs: "flex-start" }}
        spacing={{ lg: 2, xs: 1 }}
        mt={2}
      >
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
          {inView ? (
            <CountUp
              start={0}
              end={value}
              duration={2.5}
              prefix={prefix}
              separator=","
            />
          ) : (
            prefix + "0"
          )}
          <Box component="sup" sx={{ fontSize: "0.6em", py: 1, px: 1 }}>
            +
          </Box>
        </Typography>
      </Stack>
    </Box>
  );
};

export default MetricsCard;
