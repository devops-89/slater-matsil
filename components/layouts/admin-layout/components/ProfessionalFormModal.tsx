"use client";

import BoldTextField from "./BoldTextField";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { PROFESSIONAL_FORM_BIO_DATA, PROFESSIONAL_FORM_CARD_DATA } from "@/utils/types";
import { AddCircle, ArrowBack, Close, RemoveCircle, Save } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

interface ProfessionalFormModalProps {
  open: boolean;
  onClose: () => void;
  activeId: number | null;
  activeTab?: number;
  setActiveTab?: (val: number) => void;
  cardData: PROFESSIONAL_FORM_CARD_DATA;
  setCardData: (data: PROFESSIONAL_FORM_CARD_DATA) => void;
  bioData: PROFESSIONAL_FORM_BIO_DATA;
  setBioData: (data: PROFESSIONAL_FORM_BIO_DATA) => void;
  errors: Record<string, string | undefined>;
  setErrors: (errors: Record<string, string | undefined>) => void;
  isSaving: boolean;
  isUploadingCardImg: boolean;
  handleUploadImage: (file: File, type: "card" | "details") => void;
  handleDeleteImage: (type: "card" | "details") => void;
  handleSave: () => void;
  handleParagraphChange: (key: string, val: string) => void;
  handleAddBullet: (key: string) => void;
  handleRemoveBullet: (key: string, idx: number) => void;
  handleBulletChange: (key: string, idx: number, field: string, val: string) => void;
}

