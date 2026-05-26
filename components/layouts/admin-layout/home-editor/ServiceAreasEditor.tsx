import React from 'react';
import { Box, Button, Card, Stack, TextField, Typography, Grid, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ExpandMore, Delete, Save } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";


export const ServiceAreasEditor = ({ data, onChange }: { data: any, onChange: (newData: any) => void }) => {
  return (
    <Stack spacing={4}>
      <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
        Service Areas Settings
      </Typography>
      
      <TextField 
        fullWidth label="Section Title" value={data.sectionTitle || ""}
        onChange={(e) => onChange({ ...data, sectionTitle: e.target.value })}
      />
      <TextField 
        fullWidth label="Heading" value={data.heading || ""}
        onChange={(e) => onChange({ ...data, heading: e.target.value })}
      />

      <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700, mt: 4 }}>
        Service Area Cards
      </Typography>
      
      {data.section_Data?.map((item: any, idx: number) => (
        <Card key={idx} sx={{ p: 3, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 4, boxShadow: "0 2px 10px rgba(0,0,0,0.02)", backgroundColor: "#FFFFFF" }}>
          <Typography sx={{ fontFamily: tradeGothic.style.fontFamily, fontWeight: 700, color: COLORS.PRIMARY_GREEN, mb: 3 }}>
            Service Card {idx + 1} ({item.serialNumber})
          </Typography>
          <Stack spacing={3}>
            <TextField 
              fullWidth label="Title" value={item.title || ""}
              onChange={(e) => {
                const newSectionData = [...data.section_Data];
                newSectionData[idx] = { ...newSectionData[idx], title: e.target.value };
                onChange({ ...data, section_Data: newSectionData });
              }}
            />
            <TextField 
              fullWidth label="Description" multiline rows={3} value={item.description || ""}
              onChange={(e) => {
                const newSectionData = [...data.section_Data];
                newSectionData[idx] = { ...newSectionData[idx], description: e.target.value };
                onChange({ ...data, section_Data: newSectionData });
              }}
            />
          </Stack>
        </Card>
      ))}
    </Stack>
  );
};

// Real Website Components
import AboutSection from "@/components/layouts/home/AboutSection";
import ContactSection from "@/components/layouts/home/ContactSection";
import HeroSection3 from "@/components/layouts/home/HeroSection3";
import MetricsSection from "@/components/layouts/home/MetricsSection";
import Whoweserve from "@/components/layouts/home/Who-We-Serve";
import Footer from "@/components/widgets/Footer";
import InsightsSection from "@/components/widgets/Insights-section";
import Navbar from "@/components/widgets/navbar";
import ServiceAreas from "@/components/widgets/Service-Areas";

