import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import { Upload, Delete } from "@mui/icons-material";
import { Box, Button, Divider, Stack, TextField, Typography, CircularProgress, IconButton } from "@mui/material";
import React from "react";

import { MediaControllers } from "@/api/mediaControllers";
import { useNotification } from "@/components/providers/NotificationProvider";
import { useState } from "react";

export const AboutUsHeroEditor = ({ data, onChange, onDeleteMedia }: any) => {
  const [isUploading, setIsUploading] = useState(false);
  const { showNotification } = useNotification();

  const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("video", file);
      const response = await MediaControllers.uploadMedia(formData);
      const responseData = response.data?.data?.data || response.data?.data;
      const uploadedUrl = responseData?.imgUrl || responseData?.videoUrl || responseData?.url;
      const uploadedKey = responseData?.key || uploadedUrl;
      
      if (response.data?.success && uploadedUrl) {
        onChange({ ...data, videoUrl: uploadedKey, videoDownloadUrl: uploadedUrl });
        showNotification("Video uploaded successfully", "success");
      }
    } catch (error) {
      showNotification("Failed to upload video", "error");
    } finally {
      setIsUploading(false);
    }
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
          <Button component="label" variant="outlined" startIcon={isUploading ? <CircularProgress size={16} /> : <Upload />} size="small" sx={{ color: COLORS.PRIMARY_BLUE, borderColor: COLORS.PRIMARY_BLUE, whiteSpace: "nowrap" }} disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload Video"}
            <input type="file" hidden accept="video/*" onChange={handleVideoUpload} />
          </Button>
        </Box>


        {(data.videoDownloadUrl || data.videoUrl) ? (
          <Box sx={{ mt: 2, position: "relative", width: "100%", borderRadius: 1, overflow: "hidden", border: "1px solid #ddd" }}>
            <video src={data.videoDownloadUrl || data.videoUrl} controls style={{ width: "100%", maxHeight: "250px", objectFit: "cover", display: "block" }} />
            <IconButton
              size="small"
              color="error"
              onClick={() => {
                if (data.videoUrl || data.key) onDeleteMedia?.(data.videoUrl || data.key);
                onChange({ ...data, videoUrl: "", videoDownloadUrl: "", key: "" });
              }}
              sx={{ position: "absolute", top: 8, right: 8, backgroundColor: "rgba(255,255,255,0.8)", padding: "4px", "&:hover": { backgroundColor: "white" }, zIndex: 10 }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        ) : null}
      </Box>
    </Stack>
  );
};

