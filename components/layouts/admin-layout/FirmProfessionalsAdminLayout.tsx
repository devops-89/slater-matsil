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
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import { Add, Close, Delete, AddCircle, RemoveCircle } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { usePageData } from "@/store/usePageData";
import * as Yup from "yup";
import { PROFESSIONAL_DETAILS_DATA } from "@/public/data/professionals-details-data";

export default function FirmProfessionalsAdminLayout() {
  const { details, setDetails } = usePageData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [errors, setErrors] = useState<any>({});

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Full Name is required"),
    designation: Yup.string().required("Designation is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
  });

  // Form states
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

  const professionalCards = details?.firm_professionals?.PROFESSIONAL_LIST_PROPS || [];

  const parseBioProps = (arr?: any[]) => {
    if (!arr || !arr.length) return { paragraphs: "", bullets: [] };
    const descriptions = arr.map(x => x.description).filter(Boolean);
    let bullets: any[] = [];
    arr.forEach(x => {
      if (x.list) {
        bullets = [...bullets, ...x.list];
      }
    });
    return {
      paragraphs: descriptions.join("\n\n"),
      bullets: bullets.map(b => ({ label: b.label || "", href: b.href || "" }))
    };
  };

  const handleOpenNew = () => {
    setActiveSlug(null);
    setActiveTab(0);
    setCardData({ name: "", designation: "", slug: "", img: "" });
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
    setDialogOpen(true);
  };

  const handleEdit = (slug: string) => {
    setActiveSlug(slug);
    setActiveTab(0);
    const card = professionalCards.find(c => c.slug === slug);
    const bio = PROFESSIONAL_DETAILS_DATA.find(b => b.slug === slug);

    setCardData(card ? JSON.parse(JSON.stringify(card)) : { name: "", designation: "", slug: "", img: "" });

    const detailsHero = bio?.professionals_Details_HeroSection as any || {};
    const vCard = detailsHero.vCardData || {};
    const address = vCard.address || {};

    setBioData({
      email: detailsHero.email || "",
      phoneNumber: detailsHero.phoneNumber || "",
      vCard: {
        job_title: vCard.job_title || "",
        street: address.street || "",
        city: address.city || "",
        state: address.state || "",
        postalCode: address.postalCode || "",
        countryRegion: address.countryRegion || ""
      },
      bio: parseBioProps(bio?.PROFESSIONAL_BIO_DATA),
      education: parseBioProps(bio?.PROFESSIONAL_EDUCATION_DATA),
      admissions: parseBioProps(bio?.PROFESSIONAL_ADMISSIONS_DATA),
      articles: parseBioProps(bio?.PROFESSIONAL_ARTICLES_DATA),
      associations: parseBioProps(bio?.PROFESSIONAL_ASSOCIATIONS_DATA)
    });

    setErrors({});
    setDialogOpen(true);
  };

  const buildBioProps = (formData: { paragraphs: string; bullets: any[] }) => {
    const result: any[] = [];
    const paragraphs = formData.paragraphs.split("\n\n").map(p => p.trim()).filter(Boolean);

    if (paragraphs.length > 0) {
      paragraphs.forEach((p, idx) => {
        if (idx === paragraphs.length - 1 && formData.bullets.length > 0) {
          result.push({
            description: p,
            list: formData.bullets.map(b => ({
              label: b.label,
              ...(b.href ? { href: b.href } : {})
            }))
          });
        } else {
          result.push({ description: p });
        }
      });
    } else if (formData.bullets.length > 0) {
      result.push({
        list: formData.bullets.map(b => ({
          label: b.label,
          ...(b.href ? { href: b.href } : {})
        }))
      });
    }
    return result;
  };

  const handleSave = async () => {
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

    const slugToUse = cardData.slug || cardData.name.toLowerCase().replace(/\s+/g, '-');
    const finalCard = { ...cardData, slug: slugToUse };

    const finalBio = {
      slug: slugToUse,
      professionals_Details_HeroSection: {
        name: cardData.name,
        email: bioData.email,
        phoneNumber: bioData.phoneNumber,
        img: cardData.img,
        vCardData: {
          name: cardData.name,
          formattedName: cardData.name,
          electronicMail: bioData.email,
          telephoneNumber: bioData.phoneNumber,
          organization: "Slater Matsil",
          job_title: bioData.vCard?.job_title || "",
          address: {
            street: bioData.vCard?.street || "",
            city: bioData.vCard?.city || "",
            postalCode: bioData.vCard?.postalCode || "",
            countryRegion: bioData.vCard?.countryRegion || "",
            state: bioData.vCard?.state || ""
          },
          url: "",
          firstName: cardData.name.split(" ")[0] || "",
          lastName: cardData.name.split(" ").slice(1).join(" ") || ""
        }
      },
      PROFESSIONAL_BIO_DATA: buildBioProps(bioData.bio),
      PROFESSIONAL_EDUCATION_DATA: buildBioProps(bioData.education),
      PROFESSIONAL_ADMISSIONS_DATA: buildBioProps(bioData.admissions),
      PROFESSIONAL_ARTICLES_DATA: buildBioProps(bioData.articles),
      PROFESSIONAL_ASSOCIATIONS_DATA: buildBioProps(bioData.associations)
    };

    // Update global state for cards
    let newCards = [...professionalCards];
    if (activeSlug) {
      newCards = newCards.map(c => c.slug === activeSlug ? finalCard : c);
    } else {
      newCards.push(finalCard);
    }
    setDetails({
      ...details!,
      firm_professionals: {
        ...details!.firm_professionals,
        PROFESSIONAL_LIST_PROPS: newCards
      }
    });

    // Mutate global bio array
    if (activeSlug) {
      const idx = PROFESSIONAL_DETAILS_DATA.findIndex(b => b.slug === activeSlug);
      if (idx !== -1) {
        PROFESSIONAL_DETAILS_DATA[idx] = finalBio;
      }
    } else {
      PROFESSIONAL_DETAILS_DATA.push(finalBio);
    }

    setDialogOpen(false);
  };

  const handleDelete = (slug: string) => {
    const newCards = professionalCards.filter(c => c.slug !== slug);
    setDetails({
      ...details!,
      firm_professionals: {
        ...details!.firm_professionals,
        PROFESSIONAL_LIST_PROPS: newCards
      }
    });
    const idx = PROFESSIONAL_DETAILS_DATA.findIndex(b => b.slug === slug);
    if (idx !== -1) {
      PROFESSIONAL_DETAILS_DATA.splice(idx, 1);
    }
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const res = reader.result as string;
      setCardData({ ...cardData, img: res });
    };
    reader.readAsDataURL(file);
  };

  const handleAddBullet = (section: string) => {
    const updated = { ...bioData };
    updated[section].bullets.push({ label: "", href: "" });
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

  return (
    <AdminLayout title="Firm Professionals Management">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE }}>
          Professional Database
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleOpenNew} sx={{ backgroundColor: COLORS.PRIMARY_GREEN, borderRadius: "50px" }}>
          Add Professional
        </Button>
      </Box>

      <Grid container spacing={4}>
        {professionalCards.map((prof, i) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={i} sx={{ display: 'flex' }}>
            <Card sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: 4, cursor: "pointer", transition: "all 0.2s", "&:hover": { transform: "translateY(-4px)", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" } }}>
              <CardContent onClick={() => handleEdit(prof.slug)} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ height: 180, mb: 2, borderRadius: 2, overflow: 'hidden', backgroundColor: '#f0f0f0' }}>
                  <img src={typeof prof.img === 'string' ? prof.img : prof.img?.src} alt={prof.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
                <Typography sx={{ fontFamily: tradeGothic.style.fontFamily, fontWeight: 700, fontSize: 18, color: COLORS.PRIMARY_BLUE }}>
                  {prof.name}
                </Typography>
                <Typography sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.TEXT_PRIMARY_4, fontSize: 14, mt: 'auto' }}>
                  {prof.designation}
                </Typography>
              </CardContent>
              <Box sx={{ px: 2, pb: 2, textAlign: "right" }}>
                <IconButton color="error" size="small" onClick={(e) => { e.stopPropagation(); handleDelete(prof.slug); }}>
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* MUI Dialog Modal for editing/adding professionals */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Typography variant="h5" sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
            {activeSlug ? "Edit Professional Profile" : "Add Professional Profile"}
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
            <Tab label="General & vCard" />
            <Tab label="Biography" />
            <Tab label="Education" />
            <Tab label="Admissions" />
            <Tab label="Articles & Publications" />
            <Tab label="Associations" />
          </Tabs>

          <Box sx={{ minHeight: 350 }}>
            {/* Tab 0: General and vCard Data */}
            {activeTab === 0 && (
              <Stack spacing={3}>
                <Typography variant="subtitle2" color="primary">Card & Photo Details</Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ border: "1px dashed #ccc", p: 2, borderRadius: 2, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                      {cardData.img ? (
                        <Box sx={{ mb: 2, height: 120, width: 120, borderRadius: "50%", overflow: "hidden" }}>
                          <img src={typeof cardData.img === 'string' ? cardData.img : cardData.img.src} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </Box>
                      ) : (
                        <Box sx={{ mb: 2, height: 120, width: 120, borderRadius: "50%", backgroundColor: '#eaeaea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Typography variant="caption">No Image</Typography>
                        </Box>
                      )}
                      <input type="file" accept="image/*" style={{ display: 'none' }} id="photo-upload-input" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} />
                      <label htmlFor="photo-upload-input">
                        <Button variant="outlined" component="span" size="small">
                          Upload Photo
                        </Button>
                      </label>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 8 }}>
                    <Stack spacing={2}>
                      <TextField fullWidth label="Full Name" value={cardData.name || ""} onChange={(e) => setCardData({ ...cardData, name: e.target.value })} error={!!errors.name} helperText={errors.name} />
                      <TextField fullWidth label="Designation (e.g., PARTNER, PATENT AGENT)" value={cardData.designation || ""} onChange={(e) => setCardData({ ...cardData, designation: e.target.value })} error={!!errors.designation} helperText={errors.designation} />
                      <TextField fullWidth label="Slug (URL identifier, e.g., john-doe)" value={cardData.slug || ""} onChange={(e) => setCardData({ ...cardData, slug: e.target.value })} helperText="Leave blank to auto-generate" />
                    </Stack>
                  </Grid>
                </Grid>

                <Divider />
                <Typography variant="subtitle2" color="primary">Contact Details</Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="Email Address" value={bioData.email || ""} onChange={(e) => setBioData({ ...bioData, email: e.target.value })} error={!!errors.email} helperText={errors.email} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="Phone Number" value={bioData.phoneNumber || ""} onChange={(e) => setBioData({ ...bioData, phoneNumber: e.target.value })} error={!!errors.phoneNumber} helperText={errors.phoneNumber} />
                  </Grid>
                </Grid>

                <Divider />
                <Typography variant="subtitle2" color="primary">vCard Additional Details (Downloaded file)</Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="vCard Job Title" value={bioData.vCard?.job_title || ""} onChange={(e) => setBioData({ ...bioData, vCard: { ...bioData.vCard, job_title: e.target.value } })} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="Street Address" value={bioData.vCard?.street || ""} onChange={(e) => setBioData({ ...bioData, vCard: { ...bioData.vCard, street: e.target.value } })} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField fullWidth label="City" value={bioData.vCard?.city || ""} onChange={(e) => setBioData({ ...bioData, vCard: { ...bioData.vCard, city: e.target.value } })} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField fullWidth label="State" value={bioData.vCard?.state || ""} onChange={(e) => setBioData({ ...bioData, vCard: { ...bioData.vCard, state: e.target.value } })} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField fullWidth label="Postal Code" value={bioData.vCard?.postalCode || ""} onChange={(e) => setBioData({ ...bioData, vCard: { ...bioData.vCard, postalCode: e.target.value } })} />
                  </Grid>
                </Grid>
              </Stack>
            )}

            {/* Dynamic Rendering for Tab 1 to 5: Bio, Education, Admissions, Articles, Associations */}
            {activeTab === 1 && renderSectionEditor("bio", "Biography")}
            {activeTab === 2 && renderSectionEditor("education", "Education & Credentials")}
            {activeTab === 3 && renderSectionEditor("admissions", "Admissions & Honors")}
            {activeTab === 4 && renderSectionEditor("articles", "Articles & Presentations")}
            {activeTab === 5 && renderSectionEditor("associations", "Professional Associations")}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDialogOpen(false)} color="inherit">Cancel</Button>
          <Button onClick={handleSave} variant="contained" sx={{ backgroundColor: COLORS.PRIMARY_BLUE }}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );

  function renderSectionEditor(key: string, label: string) {
    const data = bioData[key] || { paragraphs: "", bullets: [] };
    return (
      <Stack spacing={3}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Description Paragraphs</Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            placeholder="Enter biography description paragraphs here. Use a blank line (double enter) to separate paragraphs."
            value={data.paragraphs || ""}
            onChange={(e) => handleParagraphChange(key, e.target.value)}
          />
        </Box>
        <Divider />
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Bullet List Items</Typography>
            <Button size="small" startIcon={<AddCircle />} onClick={() => handleAddBullet(key)}>
              Add Bullet
            </Button>
          </Box>
          <Stack spacing={2}>
            {data.bullets.map((bullet: any, idx: number) => (
              <Stack direction="row" spacing={2} key={idx} alignItems="center">
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
              <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic' }}>
                No bullet items added to this section yet.
              </Typography>
            )}
          </Stack>
        </Box>
      </Stack>
    );
  }
}
