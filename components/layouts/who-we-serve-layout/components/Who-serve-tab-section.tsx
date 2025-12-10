import { WHO_WE_SERVE_TAB_DATA } from "@/public/data/generic-array";
import { COLORS } from "@/utils/enum";
import { TAB_STYLES } from "@/utils/styles";
import { Box, Container, Grid, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

const WhoServeTabSection = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ mt: 10 }}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid size={10} mx="auto">
            <Tabs
              sx={{
                ...TAB_STYLES,
                px: 2,
                "& .MuiTab-root": {
                  color: COLORS.WHITE,
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: 600,
                  lineHeight: "32px",
                },
              }}
              value={value}
              onChange={handleChange}
            >
              {WHO_WE_SERVE_TAB_DATA.map((val, i) => (
                <Tab key={i} label={val.label} />
              ))}
            </Tabs>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WhoServeTabSection;
