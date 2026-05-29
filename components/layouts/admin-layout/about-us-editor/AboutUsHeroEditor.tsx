import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import { Upload } from "@mui/icons-material";
import { Box, Button, Divider, Stack, TextField, Typography } from "@mui/material";
import React from "react";

import { MediaControllers } from "@/api/mediaControllers";
import { useNotification } from "@/components/providers/NotificationProvider";
import { useState } from "react";

export const AboutUsHeroEditor = ({ data, onChange }: any) => {
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
      if (response.data?.success && uploadedUrl) {
        onChange({ ...data, videoUrl: uploadedUrl });
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
          <Button component="label" variant="outlined" startIcon={<Upload />} size="small" sx={{ color: COLORS.PRIMARY_BLUE }} disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload Video"}
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

