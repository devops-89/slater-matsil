import React from 'react';
import { Box, Button, Stack, TextField, Typography, Card, Grid, IconButton } from "@mui/material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Upload, Delete } from "@mui/icons-material";
import { MediaControllers } from "@/api/mediaControllers";
import { useState } from "react";
import { useNotification } from "@/components/providers/NotificationProvider";

export const ServicesUnparalleledEditor = ({ data, onChange }: { data: any, onChange: (newData: any) => void }) => {
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
      if (uploadedUrl) {
        onChange({ ...data, img: uploadedUrl });
        showNotification("Image uploaded successfully", "success");
      }
    } catch (error) {
      console.error("Failed to upload image", error);
      showNotification("Failed to upload image", "error");
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <Stack spacing={4}>
      <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
        Unparalleled Legal Services Settings
      </Typography>
      <TextField fullWidth label="Title" value={data?.title || ""} onChange={(e) => onChange({ ...data, title: e.target.value })} />
      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="subtitle2" color="text.secondary">
            Right-Side Image
          </Typography>
          <Button component="label" variant="outlined" startIcon={<Upload />} size="small" sx={{ color: COLORS.PRIMARY_BLUE }} disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload Image"}
            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
          </Button>
        </Box>
        {data?.img && (
          <Box sx={{ mt: 2, position: "relative", width: 96, height: 96, borderRadius: 1, overflow: "hidden", border: "1px solid #ddd" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={typeof data.img === 'string' ? data.img : data.img.src} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <IconButton
              size="small"
              color="error"
              onClick={() => onChange({ ...data, img: "" })}
              sx={{ position: "absolute", top: 2, right: 2, backgroundColor: "rgba(255,255,255,0.8)", padding: "2px", "&:hover": { backgroundColor: "white" } }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>
    </Stack>
  );
};
