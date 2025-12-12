import TabSwitching from "@/components/widgets/Tab-Switching";
import { usePageData } from "@/store/usePageData";
import { Box, Container, Grid } from "@mui/material";
import React, { useState } from "react";
import QuickLinks from "./Quick-Links";
import CustomTabPanel from "@/components/widgets/Tab-panel";
import InsightsCard from "./components/Insights-Card";
import { INSIGHTS_TAB_DATA } from "@/utils/enum";

const InsightsTabSection = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (
      details?.insightsPage?.tab_data?.[newValue]?.title ===
      INSIGHTS_TAB_DATA.ALL
    ) {
      setInsightsData(details?.insightsPage?.insightsData);
    } else {
      const filteredData = details?.insightsPage?.insightsData?.filter(
        (item) =>
          item.category === details?.insightsPage?.tab_data?.[newValue]?.title
      );
      setInsightsData(filteredData);
    }
  };

  const { details } = usePageData();
  const [insightsData, setInsightsData] = useState(
    details?.insightsPage?.insightsData
  );
  return (
    <Box>
      <Box sx={{ backgroundColor: "#ECF8F8", pb: 3 }}>
        <Box sx={{ padding: "30px" }}>
          <Container maxWidth="lg">
            <Grid container>
              <Grid size={6} margin="auto">
                <TabSwitching
                  value={value}
                  onChange={handleChange}
                  data={details?.insightsPage?.tab_data || []}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
        <QuickLinks />
      </Box>
      {details?.insightsPage?.tab_data.map((_, i) => (
        <CustomTabPanel value={value} index={i}>
          <Container maxWidth="lg" sx={{ my: 5 }}>
            <Grid container spacing={3}>
              {insightsData?.map((val, i) => (
                <Grid size={4} key={i}>
                  <InsightsCard
                    title={val.title}
                    category={val.category}
                    bgColor={val.bgColor}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </CustomTabPanel>
      ))}
    </Box>
  );
};

export default InsightsTabSection;
