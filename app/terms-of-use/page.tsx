"use client";

import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { usePageData } from "@/store/usePageData";
import { LEGAL_CONTENT_BLOCK } from "@/utils/types";

const TermsOfUse = () => {
  const { details } = usePageData();
  const data = details?.termsOfUse;

  if (!data) return null;

  return (
    <Box sx={{ py: { lg: 10, xs: 6 } }}>
      <Container maxWidth="lg">
        <Typography
          sx={{
            fontFamily: tradeGothic.style.fontFamily,
            fontSize: { lg: 40, xs: 26 },
            fontWeight: 700,
            color: COLORS.PRIMARY_BLUE,
            mb: 2,
            textTransform: "uppercase",
          }}
        >
          {data.title}
        </Typography>

        <Typography
          sx={{
            fontFamily: adelle.style.fontFamily,
            fontSize: 16,
            fontWeight: 500,
            mb: 5,
            color: COLORS.BLACK,
          }}
        >
          Effective date: {data.effectiveDate}
        </Typography>

        {data.sections?.map((section: any, index: number) => (
          <Section key={index} title={section.title}>
            {section.contentBlocks?.map((block: LEGAL_CONTENT_BLOCK, i: number) => {
              if (block.type === 'list') {
                return (
                  <ul key={i}>
                    {block.items?.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                );
              }
              if (block.type === 'paragraph') {
                return <p key={i}>{block.text?.split('\n').map((line, k) => <React.Fragment key={k}>{line}<br/></React.Fragment>)}</p>;
              }
              return null;
            })}
          </Section>
        ))}
      </Container>
    </Box>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box sx={{ mb: 5 }}>
    <Typography
      sx={{
        fontFamily: tradeGothic.style.fontFamily,
        fontSize: { lg: 24, xs: 20 },
        fontWeight: 700,
        color: COLORS.PRIMARY_BLUE,
        mb: 1.5,
        lineHeight: 1.4,
      }}
    >
      {title}
    </Typography>

    <Box
      sx={{
        fontFamily: adelle.style.fontFamily,
        fontSize: 16,
        fontWeight: 400,
        color: COLORS.BLACK,
        lineHeight: 1.8,
        "& ul, & div": { paddingLeft: "20px", margin: "10px 0" },
        "& li": { marginBottom: "12px" },
        "& p": { margin: "0 0 16px 0" }
      }}
    >
      {children}
    </Box>
  </Box>
);

export default TermsOfUse;