import React from 'react';
import { Box, Button, Card, Stack, TextField, Typography, Grid, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ExpandMore, Delete, Save } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";


export const AboutUsInsightsAndAwardsEditor = ({ insightsData, awardsData, updateAboutPage }: any) => (
  <Stack spacing={6}>
    <Box>
      <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700, mb: 3 }}>Innovation Insights Settings</Typography>
      <TextField fullWidth label="Heading" value={insightsData.heading || ""} onChange={(e) => updateAboutPage('innovationInsights', { ...insightsData, heading: e.target.value })} />
    </Box>
    <Box>
      <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700, mb: 3 }}>Awards Settings</Typography>
      <Stack spacing={4}>
        <TextField fullWidth label="Heading 1" value={awardsData.heading1 || ""} onChange={(e) => updateAboutPage('AWARDSPROPS', { ...awardsData, heading1: e.target.value })} />
        <TextField fullWidth label="Heading 2" value={awardsData.heading2 || ""} onChange={(e) => updateAboutPage('AWARDSPROPS', { ...awardsData, heading2: e.target.value })} />
      </Stack>
    </Box>
  </Stack>
);

