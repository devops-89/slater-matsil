"use client";
import CustomTabPanel from "@/components/widgets/Tab-panel";
import { TABS_DATA } from "@/public/data/generic-array";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import ProfessionalLayoutSection from "../Professional-Section-layout";
import WhoWeServelayout from "../../who-we-serve-layout";

const ProfessionalsTabs = () => {
  const [value, setValue] = useState(1);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ py: { lg: 10, xs: 6 } }}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid size={{ lg: 8, xs: 12 }} margin="auto">
            <Tabs
              sx={{
                backgroundColor: COLORS.PRIMARY_BLUE,
                borderRadius: "36px",
                height: "62px",
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
                  fontSize: { lg: 18, xs: 14 },
                  fontFamily: tradeGothic.style.fontFamily,
                  fontWeight: 400,
                  lineHeight: { lg: "24px", xs: "15px" },
                  width: { lg: "100%", xs: "auto" },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
                "& .Mui-selected": {
                  backgroundColor: COLORS.WHITE,
                  color: `${COLORS.PRIMARY_BLUE} !important`,
                  borderRadius: "32px",
                },
                display: "flex",
                alignItems: "center",
              }}
              value={value}
              onChange={handleChange}
            >
              {TABS_DATA.map((val, i) => (
                <Tab label={val.label} key={i} />
              ))}
            </Tabs>
          </Grid>
        </Grid>
      </Container>
      <CustomTabPanel value={value} index={0}>
        <WhoWeServelayout />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ProfessionalLayoutSection />
      </CustomTabPanel>
    </Box>
  );
};

export default ProfessionalsTabs;
