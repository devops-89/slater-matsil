import CustomTabPanel from "@/components/widgets/Tab-panel";
import { WHO_WE_SERVE_TAB_DATA } from "@/public/data/generic-array";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { TAB_STYLES } from "@/utils/styles";
import { Box, Container, Grid, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import TabCard from "./Tab-Card";
import QuoteCard from "./Quote-Card";
import TabSwitching from "@/components/widgets/Tab-Switching";

const WhoServeTabSection = () => {
  const [value, setValue] = useState(0);
  const { details } = usePageData();

  const [serveData, setServeData] = useState(
    details?.whoWeServePage?.whoWeServeTabsSection[0],
  );
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setServeData(details?.whoWeServePage?.whoWeServeTabsSection[newValue]);

    // console.log("teste", newValue);
  };
  return (
    <Box sx={{ mt: 10 }}>
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
      {details?.whoWeServePage?.whoWeServeTabsSection.map((val, i) => (
        <CustomTabPanel index={i} value={value}>
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
