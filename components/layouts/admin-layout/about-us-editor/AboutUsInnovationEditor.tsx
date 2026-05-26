import React from 'react';
import { Box, Button, Card, Stack, TextField, Typography, Grid, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ExpandMore, Delete, Save } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";


export const AboutUsInnovationEditor = ({ data, onChange }: any) => (
  <Stack spacing={4}>
    <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>Driving Innovation Settings</Typography>
    <TextField fullWidth label="Heading" value={data.heading || ""} onChange={(e) => onChange({ ...data, heading: e.target.value })} />
    {data.description?.map((desc: any, idx: number) => (
      <TextField key={idx} fullWidth label={`Description ${idx + 1}`} multiline rows={3} value={desc.label || ""} onChange={(e) => {
        const newDesc = [...data.description];
        newDesc[idx] = { ...newDesc[idx], label: e.target.value };
        onChange({ ...data, description: newDesc });
      }} />
    ))}
  </Stack>
);

