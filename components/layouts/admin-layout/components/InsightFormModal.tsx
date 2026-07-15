import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Button,
  Tabs,
  Tab,
  Box,
  Stack,
  Grid,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { Close, Delete } from "@mui/icons-material";
import { COLORS, INSIGHTS_TAB_DATA } from "@/utils/enum";
import { 
  INSIGHT_FORM_CARD_DATA, 
  INSIGHT_FORM_HERO_DATA, 
  INSIGHT_FORM_CONTENT_DATA 
} from "@/utils/types";
import { tradeGothic } from "@/utils/fonts";

interface InsightFormModalProps {
  open: boolean;
  onClose: () => void;
  activeId: number | null;
  activeTab: number;
  setActiveTab: (val: number) => void;
  cardData: INSIGHT_FORM_CARD_DATA;
  setCardData: (data: INSIGHT_FORM_CARD_DATA) => void;
  heroData: INSIGHT_FORM_HERO_DATA;
  setHeroData: (data: INSIGHT_FORM_HERO_DATA) => void;
  contentSections: INSIGHT_FORM_CONTENT_DATA;
  setContentSections: (data: INSIGHT_FORM_CONTENT_DATA) => void;
  errors: Record<string, string | undefined>;
  setErrors: (errors: Record<string, string | undefined>) => void;
  isUploadingImage: boolean;
  handleImageUpload?: (file: File) => void;
  handleDeleteImage?: () => void;
  isSaving?: boolean;
  handleSave: () => void;
  handleContentSectionChange: (sectionKey: string, field: "heading" | "content", val: string) => void;
}

