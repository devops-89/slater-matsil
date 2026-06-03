import CustomTabPanel from "@/components/widgets/Tab-panel";
import { PROFESSIONAL_DETAILS_TAB_DATA } from "@/public/data/generic-array";
import { useProfessionalDetailsData } from "@/store/useProfessionalDetails";
import { COLORS, PROFESSIONAL_TABS_DATA } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import ProfessionalBio from "./Professionals-Bio";
import TabSwitching from "@/components/widgets/Tab-Switching";

const TabSection = () => {
  const [value, setValue] = useState(0);
  const { data } = useProfessionalDetailsData();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getTabData = (label: string) => {
    if (label === PROFESSIONAL_TABS_DATA.BIO) {
      return data?.PROFESSIONAL_BIO_DATA;
    }
    if (label === PROFESSIONAL_TABS_DATA.EDUCATION) {
      return data?.PROFESSIONAL_EDUCATION_DATA;
    }
    if (label === PROFESSIONAL_TABS_DATA.ADMISSIONS_HONORS) {
      return data?.PROFESSIONAL_ADMISSIONS_DATA;
    }
    if (label === PROFESSIONAL_TABS_DATA.ARTICLES_PRESENTATIONS) {
      return data?.PROFESSIONAL_ARTICLES_DATA;
    }
    if (label === PROFESSIONAL_TABS_DATA.ASSOCIATIONS) {
      return data?.PROFESSIONAL_ASSOCIATIONS_DATA;
    }
  };

  // Filter out tabs with no data
  const filteredTabs = PROFESSIONAL_DETAILS_TAB_DATA.filter((tab) => {
    const tabData = getTabData(tab.title);
    return Array.isArray(tabData) && tabData.length > 0;
  });

  return (
    <Box sx={{ pb: 10 }}>
      <Container maxWidth="lg">
        <Grid container spacing={5} sx={{ mt: { lg: 20, xs: 5 } }}>
          <Grid size={{ xs: 12, md: 10, lg: 10 }} margin="auto">
            <TabSwitching
              value={value}
              onChange={handleChange}
              data={filteredTabs}
            />
          </Grid>
        </Grid>
        {filteredTabs.map((val, i) => (
          <CustomTabPanel index={i} value={value} key={i}>
            <ProfessionalBio data={getTabData(val.title)} />
          </CustomTabPanel>
        ))}
      </Container>
    </Box>
  );
};

export default TabSection;
