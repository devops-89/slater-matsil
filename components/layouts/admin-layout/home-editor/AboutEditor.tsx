import AboutImage from "@/public/images/home/aboutUs.jpg";
import React from 'react';
import { Box, Button, Card, Stack, TextField, Typography, Grid, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ExpandMore, Delete, Save } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";


export const AboutEditor = ({ data, onChange }: { data: any, onChange: (newData: any) => void }) => {
  return (
    <Stack spacing={4}>
      <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
        About Section Settings
      </Typography>
      <TextField 
        fullWidth label="Section Title" value={data.sectionTitle || ""}
        onChange={(e) => onChange({ ...data, sectionTitle: e.target.value })}
      />
      <TextField 
        fullWidth label="Main Heading" value={data.heading || ""}
        onChange={(e) => onChange({ ...data, heading: e.target.value })}
      />
      <TextField 
        fullWidth label="Description" multiline rows={4} value={data.description || ""}
        onChange={(e) => onChange({ ...data, description: e.target.value })}
      />
      <TextField 
        fullWidth label="Years Experience" value={data.experience?.years || ""}
        onChange={(e) => onChange({ ...data, experience: { ...data.experience, years: e.target.value } })}
      />
      <TextField 
        fullWidth label="CTA Button Text" value={data.ctaButton?.text || ""}
        onChange={(e) => onChange({ ...data, ctaButton: { ...data.ctaButton, text: e.target.value } })}
      />
      <Box sx={{ mt: 2 }}>
        <Typography sx={{ fontFamily: tradeGothic.style.fontFamily, fontSize: 14, mb: 1, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
          Upload About Image
        </Typography>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                onChange({ ...data, image: reader.result as string });
              };
              reader.readAsDataURL(file);
            }
          }}
          style={{ display: "block", width: "100%", padding: "8px", border: "1px solid rgba(0,0,0,0.2)", borderRadius: "8px" }}
        />
        <Box sx={{ mt: 2, borderRadius: 2, overflow: "hidden", border: "1px solid rgba(0,0,0,0.1)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.image || AboutImage.src} alt="preview" style={{ width: "100%", maxHeight: "150px", objectFit: "cover" }} />
        </Box>
      </Box>
    </Stack>
  );
};


