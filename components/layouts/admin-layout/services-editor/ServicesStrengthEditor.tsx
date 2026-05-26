import React from 'react';
import { Box, Button, Stack, TextField, Typography, Card, Grid } from "@mui/material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";

export const ServicesStrengthEditor = ({ data, onChange }: { data: any, onChange: (newData: any) => void }) => {
  const cards = data?.our_strength?.data || [];
  return (
    <Stack spacing={4}>
      <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
        Why Choose Us Settings
      </Typography>
      <TextField fullWidth label="Top Title" value={data?.title || ""} onChange={(e) => onChange({ ...data, title: e.target.value })} />
      <TextField fullWidth label="Heading" value={data?.heading || ""} onChange={(e) => onChange({ ...data, heading: e.target.value })} />
      <TextField fullWidth label="Span Heading (Colored)" value={data?.spanHeading || ""} onChange={(e) => onChange({ ...data, spanHeading: e.target.value })} />
      <TextField fullWidth label="Description" multiline rows={3} value={data?.description || ""} onChange={(e) => onChange({ ...data, description: e.target.value })} />
      
      <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700, mt: 4 }}>
        Our Strength Cards
      </Typography>
      <TextField fullWidth label="Cards Section Heading" value={data?.our_strength?.heading || ""} onChange={(e) => onChange({ ...data, our_strength: { ...data.our_strength, heading: e.target.value } })} />

      {cards.map((card: any, idx: number) => (
        <Card key={idx} sx={{ p: 3, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 4, boxShadow: "0 2px 10px rgba(0,0,0,0.02)", backgroundColor: "#FFFFFF" }}>
          <Stack spacing={2}>
            <TextField fullWidth label={`Card ${idx + 1} Title`} value={card.title || ""} onChange={(e) => {
              const newCards = [...cards];
              newCards[idx] = { ...newCards[idx], title: e.target.value };
              onChange({ ...data, our_strength: { ...data.our_strength, data: newCards } });
            }} />
            <TextField fullWidth label="Description" multiline rows={2} value={card.description || ""} onChange={(e) => {
              const newCards = [...cards];
              newCards[idx] = { ...newCards[idx], description: e.target.value };
              onChange({ ...data, our_strength: { ...data.our_strength, data: newCards } });
            }} />
          </Stack>
        </Card>
      ))}
    </Stack>
  );
};
