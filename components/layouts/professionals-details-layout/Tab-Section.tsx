import { PROFESSIONAL_DETAILS_TAB_DATA } from "@/public/data/generic-array";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

const TabSection = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
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
                  //   display: "flex",
                  //   alignItems: "center",
                  //   justifyContent: "center",
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
      </Container>
    </Box>
  );
};

export default TabSection;
