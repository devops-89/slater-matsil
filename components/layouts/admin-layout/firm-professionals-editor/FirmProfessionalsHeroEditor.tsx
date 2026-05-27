import React from 'react';
import { Stack, TextField, Typography } from "@mui/material";
import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";

export const FirmProfessionalsHeroEditor = ({ data, onChange }: { data: any, onChange: (newData: any) => void }) => {
  return (
    <Stack spacing={4}>
      <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
        Hero Section Settings
      </Typography>
      
      <TextField fullWidth label="Main Heading" value={data?.heading || ""} onChange={(e) => onChange({ ...data, heading: e.target.value })} />
      <TextField fullWidth label="Main Description" multiline rows={4} value={data?.description1 || ""} onChange={(e) => onChange({ ...data, description1: e.target.value })} />
    </Stack>
  );
};
