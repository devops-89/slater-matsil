"use client";
import React, { useState } from "react";
import AdminLayout from "./AdminLayout";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  IconButton,
  Divider,
  Tabs,
  Tab,
  MenuItem,
  Select,
} from "@mui/material";
import { Add, Close, Delete } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { usePageData } from "@/store/usePageData";
import * as yup from "yup";

const insightSchema = yup.object().shape({
  cardData: yup.object().shape({
    title: yup.string().required("Title is required"),
    category: yup.string().required("Category is required"),
  }),
  heroData: yup.object().shape({
    name: yup.string().required("Name is required"),
    band: yup.string().required("Band / Role is required"),
    guide: yup.string().required("Guide is required"),
    yearsRanked: yup.string().required("Years Ranked is required"),
    profileImage: yup.mixed().optional(),
  }),
});

export default function InsightsAdminLayout() {
  const { details, setDetails } = usePageData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [errors, setErrors] = useState<any>({});

  // Form states
  const [cardData, setCardData] = useState<any>({
    title: "",
    category: "News",
    bgColor: COLORS.PRIMARY_BLUE,
    slug: "",
  });
  const [heroData, setHeroData] = useState<any>({
    name: "",
    band: "",
    guide: "",
    yearsRanked: "",
    profileImage: "",
  });
  const [contactData, setContactData] = useState<any>({
    firm: "SlaterMatsil, LLP",
    firmUrl: "www.slatermatsil.com",
    email: "info@slatermatsil.com",
    phone: "972 732 1001",
    shareLabel: "Share",
  });
  const [contentSections, setContentSections] = useState<any>({
    aboutProvidedBy: "Provided by",
    aboutProvidedByName: "Slater Matsil, LLP",
    region: "USA",
    practiceAreas: { heading: "Practice Areas", content: "" },
    professionalMemberships: {
      heading: "Professional Memberships",
      content: "",
    },
    career: { heading: "Career", content: "" },
    personal: { heading: "Personal", content: "" },
    ChamberssReview: { heading: "Chamberss Review", content: "" },
    strengths: { heading: "Strengths", content: "" },
  });

  const insightsCards = details?.insightsPage?.insightsData || [];
  const insightsDetails = details?.insightsPage?.insightsDetailsData || [];

  const handleOpenNew = () => {
    setActiveSlug(null);
    setActiveTab(0);
    setErrors({});
    setCardData({
      title: "",
      category: "News",
      bgColor: COLORS.PRIMARY_BLUE,
      slug: "",
    });
    setHeroData({
      name: "",
      band: "",
      guide: "",
      yearsRanked: "",
      profileImage: "",
    });
    setContentSections({
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Slater Matsil, LLP",
      region: "USA",
      practiceAreas: { heading: "Practice Areas", content: "" },
      professionalMemberships: {
        heading: "Professional Memberships",
        content: "",
      },
      career: { heading: "Career", content: "" },
      personal: { heading: "Personal", content: "" },
      ChamberssReview: { heading: "Chamberss Review", content: "" },
      strengths: { heading: "Strengths", content: "" },
    });
    setDialogOpen(true);
  };

  const handleEdit = (slug: string) => {
    setActiveSlug(slug);
    setActiveTab(0);
    setErrors({});
    const card = insightsCards.find((c) => c.slug === slug);
    const detailsObj = insightsDetails.find((d) => d.slug === slug);

    setCardData(
      card
        ? JSON.parse(JSON.stringify(card))
        : {
            title: "",
            category: "News",
            bgColor: COLORS.PRIMARY_BLUE,
            slug: "",
          },
    );

    if (detailsObj) {
      setHeroData(
        detailsObj.hero || {
          name: "",
          band: "",
          guide: "",
          yearsRanked: "",
          profileImage: "",
        },
      );
      setContactData(
        detailsObj.contact || {
          firm: "SlaterMatsil, LLP",
          firmUrl: "www.slatermatsil.com",
          email: "info@slatermatsil.com",
          phone: "972 732 1001",
          shareLabel: "Share",
        },
      );
      setContentSections(
        detailsObj.contentSections || {
          aboutProvidedBy: "Provided by",
          aboutProvidedByName: "Slater Matsil, LLP",
          region: "USA",
          practiceAreas: { heading: "Practice Areas", content: "" },
          professionalMemberships: {
            heading: "Professional Memberships",
            content: "",
          },
          career: { heading: "Career", content: "" },
          personal: { heading: "Personal", content: "" },
          ChamberssReview: { heading: "Chamberss Review", content: "" },
          strengths: { heading: "Strengths", content: "" },
        },
      );
    } else {
      setHeroData({
        name: "",
        band: "",
        guide: "",
        yearsRanked: "",
        profileImage: "",
      });
      setContentSections({
        aboutProvidedBy: "Provided by",
        aboutProvidedByName: "Slater Matsil, LLP",
        region: "USA",
        practiceAreas: { heading: "Practice Areas", content: "" },
        professionalMemberships: {
          heading: "Professional Memberships",
          content: "",
        },
        career: { heading: "Career", content: "" },
        personal: { heading: "Personal", content: "" },
        ChamberssReview: { heading: "Chamberss Review", content: "" },
        strengths: { heading: "Strengths", content: "" },
      });
    }

    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      await insightSchema.validate(
        { cardData, heroData },
        { abortEarly: false },
      );
      setErrors({});
    } catch (err: any) {
      const validationErrors: any = {};
      err.inner.forEach((error: any) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);

      // Switch to the tab containing the first error
      if (
        validationErrors["cardData.title"] ||
        validationErrors["cardData.category"]
      ) {
        setActiveTab(0);
      } else if (
        Object.keys(validationErrors).some((k) => k.startsWith("heroData."))
      ) {
        setActiveTab(1);
      }
      return;
    }

    const slugToUse =
      activeSlug ||
      cardData.slug ||
      cardData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    const finalCard = { ...cardData, slug: slugToUse };
    const finalDetails = {
      slug: slugToUse,
      hero: heroData,
      contact: contactData,
      contentSections: contentSections,
    };

    let newCards = [...insightsCards];
    let newDetails = [...insightsDetails];

    if (activeSlug) {
      newCards = newCards.map((c) => (c.slug === activeSlug ? finalCard : c));
      const detailsIdx = newDetails.findIndex((d) => d.slug === activeSlug);
      if (detailsIdx !== -1) {
        newDetails[detailsIdx] = finalDetails;
      } else {
        newDetails.push(finalDetails);
      }
    } else {
      newCards.push(finalCard);
      newDetails.push(finalDetails);
    }

    setDetails({
      ...details!,
      insightsPage: {
        ...details!.insightsPage,
        insightsData: newCards,
        insightsDetailsData: newDetails,
      },
    });

    setDialogOpen(false);
  };

  const handleDelete = (slug: string) => {
    const newCards = insightsCards.filter((c) => c.slug !== slug);
    const newDetails = insightsDetails.filter((c) => c.slug !== slug);

    setDetails({
      ...details!,
      insightsPage: {
        ...details!.insightsPage,
        insightsData: newCards,
        insightsDetailsData: newDetails,
      },
    });
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const res = reader.result as string;
      setHeroData({ ...heroData, profileImage: res });
      setErrors({ ...errors, "heroData.profileImage": undefined });
    };
    reader.readAsDataURL(file);
  };

  const handleContentSectionChange = (
    sectionKey: string,
    field: "heading" | "content",
    value: string,
  ) => {
    setContentSections({
      ...contentSections,
      [sectionKey]: {
        ...contentSections[sectionKey],
        [field]: value,
      },
    });
  };

  return (
    <AdminLayout title="Insights Management">
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: { xs: "stretch", sm: "flex-end" },
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenNew}
          sx={{
            backgroundColor: COLORS.PRIMARY_GREEN,
            borderRadius: "50px",
            width: { xs: "100%", sm: "auto" },
          }}
        >
          Add Insight
        </Button>
      </Box>

      <Grid container spacing={{ xs: 2, md: 4 }}>
        {insightsCards.map((insight: any, i: number) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            key={i}
            sx={{ display: "flex" }}
          >
            <Card
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 4,
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                },
              }}
            >
              <CardContent
                onClick={() => handleEdit(insight.slug)}
                sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
              >
                <Box
                  sx={{
                    height: 120,
                    mb: 2,
                    borderRadius: 2,
                    p: 2,
                    backgroundColor: insight.bgColor || COLORS.PRIMARY_BLUE,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: tradeGothic.style.fontFamily,
                      fontWeight: 700,
                      fontSize: 16,
                      textAlign: "center",
                    }}
                  >
                    {insight.category || "News"}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontFamily: tradeGothic.style.fontFamily,
                    fontWeight: 700,
                    fontSize: 16,
                    color: COLORS.PRIMARY_BLUE,
                  }}
                >
                  {insight.title}
                </Typography>
              </CardContent>
              <Box sx={{ px: 2, pb: 2, textAlign: "right" }}>
                <IconButton
                  color="error"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(insight.slug);
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            m: { xs: 1, sm: 2 },
            width: { xs: "calc(100% - 16px)", sm: "calc(100% - 64px)" },
            maxHeight: { xs: "calc(100% - 16px)", sm: "calc(100% - 64px)" },
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
            variant="h5"
            component="div"
            sx={{
              fontFamily: tradeGothic.style.fontFamily,
              color: COLORS.PRIMARY_BLUE,
              fontWeight: 700,
            }}
          >
            {activeSlug ? "Edit Insight" : "Add Insight"}
          </Typography>
          <IconButton onClick={() => setDialogOpen(false)}>
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
          </Tabs>

          <Box sx={{ minHeight: 400 }}>
            {/* Tab 0: Card Details */}
            {activeTab === 0 && (
              <Stack spacing={3}>
                <Typography variant="subtitle2" color="primary">
                  Preview Card Configuration
                </Typography>
                <TextField
                  fullWidth
                  label="Insight Title"
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
                      label="Category"
                      value={cardData.category || ""}
                      onChange={(e) => {
                        setCardData({ ...cardData, category: e.target.value });
                        setErrors({
                          ...errors,
                          "cardData.category": undefined,
                        });
                      }}
                      helperText={
                        errors["cardData.category"] ||
                        "e.g., News, Articles, Announcements"
                      }
                      error={!!errors["cardData.category"]}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Select
                      fullWidth
                      value={cardData.bgColor || COLORS.PRIMARY_BLUE}
                      onChange={(e) =>
                        setCardData({ ...cardData, bgColor: e.target.value })
                      }
                    >
                      <MenuItem value={COLORS.PRIMARY_BLUE}>
                        Primary Blue
                      </MenuItem>
                      <MenuItem value={COLORS.PRIMARY_LIGHT_GREEN}>
                        Primary Light Green
                      </MenuItem>
                      <MenuItem value={COLORS.LIGHT_GREY}>Light Grey</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </Stack>
            )}

            {/* Tab 1: Hero Banner */}
            {activeTab === 1 && (
              <Stack spacing={3}>
                <Typography variant="subtitle2" color="primary">
                  Hero Section Details
                </Typography>
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
                      {heroData.profileImage ? (
                        <Box
                          sx={{
                            mb: 2,
                            height: 120,
                            width: 120,
                            borderRadius: "50%",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={
                              typeof heroData.profileImage === "string"
                                ? heroData.profileImage
                                : heroData.profileImage.src
                            }
                            alt="Preview"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
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
                        id="photo-upload-input"
                        onChange={(e) =>
                          e.target.files?.[0] &&
                          handleImageUpload(e.target.files[0])
                        }
                      />
                      <label htmlFor="photo-upload-input">
                        <Button
                          variant="outlined"
                          component="span"
                          size="small"
                          color={
                            errors["heroData.profileImage"]
                              ? "error"
                              : "primary"
                          }
                        >
                          Upload Photo
                        </Button>
                      </label>
                      {errors["heroData.profileImage"] && (
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ mt: 1 }}
                        >
                          {errors["heroData.profileImage"]}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 8 }}>
                    <Stack spacing={2}>
                      <TextField
                        fullWidth
                        label="Person / Entity Name"
                        value={heroData.name || ""}
                        onChange={(e) => {
                          setHeroData({ ...heroData, name: e.target.value });
                          setErrors({ ...errors, "heroData.name": undefined });
                        }}
                        error={!!errors["heroData.name"]}
                        helperText={errors["heroData.name"]}
                      />
                      <TextField
                        fullWidth
                        label="Band / Role"
                        value={heroData.band || ""}
                        onChange={(e) => {
                          setHeroData({ ...heroData, band: e.target.value });
                          setErrors({ ...errors, "heroData.band": undefined });
                        }}
                        error={!!errors["heroData.band"]}
                        helperText={errors["heroData.band"]}
                      />
                      <TextField
                        fullWidth
                        label="Guide / Organization"
                        value={heroData.guide || ""}
                        onChange={(e) => {
                          setHeroData({ ...heroData, guide: e.target.value });
                          setErrors({ ...errors, "heroData.guide": undefined });
                        }}
                        error={!!errors["heroData.guide"]}
                        helperText={errors["heroData.guide"]}
                      />
                      <TextField
                        fullWidth
                        label="Years Ranked / Date"
                        value={heroData.yearsRanked || ""}
                        onChange={(e) => {
                          setHeroData({
                            ...heroData,
                            yearsRanked: e.target.value,
                          });
                          setErrors({
                            ...errors,
                            "heroData.yearsRanked": undefined,
                          });
                        }}
                        error={!!errors["heroData.yearsRanked"]}
                        helperText={errors["heroData.yearsRanked"]}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            )}

            {/* Tab 2: Main Content */}
            {activeTab === 2 && (
              <Stack spacing={4}>
                <Box>
                  <TextField
                    fullWidth
                    label="Section 1 Heading"
                    value={contentSections.practiceAreas?.heading || ""}
                    onChange={(e) =>
                      handleContentSectionChange(
                        "practiceAreas",
                        "heading",
                        e.target.value,
                      )
                    }
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Section 1 Content"
                    value={contentSections.practiceAreas?.content || ""}
                    onChange={(e) =>
                      handleContentSectionChange(
                        "practiceAreas",
                        "content",
                        e.target.value,
                      )
                    }
                  />
                </Box>
                <Divider />
                <Box>
                  <TextField
                    fullWidth
                    label="Section 2 Heading"
                    value={contentSections.career?.heading || ""}
                    onChange={(e) =>
                      handleContentSectionChange(
                        "career",
                        "heading",
                        e.target.value,
                      )
                    }
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Section 2 Content"
                    value={contentSections.career?.content || ""}
                    onChange={(e) =>
                      handleContentSectionChange(
                        "career",
                        "content",
                        e.target.value,
                      )
                    }
                  />
                </Box>
              </Stack>
            )}

            {/* Tab 3: Additional Content */}
            {activeTab === 3 && (
              <Stack spacing={4}>
                <Box>
                  <TextField
                    fullWidth
                    label="Section 3 Heading"
                    value={
                      contentSections.professionalMemberships?.heading || ""
                    }
                    onChange={(e) =>
                      handleContentSectionChange(
                        "professionalMemberships",
                        "heading",
                        e.target.value,
                      )
                    }
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Section 3 Content"
                    value={
                      contentSections.professionalMemberships?.content || ""
                    }
                    onChange={(e) =>
                      handleContentSectionChange(
                        "professionalMemberships",
                        "content",
                        e.target.value,
                      )
                    }
                  />
                </Box>
                <Divider />
                <Box>
                  <TextField
                    fullWidth
                    label="Section 4 Heading"
                    value={contentSections.personal?.heading || ""}
                    onChange={(e) =>
                      handleContentSectionChange(
                        "personal",
                        "heading",
                        e.target.value,
                      )
                    }
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Section 4 Content"
                    value={contentSections.personal?.content || ""}
                    onChange={(e) =>
                      handleContentSectionChange(
                        "personal",
                        "content",
                        e.target.value,
                      )
                    }
                  />
                </Box>
              </Stack>
            )}

            {/* Tab 4: Reviews & Strengths */}
            {activeTab === 4 && (
              <Stack spacing={4}>
                <Box>
                  <TextField
                    fullWidth
                    label="Chamberss Review Heading"
                    value={contentSections.ChamberssReview?.heading || ""}
                    onChange={(e) =>
                      handleContentSectionChange(
                        "ChamberssReview",
                        "heading",
                        e.target.value,
                      )
                    }
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Chamberss Review Content"
                    value={contentSections.ChamberssReview?.content || ""}
                    onChange={(e) =>
                      handleContentSectionChange(
                        "ChamberssReview",
                        "content",
                        e.target.value,
                      )
                    }
                  />
                </Box>
                <Divider />
                <Box>
                  <TextField
                    fullWidth
                    label="Strengths Heading"
                    value={contentSections.strengths?.heading || ""}
                    onChange={(e) =>
                      handleContentSectionChange(
                        "strengths",
                        "heading",
                        e.target.value,
                      )
                    }
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Strengths Content"
                    value={contentSections.strengths?.content || ""}
                    onChange={(e) =>
                      handleContentSectionChange(
                        "strengths",
                        "content",
                        e.target.value,
                      )
                    }
                  />
                </Box>
              </Stack>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{ backgroundColor: COLORS.PRIMARY_BLUE }}
          >
            Save Insight
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
}
