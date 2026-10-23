import React from 'react';
import { Box, Button, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import { Delete, Upload } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";

import { MediaControllers } from "@/api/mediaControllers";
import { useState } from "react";
import { useNotification } from "@/components/providers/NotificationProvider";

export const ServicesHeroEditor = ({ data, onChange, onDeleteMedia }: { data: any, onChange: (newData: any) => void, onDeleteMedia?: any }) => {
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
        onChange({ ...data, imageUrl: uploadedKey, imageDownloadUrl: uploadedUrl, img: uploadedKey });
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
    <Stack spacing={3}>
      <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
        Hero Section Settings
      </Typography>
      <TextField fullWidth label="Heading 1" value={data?.heading1 || ""} onChange={(e) => onChange({ ...data, heading1: e.target.value })} />
      <TextField fullWidth label="Heading 2" value={data?.heading2 || ""} onChange={(e) => onChange({ ...data, heading2: e.target.value })} />
      <TextField fullWidth label="Description" multiline rows={4} value={data?.description || ""} onChange={(e) => onChange({ ...data, description: e.target.value })} />

      <Divider sx={{ my: 1 }} />

      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{ fontFamily: tradeGothic.style.fontFamily, fontSize: 14, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
            Hero Image
          </Typography>
          <Button component="label" variant="outlined" startIcon={<Upload />} size="small" sx={{ color: COLORS.PRIMARY_BLUE }} disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload Image"}
            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
          </Button>
        </Box>

        {(data?.imageDownloadUrl || data?.img || data?.imageUrl) && (
          <Box sx={{ mt: 2, position: "relative", width: 96, height: 96, borderRadius: 2, overflow: "hidden", border: "1px solid #ddd" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data?.imageDownloadUrl || (typeof data.img === 'string' ? data.img : data.img?.src) || (typeof data.imageUrl === 'string' ? data.imageUrl : data.imageUrl?.src)} alt="Services hero" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <IconButton
              size="small"
              color="error"
              onClick={() => onChange({ ...data, img: "", imageUrl: "", imageDownloadUrl: "" })}
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