export default function InsightFormModal({
  open,
  onClose,
  activeId,
  activeTab,
  setActiveTab,
  cardData,
  setCardData,
  heroData,
  setHeroData,
  contentSections,
  setContentSections,
  errors,
  setErrors,
  isUploadingImage,
  handleImageUpload,
  handleDeleteImage,
  isSaving = false,
  handleSave,
  handleContentSectionChange,
}: InsightFormModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 4,
            m: { xs: 1, sm: 2 },
            width: { xs: "calc(100% - 16px)", sm: "calc(100% - 64px)" },
            maxHeight: { xs: "calc(100% - 16px)", sm: "calc(100% - 64px)" },
          },
        }
      }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
        <Typography component="span" variant="h5" sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
          {activeId ? "Edit Insight" : "Add New Insight"}
        </Typography>
        <IconButton onClick={onClose} disabled={isSaving}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Tabs
          value={activeTab}
          onChange={(e, val) => setActiveTab(val)}
          sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Card Details" />
          <Tab label="Hero Banner" />
          <Tab label="Main Content" />
          <Tab label="Additional Content" />
          <Tab label="Reviews & Strengths" />
          <Tab label="Misc & Resources" />
        </Tabs>

        <Box sx={{ minHeight: 400 }}>
          {/* Tab 0: Card Details */}
          {activeTab === 0 && (
            <Stack spacing={3}>
              <Typography variant="subtitle2" color="primary">Preview Card Configuration</Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography sx={{ fontWeight: 600, mb: 1, fontSize: 14 }}>Title</Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter title"
                    value={cardData.title || ""}
                    onChange={(e) => {
                      setCardData({ ...cardData, title: e.target.value });
                      setErrors({ ...errors, "cardData.title": undefined });
                    }}
                    error={!!errors["cardData.title"]}
                    helperText={errors["cardData.title"]}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography sx={{ fontWeight: 600, mb: 1, fontSize: 14 }}>Category</Typography>
                  <Select
                    fullWidth
                    displayEmpty
                    value={cardData.category || ""}
                    onChange={(e) => {
                      setCardData({ ...cardData, category: e.target.value });
                      setErrors({ ...errors, "cardData.category": undefined });
                    }}
                    error={!!errors["cardData.category"]}
                    renderValue={(selected) => {
                      if (!selected) return <span style={{ color: "#9e9e9e" }}>Select Category</span>;
                      return selected as string;
                    }}
                  >
                    <MenuItem value="" disabled sx={{ display: "none" }}>Select Category</MenuItem>
                    <MenuItem value="News">News</MenuItem>
                    <MenuItem value="Articles">Articles</MenuItem>
                    <MenuItem value="Links">Links</MenuItem>
                  </Select>
                  {errors["cardData.category"] && (
                    <Typography variant="caption" color="error">{errors["cardData.category"]}</Typography>
                  )}
                </Grid>
              </Grid>
            </Stack>
          )}

          {/* Tab 1: Hero Banner */}
          {activeTab === 1 && (
            <Stack spacing={3}>
              <Typography variant="subtitle2" color="primary">Hero Section Details</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box
                    sx={{
                      border: "1px dashed #ccc",
                      p: 2,
                      borderRadius: 2,
                      textAlign: "center",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {isUploadingImage ? (
                      <Box sx={{ mb: 2, height: 120, width: 120, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <CircularProgress size={30} />
                      </Box>
                    ) : heroData.profileImage ? (
                      <Box sx={{ position: "relative", mb: 2, height: 120, width: 120 }}>
                        <Box sx={{ height: "100%", width: "100%", borderRadius: "50%", overflow: "hidden" }}>
                          <img
                            src={heroData.profileImage}
                            alt="Preview"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </Box>
                        <IconButton
                          onClick={handleDeleteImage}
                          sx={{ position: "absolute", top: -8, right: -8, backgroundColor: "white", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", "&:hover": { backgroundColor: "#f5f5f5" } }}
                          size="small"
                        >
                          <Delete color="error" fontSize="small" />
                        </IconButton>
                      </Box>
                    ) : (
                      <Box sx={{ mb: 2, height: 120, width: 120, borderRadius: "50%", backgroundColor: "#eaeaea", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Typography variant="caption">No Image</Typography>
                      </Box>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      id="hero-photo-upload"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload?.(e.target.files[0])}
                      disabled={isUploadingImage}
                    />
                    <label htmlFor="hero-photo-upload">
                      <Button variant="outlined" component="span" size="small" color={errors["heroData.profileImage"] ? "error" : "primary"} disabled={isUploadingImage}>
                        {isUploadingImage ? "Uploading..." : "Upload Photo"}
                      </Button>
                    </label>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 8 }}>
                  <Stack spacing={2}>
                    <TextField fullWidth label="Person Name" value={heroData.name || ""} onChange={(e) => setHeroData({ ...heroData, name: e.target.value })} error={!!errors["heroData.name"]} helperText={errors["heroData.name"]} />
                    <TextField fullWidth label="Band / Role" value={heroData.band || ""} onChange={(e) => setHeroData({ ...heroData, band: e.target.value })} error={!!errors["heroData.band"]} helperText={errors["heroData.band"]} />
                    <TextField fullWidth label="Guide Organization" value={heroData.guide || ""} onChange={(e) => setHeroData({ ...heroData, guide: e.target.value })} error={!!errors["heroData.guide"]} helperText={errors["heroData.guide"]} />
                    <TextField fullWidth label="Years Ranked / Date" value={heroData.yearsRanked || ""} onChange={(e) => setHeroData({ ...heroData, yearsRanked: e.target.value })} />
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          )}

          {/* Tab 2: Main Content */}
          {activeTab === 2 && (
            <Stack spacing={3}>
              <Typography variant="subtitle2" color="primary">Main Biography / Closing Statement</Typography>
              <TextField fullWidth label="Heading (Optional)" value={contentSections.closingStatement?.heading || ""} onChange={(e) => handleContentSectionChange("closingStatement", "heading", e.target.value)} />
              <TextField fullWidth multiline rows={8} label="Content Body (Use new lines for paragraphs)" value={contentSections.closingStatement?.content || ""} onChange={(e) => handleContentSectionChange("closingStatement", "content", e.target.value)} />
            </Stack>
          )}

          {/* Tab 3: Additional Content */}
          {activeTab === 3 && (
            <Stack spacing={4}>
              <Box>
                <Typography variant="subtitle2" color="primary" sx={{ mb: 2 }}>Practice Areas</Typography>
                <Stack spacing={2}>
                  <TextField fullWidth label="Heading" value={contentSections.practiceAreas?.heading || ""} onChange={(e) => handleContentSectionChange("practiceAreas", "heading", e.target.value)} />
                  <TextField fullWidth multiline rows={3} label="Content Body (Use new lines for lists/paragraphs)" value={contentSections.practiceAreas?.content || ""} onChange={(e) => handleContentSectionChange("practiceAreas", "content", e.target.value)} />
                </Stack>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="primary" sx={{ mb: 2 }}>Career & Background</Typography>
                <Stack spacing={2}>
                  <TextField fullWidth label="Heading" value={contentSections.career?.heading || ""} onChange={(e) => handleContentSectionChange("career", "heading", e.target.value)} />
                  <TextField fullWidth multiline rows={3} label="Content Body (Use new lines for lists/paragraphs)" value={contentSections.career?.content || ""} onChange={(e) => handleContentSectionChange("career", "content", e.target.value)} />
                </Stack>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="primary" sx={{ mb: 2 }}>Personal Notes / Education</Typography>
                <Stack spacing={2}>
                  <TextField fullWidth label="Heading" value={contentSections.personal?.heading || ""} onChange={(e) => handleContentSectionChange("personal", "heading", e.target.value)} />
                  <TextField fullWidth multiline rows={3} label="Content Body (Use new lines for lists/paragraphs)" value={contentSections.personal?.content || ""} onChange={(e) => handleContentSectionChange("personal", "content", e.target.value)} />
                </Stack>
              </Box>
            </Stack>
          )}

          {/* Tab 4: Reviews & Strengths */}
          {activeTab === 4 && (
            <Stack spacing={4}>
              <Box>
                <Typography variant="subtitle2" color="primary" sx={{ mb: 2 }}>Chambers / Industry Review</Typography>
                <Stack spacing={2}>
                  <TextField fullWidth label="Heading" value={contentSections.ChamberssReview?.heading || ""} onChange={(e) => handleContentSectionChange("ChamberssReview", "heading", e.target.value)} />
                  <TextField fullWidth multiline rows={4} label="Content Body (Use new lines for paragraphs)" value={contentSections.ChamberssReview?.content || ""} onChange={(e) => handleContentSectionChange("ChamberssReview", "content", e.target.value)} />
                </Stack>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="primary" sx={{ mb: 2 }}>Strengths / Quotes</Typography>
                <Stack spacing={2}>
                  <TextField fullWidth label="Heading" value={contentSections.strengths?.heading || ""} onChange={(e) => handleContentSectionChange("strengths", "heading", e.target.value)} />
                  <TextField fullWidth multiline rows={4} label="Content Body (Format: Quote text followed by '- Author')" value={contentSections.strengths?.content || ""} onChange={(e) => handleContentSectionChange("strengths", "content", e.target.value)} />
                </Stack>
              </Box>
            </Stack>
          )}

          {/* Tab 5: Misc & Resources */}
          {activeTab === 5 && (
            <Stack spacing={4}>
              <Box>
                <Typography variant="subtitle2" color="primary" sx={{ mb: 2 }}>Professional Memberships</Typography>
                <Stack spacing={2}>
                  <TextField fullWidth label="Heading" value={contentSections.professionalMemberships?.heading || ""} onChange={(e) => handleContentSectionChange("professionalMemberships", "heading", e.target.value)} />
                  <TextField fullWidth multiline rows={3} label="Content Body (Use new lines for lists)" value={contentSections.professionalMemberships?.content || ""} onChange={(e) => handleContentSectionChange("professionalMemberships", "content", e.target.value)} />
                </Stack>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="primary" sx={{ mb: 2 }}>External Resource / Link</Typography>
                <Stack spacing={2}>
                  <TextField fullWidth label="Heading (e.g., Read More)" value={contentSections.resource?.heading || ""} onChange={(e) => handleContentSectionChange("resource", "heading", e.target.value)} />
                  <TextField fullWidth multiline rows={2} label="Resource Description" value={contentSections.resource?.content || ""} onChange={(e) => handleContentSectionChange("resource", "content", e.target.value)} />
                  <TextField fullWidth label="Resource URL (Link)" placeholder="https://..." value={contentSections.resource?.link || ""} onChange={(e) => setContentSections({ ...contentSections, resource: { ...contentSections.resource, link: e.target.value } })} />
                </Stack>
              </Box>
            </Stack>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit" disabled={isSaving}>
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" sx={{ backgroundColor: COLORS.PRIMARY_BLUE }} disabled={isSaving}>
          {isSaving ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : (activeId ? "Update Insight" : "Save Insight")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
