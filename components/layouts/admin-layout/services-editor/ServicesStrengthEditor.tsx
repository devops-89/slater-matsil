import React, { useState } from 'react';
import { Box, Button, Stack, TextField, Typography, Card, Grid, IconButton, CircularProgress } from "@mui/material";
import { Delete, Upload } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import { MediaControllers } from "@/api/mediaControllers";
import { useNotification } from "@/components/providers/NotificationProvider";

export const ServicesStrengthEditor = ({ data, onChange, onDeleteMedia }: { data: any, onChange: (newData: any) => void, onDeleteMedia?: (key: string) => void }) => {
  const { showNotification } = useNotification();
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const [deletingIdx, setDeletingIdx] = useState<number | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploadingIdx(idx);
      const formData = new FormData();
      formData.append("image", file);
      
      const res = await MediaControllers.uploadMedia(formData);
      const responseData = res.data?.data?.data || res.data?.data;
      const uploadedUrl = responseData?.imgUrl || responseData?.videoUrl || responseData?.url;
      const uploadedKey = responseData?.key || uploadedUrl;
      if (uploadedUrl) {
        const newCards = [...(data?.our_strength?.data || [])];
        newCards[idx] = { ...newCards[idx], img: uploadedUrl, imageUrl: uploadedKey, imageDownloadUrl: uploadedUrl };
        delete newCards[idx].key;
        onChange({ ...data, our_strength: { ...data.our_strength, data: newCards } });
        showNotification("Icon uploaded successfully", "success");
      }
    } catch (error) {
      console.error("Failed to upload icon", error);
      showNotification("Failed to upload icon", "error");
    } finally {
      setUploadingIdx(null);
    }
  };
  const cards = data?.our_strength?.data || [];
  return (
    <Stack spacing={4}>
      <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
        Why Choose Us Settings
      </Typography>
      <TextField fullWidth label="Top Title" value={data?.title || ""} onChange={(e) => onChange({ ...data, title: e.target.value })} />
      <TextField fullWidth label="Heading" value={data?.heading || ""} onChange={(e) => onChange({ ...data, heading: e.target.value })} />
      <TextField fullWidth label="Span Heading (Colored)" value={data?.spanHeading || ""} onChange={(e) => onChange({ ...data, spanHeading: e.target.value })} />
      <TextField fullWidth label="Description" multiline rows={3} value={data?.description || ""} onChange={(e) => onChange({ ...data, description: e.target.value })} />
      
      <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700, mt: 4 }}>
        Our Strength Cards
      </Typography>
      <TextField fullWidth label="Cards Section Heading" value={data?.our_strength?.heading || ""} onChange={(e) => onChange({ ...data, our_strength: { ...data.our_strength, heading: e.target.value } })} />

      {cards.map((card: any, idx: number) => (
        <Card key={idx} sx={{ p: 3, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 4, boxShadow: "0 2px 10px rgba(0,0,0,0.02)", backgroundColor: "#FFFFFF" }}>
          <Stack spacing={2}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="subtitle2" color="text.secondary">
                Card Icon/Image
              </Typography>
              <Button component="label" variant="outlined" startIcon={<Upload />} size="small" sx={{ color: COLORS.PRIMARY_BLUE }} disabled={uploadingIdx === idx}>
                {uploadingIdx === idx ? "Uploading..." : "Upload Image"}
                <input type="file" hidden accept="image/*" onChange={(e) => handleImageUpload(e, idx)} />
              </Button>
            </Box>
            {(card.imageDownloadUrl || card.img || card.imageUrl) && (
              <Box sx={{ mt: 1, position: "relative", width: 64, height: 64, borderRadius: 1, overflow: "hidden", border: "1px solid #ddd" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={card.imageDownloadUrl || (typeof card.img === 'string' ? card.img : card.img?.src) || (typeof card.imageUrl === 'string' ? card.imageUrl : card.imageUrl?.src)} alt={`card ${idx}`} style={{ width: "100%", height: "100%", objectFit: "contain", backgroundColor: "#f9f9f9" }} />
                <IconButton
                  size="small"
                  color="error"
                  disabled={deletingIdx === idx}
                  onClick={async () => {
                    const imgToDelete = card.img;
                    if (!imgToDelete) return;

                    try {
                      setDeletingIdx(idx);

                      let key = imgToDelete;
                      try {
                        const urlObj = new URL(imgToDelete);
                        key = decodeURIComponent(urlObj.pathname.substring(1));
                      } catch (e) {}

                      if (onDeleteMedia) {
                        onDeleteMedia(key);
                      }

                      const newCards = [...cards];
                      newCards[idx] = { ...newCards[idx], img: "", imageUrl: "deleted", imageDownloadUrl: "" };
                      onChange({ ...data, our_strength: { ...data.our_strength, data: newCards } });
                      showNotification("Icon removed from preview (Save to apply)", "info");
                    } catch (err) {
                      console.error("Failed to process icon removal", err);
                      const newCards = [...cards];
                      newCards[idx] = { ...newCards[idx], img: "", imageUrl: "deleted", imageDownloadUrl: "" };
                      onChange({ ...data, our_strength: { ...data.our_strength, data: newCards } });
                    } finally {
                      setDeletingIdx(null);
                    }
                  }}
                  sx={{ position: "absolute", top: 2, right: 2, backgroundColor: "rgba(255,255,255,0.8)", padding: "2px", "&:hover": { backgroundColor: "white" } }}
                >
                  {deletingIdx === idx ? <CircularProgress size={16} /> : <Delete fontSize="small" />}
                </IconButton>
              </Box>
            )}

            <TextField fullWidth label={`Card ${idx + 1} Title`} value={card.title || ""} onChange={(e) => {
              const newCards = [...cards];
              newCards[idx] = { ...newCards[idx], title: e.target.value };
              onChange({ ...data, our_strength: { ...data.our_strength, data: newCards } });
            }} />
            <TextField fullWidth label="Description" multiline rows={2} value={card.description || ""} onChange={(e) => {
              const newCards = [...cards];
              newCards[idx] = { ...newCards[idx], description: e.target.value };
              onChange({ ...data, our_strength: { ...data.our_strength, data: newCards } });
            }} />
          </Stack>
        </Card>
      ))}
    </Stack>
  );
};