export default function ProfessionalFormModal({
  open,
  onClose,
  activeId,
  cardData,
  setCardData,
  bioData,
  setBioData,
  errors,
  setErrors,
  isSaving,
  isUploadingCardImg,
  handleUploadImage,
  handleDeleteImage,
  handleSave,
  handleParagraphChange,
  handleAddBullet,
  handleRemoveBullet,
  handleBulletChange,
}: ProfessionalFormModalProps) {
  if (!open) return null;

  const renderSectionEditor = (key: string, title: string, subtitle?: string, anchorId?: string) => {
    const data = (bioData[key as keyof typeof bioData] as any) || { paragraphs: "", bullets: [] };
    return (
      <Paper
        id={anchorId}
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3.5 },
          borderRadius: 3,
          border: "1px solid #E5E7EB",
          bgcolor: "#FFFFFF",
          scrollMarginTop: "90px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: tradeGothic.style.fontFamily,
            color: COLORS.PRIMARY_BLUE,
            fontWeight: 700,
            mb: 0.5,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="body2"
            sx={{
              fontFamily: adelle.style.fontFamily,
              color: "text.secondary",
              mb: 3,
            }}
          >
            {subtitle}
          </Typography>
        )}
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>
              Description Paragraphs
            </Typography>
            <BoldTextField
              fullWidth
              multiline
              rows={5}
              placeholder="Enter description paragraphs here. Use a blank line (double enter) to separate paragraphs."
              value={data.paragraphs || ""}
              onChange={(val) => handleParagraphChange(key, val)}
            />
          </Box>

          <Divider />

          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Bullet List Items
              </Typography>
              <Button
                size="small"
                startIcon={<AddCircle />}
                onClick={() => handleAddBullet(key)}
                sx={{ color: COLORS.PRIMARY_GREEN }}
              >
                Add Bullet
              </Button>
            </Box>

            <Stack spacing={2}>
              {data.bullets.map((bullet: { id?: number; label?: string; href?: string }, idx: number) => (
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  key={idx}
                  alignItems={{ xs: "stretch", sm: "center" }}
                >
                  <TextField
                    fullWidth
                    size="small"
                    label="Label / Text"
                    value={bullet.label || ""}
                    onChange={(e) => handleBulletChange(key, idx, "label", e.target.value)}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    label="Optional Link URL (href)"
                    value={bullet.href || ""}
                    onChange={(e) => handleBulletChange(key, idx, "href", e.target.value)}
                  />
                  <IconButton color="error" onClick={() => handleRemoveBullet(key, idx)}>
                    <RemoveCircle />
                  </IconButton>
                </Stack>
              ))}
              {data.bullets.length === 0 && (
                <Typography variant="body2" color="textSecondary" sx={{ fontStyle: "italic" }}>
                  No bullet items added to this section yet. Click "Add Bullet" to add one.
                </Typography>
              )}
            </Stack>
          </Box>
        </Stack>
      </Paper>
    );
  };

  return (
    <Box sx={{ width: "100%", pb: 8 }}>
      {/* Top Action Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <IconButton
            onClick={onClose}
            disabled={isSaving}
            sx={{ bgcolor: "#FFFFFF", border: "1px solid #E5E7EB", "&:hover": { bgcolor: "#F3F4F6" } }}
          >
            <ArrowBack />
          </IconButton>
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontFamily: tradeGothic.style.fontFamily,
                color: COLORS.PRIMARY_BLUE,
                fontWeight: 700,
              }}
            >
              {activeId ? "Edit Professional Profile" : "Add Professional Profile"}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", fontFamily: adelle.style.fontFamily }}>
              Fill in all sections below and click save when complete.
            </Typography>
          </Box>
        </Box>

        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            onClick={onClose}
            disabled={isSaving}
            sx={{ borderColor: "#D1D5DB", color: "#374151" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={isSaving ? <CircularProgress size={18} sx={{ color: "#fff" }} /> : <Save />}
            onClick={handleSave}
            disabled={isSaving}
            sx={{ backgroundColor: COLORS.PRIMARY_BLUE }}
          >
            {isSaving ? "Saving..." : activeId ? "Update Changes" : "Save Changes"}
          </Button>
        </Stack>
      </Box>

      {/* Quick Jump Navigation Bar */}
      <Paper
        elevation={0}
        sx={{
          p: 1.5,
          mb: 3,
          borderRadius: 2.5,
          border: "1px solid #E5E7EB",
          bgcolor: "#FFFFFF",
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        {[
          { id: "sec-general", label: "General & vCard" },
          { id: "sec-bio", label: "Biography" },
          { id: "sec-education", label: "Education" },
          { id: "sec-admissions", label: "Admissions" },
          { id: "sec-articles", label: "Articles & Publications" },
          { id: "sec-associations", label: "Associations" },
        ].map((item) => (
          <Button
            key={item.id}
            size="small"
            variant="text"
            onClick={() => {
              const el = document.getElementById(item.id);
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            sx={{
              color: COLORS.PRIMARY_BLUE,
              fontWeight: 600,
              textTransform: "none",
              fontSize: 13,
              borderRadius: 2,
              px: 1.5,
              "&:hover": { bgcolor: "#F0FDF4" },
            }}
          >
            {item.label}
          </Button>
        ))}
      </Paper>

      {/* Form Sections Stack */}
      <Stack spacing={3}>
        {/* Section 1: General & vCard */}
        <Paper
          id="sec-general"
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 3.5 },
            borderRadius: 3,
            border: "1px solid #E5E7EB",
            bgcolor: "#FFFFFF",
            scrollMarginTop: "90px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: tradeGothic.style.fontFamily,
              color: COLORS.PRIMARY_BLUE,
              fontWeight: 700,
              mb: 0.5,
            }}
          >
            General & vCard Information
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: adelle.style.fontFamily,
              color: "text.secondary",
              mb: 3,
            }}
          >
            Basic details, identification photo, contact info, and business card metadata.
          </Typography>

          <Stack spacing={4}>
            {/* Image & Basic Details */}
            <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 700 }}>
              Images & Identification
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 4, md: 3 }}>
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
                  <Typography variant="caption" sx={{ mb: 1, fontWeight: "bold" }}>
                    Profile Photo
                  </Typography>
                  {cardData.imageDownloadUrl || cardData.imageUrl ? (
                    <Box sx={{ position: "relative", mb: 2, height: 120, width: 120 }}>
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
                          onClick={() => handleDeleteImage("card")}
                          sx={{ bgcolor: "white", boxShadow: 1, "&:hover": { bgcolor: "#f5f5f5" } }}
                        >
                          <Close fontSize="small" />
                        </IconButton>
                      </Box>
                      <Box
                        sx={{
                          height: "100%",
                          width: "100%",
                          borderRadius: "50%",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={cardData.imageDownloadUrl || cardData.imageUrl}
                          alt="Preview"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        mb: 2,
                        height: 120,
                        width: 120,
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
                    id="photo-upload-input-card"
                    onChange={(e) => e.target.files?.[0] && handleUploadImage(e.target.files[0], "card")}
                  />
                  <label htmlFor="photo-upload-input-card">
                    <Button variant="outlined" component="span" size="small" disabled={isUploadingCardImg}>
                      {isUploadingCardImg ? <CircularProgress size={20} /> : "Upload Photo"}
                    </Button>
                  </label>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 8, md: 9 }}>
                <Stack spacing={2} sx={{ height: "100%", justifyContent: "center" }}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <TextField
                        fullWidth
                        label="First Name *"
                        value={cardData.firstName || ""}
                        onChange={(e) => {
                          setCardData({ ...cardData, firstName: e.target.value });
                          setErrors({ ...errors, firstName: undefined });
                        }}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <TextField
                        fullWidth
                        label="Middle Name"
                        placeholder="e.g., Alexander or A."
                        value={cardData.middleName || ""}
                        onChange={(e) => setCardData({ ...cardData, middleName: e.target.value })}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <TextField
                        fullWidth
                        label="Last Name *"
                        value={cardData.lastName || ""}
                        onChange={(e) => {
                          setCardData({ ...cardData, lastName: e.target.value });
                          setErrors({ ...errors, lastName: undefined });
                        }}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Qualification"
                        placeholder="e.g., Ph.D., J.D."
                        value={cardData.qualification || ""}
                        onChange={(e) => setCardData({ ...cardData, qualification: e.target.value })}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Designation (e.g., PARTNER) *"
                        value={cardData.designation || ""}
                        onChange={(e) => {
                          setCardData({ ...cardData, designation: e.target.value });
                          setErrors({ ...errors, designation: undefined });
                        }}
                        error={!!errors.designation}
                        helperText={errors.designation}
                      />
                    </Grid>
                  </Grid>
                </Stack>
              </Grid>
            </Grid>

            <Divider />

            {/* Contact Details */}
            <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 700 }}>
              Contact Details
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Email Address *"
                  value={bioData.email || ""}
                  onChange={(e) => {
                    setBioData({ ...bioData, email: e.target.value });
                    setErrors({ ...errors, email: undefined });
                  }}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Phone Number *"
                  value={bioData.phoneNumber || ""}
                  onChange={(e) => {
                    setBioData({ ...bioData, phoneNumber: e.target.value });
                    setErrors({ ...errors, phoneNumber: undefined });
                  }}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
                />
              </Grid>
            </Grid>

            <Divider />

            {/* vCard Details */}
            <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 700 }}>
              vCard Additional Details
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="vCard Job Title"
                  value={bioData.vCard?.job_title || ""}
                  onChange={(e) =>
                    setBioData({
                      ...bioData,
                      vCard: { ...bioData.vCard, job_title: e.target.value },
                    })
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Street Address"
                  value={bioData.vCard?.street || ""}
                  onChange={(e) =>
                    setBioData({
                      ...bioData,
                      vCard: { ...bioData.vCard, street: e.target.value },
                    })
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="City"
                  value={bioData.vCard?.city || ""}
                  onChange={(e) =>
                    setBioData({
                      ...bioData,
                      vCard: { ...bioData.vCard, city: e.target.value },
                    })
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="State"
                  value={bioData.vCard?.state || ""}
                  onChange={(e) =>
                    setBioData({
                      ...bioData,
                      vCard: { ...bioData.vCard, state: e.target.value },
                    })
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="Postal Code"
                  value={bioData.vCard?.postalCode || ""}
                  onChange={(e) =>
                    setBioData({
                      ...bioData,
                      vCard: { ...bioData.vCard, postalCode: e.target.value },
                    })
                  }
                />
              </Grid>
            </Grid>
          </Stack>
        </Paper>

        {/* Section 2: Biography */}
        {renderSectionEditor(
          "bio",
          "Biography",
          "Overview narrative, practice scope, and background summary.",
          "sec-bio"
        )}

        {/* Section 3: Education */}
        {renderSectionEditor(
          "education",
          "Education & Credentials",
          "Degrees, universities, honors, and academic backgrounds.",
          "sec-education"
        )}

        {/* Section 4: Admissions */}
        {renderSectionEditor(
          "admissions",
          "Admissions & Honors",
          "Bar admissions, court admissions, and state registrations.",
          "sec-admissions"
        )}

        {/* Section 5: Articles & Publications */}
        {renderSectionEditor(
          "articles",
          "Articles & Presentations",
          "Published papers, legal articles, speaking engagements, and presentations.",
          "sec-articles"
        )}

        {/* Section 6: Associations */}
        {renderSectionEditor(
          "associations",
          "Professional Associations",
          "Professional memberships, bar association affiliations, and legal organizations.",
          "sec-associations"
        )}
      </Stack>

      {/* Sticky Bottom Action Bar */}
      <Paper
        elevation={3}
        sx={{
          position: "sticky",
          bottom: 16,
          mt: 4,
          p: 2,
          borderRadius: 3,
          bgcolor: "#FFFFFF",
          border: "1px solid #E5E7EB",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          zIndex: 10,
        }}
      >
        <Button
          variant="text"
          startIcon={<ArrowBack />}
          onClick={onClose}
          disabled={isSaving}
          sx={{ color: "#4B5563" }}
        >
          Back to List
        </Button>
        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            onClick={onClose}
            disabled={isSaving}
            sx={{ borderColor: "#D1D5DB", color: "#374151" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            startIcon={isSaving ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : <Save />}
            onClick={handleSave}
            disabled={isSaving}
            sx={{ backgroundColor: COLORS.PRIMARY_BLUE, px: 4 }}
          >
            {isSaving ? "Saving..." : activeId ? "Update Changes" : "Save Changes"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
