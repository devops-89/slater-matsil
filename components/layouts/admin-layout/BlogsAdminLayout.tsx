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
  CardMedia,
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
  CircularProgress
} from "@mui/material";
import { Add, Close, Delete, Edit } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { usePageData } from "@/store/usePageData";
import { BLOG_DETAILS_DATA } from "@/public/data/blog-details-data";
import { BlogControllers } from "@/api/blogControllers";
import { MediaControllers } from "@/api/mediaControllers";
import { useNotification } from "@/components/providers/NotificationProvider";
import { useLoading } from "@/components/providers/LoadingProvider";
import * as yup from "yup";
import BlogCardItem from "./components/BlogCardItem";
import BlogFormModal from "./components/BlogFormModal";
import { BLOG_FORM_CARD_DATA, BLOG_FORM_HERO_DATA, BLOG_FORM_CONTENT_SECTION, BLOG_FORM_CONTENT_DATA, BLOG_API_ITEM } from "@/utils/types";

const blogSchema = yup.object().shape({
  cardData: yup.object().shape({
    title: yup.string().required("Title is required"),
    date: yup.string().required("Date is required"),
    readTime: yup.string().required("Read Time is required"),
    description: yup.string().required("Description is required"),
  }),
  heroData: yup.object().shape({
    title: yup.string().required("Hero Title is required"),
    category: yup.string().required("Category is required"),
    author: yup.string().required("Author name is required"),
    authorTitle: yup.string().required("Author title is required"),
  })
});

