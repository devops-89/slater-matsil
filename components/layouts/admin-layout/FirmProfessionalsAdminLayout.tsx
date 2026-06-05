"use client";
import { MediaControllers } from "@/api/mediaControllers";
import { ProfessionalControllers } from "@/api/professionalControllers";
import { useLoading } from "@/components/providers/LoadingProvider";
import { useNotification } from "@/components/providers/NotificationProvider";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { Add } from "@mui/icons-material";
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Pagination,
    Stack,
    Typography
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import AdminLayout from "./AdminLayout";
import ProfessionalCardItem from "./components/ProfessionalCardItem";
import ProfessionalFormModal from "./components/ProfessionalFormModal";
export default function FirmProfessionalsAdminLayout() {
  const { details } = usePageData();
  const { startLoading, stopLoading } = useLoading();
  const { showNotification } = useNotification();
  const [apiProfessionals, setApiProfessionals] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [errors, setErrors] = useState<any>({});
  
  const [isUploadingCardImg, setIsUploadingCardImg] = useState(false);
  const [isUploadingDetailsImg, setIsUploadingDetailsImg] = useState(false);
  const [pendingDeletes, setPendingDeletes] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const fetchProfessionals = async () => {
    try {
      startLoading();
      const res = await ProfessionalControllers.getAllProfessionalProfiles();
      let users = res.data?.data?.users || [];
      if (!users.length && res.data?.data?.data?.users) {
        users = res.data.data.data.users;
      }
      if (users && users.length > 0) {
        setApiProfessionals(users);
      }
    } catch (err) {
      console.error("Failed to fetch professionals", err);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const getLastName = (fullName: string) => {
    if (!fullName) return "";
    const cleanName = fullName.split(",")[0].trim();
    const parts = cleanName.split(/\s+/);
    return parts[parts.length - 1].toLowerCase();
  };

  const hybridProfessionals = useMemo(() => {
    const mappedApi = apiProfessionals.map(apiItem => ({
      ...apiItem, 
      name: apiItem.fullName, 
      img: apiItem.profileImageDownloadUrl || apiItem.imageDownloadUrl || apiItem.profileImageUrl || apiItem.imageUrl, 
      detailsImg: apiItem.professionalProfiles?.[0]?.imageDownloadUrl || apiItem.professionalProfiles?.[0]?.imageUrl || "" 
    }));

    return mappedApi.sort((a, b) =>
      getLastName(a.name).localeCompare(getLastName(b.name)),
    );
  }, [apiProfessionals]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Full Name is required"),
    designation: Yup.string().required("Designation is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
  });

  const [cardData, setCardData] = useState<any>({});
  const [bioData, setBioData] = useState<any>({
    email: "",
    phoneNumber: "",
    vCard: {
      job_title: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      countryRegion: ""
    },
    bio: { paragraphs: "", bullets: [] },
    education: { paragraphs: "", bullets: [] },
    admissions: { paragraphs: "", bullets: [] },
    articles: { paragraphs: "", bullets: [] },
    associations: { paragraphs: "", bullets: [] }
  });

  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 8;
  const [loadedCount, setLoadedCount] = useState(0);
  
  const paginatedData = hybridProfessionals.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const currentKey = `${page}-${hybridProfessionals.length}`;

  useEffect(() => {
    if (paginatedData?.length > 0) {
      // If loadedCount is fully met for THIS page, stop.
      if (loadedCount >= paginatedData.length) {
        stopLoading();
      }
    }
  }, [loadedCount, paginatedData, stopLoading]);

  // Separate effect to handle page change start
  useEffect(() => {
    if (paginatedData?.length > 0) {
      startLoading();
      const validImagesCount = paginatedData.filter(p => p.img).length;
      setLoadedCount(paginatedData.length - validImagesCount);
    }
  }, [page, hybridProfessionals.length]); // Use explicit dependencies

  const handleImageLoad = () => {
    setLoadedCount((prev) => prev + 1);
  };

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [initialState, setInitialState] = useState<string>("");

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleOpenNew = () => {
    setActiveId(null);
    setActiveTab(0);
    setCardData({ name: "", designation: "", imageUrl: "", imageDownloadUrl: "", detailsImageUrl: "", detailsImageDownloadUrl: "" });
    setBioData({
      email: "",
      phoneNumber: "",
      vCard: {
        job_title: "Attorney at Law",
        street: "17950 Preston Road, Suite 1000",
        city: "Dallas",
        state: "TX",
        postalCode: "75252-57293",
        countryRegion: "USA"
      },
      bio: { paragraphs: "", bullets: [] },
      education: { paragraphs: "", bullets: [] },
      admissions: { paragraphs: "", bullets: [] },
      articles: { paragraphs: "", bullets: [] },
      associations: { paragraphs: "", bullets: [] }
    });
    setErrors({});
    setPendingDeletes([]);
    setDialogOpen(true);
  };

  const handleEdit = (id: number) => {
    setActiveId(id);
    setActiveTab(0);
    const prof = hybridProfessionals.find(p => p.id === id);
    if (!prof) return;

    const newCardData = {
      name: prof.fullName || prof.name || "",
      designation: prof.designation || "",
      imageUrl: prof.profileImageUrl || prof.imageUrl || prof.img || "",
      imageDownloadUrl: prof.profileImageDownloadUrl || prof.imageDownloadUrl || prof.img || "",
      detailsImageUrl: prof.professionalProfiles?.[0]?.imageUrl || prof.detailsImg || "",
      detailsImageDownloadUrl: prof.professionalProfiles?.[0]?.imageDownloadUrl || prof.detailsImg || ""
    };
    setCardData(newCardData);

    const profile = prof.professionalProfiles?.[0] || {};
    const sections = profile.sections || [];
    const getSection = (type: string) => sections.find((s: any) => s.sectionType === type) || { description: "", bullets: [] };
    const parseSection = (s: any) => ({
      id: s.id,
      paragraphs: s.description || "",
      bullets: (s.bullets || []).map((b: any) => ({ id: b.id, label: b.bulletText, href: "" }))
    });
    const newBioData = {
      profileId: profile.id,
      email: prof.email || "",
      phoneNumber: prof.phoneNumber || "",
      vCard: {
        job_title: profile.jobTitle || "",
        street: profile.streetAddress || "",
        city: profile.city || "",
        state: profile.state || "",
        postalCode: profile.postalCode || "",
        countryRegion: "USA"
      },
      bio: parseSection(getSection("BIOGRAPHY")),
      education: parseSection(getSection("EDUCATION")),
      admissions: parseSection(getSection("ADMISSIONS")),
      articles: parseSection(getSection("ARTICLES_PUBLICATIONS")),
      associations: parseSection(getSection("ASSOCIATIONS"))
    };
    setBioData(newBioData);

    setErrors({});
    setPendingDeletes([]);
    setInitialState(JSON.stringify({ cardData: newCardData, bioData: newBioData }));
    setDialogOpen(true);
  };

  const handleUploadImage = async (file: File, type: "card" | "details") => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      if (type === "card") setIsUploadingCardImg(true);
      else setIsUploadingDetailsImg(true);
      const res = await MediaControllers.uploadMedia(formData);
      
      // Handle double-nested API response
      const responseData = res.data?.data?.data || res.data?.data || res.data;
      const key = responseData?.key;
      const downloadUrl = responseData?.url || responseData?.imageDownloadUrl || URL.createObjectURL(file);
      
      if (key) {
        if (type === "card") {
          setCardData((prev: any) => ({ ...prev, imageUrl: key, imageDownloadUrl: downloadUrl }));
        } else {
          setCardData((prev: any) => ({ ...prev, detailsImageUrl: key, detailsImageDownloadUrl: downloadUrl }));
        }
      }
    } catch (error) {
      console.error("Upload failed", error);
      alert("Image upload failed");
    } finally {
      if (type === "card") setIsUploadingCardImg(false);
      else setIsUploadingDetailsImg(false);
    }
  };

  const handleDeleteImage = (type: "card" | "details") => {
    const keyToDelete = type === "card" ? cardData.imageUrl : cardData.detailsImageUrl;
    if (keyToDelete && typeof keyToDelete === "string" && !keyToDelete.startsWith("data:") && !keyToDelete.startsWith("http") && !keyToDelete.startsWith("blob:")) {
      setPendingDeletes((prev: string[]) => [...prev, keyToDelete]);
    }
    if (type === "card") setCardData((prev: any) => ({ ...prev, imageUrl: "", imageDownloadUrl: "" }));
    else setCardData((prev: any) => ({ ...prev, detailsImageUrl: "", detailsImageDownloadUrl: "" }));
  };

  const handleSave = async () => {
    if (activeId && JSON.stringify({ cardData, bioData }) === initialState) {
      showNotification("No changes detected. Please make changes before saving.", "info");
      return;
    }

    try {
      await validationSchema.validate({
        name: cardData.name,
        designation: cardData.designation,
        email: bioData.email,
        phoneNumber: bioData.phoneNumber
      }, { abortEarly: false });
      setErrors({});
    } catch (err: any) {
      const newErrors: any = {};
      err.inner.forEach((e: any) => {
        newErrors[e.path] = e.message;
      });
      setErrors(newErrors);
      if (newErrors.name || newErrors.designation || newErrors.email || newErrors.phoneNumber) {
        setActiveTab(0);
      }
      return;
    }

    setIsSaving(true);
    const nameParts = cardData.name.split(" ");
    
    const buildSection = (type: string, data: any, sortOrder: number) => {
      const payload: any = {
        sectionType: type,
        description: data.paragraphs,
        sortOrder,
        bullets: data.bullets.map((b: any, idx: number) => {
          const bulletPayload: any = { bulletText: b.label, sortOrder: idx + 1 };
          if (b.id) bulletPayload.id = b.id;
          return bulletPayload;
        })
      };
      if (data.id) payload.id = data.id;
      return payload;
    };

    const activeProf = hybridProfessionals.find(p => p.id === activeId);

    const bioText = Array.isArray(bioData.bio) 
      ? bioData.bio.map((b: any) => b.description).join("\n") 
      : (typeof bioData.bio === 'string' ? bioData.bio : bioData.bio?.paragraphs || "");

    const payload: any = {
      email: bioData.email,
      fullName: cardData.name,
      designation: cardData.designation,
      phoneNumber: bioData.phoneNumber,
      imageUrl: cardData.imageUrl || null,
      jobTitle: bioData.vCard.job_title,
      streetAddress: bioData.vCard.street,
      city: bioData.vCard.city,
      state: bioData.vCard.state,
      postalCode: bioData.vCard.postalCode,
      sections: [
        { sectionType: "BIOGRAPHY", sortOrder: 1, description: bioText },
        { sectionType: "EDUCATION", sortOrder: 2, description: bioData.education?.paragraphs, bullets: bioData.education?.bullets },
        { sectionType: "ADMISSIONS", sortOrder: 3, description: bioData.admissions?.paragraphs, bullets: bioData.admissions?.bullets },
        { sectionType: "ARTICLES_PUBLICATIONS", sortOrder: 4, description: bioData.articles?.paragraphs, bullets: bioData.articles?.bullets },
        { sectionType: "ASSOCIATIONS", sortOrder: 5, description: bioData.associations?.paragraphs, bullets: bioData.associations?.bullets }
      ].map(sec => {
        const cleaned: any = { sectionType: sec.sectionType, sortOrder: sec.sortOrder };
        if (sec.description) cleaned.description = sec.description;
        if (sec.bullets && sec.bullets.length > 0) {
          cleaned.bullets = sec.bullets.map((b: any, idx: number) => ({
            bulletText: b.label,
            sortOrder: idx + 1
          }));
        }
        return cleaned;
      }).filter(sec => sec.description || sec.bullets)
    };

    let targetId = activeProf?.id;
    if (!targetId) {
      // Bulletproof fallback: search the loaded API professionals by email
      const fallbackProf = apiProfessionals.find(p => 
        p.email?.toLowerCase().trim() === bioData.email?.toLowerCase().trim() || 
        p.fullName?.toLowerCase().trim() === cardData.name?.toLowerCase().trim()
      );
      if (fallbackProf) {
        targetId = fallbackProf.id;
      }
    }

    if (targetId) {
      payload.userId = targetId;
    }

    try {
      // Backend uses POST endpoint for both Create and Update (Upsert).
      // If targetId is present, it is sent in payload.userId which triggers an update.
      await ProfessionalControllers.createProfessionalProfile(payload);

      // Execute pending deletes
      for (const key of pendingDeletes) {
        try {
          await MediaControllers.removeMedia({ key });
        } catch (e) {
          console.error("Failed to delete media", e);
        }
      }
      setPendingDeletes([]);

      await fetchProfessionals();
      setDialogOpen(false);
      showNotification(
        targetId 
          ? "Professional profile has been successfully updated." 
          : "Professional profile has been successfully created.", 
        "success"
      );
    } catch (err: any) {
      console.error("Save failed", err);
      const backendError = err.response?.data?.error;
      if (Array.isArray(backendError)) {
        const errorDetails = backendError.map((e: any) => {
          const property = e.property || e.path || e.field || "Unknown Field";
          const constraints = e.constraints ? Object.values(e.constraints).join(", ") : JSON.stringify(e);
          return `${property}: ${constraints}`;
        }).join("\n");
        alert("Validation failed:\n" + errorDetails);
      } else if (err.response?.data?.message) {
        alert(`Failed to save: ${err.response.data.message}`);
      } else {
        alert(`Failed to save professional profile: ${err.message || "Unknown error"}`);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddBullet = (section: string) => {
    const updated = { ...bioData };
    updated[section].bullets.push({ id: undefined, label: "", href: "" });
    setBioData(updated);
  };

  const handleRemoveBullet = (section: string, index: number) => {
    const updated = { ...bioData };
    updated[section].bullets.splice(index, 1);
    setBioData(updated);
  };

  const handleBulletChange = (section: string, index: number, field: string, value: string) => {
    const updated = { ...bioData };
    updated[section].bullets[index][field] = value;
    setBioData(updated);
  };

  const handleParagraphChange = (section: string, value: string) => {
    const updated = { ...bioData };
    updated[section].paragraphs = value;
    setBioData(updated);
  };

  const handleDeleteProfessional = (id: number) => {
    setDeleteTargetId(id);
    setDeleteModalOpen(true);
  };

  const confirmDeleteProfessional = async () => {
    if (!deleteTargetId) return;
    setIsDeleting(true);
    try {
      await ProfessionalControllers.deleteProfessionalProfile(deleteTargetId);
      showNotification("Professional deleted successfully!", "success");
      setDeleteModalOpen(false);
      await fetchProfessionals();
    } catch (error: any) {
      console.error("Failed to delete professional", error);
      showNotification(error?.response?.data?.message || "Failed to delete professional.", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AdminLayout title="Firm Professionals Management">
      <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'stretch', sm: 'center' }, gap: 2 }}>
        <Typography variant="h5" sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE }}>
          Professional Database
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleOpenNew} sx={{ backgroundColor: COLORS.PRIMARY_GREEN, borderRadius: "50px" }}>
          Add Professional
        </Button>
      </Box>

      <Grid container spacing={{ xs: 2, md: 4 }}>
        {paginatedData.map((prof, i) => (
          <ProfessionalCardItem
            key={i}
            prof={prof}
            onEdit={handleEdit}
            onDelete={handleDeleteProfessional}
            onImageLoad={handleImageLoad}
          />
        ))}
      </Grid>

      {hybridProfessionals && hybridProfessionals.length > ITEMS_PER_PAGE && (
        <Stack direction="row" justifyContent="center" sx={{ mt: 5 }}>
          <Pagination
            count={Math.ceil(hybridProfessionals.length / ITEMS_PER_PAGE)}
            page={page}
            onChange={handlePageChange}
            sx={{
              "& .MuiPaginationItem-root": {
                color: COLORS.PRIMARY_BLUE,
                borderColor: COLORS.PRIMARY_BLUE,
                "&.Mui-selected": {
                  backgroundColor: COLORS.PRIMARY_BLUE,
                  color: COLORS.WHITE,
                  "&:hover": {
                    backgroundColor: COLORS.PRIMARY_BLUE,
                  },
                },
              },
            }}
          />
        </Stack>
      )}

      <ProfessionalFormModal
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        activeId={activeId}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cardData={cardData}
        setCardData={setCardData}
        bioData={bioData}
        setBioData={setBioData}
        errors={errors}
        setErrors={setErrors}
        isSaving={isSaving}
        isUploadingCardImg={isUploadingCardImg}
        handleUploadImage={handleUploadImage}
        handleDeleteImage={handleDeleteImage}
        handleSave={handleSave}
        handleParagraphChange={handleParagraphChange}
        handleAddBullet={handleAddBullet}
        handleRemoveBullet={handleRemoveBullet}
        handleBulletChange={handleBulletChange}
      />

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <DialogTitle sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this firm professional? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteModalOpen(false)} color="inherit" disabled={isDeleting}>No, Cancel</Button>
          <Button onClick={confirmDeleteProfessional} variant="contained" color="error" disabled={isDeleting}>
            {isDeleting ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : "Yes, Delete"}
          </Button>
        </DialogActions>
      </Dialog>


    </AdminLayout>
  );


}