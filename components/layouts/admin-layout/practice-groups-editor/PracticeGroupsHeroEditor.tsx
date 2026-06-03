import React from "react";
import { Box, Button, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import { Delete, Upload } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";

import { useNotification } from "@/components/providers/NotificationProvider";
import { MediaControllers } from "@/api/mediaControllers";
import { useState } from "react";

import { usePageData } from "@/store/usePageData";

export const PracticeGroupsHeroEditor = ({ data, onChange, onDeleteMedia }: { data: any, onChange: (newData: any) => void, onDeleteMedia?: (key: string) => void }) => {
  const [isUploading, setIsUploading] = useState(false);
  const { showNotification } = useNotification();

  const handleImageUpload = async (file: File) => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("image", file);
      
      const res = await MediaControllers.uploadMedia(formData);
      const responseData = res.data?.data?.data || res.data?.data;
      const uploadedUrl = responseData?.imgUrl || responseData?.videoUrl || responseData?.url;
      const uploadedKey = responseData?.key || uploadedUrl;
      
      if (uploadedUrl) {
        onChange({ ...data, imageUrl: uploadedKey, imageDownloadUrl: uploadedUrl });
        showNotification("Image uploaded successfully", "success");
      }
    } catch (error) {
      console.error("Failed to upload image", error);
      showNotification("Failed to upload image", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    if (data.imageUrl && onDeleteMedia) {
      onDeleteMedia(data.imageUrl);
    }
    onChange({ ...data, imageUrl: "", imageDownloadUrl: "" });
    showNotification("Image removed from preview. It will be deleted from server when you save changes.", "info");
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
        Hero Section Settings
      </Typography>

      <TextField fullWidth label="Top Title Badge" value={data?.title || ""} onChange={(e) => onChange({ ...data, title: e.target.value })} />
      <TextField fullWidth label="Main Heading" value={data?.heading || ""} onChange={(e) => onChange({ ...data, heading: e.target.value })} />
      <TextField fullWidth label="Top Description" multiline rows={4} value={data?.description1 || ""} onChange={(e) => onChange({ ...data, description1: e.target.value })} />
      <TextField fullWidth label="Bottom Description" multiline rows={2} value={data?.description2 || ""} onChange={(e) => onChange({ ...data, description2: e.target.value })} />

      <Divider sx={{ my: 1 }} />

      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{ fontFamily: tradeGothic.style.fontFamily, fontSize: 14, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
            Hero Image
          </Typography>
          <Button component="label" variant="outlined" startIcon={<Upload />} size="small" sx={{ color: COLORS.PRIMARY_BLUE }} disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload Image"}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
            />
          </Button>
        </Box>

        {(data?.imageDownloadUrl || data?.imageUrl) && (
          <Box sx={{ mt: 2, position: "relative", width: 96, height: 96, borderRadius: 2, overflow: "hidden", border: "1px solid #ddd" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data?.imageDownloadUrl || (typeof data.imageUrl === "string" ? data.imageUrl : data.imageUrl?.src)}
              alt="Practice groups hero"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <IconButton
              size="small"
              color="error"
              onClick={removeImage}
              sx={{ position: "absolute", top: 2, right: 2, backgroundColor: "rgba(255,255,255,0.85)", padding: "2px", "&:hover": { backgroundColor: "#fff" } }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>
    </Stack>
  );
};
