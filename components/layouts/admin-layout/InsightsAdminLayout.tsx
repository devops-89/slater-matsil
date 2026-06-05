"use client";
import { COLORS } from "@/utils/enum";
import { tradeGothic, adelle } from "@/utils/fonts";
import { Add, Close, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import InsightsCard from "@/components/layouts/insights-layout/components/Insights-Card";
import { useState, useEffect } from "react";
import * as yup from "yup";
import AdminLayout from "./AdminLayout";
import { InsightControllers } from "@/api/insightControllers";
import { MediaControllers } from "@/api/mediaControllers";
import { useNotification } from "@/components/providers/NotificationProvider";
import { useLoading } from "@/components/providers/LoadingProvider";
import { usePageData } from "@/store/usePageData";
import { INSIGHTS_TAB_DATA } from "@/utils/enum";
import InsightFormModal from "./components/InsightFormModal";

const insightSchema = yup.object().shape({
  cardData: yup.object().shape({
    title: yup.string().required("Title is required"),
    category: yup.string().required("Category is required"),
  }),
  heroData: yup.object().shape({
    name: yup.string().required("Name is required"),
    band: yup.string().required("Band / Role is required"),
    guide: yup.string().required("Guide is required"),
    yearsRanked: yup.string().optional(),
    profileImage: yup.mixed().optional(),
  }),
});

export default function InsightsAdminLayout() {
  const { details, setDetails } = usePageData();
  const { showNotification } = useNotification();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [errors, setErrors] = useState<any>({});
  const [insightsCards, setInsightsCards] = useState<any[]>([]);
  const [keysToDeleteOnSave, setKeysToDeleteOnSave] = useState<string[]>([]);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [initialState, setInitialState] = useState<string>("");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [insightToDelete, setInsightToDelete] = useState<{id?: number} | null>(null);
  
  const allCards = [...insightsCards].sort((a, b) => b.id - a.id);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  const totalPages = Math.ceil((allCards?.length || 0) / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allCards?.slice(indexOfFirstItem, indexOfLastItem);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const defaultContact = {
    firm: "",
    firmUrl: "",
    email: "",
    phone: "",
    shareLabel: "",
  };

  // Form states
  const [contactData, setContactData] = useState<any>(defaultContact);
  const [cardData, setCardData] = useState<any>({
    title: "",
    category: "",
    bgColor: COLORS.PRIMARY_BLUE,
  });
  const [heroData, setHeroData] = useState<any>({
    name: "",
    band: "",
    guide: "",
    yearsRanked: "",
    profileImage: "",
    rawImageUrl: "",
  });
  const [contentSections, setContentSections] = useState<any>({
    aboutProvidedBy: "",
    aboutProvidedByName: "",
    region: "",
    practiceAreas: { heading: "", content: "" },
    professionalMemberships: { heading: "", content: "" },
    career: { heading: "", content: "" },
    personal: { heading: "", content: "" },
    ChamberssReview: { heading: "", content: "" },
    strengths: { heading: "", content: "" },
    additionalInformation: { heading: "", content: "" },
    closingStatement: { heading: "", content: "" },
    resource: { heading: "", content: "", link: "" },
  });

  const fetchInsights = async () => {
    try {
      startLoading();
      const res = await InsightControllers.getAllInsights({ limit: 1000 });
      const data = res.data?.data?.data?.insights || res.data?.data?.insights || [];
      setInsightsCards(data);
    } catch (err) {
      showNotification("Failed to fetch insights", "error");
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const handleOpenNew = () => {
    setActiveId(null);
    setActiveTab(0);
    setErrors({});
    setKeysToDeleteOnSave([]);
    setCardData({
      title: "",
      category: "",
      bgColor: COLORS.PRIMARY_BLUE,
    });
    setHeroData({
      name: "",
      band: "",
      guide: "",
      yearsRanked: "",
      profileImage: "",
      rawImageUrl: "",
    });
    setContactData(defaultContact);
    setContentSections({
      aboutProvidedBy: "",
      aboutProvidedByName: "",
      region: "",
      practiceAreas: { heading: "", content: "" },
      professionalMemberships: { heading: "", content: "" },
      career: { heading: "", content: "" },
      personal: { heading: "", content: "" },
      ChamberssReview: { heading: "", content: "" },
      strengths: { heading: "", content: "" },
      additionalInformation: { heading: "", content: "" },
      closingStatement: { heading: "", content: "" },
      resource: { heading: "", content: "", link: "" },
    });
    setDialogOpen(true);
  };

  const handleEdit = (id?: number) => {
    setActiveId(id || null);
    setErrors({});
    setKeysToDeleteOnSave([]);
    setActiveTab(0);

    const insight = insightsCards.find((c) => c.id === id);

    if (insight) {
      const newCardData = {
        title: insight.insightTitle || insight.title || "",
        category: insight.category || "",
        bgColor: insight.cardTheme || COLORS.PRIMARY_BLUE,
      };

      const newHeroData = {
        name: insight.personName || "",
        band: insight.bandRole || "",
        guide: insight.guideOrganization || "",
        yearsRanked: insight.yearsRankedDate || "",
        profileImage: insight.imageDownloadUrl || insight.imageUrl || "",
        rawImageUrl: insight.imageUrl || "",
      };

      const newContactData = insight.contact || defaultContact;

      const secMap: any = {
        aboutProvidedBy: insight.aboutProvidedBy || "",
        aboutProvidedByName: insight.aboutProvidedByName || "",
        region: insight.region || "",
        practiceAreas: { heading: "", content: "" },
        professionalMemberships: { heading: "", content: "" },
        career: { heading: "", content: "" },
        personal: { heading: "", content: "" },
        ChamberssReview: { heading: "", content: "" },
        strengths: { heading: "", content: "" },
        additionalInformation: { heading: "", content: "" },
        closingStatement: { heading: "", content: "" },
        resource: { heading: "", content: "", link: "" },
      };

      insight.sections?.forEach((sec: any) => {
        if (sec.sectionType === "PRACTICE_AREAS") secMap.practiceAreas = { heading: sec.heading, content: sec.content, id: sec.id };
        if (sec.sectionType === "PROFESSIONAL_MEMBERSHIPS") secMap.professionalMemberships = { heading: sec.heading, content: sec.content, id: sec.id };
        if (sec.sectionType === "CAREER") secMap.career = { heading: sec.heading, content: sec.content, id: sec.id };
        if (sec.sectionType === "PERSONAL") secMap.personal = { heading: sec.heading, content: sec.content, id: sec.id };
        if (sec.sectionType === "CHAMBERS_REVIEW") secMap.ChamberssReview = { heading: sec.heading, content: sec.content, id: sec.id };
        if (sec.sectionType === "STRENGTHS") secMap.strengths = { heading: sec.heading, content: sec.content, id: sec.id };
        if (sec.sectionType === "ADDITIONAL_CONTENT" || sec.sectionType === "ADDITIONAL_INFORMATION") secMap.additionalInformation = { heading: sec.heading, content: sec.content, id: sec.id };
        if (sec.sectionType === "MAIN_CONTENT" || sec.sectionType === "CLOSING_STATEMENT") secMap.closingStatement = { heading: sec.heading, content: sec.content, id: sec.id };
        if (sec.sectionType === "MISC_AND_RESOURCES" || sec.sectionType === "RESOURCE") secMap.resource = { heading: sec.heading, content: sec.content, link: sec.link || "", id: sec.id };
      });

      setCardData(newCardData);
      setHeroData(newHeroData);
      setContactData(newContactData);
      setContentSections(secMap);
      setInitialState(JSON.stringify({ cardData: newCardData, heroData: newHeroData, contactData: newContactData, contentSections: secMap }));
    }

    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (activeId && JSON.stringify({ cardData, heroData, contactData, contentSections }) === initialState) {
      showNotification("No changes detected. Please make changes before saving.", "info");
      return;
    }

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

    const payload = {
      ...(activeId ? { insightId: activeId } : {}),
      insightTitle: cardData.title,
      category: cardData.category ? cardData.category.charAt(0).toUpperCase() + cardData.category.slice(1).toLowerCase() : "",
      ...((heroData.rawImageUrl || heroData.profileImage) && { imageUrl: heroData.rawImageUrl || heroData.profileImage }),
      personName: heroData.name,
      bandRole: heroData.band,
      guideOrganization: heroData.guide,
      yearsRankedDate: heroData.yearsRanked,
      sections: [
        { sectionType: "PRACTICE_AREAS", heading: contentSections.practiceAreas?.heading, content: contentSections.practiceAreas?.content, sortOrder: 1 },
        { sectionType: "CAREER", heading: contentSections.career?.heading, content: contentSections.career?.content, sortOrder: 2 },
        { sectionType: "PROFESSIONAL_MEMBERSHIPS", heading: contentSections.professionalMemberships?.heading, content: contentSections.professionalMemberships?.content, sortOrder: 3 },
        { sectionType: "PERSONAL", heading: contentSections.personal?.heading, content: contentSections.personal?.content, sortOrder: 4 },
        { sectionType: "CHAMBERS_REVIEW", heading: contentSections.ChamberssReview?.heading, content: contentSections.ChamberssReview?.content, sortOrder: 5 },
        { sectionType: "STRENGTHS", heading: contentSections.strengths?.heading, content: contentSections.strengths?.content, sortOrder: 6 },
        { sectionType: "ADDITIONAL_CONTENT", heading: contentSections.additionalInformation?.heading, content: contentSections.additionalInformation?.content, sortOrder: 7 },
        { sectionType: "MAIN_CONTENT", heading: contentSections.closingStatement?.heading, content: contentSections.closingStatement?.content, sortOrder: 8 },
        { 
          sectionType: "MISC_AND_RESOURCES", 
          heading: contentSections.resource?.heading, 
          content: contentSections.resource?.link ? `${contentSections.resource?.content || ""}\n\nLink: ${contentSections.resource?.link}` : contentSections.resource?.content, 
          sortOrder: 9 
        },
      ].filter(s => s.heading?.trim() || s.content?.trim())
    };

    try {
      await InsightControllers.upsertInsight(payload);
      showNotification(activeId ? "Insight updated successfully" : "Insight created successfully", "success");
      
      setDialogOpen(false);
      await fetchInsights();

      // Delete old or replaced images after successful save
      for (const key of keysToDeleteOnSave) {
        if (!key || typeof key !== "string" || key.startsWith("/") || key.startsWith("http")) continue; // Skip local static files and full URLs
        try {
          await MediaControllers.removeMedia({ key: String(key) });
        } catch (e) {
          console.error("Failed to delete media", key, e);
        }
      }
      setKeysToDeleteOnSave([]);

      fetchInsights();
      setDialogOpen(false);
    } catch (err: any) {
      console.error("Save error:", err);
      showNotification(err?.message || "Failed to save insight", "error");
    }
  };

  const openDeleteConfirm = (id?: number) => {
    setInsightToDelete({ id });
    setDeleteConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!insightToDelete) return;
    const { id } = insightToDelete;
    
    setDeleteConfirmOpen(false);
    
    if (id) {
      try {
        startLoading();
        await InsightControllers.deleteInsight(id);
        showNotification("Insight deleted successfully", "success");
        fetchInsights();
      } catch (err) {
        showNotification("Failed to delete insight", "error");
      } finally {
        stopLoading();
      }
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      setIsUploadingImage(true);
      const formData = new FormData();
      formData.append("image", file);
      const response = await MediaControllers.uploadMedia(formData);
      const responseData = response.data?.data?.data || response.data?.data;
      const uploadedUrl = responseData?.imgUrl || responseData?.url;
      const uploadedKey = responseData?.key || uploadedUrl;
      
      if (response.data?.success && uploadedUrl) {
        if (heroData.rawImageUrl && !keysToDeleteOnSave.includes(heroData.rawImageUrl)) {
          setKeysToDeleteOnSave(prev => [...prev, heroData.rawImageUrl]);
        }
        setHeroData({ ...heroData, profileImage: uploadedUrl, rawImageUrl: uploadedKey });
        setErrors({ ...errors, "heroData.profileImage": undefined });
        showNotification("Image uploaded successfully", "success");
      }
    } catch (err) {
      showNotification("Failed to save insight", "error");
    } finally {
      setIsUploadingImage(false);
    }
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
        {currentItems.map((insight: any, i: number) => (
            <Grid
              size={{ xs: 12, sm: 12, md: 6, lg: 4 }}
              key={i}
              sx={{ display: "flex" }}
            >
              <InsightsCard
                bgColor={insight.cardTheme || COLORS.PRIMARY_BLUE}
                category={insight.category || "News"}
                title={insight.insightTitle || insight.title || ""}
                slug={insight.id?.toString()}
                onDelete={() => openDeleteConfirm(insight.id)}
                onEdit={() => handleEdit(insight.id)}
              />
            </Grid>
          ))}
        </Grid>

      {totalPages > 1 && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={3}
          sx={{ mt: 8, mb: 4 }}
        >
          <Typography
            onClick={() =>
              currentPage > 1 && handlePageChange(currentPage - 1)
            }
            sx={{
              cursor: currentPage > 1 ? "pointer" : "default",
              fontWeight: 700,
              fontSize: 14,
              color: COLORS.PRIMARY_BLUE,
              opacity: currentPage > 1 ? 1 : 0.4,
              transition: "all 0.3s ease",
              "&:hover": {
                color: currentPage > 1 ? COLORS.PRIMARY_GREEN : "",
              },
            }}
          >
            PREVIOUS
          </Typography>
          <Stack direction="row" spacing={1.5} alignItems="center">
            {(() => {
              const pageNumbers: (number | string)[] = [];
              if (totalPages <= 7) {
                for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
              } else {
                if (currentPage <= 4) {
                  pageNumbers.push(1, 2, 3, 4, 5, "...", totalPages);
                } else if (currentPage >= totalPages - 3) {
                  pageNumbers.push(
                    1,
                    "...",
                    totalPages - 4,
                    totalPages - 3,
                    totalPages - 2,
                    totalPages - 1,
                    totalPages,
                  );
                } else {
                  pageNumbers.push(
                    1,
                    "...",
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    "...",
                    totalPages,
                  );
                }
              }

              return pageNumbers.map((page, index) =>
                page === "..." ? (
                  <Typography
                    key={`dots-${index}`}
                    sx={{
                      fontWeight: 700,
                      color: COLORS.PRIMARY_BLUE,
                      mx: 0.5,
                    }}
                  >
                    ...
                  </Typography>
                ) : (
                  <Box
                    key={page}
                    onClick={() => handlePageChange(page as number)}
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "12px",
                      backgroundColor:
                        currentPage === page
                          ? COLORS.PRIMARY_BLUE
                          : "transparent",
                      color:
                        currentPage === page ? "white" : COLORS.BLACK,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: 16,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      border:
                        currentPage === page
                          ? "none"
                          : "1px solid #EAEAEA",
                      boxShadow:
                        currentPage === page
                          ? "0 8px 16px rgba(13, 95, 110, 0.2)"
                          : "none",
                      "&:hover": {
                        backgroundColor:
                          currentPage === page
                            ? COLORS.PRIMARY_BLUE
                            : "rgba(13, 95, 110, 0.05)",
                        borderColor: COLORS.PRIMARY_BLUE,
                      },
                    }}
                  >
                    {page}
                  </Box>
                ),
              );
            })()}
          </Stack>
          <Typography
            onClick={() =>
              currentPage < totalPages &&
              handlePageChange(currentPage + 1)
            }
            sx={{
              cursor: currentPage < totalPages ? "pointer" : "default",
              fontWeight: 700,
              fontSize: 14,
              color: COLORS.PRIMARY_BLUE,
              opacity: currentPage < totalPages ? 1 : 0.4,
              transition: "all 0.3s ease",
              "&:hover": {
                color:
                  currentPage < totalPages ? COLORS.PRIMARY_GREEN : "",
              },
            }}
          >
            NEXT
          </Typography>
        </Stack>
      )}

      <InsightFormModal
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        activeId={activeId}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cardData={cardData}
        setCardData={setCardData}
        heroData={heroData}
        setHeroData={setHeroData}
        contentSections={contentSections}
        setContentSections={setContentSections}
        errors={errors}
        setErrors={setErrors}
        isUploadingImage={isUploadingImage}
        handleImageUpload={handleImageUpload}
        handleDeleteImage={() => {
          if (heroData.rawImageUrl && !keysToDeleteOnSave.includes(heroData.rawImageUrl)) {
            setKeysToDeleteOnSave(prev => [...prev, heroData.rawImageUrl]);
          }
          setHeroData({ ...heroData, profileImage: "", rawImageUrl: "" });
        }}
        handleSave={handleSave}
        handleContentSectionChange={handleContentSectionChange}
      />

      {/* Delete Confirmation Modal */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        maxWidth="xs"
        fullWidth
        slotProps={{
          paper: {
            sx: { borderRadius: 3, p: 1 },
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: COLORS.PRIMARY_BLUE }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this insight? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteConfirmOpen(false)} color="inherit">
            No
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
            disabled={isLoading}
          >
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
}