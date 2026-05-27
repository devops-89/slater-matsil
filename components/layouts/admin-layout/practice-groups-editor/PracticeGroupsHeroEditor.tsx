import React, { useState } from 'react';
import { Box, Button, Stack, TextField, Typography, Card, IconButton, MenuItem, Select, FormControl, InputLabel, Checkbox, FormControlLabel } from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";

export const PracticeGroupsHeroEditor = ({ data, onChange }: { data: any, onChange: (newData: any) => void }) => {
  const handleImageUpload = (key: string, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange({ ...data, [key]: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <Stack spacing={4}>
      <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
        Hero Section Settings
      </Typography>
      <TextField fullWidth label="Top Title Badge" value={data?.title || ""} onChange={(e) => onChange({ ...data, title: e.target.value })} />
      <TextField fullWidth label="Main Heading" value={data?.heading || ""} onChange={(e) => onChange({ ...data, heading: e.target.value })} />
      <TextField fullWidth label="Top Description" multiline rows={4} value={data?.description1 || ""} onChange={(e) => onChange({ ...data, description1: e.target.value })} />
      <TextField fullWidth label="Bottom Description" multiline rows={2} value={data?.description2 || ""} onChange={(e) => onChange({ ...data, description2: e.target.value })} />
      
      {/* Image */}
      <Box sx={{ mt: 2 }}>
        <Typography sx={{ fontFamily: tradeGothic.style.fontFamily, fontSize: 14, mb: 1, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
          Upload Hero Image
        </Typography>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleImageUpload("firstHeroImage", e.target.files[0])}
          style={{ display: "block", width: "100%", padding: "8px", border: "1px solid rgba(0,0,0,0.2)", borderRadius: "8px" }}
        />
        {data?.firstHeroImage && (
          <Box sx={{ mt: 2, borderRadius: 2, overflow: "hidden", border: "1px solid rgba(0,0,0,0.1)" }}>
            <img src={typeof data.firstHeroImage === 'string' ? data.firstHeroImage : data.firstHeroImage.src} alt="preview" style={{ width: "100%", maxHeight: "150px", objectFit: "cover" }} />
          </Box>
        )}
      </Box>
    </Stack>
  );
};
