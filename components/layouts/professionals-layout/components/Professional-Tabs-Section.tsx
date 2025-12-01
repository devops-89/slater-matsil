"use client";
import CustomTabPanel from "@/components/widgets/Tab-panel";
import { TABS_DATA } from "@/public/data/generic-array";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import ProfessionalLayoutSection from "../Professional-Section-layout";

const ProfessionalsTabs = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid size={8} margin="auto">
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
                  fontSize: 18,
                  fontFamily: tradeGothic.style.fontFamily,
                  fontWeight: 400,
                  lineHeight: "24px",
                  width: "100%",
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
      <CustomTabPanel value={value} index={0}></CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ProfessionalLayoutSection />
      </CustomTabPanel>
    </Box>
  );
};

export default ProfessionalsTabs;
