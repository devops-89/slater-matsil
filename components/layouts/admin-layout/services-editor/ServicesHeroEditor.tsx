import React from 'react';
import { Box, Button, Stack, TextField, Typography, Card, Grid } from "@mui/material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";

export const ServicesHeroEditor = ({ data, onChange }: { data: any, onChange: (newData: any) => void }) => {
  return (
    <Stack spacing={4}>
      <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
        Hero Section Settings
      </Typography>
      <TextField fullWidth label="Heading 1" value={data?.heading1 || ""} onChange={(e) => onChange({ ...data, heading1: e.target.value })} />
      <TextField fullWidth label="Heading 2" value={data?.heading2 || ""} onChange={(e) => onChange({ ...data, heading2: e.target.value })} />
      <TextField fullWidth label="Description" multiline rows={4} value={data?.description || ""} onChange={(e) => onChange({ ...data, description: e.target.value })} />
      <Box sx={{ mt: 2 }}>
        <Typography sx={{ fontFamily: tradeGothic.style.fontFamily, fontSize: 14, mb: 1, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
          Upload Background Image
        </Typography>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                onChange({ ...data, img: reader.result as string });
              };
              reader.readAsDataURL(file);
            }
          }}
          style={{ display: "block", width: "100%", padding: "8px", border: "1px solid rgba(0,0,0,0.2)", borderRadius: "8px" }}
        />
        {data?.img && (
          <Box sx={{ mt: 2, borderRadius: 2, overflow: "hidden", border: "1px solid rgba(0,0,0,0.1)" }}>
            <img src={typeof data.img === 'string' ? data.img : data.img.src} alt="preview" style={{ width: "100%", maxHeight: "150px", objectFit: "cover" }} />
          </Box>
        )}
      </Box>
    </Stack>
  );
};
