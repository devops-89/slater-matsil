import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import upperQuote from "@/icons/Quote.svg";
import lowerQuote from "@/icons/Quote-Inverted.svg";
import Image from "next/image";
import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import { QUOTE_CARD_DATA } from "@/utils/types";
const QuoteCard = ({ quote, author }: QUOTE_CARD_DATA) => {
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
            fontSize: 24,
            fontFamily: adelle.style.fontFamily,
            fontWeight: 600,
            lineHeight: "38px",
            textTransform: "capitalize",
          }}
        >
          {quote}
        </Typography>
        <Image
          src={lowerQuote}
          alt={""}
          style={{ position: "absolute", right: 0, bottom: 40 }}
        />
      </Stack>
      <Typography
        sx={{
          textAlign: "center",
          color: COLORS.TEXT_PRIMARY_4,
          mt: 5,
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
