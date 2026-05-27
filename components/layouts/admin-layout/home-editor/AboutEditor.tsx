import AboutImage from "@/public/images/home/aboutUs.jpg";
import React from 'react';
import { Box, Button, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import { Delete, Upload } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";


export const AboutEditor = ({ data, onChange }: { data: any, onChange: (newData: any) => void }) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      onChange({ ...data, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <Stack spacing={3}>
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

      <Divider sx={{ my: 1 }} />

      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="subtitle2" color="text.secondary">About Image</Typography>
          <Button component="label" variant="outlined" startIcon={<Upload />} size="small" sx={{ color: COLORS.PRIMARY_BLUE }}>
            Upload Image
            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
          </Button>
        </Box>
        <Box sx={{ mt: 2, position: "relative", width: 96, height: 96, borderRadius: 1, overflow: "hidden", border: "1px solid #ddd" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.image || AboutImage.src} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <IconButton
            size="small"
            color="error"
            onClick={() => onChange({ ...data, image: "" })}
            sx={{ position: "absolute", top: 2, right: 2, backgroundColor: "rgba(255,255,255,0.8)", padding: "2px", "&:hover": { backgroundColor: "white" } }}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Stack>
  );
};


