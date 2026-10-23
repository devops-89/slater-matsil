import { useState } from "react";
import BoldTextField from "./BoldTextField";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import {
  BLOG_FORM_CARD_DATA,
  BLOG_FORM_CONTENT_DATA,
  BLOG_FORM_HERO_DATA,
} from "@/utils/types";
import { Add, Close, Delete, TableChart, ContentPaste } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";

interface BlogFormModalProps {
  open: boolean;
  onClose: () => void;
  activeId: number | null;
  activeTab: number;
  setActiveTab: (val: number) => void;
  cardData: BLOG_FORM_CARD_DATA;
  setCardData: (data: BLOG_FORM_CARD_DATA) => void;
  heroData: BLOG_FORM_HERO_DATA;
  setHeroData: (data: BLOG_FORM_HERO_DATA) => void;
  content: BLOG_FORM_CONTENT_DATA;
  setContent: (data: BLOG_FORM_CONTENT_DATA) => void;
  errors: Record<string, string | undefined>;
  setErrors: (errors: Record<string, string | undefined>) => void;
  isUploadingCard: boolean;
  isUploadingAuthor: boolean;
  handleCardImageUpload: (file: File) => void;
  handleAuthorImageUpload: (file: File) => void;
  handleDeleteImage: (type: "card" | "author") => void;
  handleSave: () => void;
  handleAddSection: () => void;
  handleRemoveSection: (idx: number) => void;
  handleSectionChange: (
    idx: number,
    field: "heading" | "content",
    val: string,
  ) => void;
  getSectionContentString: (val: string | string[]) => string;
  isSaving?: boolean;
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
  isSaving = false,
}: BlogFormModalProps) {
  const [pasteModalOpen, setPasteModalOpen] = useState<{ open: boolean; secIdx: number }>({ open: false, secIdx: -1 });
  const [pastedText, setPastedText] = useState("");

  const handleAddTable = (secIdx: number) => {
    const updatedSections = [...content.sections];
    updatedSections[secIdx] = {
      ...updatedSections[secIdx],
      table: {
        headers: ["", "", ""],
        rows: [
          ["", "", ""],
          ["", "", ""],
        ],
      },
    };
    setContent({ ...content, sections: updatedSections });
  };

  const handleRemoveTable = (secIdx: number) => {
    const updatedSections = [...content.sections];
    updatedSections[secIdx] = {
      ...updatedSections[secIdx],
      table: null,
    };
    setContent({ ...content, sections: updatedSections });
  };

  const handleHeaderChange = (secIdx: number, hIdx: number, val: string) => {
    const updatedSections = [...content.sections];
    if (updatedSections[secIdx].table) {
      const headers = [...updatedSections[secIdx].table!.headers];
      headers[hIdx] = val;
      updatedSections[secIdx].table!.headers = headers;
      setContent({ ...content, sections: updatedSections });
    }
  };

  const handleAddColumn = (secIdx: number) => {
    const updatedSections = [...content.sections];
    if (updatedSections[secIdx].table) {
      const headers = [...updatedSections[secIdx].table!.headers, ""];
      const rows = updatedSections[secIdx].table!.rows.map((r) => [...r, ""]);
      updatedSections[secIdx].table = { headers, rows };
      setContent({ ...content, sections: updatedSections });
    }
  };

  const handleRemoveColumn = (secIdx: number, cIdx: number) => {
    const updatedSections = [...content.sections];
    if (updatedSections[secIdx].table) {
      const headers = updatedSections[secIdx].table!.headers.filter((_, idx) => idx !== cIdx);
      const rows = updatedSections[secIdx].table!.rows.map((r) => r.filter((_, idx) => idx !== cIdx));
      if (headers.length === 0) {
        updatedSections[secIdx] = {
          ...updatedSections[secIdx],
          table: null,
        };
      } else {
        updatedSections[secIdx].table = { headers, rows };
      }
      setContent({ ...content, sections: updatedSections });
    }
  };

  const handleCellChange = (secIdx: number, rIdx: number, cIdx: number, val: string) => {
    const updatedSections = [...content.sections];
    if (updatedSections[secIdx].table) {
      const rows = updatedSections[secIdx].table!.rows.map((r) => [...r]);
      rows[rIdx][cIdx] = val;
      updatedSections[secIdx].table!.rows = rows;
      setContent({ ...content, sections: updatedSections });
    }
  };

  const handleAddRow = (secIdx: number) => {
    const updatedSections = [...content.sections];
    if (updatedSections[secIdx].table) {
      const colCount = updatedSections[secIdx].table!.headers.length || 1;
      const newRow = new Array(colCount).fill("");
      const rows = [...updatedSections[secIdx].table!.rows, newRow];
      updatedSections[secIdx].table!.rows = rows;
      setContent({ ...content, sections: updatedSections });
    }
  };

  const handleRemoveRow = (secIdx: number, rIdx: number) => {
    const updatedSections = [...content.sections];
    if (updatedSections[secIdx].table) {
      const rows = updatedSections[secIdx].table!.rows.filter((_, idx) => idx !== rIdx);
      updatedSections[secIdx].table!.rows = rows;
      setContent({ ...content, sections: updatedSections });
    }
  };

  const handleImportPastedText = () => {
    const secIdx = pasteModalOpen.secIdx;
    if (secIdx < 0 || !pastedText.trim()) return;

    const rawLines = pastedText.trim().split("\n").map((l) => l.trim()).filter(Boolean);
    const validLines = rawLines.filter((l) => !/^[\|\-\:\s]+$/.test(l));

    if (validLines.length === 0) return;

    const firstLine = validLines[0];
    let delimiter = "\t";
    if (firstLine.includes("\t")) {
      delimiter = "\t";
    } else if (firstLine.includes("|")) {
      delimiter = "|";
    } else if (firstLine.includes(",")) {
      delimiter = ",";
    }

    const parseLine = (line: string) => {
      let parts = line.split(delimiter).map((p) => p.trim());
      if (delimiter === "|") {
        if (parts.length > 0 && parts[0] === "") parts.shift();
        if (parts.length > 0 && parts[parts.length - 1] === "") parts.pop();
      }
      return parts;
    };

    const headers = parseLine(validLines[0]);
    const rows = validLines.slice(1).map((l) => {
      const parsed = parseLine(l);
      while (parsed.length < headers.length) parsed.push("");
      return parsed.slice(0, headers.length);
    });

    const updatedSections = [...content.sections];
    updatedSections[secIdx] = {
      ...updatedSections[secIdx],
      table: { headers, rows },
    };
    setContent({ ...content, sections: updatedSections });
    setPasteModalOpen({ open: false, secIdx: -1 });
    setPastedText("");
  };

  const handleNext = () => {
    let hasError = false;
    const newErrors = { ...errors };

    if (activeTab === 0) {
      if (!cardData.title) {
        newErrors["cardData.title"] = "Title is required";
        hasError = true;
      }
      if (!cardData.date) {
        newErrors["cardData.date"] = "Date is required";
        hasError = true;
      }
      if (!cardData.readTime) {
        newErrors["cardData.readTime"] = "Read Time is required";
        hasError = true;
      }
      if (!cardData.description) {
        newErrors["cardData.description"] = "Description is required";
        hasError = true;
      }
    } else if (activeTab === 1) {
      if (!heroData.category) {
        newErrors["heroData.category"] = "Category is required";
        hasError = true;
      }
      if (!heroData.author) {
        newErrors["heroData.author"] = "Author Name is required";
        hasError = true;
      }
      if (!heroData.authorTitle) {
        newErrors["heroData.authorTitle"] = "Author Title is required";
        hasError = true;
      }
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }
    setActiveTab(activeTab + 1);
  };

  return (
    <>
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
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 1,
          }}
        >
          <Typography
            component="span"
            variant="h5"
            sx={{
              fontFamily: tradeGothic.style.fontFamily,
              color: COLORS.PRIMARY_BLUE,
              fontWeight: 700,
            }}
          >
            {activeId ? "Edit Blog Entry" : "Add Blog Entry"}
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
                        <Box
                          sx={{
                            mb: 2,
                            py: 4,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <CircularProgress size={30} />
                        </Box>
                      ) : cardData.cardImage ? (
                        <Box
                          sx={{
                            position: "relative",
                            display: "inline-block",
                            height: 120,
                            mb: 2,
                          }}
                        >
                          <IconButton
                            size="small"
                            sx={{
                              position: "absolute",
                              top: -10,
                              right: -10,
                              bgcolor: "white",
                              boxShadow: 1,
                            }}
                            onClick={() => handleDeleteImage("card")}
                          >
                            <Close fontSize="small" color="error" />
                          </IconButton>
                          <img
                            src={cardData.cardImage}
                            alt="Preview"
                            style={{
                              height: "100%",
                              width: "auto",
                              objectFit: "contain",
                            }}
                          />
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            mb: 2,
                            py: 4,
                            backgroundColor: "#eaeaea",
                            borderRadius: 2,
                            width: "100%",
                          }}
                        >
                          <Typography variant="caption">
                            No Card Image Uploaded
                          </Typography>
                        </Box>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        id="card-photo-upload"
                        onChange={(e) =>
                          e.target.files?.[0] &&
                          handleCardImageUpload(e.target.files[0])
                        }
                        disabled={isUploadingCard}
                      />
                      <label htmlFor="card-photo-upload">
                        <Button
                          variant="outlined"
                          component="span"
                          size="small"
                          disabled={isUploadingCard}
                        >
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
                              setErrors({
                                ...errors,
                                "cardData.date": undefined,
                              });
                            }}
                            error={!!errors["cardData.date"]}
                            helperText={
                              errors["cardData.date"] || "e.g., September 2025"
                            }
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            fullWidth
                            label="Read Time"
                            value={cardData.readTime || ""}
                            onChange={(e) => {
                              setCardData({
                                ...cardData,
                                readTime: e.target.value,
                              });
                              setErrors({
                                ...errors,
                                "cardData.readTime": undefined,
                              });
                            }}
                            error={!!errors["cardData.readTime"]}
                            helperText={
                              errors["cardData.readTime"] || "e.g., 5 min"
                            }
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            fullWidth
                            type="number"
                            label="Order Number"
                            value={cardData.order || ""}
                            onChange={(e) => {
                              setCardData({ ...cardData, order: e.target.value });
                            }}
                            helperText="e.g., 1, 2, 3 (Optional for manual ordering)"
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
                          setCardData({
                            ...cardData,
                            description: e.target.value,
                          });
                          setErrors({
                            ...errors,
                            "cardData.description": undefined,
                          });
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
                  onChange={(e) =>
                    setHeroData({ ...heroData, title: e.target.value })
                  }
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
                      helperText={
                        errors["heroData.category"] ||
                        "e.g., Patent Law, Artificial Intelligence"
                      }
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
                        <Box
                          sx={{
                            mb: 2,
                            height: 100,
                            width: 100,
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <CircularProgress size={30} />
                        </Box>
                      ) : heroData.authorImage ? (
                        <Box
                          sx={{
                            mb: 2,
                            height: 100,
                            width: 100,
                            position: "relative",
                          }}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                              zIndex: 10,
                              transform: "translate(25%, -25%)",
                            }}
                          >
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDeleteImage("author")}
                              sx={{
                                bgcolor: "white",
                                boxShadow: 1,
                                "&:hover": { bgcolor: "#f5f5f5" },
                              }}
                            >
                              <Close fontSize="small" />
                            </IconButton>
                          </Box>
                          <Box
                            sx={{
                              borderRadius: "50%",
                              overflow: "hidden",
                              height: "100%",
                              width: "100%",
                            }}
                          >
                            <img
                              src={heroData.authorImage}
                              alt="Author Thumbnail"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </Box>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            mb: 2,
                            height: 100,
                            width: 100,
                            borderRadius: "50%",
                            backgroundColor: "#eaeaea",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography variant="caption">No Image</Typography>
                        </Box>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        id="author-photo-upload"
                        onChange={(e) =>
                          e.target.files?.[0] &&
                          handleAuthorImageUpload(e.target.files[0])
                        }
                        disabled={isUploadingAuthor}
                      />
                      <label htmlFor="author-photo-upload">
                        <Button
                          variant="outlined"
                          component="span"
                          size="small"
                          disabled={isUploadingAuthor}
                        >
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
                          setHeroData({
                            ...heroData,
                            authorTitle: e.target.value,
                          });
                          setErrors({
                            ...errors,
                            "heroData.authorTitle": undefined,
                          });
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
                <BoldTextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Introductory Paragraph (Italicized top block)"
                  value={content.intro || ""}
                  onChange={(val) =>
                    setContent({ ...content, intro: val })
                  }
                />

                <Divider sx={{ my: 3 }} />
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="subtitle2" color="primary">
                    Content Sections
                  </Typography>
                  <Button
                    startIcon={<Add />}
                    onClick={handleAddSection}
                    size="small"
                    variant="outlined"
                  >
                    Add Section
                  </Button>
                </Stack>
                {content.sections.map((sec, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      p: 2,
                      border: "1px solid #ccc",
                      borderRadius: 2,
                      position: "relative",
                      mb: 2,
                    }}
                  >
                    <IconButton
                      size="small"
                      color="error"
                      sx={{ position: "absolute", top: 8, right: 8 }}
                      onClick={() => handleRemoveSection(idx)}
                    >
                      <Delete />
                    </IconButton>
                    <Stack spacing={2} sx={{ pr: 4 }}>
                      <TextField
                        fullWidth
                        label="Section Heading"
                        value={sec.heading || ""}
                        onChange={(e) =>
                          handleSectionChange(idx, "heading", e.target.value)
                        }
                      />
                      <BoldTextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Section Content"
                        value={getSectionContentString(sec.content)}
                        onChange={(val) =>
                          handleSectionChange(idx, "content", val)
                        }
                        helperText="Use newlines for separate paragraphs"
                      />

                      {/* Section Table Editor */}
                      {sec.table ? (
                        <Box
                          sx={{
                            p: { xs: 2, sm: 2.5 },
                            bgcolor: "#F8FAFC",
                            border: "1px solid #CBD5E1",
                            borderRadius: 3,
                            mt: 2,
                            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                          }}
                        >
                          {/* Heading Top */}
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: 700,
                              color: COLORS.PRIMARY_BLUE,
                              fontSize: 16,
                              mb: 1.5,
                            }}
                          >
                            Section Data Table ({sec.table.headers.length} Column{sec.table.headers.length !== 1 ? "s" : ""} × {sec.table.rows.length} Row{sec.table.rows.length !== 1 ? "s" : ""})
                          </Typography>

                          {/* 4 Action Buttons Row */}
                          <Stack
                            direction="row"
                            spacing={1}
                            flexWrap="wrap"
                            gap={1}
                            sx={{ mb: 2.5, pb: 1.5, borderBottom: "1px solid #E2E8F0" }}
                          >
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<Add />}
                              onClick={() => handleAddColumn(idx)}
                              sx={{
                                borderColor: COLORS.PRIMARY_BLUE,
                                color: COLORS.PRIMARY_BLUE,
                                fontWeight: 600,
                                fontSize: 12,
                                textTransform: "none",
                                "&:hover": { bgcolor: "rgba(13, 95, 110, 0.08)", borderColor: COLORS.PRIMARY_BLUE },
                              }}
                            >
                              + Add Column
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<Add />}
                              onClick={() => handleAddRow(idx)}
                              sx={{
                                borderColor: COLORS.PRIMARY_BLUE,
                                color: COLORS.PRIMARY_BLUE,
                                fontWeight: 600,
                                fontSize: 12,
                                textTransform: "none",
                                "&:hover": { bgcolor: "rgba(13, 95, 110, 0.08)", borderColor: COLORS.PRIMARY_BLUE },
                              }}
                            >
                              + Add Row
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<ContentPaste />}
                              onClick={() => {
                                setPasteModalOpen({ open: true, secIdx: idx });
                                setPastedText("");
                              }}
                              sx={{
                                borderColor: "#64748B",
                                color: "#475569",
                                fontWeight: 600,
                                fontSize: 12,
                                textTransform: "none",
                              }}
                            >
                              Paste / Import
                            </Button>
                            <Button
                              size="small"
                              color="error"
                              variant="outlined"
                              startIcon={<Delete />}
                              onClick={() => handleRemoveTable(idx)}
                              sx={{
                                fontWeight: 600,
                                fontSize: 12,
                                textTransform: "none",
                              }}
                            >
                              Remove Table
                            </Button>
                          </Stack>

                          {/* Visual Table Editor Grid */}
                          <Box
                            sx={{
                              overflowX: "auto",
                              pb: 1.5,
                              pt: 1,
                              px: 0.5,
                              "&::-webkit-scrollbar": { height: 6 },
                              "&::-webkit-scrollbar-thumb": { bgcolor: "#CBD5E1", borderRadius: 3 },
                            }}
                          >
                            {/* Column Headers */}
                            <Stack direction="row" spacing={1.5} sx={{ mb: 2.5, minWidth: "max-content" }}>
                              <Box sx={{ width: 28, flexShrink: 0 }} /> {/* Row number spacer */}
                              {sec.table.headers.map((h, hIdx) => (
                                <Box key={hIdx} sx={{ width: 180, position: "relative" }}>
                                  <TextField
                                    size="small"
                                    fullWidth
                                    label={`Header ${hIdx + 1}`}
                                    placeholder={`Column ${hIdx + 1} name...`}
                                    value={h}
                                    onChange={(e) => handleHeaderChange(idx, hIdx, e.target.value)}
                                    slotProps={{
                                      input: {
                                        sx: {
                                          fontWeight: 700,
                                          bgcolor: "#F1F5F9",
                                          fontSize: 13,
                                          color: COLORS.PRIMARY_BLUE,
                                        },
                                      },
                                    }}
                                  />
                                  {sec.table!.headers.length > 1 && (
                                    <IconButton
                                      size="small"
                                      color="error"
                                      sx={{
                                        position: "absolute",
                                        right: -8,
                                        top: -8,
                                        bgcolor: "#FFF",
                                        p: 0.3,
                                        boxShadow: "0 2px 4px rgba(0,0,0,0.12)",
                                        border: "1px solid #CBD5E1",
                                        "&:hover": { bgcolor: "#FEE2E2" },
                                      }}
                                      title="Delete Column"
                                      onClick={() => handleRemoveColumn(idx, hIdx)}
                                    >
                                      <Close sx={{ fontSize: 13 }} />
                                    </IconButton>
                                  )}
                                </Box>
                              ))}
                            </Stack>

                            {/* Table Rows */}
                            <Stack spacing={2} sx={{ minWidth: "max-content" }}>
                              {sec.table.rows.map((row, rIdx) => (
                                <Stack key={rIdx} direction="row" spacing={1.5} alignItems="flex-start">
                                  <Box
                                    sx={{
                                      width: 28,
                                      height: 40,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      bgcolor: "#E2E8F0",
                                      borderRadius: 1,
                                      flexShrink: 0,
                                      mt: 0.5,
                                    }}
                                  >
                                    <Typography variant="caption" sx={{ fontWeight: 700, color: "#475569" }}>
                                      {rIdx + 1}
                                    </Typography>
                                  </Box>
                                  {row.map((cell, cIdx) => (
                                    <TextField
                                      key={cIdx}
                                      size="small"
                                      multiline
                                      rows={2}
                                      sx={{ width: 180 }}
                                      label={
                                        sec.table!.headers[cIdx]?.trim()
                                          ? sec.table!.headers[cIdx]
                                          : `Col ${cIdx + 1}`
                                      }
                                      placeholder={`Row ${rIdx + 1}, Col ${cIdx + 1} content...`}
                                      value={cell}
                                      onChange={(e) => handleCellChange(idx, rIdx, cIdx, e.target.value)}
                                      slotProps={{
                                        input: {
                                          sx: {
                                            fontSize: 13,
                                            bgcolor: "#FFFFFF",
                                          },
                                        },
                                      }}
                                    />
                                  ))}
                                  <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => handleRemoveRow(idx, rIdx)}
                                    sx={{
                                      mt: 1,
                                      bgcolor: "#FFF",
                                      border: "1px solid #CBD5E1",
                                      "&:hover": { bgcolor: "#FEE2E2" },
                                    }}
                                    title="Delete Row"
                                  >
                                    <Delete fontSize="small" />
                                  </IconButton>
                                </Stack>
                              ))}
                            </Stack>
                          </Box>
                        </Box>
                      ) : (
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<TableChart />}
                          onClick={() => handleAddTable(idx)}
                          sx={{ mt: 1, alignSelf: "flex-start", fontWeight: 600, textTransform: "none" }}
                        >
                          + Add Table to Section
                        </Button>
                      )}
                    </Stack>
                  </Box>
                ))}
                {content.sections.length === 0 && (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontStyle: "italic", textAlign: "center", py: 2 }}
                  >
                    No detailed sections added yet. Click 'Add Section' above.
                  </Typography>
                )}
              </Stack>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} color="inherit" disabled={isSaving}>
            Cancel
          </Button>
          {activeTab < 2 ? (
            <Button
              onClick={handleNext}
              variant="contained"
              sx={{ backgroundColor: COLORS.PRIMARY_BLUE }}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSave}
              variant="contained"
              sx={{ backgroundColor: COLORS.PRIMARY_BLUE }}
              disabled={isSaving}
            >
              {isSaving ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
              ) : activeId ? (
                "Update Blog"
              ) : (
                "Save Blog"
              )}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Modal Dialog for Pasting / Importing Table Data */}
      <Dialog
        open={pasteModalOpen.open}
        onClose={() => setPasteModalOpen({ open: false, secIdx: -1 })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Paste / Import Table Data</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Paste a table directly from Excel, Word, Google Sheets, TSV, or Markdown (with columns separated by tabs, pipes, or commas). Line 1 will be used as headers.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={8}
            placeholder={`Decisionmaker\tInter Partes Review\tEx Parte Reexamination\tDistrict Court Litigation\nEstimated cost\t$300K–$500K\t$30K–$100K+\t$2M+`}
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setPasteModalOpen({ open: false, secIdx: -1 })} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleImportPastedText}
            variant="contained"
            sx={{ backgroundColor: COLORS.PRIMARY_BLUE }}
            disabled={!pastedText.trim()}
          >
            Import Table
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

