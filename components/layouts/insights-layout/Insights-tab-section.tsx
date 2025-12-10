import TabSwitching from "@/components/widgets/Tab-Switching";
import { Box, Container, Grid } from "@mui/material";
import React, { useState } from "react";

const InsightsTabSection = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box>
      <Box sx={{ backgroundColor: "#ECF8F8", padding: "16px" }}>
        <Container maxWidth="lg">
          <Grid container>
            <Grid size={6} margin="auto">
              <TabSwitching value={value} onChange={handleChange} data={[]} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default InsightsTabSection;
