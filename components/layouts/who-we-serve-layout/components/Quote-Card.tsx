"use client";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import upperQuote from "@/icons/Quote.svg";
import lowerQuote from "@/icons/Quote-Inverted.svg";
import Image from "next/image";
import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import { QUOTE_CARD_DATA } from "@/utils/types";
const QuoteCard = ({ quote, author }: QUOTE_CARD_DATA) => {
  const phone = useMediaQuery("(max-width:600px)");
  return (
    <Box sx={{ position: "relative" }}>
      <Stack direction={"row"} alignItems={"flex-start"} spacing={2}>
        <Image
          src={upperQuote}
          alt={""}
          style={{ position: "absolute", left: -40, top: -30 }}
        />
        <Typography
          sx={{
            textAlign: "center",
            color: COLORS.PRIMARY_BLUE,
            fontSize: { lg: 24, xs: 20 },
            fontFamily: adelle.style.fontFamily,
            fontWeight: 600,
            lineHeight: { lg: "38px", xs: "28px" },
            textTransform: "capitalize",
          }}
        >
          {quote}
        </Typography>
        <Image
          src={lowerQuote}
          alt={""}
          style={{ position: "absolute", right: 0, bottom: phone ? 80 : 40 }}
        />
      </Stack>
      <Typography
        sx={{
          textAlign: "center",
          color: COLORS.TEXT_PRIMARY_4,
          mt: { lg: 5, xs: 10 },
          fontWeight: 400,
          fontSize: 18,
          fontFamily: adelle.style.fontFamily,
          textTransform: "capitalize",
        }}
      >
        {author}
      </Typography>
    </Box>
  );
};

export default QuoteCard;
