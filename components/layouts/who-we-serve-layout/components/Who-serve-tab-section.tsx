"use client";
import CustomTabPanel from "@/components/widgets/Tab-panel";
import TabSwitching from "@/components/widgets/Tab-Switching";
import { usePageData } from "@/store/usePageData";
import { Box, Container, Grid } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import QuoteCard from "./Quote-Card";
import TabCard from "./Tab-Card";

const WhoServeTabSection = () => {
  const [value, setValue] = useState(0);
  const { details } = usePageData();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const sectionRef = useRef<HTMLDivElement>(null);

  const [serveData, setServeData] = useState(
    details?.whoWeServePage?.whoWeServeTabsSection[0],
  );

  useEffect(() => {
    if (tabParam !== null && details?.whoWeServePage?.whoWeServeTabsSection) {
      const index = parseInt(tabParam);
      if (
        !isNaN(index) &&
        index >= 0 &&
        index < details.whoWeServePage.whoWeServeTabsSection.length
      ) {
        setValue(index);
        setServeData(details.whoWeServePage.whoWeServeTabsSection[index]);

        // Scroll to the section
        setTimeout(() => {
          if (sectionRef.current) {
            sectionRef.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 300); // Small delay to allow page to load and layout to stabilize
      }
    }
  }, [tabParam, details]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setServeData(details?.whoWeServePage?.whoWeServeTabsSection[newValue]);
  };
  return (
    <Box sx={{ mt: 10 }} ref={sectionRef}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid size={{ lg: 10, xs: 12 }} mx="auto">
            <TabSwitching
              value={value}
              onChange={handleChange}
              data={details?.whoWeServePage?.whoWeServeTabsSection || []}
            />
          </Grid>
        </Grid>
      </Container>
      {details?.whoWeServePage?.whoWeServeTabsSection.map((val: any, i: number) => (
        <CustomTabPanel key={i} index={i} value={value}>
          <TabCard
            bigDescription={serveData?.bigDescription || ""}
            quote={serveData?.quote || ""}
            data={serveData?.data || []}
          />
          <Container maxWidth="lg" sx={{ my: 7 }}>
            <QuoteCard
              quote={serveData?.quoteCardData?.quote || ""}
              author={serveData?.quoteCardData?.author || ""}
            />
          </Container>
        </CustomTabPanel>
      ))}
    </Box>
  );
};

export default WhoServeTabSection;
