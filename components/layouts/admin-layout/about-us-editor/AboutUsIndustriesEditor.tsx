import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Delete, Upload } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import { MediaControllers } from "@/api/mediaControllers";
import { useNotification } from "@/components/providers/NotificationProvider";
import { CAREER_HOME_DATA } from "@/public/data/generic-array";

export const AboutUsIndustriesEditor = ({ data = {}, onChange, onDeleteMedia }: any) => {
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const { showNotification } = useNotification();

  // Helper to extract flat list of categories
  const getFlatList = () => {
    let list: any[] = [];
    data.section_data?.forEach((col: any) => {
      if (col.dataList) list = [...list, ...col.dataList];
    });
    return list;
  };

  // Split sequentially into 3 columns (frontend expects 3 columns for Industries)
  const saveFlatList = (list: any[]) => {
    const numCols = 3;
    const newSectionData = [];
    const baseSize = Math.floor(list.length / numCols);
    let remainder = list.length % numCols;

    let startIndex = 0;
    for (let i = 0; i < numCols; i++) {
      const colSize = baseSize + (remainder > 0 ? 1 : 0);
      remainder--;
      const colData = list.slice(startIndex, startIndex + colSize);
      if (colData.length > 0) {
        newSectionData.push({ dataList: colData });
      }
      startIndex += colSize;
    }

    onChange({ ...data, section_data: newSectionData });
  };

  const flatList = getFlatList();

  // Cards below industries
  const defaultCards = CAREER_HOME_DATA.map((c) => ({
    title: c.title,
    href: c.href,
    img: c.img,
    imageUrl: "",
    imageDownloadUrl: "",
  }));

  const cards = (data.cards && data.cards.length > 0) ? data.cards : defaultCards;

  const updateCard = (idx: number, patch: Partial<any>) => {
    const newCards = [...cards];
    newCards[idx] = { ...newCards[idx], ...patch };
    onChange({ ...data, cards: newCards });
  };

  const handleCardImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploadingIndex(idx);
      const formData = new FormData();
      formData.append("image", file);
      const response = await MediaControllers.uploadMedia(formData);
      const responseData = response.data?.data?.data || response.data?.data;
      const uploadedUrl = responseData?.imgUrl || responseData?.videoUrl || responseData?.url;
      const uploadedKey = responseData?.key || uploadedUrl;

      if (response.data?.success && uploadedUrl) {
        updateCard(idx, {
          img: uploadedUrl,
          imageDownloadUrl: uploadedUrl,
          imageUrl: uploadedKey,
        });
        showNotification("Card image uploaded successfully", "success");
      }
    } catch (error) {
      showNotification("Failed to upload image", "error");
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleCardImageDelete = (idx: number) => {
    const card = cards[idx];
    if (card?.imageUrl || card?.key) {
      onDeleteMedia?.(card.imageUrl || card.key);
    }
    updateCard(idx, {
      img: "",
      imageDownloadUrl: "",
      imageUrl: "",
    });
  };

  const handleCardDelete = (idx: number) => {
    const newCards = cards.filter((_: any, i: number) => i !== idx);
    onChange({ ...data, cards: newCards });
  };

  const handleAddCard = () => {
    const newCards = [
      ...cards,
      {
        title: "New Card",
        href: "/",
        img: "",
        imageUrl: "",
        imageDownloadUrl: "",
      },
    ];
    onChange({ ...data, cards: newCards });
  };

  return (
    <Stack spacing={4}>
      <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
        Industries We Serve Settings
      </Typography>
      <TextField fullWidth label="Heading 1" value={data.heading1 || ""} onChange={(e) => onChange({ ...data, heading1: e.target.value })} />
      <TextField fullWidth label="Heading 2" value={data.heading2 || ""} onChange={(e) => onChange({ ...data, heading2: e.target.value })} />
      <TextField fullWidth label="Description" multiline rows={3} value={data.description || ""} onChange={(e) => onChange({ ...data, description: e.target.value })} />

      <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700, mt: 4 }}>
        Industry Categories
      </Typography>

      <Grid container spacing={2}>
        {flatList.map((item: any, idx: number) => (
          <Grid size={12} key={idx}>
            <Stack direction="row" spacing={1} alignItems="center">
              <TextField
                fullWidth size="small" label={`Input ${idx + 1}`} value={item.label || ""}
                onChange={(e) => {
                  const newList = [...flatList];
                  newList[idx] = { ...newList[idx], label: e.target.value };
                  saveFlatList(newList);
                }}
              />
              <IconButton
                color="error"
                size="small"
                onClick={() => {
                  const newList = flatList.filter((_: any, i: number) => i !== idx);
                  saveFlatList(newList);
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Stack>
          </Grid>
        ))}
      </Grid>

      <Box>
        <Button
          variant="contained" size="small"
          onClick={() => saveFlatList([...flatList, { label: "" }])}
          sx={{ backgroundColor: COLORS.PRIMARY_BLUE, color: COLORS.WHITE }}
        >
          + Add Input
        </Button>
      </Box>

      {/* Feature Cards Section */}
      <Box sx={{ pt: 2, borderTop: "1px solid #e0e0e0" }}>
        <Typography variant="h6" sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700, mb: 1 }}>
          Cards Under Industries We Serve
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
          Manage the 3 cards that appear directly below Industries We Serve.
        </Typography>

        <Stack spacing={3}>
          {cards.map((card: any, idx: number) => {
            const previewImg =
              card.imageDownloadUrl ||
              (typeof card.img === "string" ? card.img : card.img?.src) ||
              card.imageUrl ||
              "";

            const isCardUploading = uploadingIndex === idx;

            return (
              <Card
                key={idx}
                variant="outlined"
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  borderColor: "#d0d7de",
                  backgroundColor: "#fafbfc",
                }}
              >
                <Stack spacing={2}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        color: COLORS.PRIMARY_BLUE,
                        fontFamily: adelle.style.fontFamily,
                      }}
                    >
                      Card {idx + 1}: {card.title || "Untitled"}
                    </Typography>
                  </Box>

                  <TextField
                    fullWidth
                    size="small"
                    label="Card Title"
                    value={card.title || ""}
                    onChange={(e) => updateCard(idx, { title: e.target.value })}
                  />

                  {/* Card Image */}
                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                      <Typography variant="subtitle2" sx={{ color: "text.secondary", fontSize: 13 }}>
                        Card Image
                      </Typography>
                      <Button
                        component="label"
                        variant="outlined"
                        size="small"
                        startIcon={isCardUploading ? <CircularProgress size={14} /> : <Upload fontSize="small" />}
                        disabled={isCardUploading}
                        sx={{
                          color: COLORS.PRIMARY_BLUE,
                          borderColor: COLORS.PRIMARY_BLUE,
                          fontSize: 12,
                          py: 0.5,
                        }}
                      >
                        {isCardUploading ? "Uploading..." : previewImg ? "Change Image" : "Upload Image"}
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) => handleCardImageUpload(e, idx)}
                        />
                      </Button>
                    </Box>

                    {previewImg && (
                      <Box
                        sx={{
                          position: "relative",
                          width: "120px",
                          height: "90px",
                          borderRadius: 1.5,
                          overflow: "hidden",
                          border: "1px solid #d0d7de",
                          backgroundColor: "#000",
                        }}
                      >
                        <img
                          src={previewImg}
                          alt={card.title || "Card Preview"}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleCardImageDelete(idx)}
                          sx={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            backgroundColor: "rgba(255, 255, 255, 0.85)",
                            padding: "2px",
                            "&:hover": { backgroundColor: "#fff" },
                          }}
                          title="Remove Image"
                        >
                          <Delete sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                </Stack>
              </Card>
            );
          })}
        </Stack>
      </Box>
    </Stack>
  );
};
