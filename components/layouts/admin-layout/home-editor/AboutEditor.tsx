import AboutImage from "@/public/images/home/aboutUs.jpg";
import React from 'react';
import { Box, Button, Divider, IconButton, Stack, TextField, Typography, CircularProgress } from "@mui/material";
import { Delete, Upload } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import { MediaControllers } from "@/api/mediaControllers";
import { useState } from "react";
import { useNotification } from "@/components/providers/NotificationProvider";

export const AboutEditor = ({ data, onChange }: { data: any, onChange: (newData: any) => void }) => {
  const [isUploading, setIsUploading] = useState(false);
  const { showNotification } = useNotification();
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("image", file);
      
      const res = await MediaControllers.uploadMedia(formData);
      const responseData = res.data?.data?.data || res.data?.data;
      const uploadedUrl = responseData?.imgUrl || responseData?.videoUrl || responseData?.url;
      const uploadedKey = responseData?.key || uploadedUrl;
      if (uploadedUrl) {
        onChange({ ...data, image: uploadedUrl, imageDownloadUrl: uploadedUrl, imageUrl: uploadedKey });
        showNotification("Image uploaded successfully", "success");
      }
    } catch (error) {
      console.error("Failed to upload about image", error);
      showNotification("Failed to upload image", "error");
    } finally {
      setIsUploading(false);
    }
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
          <Button component="label" variant="outlined" startIcon={isUploading ? <CircularProgress size={16} /> : <Upload />} size="small" sx={{ color: COLORS.PRIMARY_BLUE, borderColor: COLORS.PRIMARY_BLUE }} disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload Image"}
            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
          </Button>
        </Box>
        <Box sx={{ mt: 2, position: "relative", width: "100%", borderRadius: 1, overflow: "hidden", border: "1px solid #ddd" }}>
          {(data.imageDownloadUrl || data.image) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.imageDownloadUrl || data.image} alt="preview" style={{ width: "100%", height: "auto", objectFit: "cover" }} />
          ) : null}
          <IconButton
            size="small"
            color="error"
            onClick={() => onChange({ ...data, image: "", imageDownloadUrl: "", imageUrl: "" })}
            sx={{ position: "absolute", top: 2, right: 2, backgroundColor: "rgba(255,255,255,0.8)", padding: "2px", "&:hover": { backgroundColor: "white" } }}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Stack>
  );
};


