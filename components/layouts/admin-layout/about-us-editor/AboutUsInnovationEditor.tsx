import React from 'react';
import { Box, Button, Card, Stack, TextField, Typography, Grid, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ExpandMore, Delete, Save } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";


import { MediaControllers } from "@/api/mediaControllers";
import { useState } from "react";
import { useNotification } from "@/components/providers/NotificationProvider";

export const AboutUsInnovationEditor = ({ data, onChange }: any) => {
  const [isUploading, setIsUploading] = useState(false);
  const { showNotification } = useNotification();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("image", file);
      const response = await MediaControllers.uploadMedia(formData);
      const responseData = response.data?.data?.data || response.data?.data;
      const uploadedUrl = responseData?.imgUrl || responseData?.videoUrl || responseData?.url;
      const uploadedKey = responseData?.key || uploadedUrl;

      if (response.data?.success && uploadedUrl) {
        onChange({ ...data, img: uploadedUrl, imageDownloadUrl: uploadedUrl, key: uploadedKey });
        showNotification("Image uploaded successfully", "success");
      }
    } catch (error) {
      showNotification("Failed to upload image", "error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Stack spacing={4}>
      <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>Driving Innovation Settings</Typography>
      <TextField fullWidth label="Heading" value={data.heading || ""} onChange={(e) => onChange({ ...data, heading: e.target.value })} />
      {data.description?.map((desc: any, idx: number) => (
        <TextField key={idx} fullWidth label={`Description ${idx + 1}`} multiline rows={3} value={desc.label || ""} onChange={(e) => {
          const newDesc = [...data.description];
          newDesc[idx] = { ...newDesc[idx], label: e.target.value };
          onChange({ ...data, description: newDesc });
        }} />
      ))}
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">Section Image</Typography>
          <Button component="label" variant="outlined" size="small" sx={{ color: COLORS.PRIMARY_BLUE }} disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload Image"}
            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
          </Button>
        </Box>
        {data.img && (
          <Box sx={{ width: "100%", height: 200, position: "relative", borderRadius: 2, overflow: "hidden", border: "1px solid rgba(0,0,0,0.1)" }}>
            <img src={data.img.src || data.img} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Box>
        )}
      </Box>
    </Stack>
  );
};

