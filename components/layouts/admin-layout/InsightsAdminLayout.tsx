"use client";
import { InsightControllers } from "@/api/insightControllers";
import { MediaControllers } from "@/api/mediaControllers";
import InsightsCard from "@/components/layouts/insights-layout/components/Insights-Card";
import { useLoading } from "@/components/providers/LoadingProvider";
import { useNotification } from "@/components/providers/NotificationProvider";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import {
  INSIGHT_API_ITEM,
  INSIGHT_FORM_CARD_DATA,
  INSIGHT_FORM_CONTACT,
  INSIGHT_FORM_CONTENT_DATA,
  INSIGHT_FORM_HERO_DATA
} from "@/utils/types";
import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import * as yup from "yup";
import AdminLayout from "./AdminLayout";
import InsightFormModal from "./components/InsightFormModal";

const insightSchema = yup.object().shape({
  cardData: yup.object().shape({
    title: yup.string().required("Title is required"),
    category: yup.string().required("Category is required"),
    order: yup.number().typeError("Order must be a number").required("Order is required"),
  }),
  heroData: yup.object().shape({
    name: yup.string().required("Name is required"),
    band: yup.string().required("Band / Role is required"),
    guide: yup.string().required("Guide is required"),
    yearsRanked: yup.string().optional(),
    profileImage: yup.mixed().optional(),
  }),
  contentSections: yup.object().shape({
    closingStatement: yup.object().shape({
      content: yup.string().required("Content Body is required"),
    })
  })
});

interface InsightsAdminLayoutProps {
  initialInsights?: INSIGHT_API_ITEM[];
}

