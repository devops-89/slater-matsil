import CustomTabPanel from "@/components/widgets/Tab-panel";
import { PROFESSIONAL_DETAILS_TAB_DATA } from "@/public/data/generic-array";
import { useProfessionalDetailsData } from "@/store/useProfessionalDetails";
import { COLORS, PROFESSIONAL_TABS_DATA } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import ProfessionalBio from "./Professionals-Bio";

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
  };

  return (
    <Box sx={{ pb: 10 }}>
      <Container maxWidth="lg">
        <Grid container spacing={5} sx={{ mt: 20 }}>
          <Grid size={10} margin="auto">
            <Tabs
              value={value}
              onChange={handleChange}
              sx={{
                backgroundColor: COLORS.PRIMARY_BLUE,
                borderRadius: "36px",
                height: "72px",
                "& .MuiTabs-indicator": {
                  display: "none",
                },
                "& .MuiTabs-list": {
                  justifyContent: "space-around",
                  alignItems: "center",
                },
                "& .MuiTab-root": {
                  color: COLORS.WHITE,
                  textAlign: "center",
                  fontSize: 16,
                  fontFamily: tradeGothic.style.fontFamily,
                  fontWeight: 400,
                  lineHeight: "32px",
                },
                "& .Mui-selected": {
                  backgroundColor: COLORS.WHITE,
                  color: `${COLORS.PRIMARY_BLUE} !important`,
                  borderRadius: "32px",
                },
                display: "flex",
                alignItems: "center",
              }}
            >
              {PROFESSIONAL_DETAILS_TAB_DATA.map((item, i) => (
                <Tab label={item.label} key={i} />
              ))}
            </Tabs>
          </Grid>
        </Grid>
        {PROFESSIONAL_DETAILS_TAB_DATA.map((val, i) => (
          <CustomTabPanel index={i} value={value} key={i}>
            <ProfessionalBio data={getTabData(val.label)} />
          </CustomTabPanel>
        ))}
      </Container>
    </Box>
  );
};

export default TabSection;