export default function BlogsAdminLayout() {
  const { details, setDetails } = usePageData();
  const { showNotification } = useNotification();
  const { startLoading, stopLoading } = useLoading();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<number | null>(null);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [keysToDeleteOnSave, setKeysToDeleteOnSave] = useState<string[]>([]);
  const [isUploadingCard, setIsUploadingCard] = useState(false);
  const [initialState, setInitialState] = useState<string>("");
  const [isUploadingAuthor, setIsUploadingAuthor] = useState(false);
  const [blogCards, setBlogCards] = useState<BLOG_API_ITEM[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const fetchBlogs = async () => {
    try {
      startLoading();
      const res = await BlogControllers.getAllBlogs({ limit: 100 });
      let allBlogs = res.data?.data?.data || res.data?.data || [];
      const totalPages = res.data?.data?.meta?.totalPages || res.data?.meta?.totalPages || 1;
      
      if (totalPages > 1) {
        const promises = [];
        for (let i = 2; i <= totalPages; i++) {
          promises.push(BlogControllers.getAllBlogs({ page: i, limit: 100 }));
        }
        const results = await Promise.all(promises);
        results.forEach(r => {
          allBlogs = [...allBlogs, ...(r.data?.data?.data || r.data?.data || [])];
        });
      }
      setBlogCards(allBlogs);
    } catch (e) {
      console.error(e);
      showNotification("Failed to fetch blogs", "error");
    } finally {
      stopLoading();
    }
  };

  React.useEffect(() => {
    fetchBlogs();
  }, []);

  const confirmDelete = async () => {
    if (!blogToDelete) return;
    try {
      startLoading();
      await BlogControllers.deleteBlog(blogToDelete);
      showNotification("Blog deleted successfully", "success");
      fetchBlogs();
    } catch (e) {
      showNotification("Failed to delete blog", "error");
    } finally {
      stopLoading();
      setDeleteConfirmOpen(false);
      setBlogToDelete(null);
    }
  };

  const handleDeleteClick = (id: number) => {
    setBlogToDelete(id);
    setDeleteConfirmOpen(true);
  };

  // Form States
  const [cardData, setCardData] = useState<BLOG_FORM_CARD_DATA>({
    title: "",
    date: "",
    readTime: "",
    description: "",
    slug: "",
    cardImage: "",
    rawCardImage: ""
  });

  const [heroData, setHeroData] = useState<BLOG_FORM_HERO_DATA>({
    title: "",
    category: "Patent Law",
    author: "",
    authorTitle: "",
    authorImage: "",
    rawAuthorImage: ""
  });

  const [content, setContent] = useState<BLOG_FORM_CONTENT_DATA>({ intro: "", sections: [] });

  const handleOpenNew = () => {
    setActiveId(null);
    setActiveTab(0);
    setErrors({});
    setKeysToDeleteOnSave([]);
    setCardData({ title: "", date: "", readTime: "", description: "", slug: "", cardImage: "", rawCardImage: "" });
    setHeroData({ title: "", category: "Patent Law", author: "", authorTitle: "", authorImage: "", rawAuthorImage: "" });
    setContent({ intro: "", sections: [] });
    setDialogOpen(true);
  };

  const handleEdit = async (id?: number) => {
    setActiveId(id || null);
    setErrors({});
    setKeysToDeleteOnSave([]);
    setActiveTab(0);

    // 1. Instantly load available summary data for a fast UI
    const blog = blogCards.find((c) => c.id === id);
    if (blog) {
      const newCardData: BLOG_FORM_CARD_DATA = {
        title: blog.title || "",
        date: blog.datePublished || "",
        readTime: blog.readTime || "",
        description: blog.listingDescription || "",
        cardImage: blog.cardImageDownloadUrl || blog.cardImageUrl || "",
        rawCardImage: blog.cardImageUrl || "",
        slug: blog.slug || ""
      };

      const newHeroData: BLOG_FORM_HERO_DATA = {
        title: blog.heroTitle || blog.title || "",
        category: blog.category || "Patent Law",
        author: blog.authorName || "",
        authorTitle: blog.authorTitle || "",
        authorImage: blog.authorImageDownloadUrl || blog.authorImageUrl || "",
        rawAuthorImage: blog.authorImageUrl || "",
      };

      const newContent: BLOG_FORM_CONTENT_DATA = {
        intro: blog.introduction || "",
        sections: blog.sections ? blog.sections.map((s: Record<string, unknown>) => ({
          ...(s.id ? { id: s.id as number } : {}),
          heading: (s.heading as string) || "",
          content: (s.content as string) || ""
        })) : []
      };

      setCardData(newCardData);
      setHeroData(newHeroData);
      setContent(newContent);
      setInitialState(JSON.stringify({ cardData: newCardData, heroData: newHeroData, content: newContent }));
    }

    setDialogOpen(true);

    // 2. Fetch full details in the background to get missing sections/intro
    if (id) {
      try {
        const res = await BlogControllers.getBlogById(id);
        const fullBlog = res.data?.data?.data || res.data?.data;
        if (fullBlog) {
          setContent((prev) => ({
            intro: prev.intro || fullBlog.introduction || "",
            sections: fullBlog.sections && prev.sections.length === 0 ? fullBlog.sections.map((s: Record<string, unknown>) => ({
              ...(s.id ? { id: s.id } : {}),
              heading: s.heading || "",
              content: s.content || ""
            })) : prev.sections
          }));
        }
      } catch (e) {
        console.error("Failed to fetch full blog details in background", e);
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      startLoading();
      await BlogControllers.deleteBlog(id);
      showNotification("Blog deleted successfully", "success");
      fetchBlogs();
    } catch (e) {
      console.error(e);
      showNotification("Failed to delete blog", "error");
    } finally {
      stopLoading();
    }
  };

  const handleDeleteImage = (type: "card" | "author") => {
    if (type === "card") {
      if (cardData.rawCardImage && !keysToDeleteOnSave.includes(cardData.rawCardImage)) {
        setKeysToDeleteOnSave(prev => [...prev, cardData.rawCardImage as string]);
      }
      setCardData({ ...cardData, cardImage: "", rawCardImage: "" });
    } else {
      if (heroData.rawAuthorImage && !keysToDeleteOnSave.includes(heroData.rawAuthorImage)) {
        setKeysToDeleteOnSave(prev => [...prev, heroData.rawAuthorImage as string]);
      }
      setHeroData({ ...heroData, authorImage: "", rawAuthorImage: "" });
    }
  };

  const handleAuthorImageUpload = async (file: File) => {
    try {
      setIsUploadingAuthor(true);
      const formData = new FormData();
      formData.append("image", file);
      const res = await MediaControllers.uploadMedia(formData);
      const responseData = res.data?.data?.data || res.data?.data;
      const uploadedUrl = responseData?.imgUrl || responseData?.url || responseData?.imageDownloadUrl;
      const uploadedKey = responseData?.key || uploadedUrl;
      
      if (uploadedUrl) {
        if (heroData.rawAuthorImage && !keysToDeleteOnSave.includes(heroData.rawAuthorImage)) {
          setKeysToDeleteOnSave(prev => [...prev, heroData.rawAuthorImage as string]);
        }
        setHeroData({ ...heroData, authorImage: uploadedUrl, rawAuthorImage: uploadedKey });
        setErrors({ ...errors, 'heroData.authorImage': undefined });
        showNotification("Author image uploaded successfully", "success");
      }
    } catch (error) {
      showNotification("Failed to upload author image", "error");
    } finally {
      setIsUploadingAuthor(false);
    }
  };

  const handleCardImageUpload = async (file: File) => {
    try {
      setIsUploadingCard(true);
      const formData = new FormData();
      formData.append("image", file);
      const res = await MediaControllers.uploadMedia(formData);
      const responseData = res.data?.data?.data || res.data?.data;
      const uploadedUrl = responseData?.imgUrl || responseData?.url || responseData?.imageDownloadUrl;
      const uploadedKey = responseData?.key || uploadedUrl;
      
      if (uploadedUrl) {
        if (cardData.rawCardImage && !keysToDeleteOnSave.includes(cardData.rawCardImage)) {
          setKeysToDeleteOnSave(prev => [...prev, cardData.rawCardImage as string]);
        }
        setCardData({ ...cardData, cardImage: uploadedUrl, rawCardImage: uploadedKey });
        showNotification("Card image uploaded successfully", "success");
      }
    } catch (error) {
      showNotification("Failed to upload card image", "error");
    } finally {
      setIsUploadingCard(false);
    }
  };

  const handleSave = async () => {
    if (activeId && JSON.stringify({ cardData, heroData, content }) === initialState) {
      showNotification("No changes detected. Please make changes before saving.", "info");
      return;
    }

    try {
      await blogSchema.validate({ cardData, heroData }, { abortEarly: false });
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
        
        if (Object.keys(validationErrors).some(k => k.startsWith("cardData."))) {
          setActiveTab(0);
        } else if (Object.keys(validationErrors).some(k => k.startsWith("heroData."))) {
          setActiveTab(1);
        }
      }
      return;
    }

    const apiPayload = {
      title: cardData.title,
      listingDescription: cardData.description,
      datePublished: cardData.date,
      readTime: cardData.readTime,
      cardImageUrl: cardData.rawCardImage || cardData.cardImage,
      heroTitle: heroData.title || cardData.title,
      category: heroData.category || "Patent Law",
      badge: "",
      authorName: heroData.author || "",
      authorTitle: heroData.authorTitle || "",
      authorImageUrl: heroData.rawAuthorImage || heroData.authorImage,
      introduction: content.intro || "",

      isPublished: true,
      sections: content.sections.map((sec, idx) => ({
        heading: sec.heading || "",
        content: sec.content || "",
        sortOrder: idx + 1
      }))
    };

    try {
      setIsSaving(true);
      
      for (const key of keysToDeleteOnSave) {
        try {
          await MediaControllers.removeMedia({ key: String(key) });
        } catch (e) {
          console.error("Failed to delete media", key, e);
        }
      }
      setKeysToDeleteOnSave([]);

      if (activeId) {
        await BlogControllers.updateBlog(activeId, apiPayload);
        setBlogCards(prev => prev.map(b => b.id === activeId ? { ...b, ...apiPayload, cardImageUrl: apiPayload.cardImageUrl, listingDescription: apiPayload.listingDescription } : b));
        showNotification("Blog updated successfully", "success");
      } else {
        await BlogControllers.createBlog(apiPayload);
        showNotification("Blog created successfully", "success");
      }
      setDialogOpen(false);
      fetchBlogs();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to save blog to API";
      showNotification(errorMessage, "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddSection = () => {
    setContent({
      ...content,
      sections: [...content.sections, { heading: "", content: "" }]
    });
  };

  const handleRemoveSection = (idx: number) => {
    const newSections = [...content.sections];
    newSections.splice(idx, 1);
    setContent({ ...content, sections: newSections });
  };

  const handleSectionChange = (idx: number, field: 'heading' | 'content', val: string) => {
    const newSections = [...content.sections];
    newSections[idx][field] = val;
    setContent({ ...content, sections: newSections });
  };

  const getSectionContentString = (val: string | string[]) => {
    if (Array.isArray(val)) {
      return val.join("\n");
    }
    return val || "";
  };

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;
  const totalPages = Math.ceil(blogCards.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentBlogs = blogCards.slice(startIndex, endIndex);

  return (
    <AdminLayout title="Blogs Management">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: { xs: 'stretch', sm: 'flex-end' }, alignItems: 'center' }}>
        <Button variant="contained" startIcon={<Add />} onClick={handleOpenNew} sx={{ backgroundColor: COLORS.PRIMARY_GREEN, borderRadius: "50px", width: { xs: '100%', sm: 'auto' } }}>
          Add Blog Entry
        </Button>
      </Box>

      <Grid container spacing={{ xs: 2, md: 4 }}>
        {currentBlogs.map((blog) => (
          <BlogCardItem
            key={blog.id}
            blog={blog}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        ))}
      </Grid>

      {/* Pagination */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ mt: { lg: 10, xs: 6 } }}
      >
        <Typography
          onClick={() =>
            currentPage > 1 &&
            setCurrentPage(currentPage - 1)
          }
          sx={{
            cursor:
              currentPage === 1
                ? "not-allowed"
                : "pointer",
            fontWeight: 700,
            fontSize: 14,
            color: COLORS.PRIMARY_BLUE,
            opacity: currentPage === 1 ? 0.5 : 1,
            "&:hover": {
              opacity: currentPage === 1 ? 0.5 : 1,
            },
          }}
        >
          PREVIOUS
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          {Array.from({ length: totalPages }).map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                backgroundColor:
                  currentPage === index + 1
                    ? COLORS.PRIMARY_BLUE
                    : "transparent",
                color:
                  currentPage === index + 1
                    ? "white"
                    : COLORS.PRIMARY_BLUE,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow:
                  currentPage === index + 1
                    ? "0 4px 10px rgba(13, 95, 110, 0.2)"
                    : "none",
                "&:hover": {
                  backgroundColor:
                    currentPage === index + 1
                      ? COLORS.PRIMARY_BLUE
                      : "rgba(13, 95, 110, 0.05)",
                },
              }}
            >
              {index + 1}
            </Box>
          ))}
        </Stack>

        <Typography
          onClick={() =>
            currentPage < totalPages &&
            setCurrentPage(currentPage + 1)
          }
          sx={{
            cursor:
              currentPage === totalPages || totalPages === 0
                ? "not-allowed"
                : "pointer",
            fontWeight: 700,
            fontSize: 14,
            color: COLORS.PRIMARY_BLUE,
            opacity: currentPage === totalPages || totalPages === 0 ? 0.5 : 1,
            "&:hover": {
              color:
                currentPage === totalPages || totalPages === 0
                  ? COLORS.PRIMARY_BLUE
                  : COLORS.PRIMARY_GREEN,
            },
          }}
        >
          NEXT
        </Typography>
      </Stack>

      <BlogFormModal
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        activeId={activeId}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cardData={cardData}
        setCardData={setCardData}
        heroData={heroData}
        setHeroData={setHeroData}
        content={content}
        setContent={setContent}
        errors={errors}
        setErrors={setErrors}
        isUploadingCard={isUploadingCard}
        isUploadingAuthor={isUploadingAuthor}
        handleCardImageUpload={handleCardImageUpload}
        handleAuthorImageUpload={handleAuthorImageUpload}
        handleDeleteImage={handleDeleteImage}
        handleSave={handleSave}
        handleAddSection={handleAddSection}
        handleRemoveSection={handleRemoveSection}
        handleSectionChange={handleSectionChange}
        getSectionContentString={getSectionContentString}
        isSaving={isSaving}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this blog? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteConfirmOpen(false)} color="inherit">No, Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">Yes, Delete</Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
}