export default function InsightsAdminLayout({ initialInsights = [] }: InsightsAdminLayoutProps) {
  const { details, setDetails } = usePageData();
  const { showNotification } = useNotification();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [insightsCards, setInsightsCards] = useState<INSIGHT_API_ITEM[]>(initialInsights);
  const [keysToDeleteOnSave, setKeysToDeleteOnSave] = useState<string[]>([]);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [initialState, setInitialState] = useState<string>("");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [insightToDelete, setInsightToDelete] = useState<{id?: number} | null>(null);
  
  const allCards = [...insightsCards].sort((a, b) => {
    const orderA = a.order !== undefined && a.order !== null ? Number(a.order) : 999999;
    const orderB = b.order !== undefined && b.order !== null ? Number(b.order) : 999999;
    return orderA - orderB;
  });

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
  const [contactData, setContactData] = useState<INSIGHT_FORM_CONTACT>(defaultContact);
  const [cardData, setCardData] = useState<INSIGHT_FORM_CARD_DATA>({
    title: "",
    category: "",
    bgColor: COLORS.PRIMARY_BLUE,
    order: "",
  });
  const [heroData, setHeroData] = useState<INSIGHT_FORM_HERO_DATA>({
    name: "",
    band: "",
    guide: "",
    yearsRanked: "",
    profileImage: "",
    rawProfileImage: "",
  });
  const [contentSections, setContentSections] = useState<INSIGHT_FORM_CONTENT_DATA>({
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

  const [isFetching, setIsFetching] = useState(initialInsights.length === 0);

  const fetchInsights = async () => {
    try {
      setIsFetching(true);
      const res = await InsightControllers.getAllInsights({ limit: 1000 });
      const data = res.data?.data?.data?.insights || res.data?.data?.insights || [];
      setInsightsCards(data);
    } catch (err) {
      showNotification("Failed to fetch insights", "error");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (initialInsights.length === 0) {
      fetchInsights();
    }
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
      order: "",
    });
    setHeroData({
      name: "",
      band: "",
      guide: "",
      yearsRanked: "",
      profileImage: "",
      rawProfileImage: "",
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
        title: (insight.listingTitle as string) || (insight.insightTitle as string) || (insight.title as string) || "",
        category: (insight.category as string) || "",
        bgColor: (insight.bgColor as string) || (insight.cardTheme as string) || COLORS.PRIMARY_BLUE,
        imageUrl: (insight.profileImageUrl as string) || (insight.imageUrl as string) || "",
        imageDownloadUrl: (insight.profileImageDownloadUrl as string) || (insight.imageUrl as string) || "",
        order: insight.order !== undefined && insight.order !== null ? String(insight.order) : "",
      };

      const newHeroData = {
        name: (insight.personName as string) || (insight.name as string) || "",
        band: (insight.bandRole as string) || "",
        guide: (insight.guideOrganization as string) || (insight.guide as string) || "",
        yearsRanked: (insight.yearsRankedDate as string) || (insight.yearsRanked as string) || "",
        profileImage: (insight.imageDownloadUrl as string) || (insight.imageUrl as string) || "",
        rawProfileImage: (insight.imageUrl as string) || "",
      };

      const newContactData = insight.contact || defaultContact;

      const secMap: INSIGHT_FORM_CONTENT_DATA = {
        aboutProvidedBy: (insight.aboutProvidedBy as string) || "",
        aboutProvidedByName: (insight.aboutProvidedByName as string) || "",
        region: (insight.region as string) || "",
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

      insight.sections?.forEach((sec: Record<string, any>) => {
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
        { cardData, heroData, contentSections },
        { abortEarly: false },
      );
      setErrors({});
    } catch (err: unknown) {
      if (err instanceof yup.ValidationError) {
        const validationErrors: Record<string, string | undefined> = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
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
        } else if (
          Object.keys(validationErrors).some((k) => k.startsWith("contentSections."))
        ) {
          setActiveTab(2);
        }
      }
      return;
    }

    const payload = {
      ...(activeId ? { insightId: activeId } : {}),
      insightTitle: cardData.title,
      category: cardData.category ? cardData.category.charAt(0).toUpperCase() + cardData.category.slice(1).toLowerCase() : "",
      ...((heroData.rawProfileImage || heroData.profileImage) && { imageUrl: heroData.rawProfileImage || heroData.profileImage }),
      order: cardData.order !== "" && cardData.order !== undefined ? Number(cardData.order) : undefined,
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
      setIsSaving(true);
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
      let errorMessage = "Failed to save insight";
      if (err?.response?.status === 422) {
        errorMessage = err.response.data?.message || "Please fill all required fields correctly.";
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      showNotification(errorMessage, "error");
    } finally {
      setIsSaving(false);
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
        if (heroData.rawProfileImage && !keysToDeleteOnSave.includes(heroData.rawProfileImage)) {
          setKeysToDeleteOnSave(prev => [...prev, heroData.rawProfileImage as string]);
        }
        setHeroData({ ...heroData, profileImage: uploadedUrl, rawProfileImage: uploadedKey });
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
    setContentSections(prev => {
      const updated = { ...prev };
      const key = sectionKey as keyof INSIGHT_FORM_CONTENT_DATA;
      if (typeof updated[key] === "object" && updated[key] !== null) {
        (updated[key] as any)[field] = value;
      } else {
        (updated as any)[key] = value;
      }
      return updated;
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
        {isFetching ? (
          // Render skeleton loaders
          Array.from(new Array(6)).map((_, i) => (
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} key={`skeleton-${i}`} sx={{ display: "flex" }}>
              <Box sx={{ width: "100%", height: 320, borderRadius: 3, bgcolor: "rgba(0,0,0,0.05)", animation: "pulse 1.5s infinite" }} />
            </Grid>
          ))
        ) : (
          currentItems.map((insight, i: number) => (
            <Grid
              size={{ xs: 12, sm: 12, md: 6, lg: 4 }}
              key={i}
              sx={{ display: "flex" }}
            >
              <InsightsCard
                bgColor={(insight.cardTheme as string) || COLORS.PRIMARY_BLUE}
                category={(insight.category as string) || "News"}
                title={(insight.insightTitle as string) || (insight.title as string) || ""}
                slug={insight.id?.toString()}
                onDelete={() => openDeleteConfirm(insight.id)}
                onEdit={() => handleEdit(insight.id)}
              />
            </Grid>
          ))
        )}
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
          if (heroData.rawProfileImage && !keysToDeleteOnSave.includes(heroData.rawProfileImage)) {
            setKeysToDeleteOnSave(prev => [...prev, heroData.rawProfileImage as string]);
          }
          setHeroData({ ...heroData, profileImage: "", rawProfileImage: "" });
        }}
        handleSave={handleSave}
        handleContentSectionChange={handleContentSectionChange}
        isSaving={isSaving}
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
