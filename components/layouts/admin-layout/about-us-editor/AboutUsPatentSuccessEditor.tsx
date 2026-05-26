import React from 'react';
import { Box, Button, Card, Stack, TextField, Typography, Grid, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ExpandMore, Delete, Save } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";


export const AboutUsPatentSuccessEditor = ({ data, onChange }: any) => (
  <Stack spacing={4}>
    <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>Patent Success Settings</Typography>
    <TextField fullWidth label="Heading 1" value={data.heading1 || ""} onChange={(e) => onChange({ ...data, heading1: e.target.value })} />
    <TextField fullWidth label="Heading 2" value={data.heading2 || ""} onChange={(e) => onChange({ ...data, heading2: e.target.value })} />
    <TextField fullWidth label="Description" multiline rows={4} value={data.description || ""} onChange={(e) => onChange({ ...data, description: e.target.value })} />
    
    <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700, mt: 4 }}>
      Metrics Data
    </Typography>
    {data.metrics_data?.map((metric: any, idx: number) => (
      <Card key={idx} sx={{ p: 3, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 4, boxShadow: "none" }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField 
            label={`Metric Name ${idx + 1}`} value={metric.title || ""}
            onChange={(e) => {
              const newMetrics = [...data.metrics_data];
              newMetrics[idx] = { ...newMetrics[idx], title: e.target.value };
              onChange({ ...data, metrics_data: newMetrics });
            }}
          />
          <TextField 
            label="Number" value={metric.count || ""}
            onChange={(e) => {
              const newMetrics = [...data.metrics_data];
              newMetrics[idx] = { ...newMetrics[idx], count: e.target.value };
              onChange({ ...data, metrics_data: newMetrics });
            }}
          />
          <Button 
            color="error" variant="outlined" 
            onClick={() => {
              const newMetrics = data.metrics_data.filter((_: any, i: number) => i !== idx);
              onChange({ ...data, metrics_data: newMetrics });
            }}
          >
            Remove
          </Button>
        </Stack>
      </Card>
    ))}
    <Button 
      variant="contained" 
      onClick={() => {
        const newMetrics = [...(data.metrics_data || []), { title: "New Name", count: "0" }];
        onChange({ ...data, metrics_data: newMetrics });
      }}
      sx={{ backgroundColor: COLORS.PRIMARY_BLUE, color: COLORS.WHITE }}
    >
      + Add Metric
    </Button>
  </Stack>
);

