import React from 'react';
import { Box, Button, Stack, TextField, Typography, Card, Grid } from "@mui/material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";

export const ServicesFrameworkEditor = ({ data, onChange }: { data: any, onChange: (newData: any) => void }) => {
  const frameworks = data?.data || [];
  return (
    <Stack spacing={4}>
      <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
        Service Framework Settings
      </Typography>
      <TextField fullWidth label="Heading" value={data?.heading || ""} onChange={(e) => onChange({ ...data, heading: e.target.value })} />
      <TextField fullWidth label="Span Heading (Colored)" value={data?.spanHeading || ""} onChange={(e) => onChange({ ...data, spanHeading: e.target.value })} />
      <TextField fullWidth label="Description" multiline rows={3} value={data?.description || ""} onChange={(e) => onChange({ ...data, description: e.target.value })} />
      
      <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700, mt: 4 }}>
        Framework Steps
      </Typography>

      {frameworks.map((fw: any, idx: number) => (
        <Card key={idx} sx={{ p: 3, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 4, boxShadow: "0 2px 10px rgba(0,0,0,0.02)", backgroundColor: "#FFFFFF" }}>
          <Stack spacing={2}>
            <TextField fullWidth label={`Step ${idx + 1} Heading`} value={fw.heading || ""} onChange={(e) => {
              const newFws = [...frameworks];
              newFws[idx] = { ...newFws[idx], heading: e.target.value };
              onChange({ ...data, data: newFws });
            }} />
            
            <Typography variant="subtitle2" sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.TEXT_PRIMARY }}>Bullet Points</Typography>
            {fw.data?.map((item: any, pointIdx: number) => (
              <Stack direction="row" spacing={2} alignItems="center" key={pointIdx}>
                <TextField fullWidth size="small" label={`Point ${pointIdx + 1}`} value={item.title || ""} onChange={(e) => {
                  const newFws = [...frameworks];
                  const newPoints = [...(newFws[idx].data || [])];
                  newPoints[pointIdx] = { title: e.target.value };
                  newFws[idx] = { ...newFws[idx], data: newPoints };
                  onChange({ ...data, data: newFws });
                }} />
              </Stack>
            ))}
          </Stack>
        </Card>
      ))}
    </Stack>
  );
};
