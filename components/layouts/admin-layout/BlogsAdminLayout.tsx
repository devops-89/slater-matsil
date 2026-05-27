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
  Select
} from "@mui/material";
import { Add, Close, Delete } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { usePageData } from "@/store/usePageData";
import { BLOG_DETAILS_DATA } from "@/public/data/blog-details-data";
import * as yup from "yup";

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [errors, setErrors] = useState<any>({});

  // Form States
  const [cardData, setCardData] = useState<any>({
    title: "",
    date: "",
    readTime: "",
    description: "",
    slug: "",
    img: ""
  });

  const [heroData, setHeroData] = useState<any>({
    title: "",
    category: "Patent Law",
    date: "",
    readTime: "",
    author: "",
    authorTitle: "",
    authorImage: "",
    badge: ""
  });

  const [content, setContent] = useState<any>({
    intro: "",
    sections: []
  });

  const storeCards = details?.insightsPage?.blogSection?.pastWebinars || [];
  const storeDetails = details?.insightsPage?.blogDetailsData || [];

  const combinedDetailsMap = new Map();
  BLOG_DETAILS_DATA.forEach((d: any) => combinedDetailsMap.set(d.slug, d));
  storeDetails.forEach((d: any) => combinedDetailsMap.set(d.slug, d));
  const blogDetails = Array.from(combinedDetailsMap.values());

  const combinedCardsMap = new Map();
  BLOG_DETAILS_DATA.forEach((d: any, idx: number) => {
    combinedCardsMap.set(d.slug, {
      id: idx + 1000,
      tag: d.hero?.category || "Blog",
      title: d.hero?.title || "Untitled",
      subtitle: d.hero?.title || "Untitled",
      date: d.hero?.date || "",
      description: d.content?.intro || "",
      img: d.hero?.authorImage || "",
      bg: "#0D5F6E",
      slug: d.slug,
      readTime: d.hero?.readTime || "5 min"
    });
  });
  storeCards.forEach((c: any) => combinedCardsMap.set(c.slug, c));
  const blogCards = Array.from(combinedCardsMap.values());

  const handleOpenNew = () => {
    setActiveSlug(null);
    setActiveTab(0);
    setErrors({});
    setCardData({ title: "", date: "", readTime: "", description: "", img: "" });
    setHeroData({ title: "", category: "Patent Law", date: "", readTime: "", author: "", authorTitle: "", authorImage: "", badge: "" });
    setContent({ intro: "", sections: [] });
    setDialogOpen(true);
  };

  const handleEdit = (slug: string) => {
    setActiveSlug(slug);
    setActiveTab(0);
    setErrors({});
    const card = blogCards.find((c: any) => c.slug === slug);
    const detailsObj = blogDetails.find((d: any) => d.slug === slug);

    setCardData(card ? JSON.parse(JSON.stringify(card)) : { title: "", date: "", readTime: "", description: "", img: "" });
    
    if (detailsObj) {
      setHeroData(detailsObj.hero || { title: "", category: "Patent Law", date: "", readTime: "", author: "", authorTitle: "", authorImage: "", badge: "" });
      setContent(detailsObj.content || { intro: "", sections: [] });
    } else {
      setHeroData({
        title: card?.title || "",
        category: "Patent Law",
        date: card?.date || "",
        readTime: card?.readTime || "",
        author: "",
        authorTitle: "",
        authorImage: "",
        badge: ""
      });
      setContent({ intro: card?.description || "", sections: [] });
    }

    setDialogOpen(true);
  };

  const handleDelete = (slug: string) => {
    const newCards = blogCards.filter((c: any) => c.slug !== slug);
    const newDetails = blogDetails.filter((d: any) => d.slug !== slug);
    
    setDetails({
      ...details!,
      insightsPage: {
        ...details!.insightsPage,
        blogSection: {
          ...details!.insightsPage.blogSection!,
          pastWebinars: newCards
        },
        blogDetailsData: newDetails
      } as any
    });
  };

  const handleAuthorImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const res = reader.result as string;
      setHeroData({ ...heroData, authorImage: { src: res } });
      setErrors({ ...errors, 'heroData.authorImage': undefined });
    };
    reader.readAsDataURL(file);
  };

  const handleCardImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const res = reader.result as string;
      setCardData({ ...cardData, img: { src: res } });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      await blogSchema.validate({ cardData, heroData }, { abortEarly: false });
      setErrors({});
    } catch (err: any) {
      const validationErrors: any = {};
      err.inner.forEach((error: any) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      
      if (Object.keys(validationErrors).some(k => k.startsWith("cardData."))) {
        setActiveTab(0);
      } else if (Object.keys(validationErrors).some(k => k.startsWith("heroData."))) {
        setActiveTab(1);
      }
      return;
    }

    // Auto-generate slug from title
    const slugToUse = activeSlug || cardData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const finalCard = { 
      ...cardData, 
      id: cardData.id || Date.now(),
      slug: slugToUse 
    };

    const finalDetails = {
      slug: slugToUse,
      hero: {
        ...heroData,
        title: heroData.title || cardData.title,
        date: heroData.date || cardData.date,
        readTime: heroData.readTime || cardData.readTime,
      },
      content: content
    };

    let newCards = [...blogCards];
    let newDetails = [...blogDetails];

    if (activeSlug) {
      newCards = newCards.map((c: any) => c.slug === activeSlug ? finalCard : c);
      const detailsIdx = newDetails.findIndex((d: any) => d.slug === activeSlug);
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
        blogSection: {
          ...details!.insightsPage.blogSection!,
          upcoming: details?.insightsPage?.blogSection?.upcoming || [],
          pastWebinars: newCards
        },
        blogDetailsData: newDetails
      } as any
    });

    setDialogOpen(false);
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
    if (field === 'content') {
      const lines = val.split("\n").map(l => l.trim()).filter(Boolean);
      newSections[idx][field] = lines.length > 1 ? lines : val;
    } else {
      newSections[idx][field] = val;
    }
    setContent({ ...content, sections: newSections });
  };

  const getSectionContentString = (val: string | string[]) => {
    if (Array.isArray(val)) {
      return val.join("\n");
    }
    return val || "";
  };

  return (
    <AdminLayout title="Blogs Management">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Button variant="contained" startIcon={<Add />} onClick={handleOpenNew} sx={{ backgroundColor: COLORS.PRIMARY_GREEN, borderRadius: "50px" }}>
          Add Blog Entry
        </Button>
      </Box>

      <Grid container spacing={4}>
        {blogCards.map((blog: any, i: number) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={i} sx={{ display: 'flex' }}>
            <Card sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: 4, cursor: "pointer", transition: "all 0.2s", "&:hover": { transform: "translateY(-4px)", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" } }}>
              <CardContent onClick={() => handleEdit(blog.slug)} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ height: 120, mb: 2, borderRadius: 2, overflow: "hidden", display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.PRIMARY_BLUE }}>
                  {blog.img ? (
                    <img src={blog.img.src || blog.img} alt={blog.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <Typography sx={{ fontFamily: tradeGothic.style.fontFamily, fontWeight: 700, fontSize: 16, color: '#fff' }}>
                      No Image
                    </Typography>
                  )}
                </Box>
                <Typography variant="caption" sx={{ color: COLORS.PRIMARY_GREEN, fontWeight: 700, mb: 0.5 }}>
                  {blog.date} • {blog.readTime}
                </Typography>
                <Typography sx={{ fontFamily: tradeGothic.style.fontFamily, fontWeight: 700, fontSize: 16, color: COLORS.PRIMARY_BLUE }}>
                  {blog.title}
                </Typography>
              </CardContent>
              <Box sx={{ px: 2, pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                  /{blog.slug}
                </Typography>
                <IconButton color="error" size="small" onClick={(e) => { e.stopPropagation(); handleDelete(blog.slug); }}>
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
        PaperProps={{ sx: { borderRadius: 4, m: 2 } }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Typography variant="h5" sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
            {activeSlug ? "Edit Blog Entry" : "Add Blog Entry"}
          </Typography>
          <IconButton onClick={() => setDialogOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Tabs
            value={activeTab}
            onChange={(e, val) => setActiveTab(val)}
            sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
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
                <Typography variant="subtitle2" color="primary">Blog Listing Preview Settings</Typography>
                <TextField 
                  fullWidth 
                  label="Blog Title" 
                  value={cardData.title || ""} 
                  onChange={(e) => { setCardData({ ...cardData, title: e.target.value }); setErrors({ ...errors, 'cardData.title': undefined }); }} 
                  error={!!errors['cardData.title']}
                  helperText={errors['cardData.title']}
                />
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      fullWidth 
                      label="Date Published" 
                      value={cardData.date || ""} 
                      onChange={(e) => { setCardData({ ...cardData, date: e.target.value }); setErrors({ ...errors, 'cardData.date': undefined }); }} 
                      error={!!errors['cardData.date']}
                      helperText={errors['cardData.date'] || "e.g., September 2025"} 
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      fullWidth 
                      label="Read Time" 
                      value={cardData.readTime || ""} 
                      onChange={(e) => { setCardData({ ...cardData, readTime: e.target.value }); setErrors({ ...errors, 'cardData.readTime': undefined }); }} 
                      error={!!errors['cardData.readTime']}
                      helperText={errors['cardData.readTime'] || "e.g., 5 min"} 
                    />
                  </Grid>
                </Grid>
                <TextField 
                  fullWidth 
                  multiline 
                  rows={3} 
                  label="Listing Description" 
                  value={cardData.description || ""} 
                  onChange={(e) => { setCardData({ ...cardData, description: e.target.value }); setErrors({ ...errors, 'cardData.description': undefined }); }} 
                  error={!!errors['cardData.description']}
                  helperText={errors['cardData.description']}
                />
                <Box sx={{ border: "1px dashed #ccc", p: 2, borderRadius: 2, textAlign: 'center' }}>
                  {cardData.img ? (
                    <Box sx={{ mb: 2, height: 150, overflow: 'hidden', borderRadius: 2 }}>
                      <img src={cardData.img.src || cardData.img} alt="Preview" style={{ height: "100%", width: "auto", objectFit: "contain" }} />
                    </Box>
                  ) : (
                    <Box sx={{ mb: 2, py: 4, backgroundColor: '#eaeaea', borderRadius: 2 }}>
                      <Typography variant="caption">No Card Image Uploaded</Typography>
                    </Box>
                  )}
                  <input type="file" accept="image/*" style={{ display: 'none' }} id="card-photo-upload" onChange={(e) => e.target.files?.[0] && handleCardImageUpload(e.target.files[0])} />
                  <label htmlFor="card-photo-upload">
                    <Button variant="outlined" component="span" size="small">Upload Card Image</Button>
                  </label>
                </Box>
              </Stack>
            )}

            {/* Tab 1: Hero Settings */}
            {activeTab === 1 && (
              <Stack spacing={3}>
                <Typography variant="subtitle2" color="primary">Article Hero Banner Info</Typography>
                <TextField 
                  fullWidth 
                  label="Hero Banner Title (Defaults to Card Title if blank)" 
                  value={heroData.title || ""} 
                  onChange={(e) => setHeroData({ ...heroData, title: e.target.value })} 
                />
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      fullWidth 
                      label="Category" 
                      value={heroData.category || ""} 
                      onChange={(e) => { setHeroData({ ...heroData, category: e.target.value }); setErrors({ ...errors, 'heroData.category': undefined }); }} 
                      error={!!errors['heroData.category']}
                      helperText={errors['heroData.category'] || "e.g., Patent Law, Artificial Intelligence"} 
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      fullWidth 
                      label="Badge (Optional)" 
                      value={heroData.badge || ""} 
                      onChange={(e) => setHeroData({ ...heroData, badge: e.target.value })} 
                      helperText="e.g. Upcoming, Trending"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ border: "1px dashed #ccc", p: 2, borderRadius: 2, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                      {heroData.authorImage ? (
                        <Box sx={{ mb: 2, height: 100, width: 100, borderRadius: "50%", overflow: "hidden" }}>
                          <img src={heroData.authorImage.src || heroData.authorImage} alt="Author Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </Box>
                      ) : (
                        <Box sx={{ mb: 2, height: 100, width: 100, borderRadius: "50%", backgroundColor: '#eaeaea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Typography variant="caption">No Image</Typography>
                        </Box>
                      )}
                      <input type="file" accept="image/*" style={{ display: 'none' }} id="author-photo-upload" onChange={(e) => e.target.files?.[0] && handleAuthorImageUpload(e.target.files[0])} />
                      <label htmlFor="author-photo-upload">
                        <Button variant="outlined" component="span" size="small">Author Photo</Button>
                      </label>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 8 }}>
                    <Stack spacing={2}>
                      <TextField 
                        fullWidth 
                        label="Author Name" 
                        value={heroData.author || ""} 
                        onChange={(e) => { setHeroData({ ...heroData, author: e.target.value }); setErrors({ ...errors, 'heroData.author': undefined }); }} 
                        error={!!errors['heroData.author']}
                        helperText={errors['heroData.author']}
                      />
                      <TextField 
                        fullWidth 
                        label="Author Title" 
                        value={heroData.authorTitle || ""} 
                        onChange={(e) => { setHeroData({ ...heroData, authorTitle: e.target.value }); setErrors({ ...errors, 'heroData.authorTitle': undefined }); }} 
                        error={!!errors['heroData.authorTitle']}
                        helperText={errors['heroData.authorTitle']}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            )}

            {/* Tab 2: Content Body */}
            {activeTab === 2 && (
              <Stack spacing={3}>
                <Typography variant="subtitle2" color="primary">Article Text & Paragraphs</Typography>
                <TextField 
                  fullWidth 
                  multiline 
                  rows={4} 
                  label="Introductory Paragraph (Italicized top block)" 
                  value={content.intro || ""} 
                  onChange={(e) => setContent({ ...content, intro: e.target.value })} 
                />
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE }}>
                    Detailed Content Sections
                  </Typography>
                  <Button variant="outlined" startIcon={<Add />} onClick={handleAddSection} size="small">
                    Add Section
                  </Button>
                </Box>

                {content.sections.map((section: any, idx: number) => (
                  <Box key={idx} sx={{ p: 3, border: '1px solid rgba(0,0,0,0.1)', borderRadius: 2, backgroundColor: '#FAFAFA', position: 'relative' }}>
                    <IconButton 
                      color="error" 
                      onClick={() => handleRemoveSection(idx)} 
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                      size="small"
                    >
                      <Close fontSize="small" />
                    </IconButton>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                      <TextField 
                        fullWidth 
                        label={`Section ${idx + 1} Heading`} 
                        value={section.heading || ""} 
                        onChange={(e) => handleSectionChange(idx, 'heading', e.target.value)} 
                      />
                      <TextField 
                        fullWidth 
                        multiline 
                        rows={5} 
                        label={`Section ${idx + 1} Content (Tip: Use new lines for bullet points if this is a list)`} 
                        value={getSectionContentString(section.content)} 
                        onChange={(e) => handleSectionChange(idx, 'content', e.target.value)} 
                      />
                    </Stack>
                  </Box>
                ))}
              </Stack>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDialogOpen(false)} color="inherit">Cancel</Button>
          <Button onClick={handleSave} variant="contained" sx={{ backgroundColor: COLORS.PRIMARY_BLUE }}>
            Save Blog Entry
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
}
