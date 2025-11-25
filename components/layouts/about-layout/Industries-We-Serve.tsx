import { Box, Container, Grid } from "@mui/material";
import React from "react";

const IndustriesWeServe = () => {
  return (
    <Box>
      <Container maxWidth="lg">
        <Grid container>
          <Grid size={4}></Grid>
          <Grid size={8}></Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default IndustriesWeServe;
