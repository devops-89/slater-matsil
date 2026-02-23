import TabSwitching from "@/components/widgets/Tab-Switching";
import { usePageData } from "@/store/usePageData";
import { Box, Container, Grid } from "@mui/material";
import React, { useState } from "react";
import CustomTabPanel from "@/components/widgets/Tab-panel";
import InsightsCard from "./components/Insights-Card";
import { INSIGHTS_TAB_DATA } from "@/utils/enum";
import QuickLinks from "./Quick-Links";

const InsightsTabSection = () => {
  const [value, setValue] = useState(0);
  const { details } = usePageData();
  const [insightsData, setInsightsData] = useState(
    details?.insightsPage?.insightsData,
  );

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
          item.category === details?.insightsPage?.tab_data?.[newValue]?.title,
      );
      setInsightsData(filteredData);
    }
  };

  return (
    <Box>
      <Box sx={{ backgroundColor: "#ECF8F8", pb: 3 }}>
        <Box sx={{ padding: { lg: "30px", xs: "20px" } }}>
          <Container maxWidth="lg">
            <Grid container>
              <Grid size={{ lg: 6, xs: 12 }} margin="auto">
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
        <CustomTabPanel value={value} index={i} key={i}>
          <Container maxWidth="lg" sx={{ my: 5 }}>
            <Grid container spacing={3}>
              {insightsData?.map((val, index) => (
                <Grid size={{ lg: 4, xs: 12 }} key={index}>
                  <InsightsCard
                    title={val.title}
                    category={val.category}
                    bgColor={val.bgColor}
                    slug={val.slug}
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
