import React from 'react';
import { Box, Button, Card, Stack, TextField, Typography, Grid, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ExpandMore, Delete, Save } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";


export const MetricsEditor = ({ data, onChange }: { data: any, onChange: (newData: any) => void }) => {
  return (
    <Stack spacing={4}>
      <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
        Metrics Section Settings
      </Typography>
      
      <TextField 
        fullWidth label="Section Title" value={data.sectionTitle || ""}
        onChange={(e) => onChange({ ...data, sectionTitle: e.target.value })}
      />
      <TextField 
        fullWidth label="Heading Title" value={data.heading?.title || ""}
        onChange={(e) => onChange({ ...data, heading: { ...data.heading, title: e.target.value } })}
      />
      <TextField 
        fullWidth label="Heading Subtitle" value={data.heading?.subTitle || ""}
        onChange={(e) => onChange({ ...data, heading: { ...data.heading, subTitle: e.target.value } })}
      />
      <TextField 
        fullWidth label="Description 1" multiline rows={3} value={data.description || ""}
        onChange={(e) => onChange({ ...data, description: e.target.value })}
      />
      <TextField 
        fullWidth label="Description 2" multiline rows={4} value={data.description2 || ""}
        onChange={(e) => onChange({ ...data, description2: e.target.value })}
      />
      <TextField 
        fullWidth label="CTA Button Text" value={data.ctaButton || ""}
        onChange={(e) => onChange({ ...data, ctaButton: e.target.value })}
      />

      <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700, mt: 4 }}>
        Metrics Cards
      </Typography>
      
      {data.metricsData?.map((metric: any, idx: number) => (
        <Card key={idx} sx={{ p: 3, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 4, boxShadow: "0 2px 10px rgba(0,0,0,0.02)", backgroundColor: "#FFFFFF" }}>
          <Typography sx={{ fontFamily: tradeGothic.style.fontFamily, fontWeight: 700, color: COLORS.PRIMARY_GREEN, mb: 3 }}>
            Metric {idx + 1}
          </Typography>
          <Stack spacing={3}>
            <TextField 
              fullWidth label="Metric Title (e.g. Patents Issued)" value={metric.title || ""}
              onChange={(e) => {
                const newMetrics = [...data.metricsData];
                newMetrics[idx] = { ...newMetrics[idx], title: e.target.value };
                onChange({ ...data, metricsData: newMetrics });
              }}
            />
            <TextField 
              fullWidth label="Number (e.g. 1.5M+)" value={metric.count || ""}
              onChange={(e) => {
                const newMetrics = [...data.metricsData];
                newMetrics[idx] = { ...newMetrics[idx], count: e.target.value };
                onChange({ ...data, metricsData: newMetrics });
              }}
            />
          </Stack>
        </Card>
      ))}
    </Stack>
  );
};

