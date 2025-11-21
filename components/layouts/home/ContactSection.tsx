import { Box, Container, Grid } from "@mui/material";
import React from "react";

const ContactSection = () => {
  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid size={6}>
            <ContactSection />
          </Grid>
          <Grid size={6}></Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactSection;
