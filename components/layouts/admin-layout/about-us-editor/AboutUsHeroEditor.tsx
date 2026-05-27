import React from "react";
import { Box, Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { Upload } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";

export const AboutUsHeroEditor = ({ data, onChange }: any) => {
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      onChange({ ...data, videoUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
        Hero Section Settings
      </Typography>
      <TextField fullWidth label="Section Title" value={data.sectionTitle || ""} onChange={(e) => onChange({ ...data, sectionTitle: e.target.value })} />
      <TextField fullWidth label="Heading" value={data.heading || ""} onChange={(e) => onChange({ ...data, heading: e.target.value })} />
      <TextField fullWidth label="Description" multiline rows={4} value={data.description || ""} onChange={(e) => onChange({ ...data, description: e.target.value })} />

      <Divider sx={{ my: 1 }} />

      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="subtitle2" color="text.secondary">Background Video</Typography>
          <Button component="label" variant="outlined" startIcon={<Upload />} size="small" sx={{ color: COLORS.PRIMARY_BLUE }}>
            Upload Video
            <input type="file" hidden accept="video/*" onChange={handleVideoUpload} />
          </Button>
        </Box>
        <Typography sx={{ fontSize: 12, color: "text.secondary", mt: 1 }}>
          For large videos, upload externally and paste the URL below.
        </Typography>
      </Box>

      <TextField fullWidth label="Video URL" value={data.videoUrl || ""} onChange={(e) => onChange({ ...data, videoUrl: e.target.value })} />
    </Stack>
  );
};

