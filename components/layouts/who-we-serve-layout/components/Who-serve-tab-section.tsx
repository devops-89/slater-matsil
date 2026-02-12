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
    details?.whoWeServePage?.whoWeServeTabsSection,
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
      {details?.whoWeServePage?.whoWeServeTabsSection?.map((val, i) => (
        <CustomTabPanel index={i} value={value}>
          <TabCard
            bigDescription={val.bigDescription}
            quote={val.quote}
            data={val.data}
          />
          <Container maxWidth="lg" sx={{ my: 7 }}>
            <QuoteCard
              quote={details?.whoWeServePage?.quote?.quote || ""}
              author={details?.whoWeServePage?.quote?.author || ""}
            />
          </Container>
        </CustomTabPanel>
      ))}
    </Box>
  );
};

export default WhoServeTabSection;
