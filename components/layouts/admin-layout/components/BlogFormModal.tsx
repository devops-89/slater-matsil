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
  Divider,
} from "@mui/material";
import { Close, Add, Delete } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";

interface BlogFormModalProps {
  open: boolean;
  onClose: () => void;
  activeId: number | null;
  activeTab: number;
  setActiveTab: (val: number) => void;
  cardData: any;
  setCardData: (data: any) => void;
  heroData: any;
  setHeroData: (data: any) => void;
  content: any;
  setContent: (data: any) => void;
  errors: any;
  setErrors: (errors: any) => void;
  isUploadingCard: boolean;
  isUploadingAuthor: boolean;
  handleCardImageUpload: (file: File) => void;
  handleAuthorImageUpload: (file: File) => void;
  handleDeleteImage: (type: "card" | "author") => void;
  handleSave: () => void;
  handleAddSection: () => void;
  handleRemoveSection: (idx: number) => void;
  handleSectionChange: (idx: number, field: "heading" | "content", val: string) => void;
  getSectionContentString: (val: string | string[]) => string;
}

export default function BlogFormModal({
  open,
  onClose,
  activeId,
  activeTab,
  setActiveTab,
  cardData,
  setCardData,
  heroData,
  setHeroData,
  content,
  setContent,
  errors,
  setErrors,
  isUploadingCard,
  isUploadingAuthor,
  handleCardImageUpload,
  handleAuthorImageUpload,
  handleDeleteImage,
  handleSave,
  handleAddSection,
  handleRemoveSection,
  handleSectionChange,
  getSectionContentString,
}: BlogFormModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            m: { xs: 1, sm: 2 },
            width: { xs: "calc(100% - 16px)", sm: "calc(100% - 64px)" },
            maxHeight: { xs: "calc(100% - 16px)", sm: "calc(100% - 64px)" },
            borderRadius: 4,
          },
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
        <Typography component="span" variant="h5" sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
          {activeId ? "Edit Blog Entry" : "Add Blog Entry"}
        </Typography>
        <IconButton onClick={onClose}>
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
          <Tab label="Card Settings" />
          <Tab label="Hero Settings" />
          <Tab label="Content Body" />
        </Tabs>

        <Box sx={{ minHeight: 400 }}>
          {/* Tab 0: Card Settings */}
          {activeTab === 0 && (
            <Stack spacing={3}>
              <Typography variant="subtitle2" color="primary">
                Blog Listing Preview Settings
              </Typography>
              <Grid container spacing={3}>
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
                      position: "relative",
                    }}
                  >
                    {isUploadingCard ? (
                      <Box sx={{ mb: 2, py: 4, display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                        <CircularProgress size={30} />
                      </Box>
                    ) : cardData.img ? (
                      <Box sx={{ mb: 2, height: 150, overflow: "hidden", borderRadius: 2, position: "relative", display: "flex", justifyContent: "center" }}>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteImage("card")}
                          sx={{ position: "absolute", top: 4, right: 4, bgcolor: "white", boxShadow: 1, "&:hover": { bgcolor: "#f5f5f5" } }}
                        >
                          <Close fontSize="small" />
                        </IconButton>
                        <img
                          src={typeof cardData.img === "string" ? cardData.img : cardData.img.src}
                          alt="Preview"
                          style={{ height: "100%", width: "auto", objectFit: "contain" }}
                        />
                      </Box>
                    ) : (
                      <Box sx={{ mb: 2, py: 4, backgroundColor: "#eaeaea", borderRadius: 2, width: "100%" }}>
                        <Typography variant="caption">No Card Image Uploaded</Typography>
                      </Box>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      id="card-photo-upload"
                      onChange={(e) => e.target.files?.[0] && handleCardImageUpload(e.target.files[0])}
                      disabled={isUploadingCard}
                    />
                    <label htmlFor="card-photo-upload">
                      <Button variant="outlined" component="span" size="small" disabled={isUploadingCard}>
                        Upload Card Image
                      </Button>
                    </label>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 8 }}>
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      label="Blog Title"
                      value={cardData.title || ""}
                      onChange={(e) => {
                        setCardData({ ...cardData, title: e.target.value });
                        setErrors({ ...errors, "cardData.title": undefined });
                      }}
                      error={!!errors["cardData.title"]}
                      helperText={errors["cardData.title"]}
                    />
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Date Published"
                          value={cardData.date || ""}
                          onChange={(e) => {
                            setCardData({ ...cardData, date: e.target.value });
                            setErrors({ ...errors, "cardData.date": undefined });
                          }}
                          error={!!errors["cardData.date"]}
                          helperText={errors["cardData.date"] || "e.g., September 2025"}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Read Time"
                          value={cardData.readTime || ""}
                          onChange={(e) => {
                            setCardData({ ...cardData, readTime: e.target.value });
                            setErrors({ ...errors, "cardData.readTime": undefined });
                          }}
                          error={!!errors["cardData.readTime"]}
                          helperText={errors["cardData.readTime"] || "e.g., 5 min"}
                        />
                      </Grid>
                    </Grid>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Listing Description"
                      value={cardData.description || ""}
                      onChange={(e) => {
                        setCardData({ ...cardData, description: e.target.value });
                        setErrors({ ...errors, "cardData.description": undefined });
                      }}
                      error={!!errors["cardData.description"]}
                      helperText={errors["cardData.description"]}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          )}

          {/* Tab 1: Hero Settings */}
          {activeTab === 1 && (
            <Stack spacing={3}>
              <Typography variant="subtitle2" color="primary">
                Article Hero Banner Info
              </Typography>
              <TextField
                fullWidth
                label="Hero Banner Title (Defaults to Card Title if blank)"
                value={heroData.title || ""}
                onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
              />
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Category"
                    value={heroData.category || ""}
                    onChange={(e) => {
                      setHeroData({ ...heroData, category: e.target.value });
                      setErrors({ ...errors, "heroData.category": undefined });
                    }}
                    error={!!errors["heroData.category"]}
                    helperText={errors["heroData.category"] || "e.g., Patent Law, Artificial Intelligence"}
                  />
                </Grid>
              </Grid>
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
                      position: "relative",
                    }}
                  >
                    {isUploadingAuthor ? (
                      <Box sx={{ mb: 2, height: 100, width: 100, borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <CircularProgress size={30} />
                      </Box>
                    ) : heroData.authorImage ? (
                      <Box sx={{ mb: 2, height: 100, width: 100, position: "relative" }}>
                        <Box sx={{ position: "absolute", top: 0, right: 0, zIndex: 10, transform: "translate(25%, -25%)" }}>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteImage("author")}
                            sx={{ bgcolor: "white", boxShadow: 1, "&:hover": { bgcolor: "#f5f5f5" } }}
                          >
                            <Close fontSize="small" />
                          </IconButton>
                        </Box>
                        <Box sx={{ borderRadius: "50%", overflow: "hidden", height: "100%", width: "100%" }}>
                          <img
                            src={typeof heroData.authorImage === "string" ? heroData.authorImage : heroData.authorImage.src}
                            alt="Author Preview"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </Box>
                      </Box>
                    ) : (
                      <Box sx={{ mb: 2, height: 100, width: 100, borderRadius: "50%", backgroundColor: "#eaeaea", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Typography variant="caption">No Image</Typography>
                      </Box>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      id="author-photo-upload"
                      onChange={(e) => e.target.files?.[0] && handleAuthorImageUpload(e.target.files[0])}
                      disabled={isUploadingAuthor}
                    />
                    <label htmlFor="author-photo-upload">
                      <Button variant="outlined" component="span" size="small" disabled={isUploadingAuthor}>
                        Author Photo
                      </Button>
                    </label>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 8 }}>
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      label="Author Name"
                      value={heroData.author || ""}
                      onChange={(e) => {
                        setHeroData({ ...heroData, author: e.target.value });
                        setErrors({ ...errors, "heroData.author": undefined });
                      }}
                      error={!!errors["heroData.author"]}
                      helperText={errors["heroData.author"]}
                    />
                    <TextField
                      fullWidth
                      label="Author Title"
                      value={heroData.authorTitle || ""}
                      onChange={(e) => {
                        setHeroData({ ...heroData, authorTitle: e.target.value });
                        setErrors({ ...errors, "heroData.authorTitle": undefined });
                      }}
                      error={!!errors["heroData.authorTitle"]}
                      helperText={errors["heroData.authorTitle"]}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          )}

          {/* Tab 2: Content Body */}
          {activeTab === 2 && (
            <Stack spacing={3}>
              <Typography variant="subtitle2" color="primary">
                Article Text & Paragraphs
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Introductory Paragraph (Italicized top block)"
                value={content.intro || ""}
                onChange={(e) => setContent({ ...content, intro: e.target.value })}
              />

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE }}>
                  Detailed Content Sections
                </Typography>
                <Button variant="outlined" startIcon={<Add />} onClick={handleAddSection} size="small">
                  Add Section
                </Button>
              </Box>

              <Stack spacing={3}>
                {content.sections.map((sec: any, idx: number) => (
                  <Box key={idx} sx={{ border: "1px solid #eee", p: 2, borderRadius: 2, position: "relative" }}>
                    <IconButton color="error" size="small" onClick={() => handleRemoveSection(idx)} sx={{ position: "absolute", top: 8, right: 8 }}>
                      <Delete fontSize="small" />
                    </IconButton>
                    <Typography variant="subtitle2" sx={{ mb: 2 }}>
                      Section {idx + 1}
                    </Typography>
                    <Stack spacing={2}>
                      <TextField
                        fullWidth
                        label="Heading (Optional)"
                        value={sec.heading || ""}
                        onChange={(e) => handleSectionChange(idx, "heading", e.target.value)}
                      />
                      <TextField
                        fullWidth
                        multiline
                        rows={6}
                        label="Body Text"
                        value={getSectionContentString(sec.content)}
                        onChange={(e) => handleSectionChange(idx, "content", e.target.value)}
                        placeholder="Type section paragraphs here. Double enter to separate paragraphs."
                      />
                    </Stack>
                  </Box>
                ))}
                {content.sections.length === 0 && (
                  <Typography variant="body2" color="textSecondary" sx={{ fontStyle: "italic", textAlign: "center", py: 2 }}>
                    No detailed sections added yet. Click 'Add Section' above.
                  </Typography>
                )}
              </Stack>
            </Stack>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" sx={{ backgroundColor: COLORS.PRIMARY_BLUE }}>
          {activeId ? "Update Blog" : "Save Blog"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
