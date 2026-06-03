"use client";

import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { usePageData } from "@/store/usePageData";
import { LEGAL_CONTENT_BLOCK } from "@/utils/types";
import { useLoading } from "@/components/providers/LoadingProvider";
import { usePathname } from "next/navigation";
import { PageControllers } from "@/api/pageControllers";
import { WEBSITE_DATA } from "@/public/data/website-data";

const TermsOfUse = () => {
  const { details, setDetails } = usePageData();
  const { startLoading, stopLoading } = useLoading();
  const pathname = usePathname();

  useEffect(() => {
    const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/pages') || pathname.startsWith('/manage-');
    if (isAdminRoute) return;

    let isMounted = true;
    const fetchTermsOfUseData = async () => {
      try {
        startLoading();

        let pageData = null;
        try {
          const res = await PageControllers.getPublicPageById(13).catch(e => ({ data: { data: null } }));
          pageData = res.data?.data?.data || res.data?.data;
        } catch (e) {
          console.error("Failed to fetch public page by ID 13", e);
        }
        
        if (pageData && isMounted) {
          const updatedTermsOfUse = require("@/utils/pageDataMapper").mapBackendToLegalPageState(pageData, WEBSITE_DATA.termsOfUse, "termsOfUse_content");
          const mergedWebsiteData = { ...WEBSITE_DATA, termsOfUse: updatedTermsOfUse };
          setDetails(mergedWebsiteData as any);
        }
      } catch (error) {
        console.error("Error fetching terms of use data", error);
      } finally {
        if (isMounted) stopLoading();
      }
    };
    
    fetchTermsOfUseData();

    return () => {
      if (isMounted) stopLoading();
      isMounted = false;
    };
  }, [setDetails, startLoading, stopLoading, pathname]);

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