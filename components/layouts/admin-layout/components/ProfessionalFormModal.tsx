import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { AddCircle, Close, RemoveCircle } from "@mui/icons-material";
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

interface ProfessionalFormModalProps {
  open: boolean;
  onClose: () => void;
  activeId: number | null;
  activeTab: number;
  setActiveTab: (val: number) => void;
  cardData: any;
  setCardData: (data: any) => void;
  bioData: any;
  setBioData: (data: any) => void;
  errors: any;
  setErrors: (errors: any) => void;
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
  activeTab,
  setActiveTab,
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

  const renderSectionEditor = (key: string, label: string) => {
    const data = bioData[key] || { paragraphs: "", bullets: [] };
    return (
      <Stack spacing={3}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Description Paragraphs</Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            placeholder="Enter description paragraphs here. Use a blank line (double enter) to separate paragraphs."
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
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} key={idx} alignItems={{ xs: "stretch", sm: "center" }}>
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
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth slotProps={{ paper: { sx: { m: { xs: 1, sm: 2 }, width: { xs: 'calc(100% - 16px)', sm: 'calc(100% - 64px)' }, maxHeight: { xs: 'calc(100% - 16px)', sm: 'calc(100% - 64px)' } } } }}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Typography component="div" variant="h5" sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
          {activeId ? "Edit Professional Profile" : "Add Professional Profile"}
        </Typography>
        <IconButton onClick={onClose} disabled={isSaving}>
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
          {activeTab === 0 && (
            <Stack spacing={4}>
              <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold' }}>Images & Identification</Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Box sx={{ border: "1px dashed #ccc", p: 2, borderRadius: 2, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                    <Typography variant="caption" sx={{ mb: 1, fontWeight: 'bold' }}>Card Image (profileImageUrl)</Typography>
                    {cardData.imageDownloadUrl || cardData.imageUrl ? (
                      <Box sx={{ position: 'relative', mb: 2, height: 120, width: 120 }}>
                        <Box sx={{ position: 'absolute', top: 0, right: 0, zIndex: 10, transform: 'translate(25%, -25%)' }}>
                          <IconButton size="small" color="error" onClick={() => handleDeleteImage("card")} sx={{ bgcolor: 'white', boxShadow: 1, '&:hover': { bgcolor: '#f5f5f5' } }}>
                            <Close fontSize="small" />
                          </IconButton>
                        </Box>
                        <Box sx={{ height: "100%", width: "100%", borderRadius: "50%", overflow: "hidden" }}>
                          <img src={cardData.imageDownloadUrl || (typeof cardData.imageUrl === 'string' ? cardData.imageUrl : cardData.imageUrl?.src)} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </Box>
                      </Box>
                    ) : (
                      <Box sx={{ mb: 2, height: 120, width: 120, borderRadius: "50%", backgroundColor: '#eaeaea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="caption">No Image</Typography>
                      </Box>
                    )}
                    <input type="file" accept="image/*" style={{ display: 'none' }} id="photo-upload-input-card" onChange={(e) => e.target.files?.[0] && handleUploadImage(e.target.files[0], "card")} />
                    <label htmlFor="photo-upload-input-card">
                      <Button variant="outlined" component="span" size="small" disabled={isUploadingCardImg}>
                        {isUploadingCardImg ? <CircularProgress size={20} /> : "Upload Photo"}
                      </Button>
                    </label>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Stack spacing={2} sx={{ height: '100%', justifyContent: 'center' }}>
                    <TextField fullWidth label="Full Name" value={cardData.name || ""} onChange={(e) => setCardData({ ...cardData, name: e.target.value })} error={!!errors.name} helperText={errors.name} />
                    <TextField fullWidth label="Designation (e.g., PARTNER)" value={cardData.designation || ""} onChange={(e) => setCardData({ ...cardData, designation: e.target.value })} error={!!errors.designation} helperText={errors.designation} />
                  </Stack>
                </Grid>
              </Grid>

              <Divider />
              <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold' }}>Contact Details</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Email Address" value={bioData.email || ""} onChange={(e) => setBioData({ ...bioData, email: e.target.value })} error={!!errors.email} helperText={errors.email} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Phone Number" value={bioData.phoneNumber || ""} onChange={(e) => setBioData({ ...bioData, phoneNumber: e.target.value })} error={!!errors.phoneNumber} helperText={errors.phoneNumber} />
                </Grid>
              </Grid>

              <Divider />
              <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold' }}>vCard Additional Details</Typography>
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

          {activeTab === 1 && renderSectionEditor("bio", "Biography")}
          {activeTab === 2 && renderSectionEditor("education", "Education & Credentials")}
          {activeTab === 3 && renderSectionEditor("admissions", "Admissions & Honors")}
          {activeTab === 4 && renderSectionEditor("articles", "Articles & Presentations")}
          {activeTab === 5 && renderSectionEditor("associations", "Professional Associations")}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit" disabled={isSaving}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" sx={{ backgroundColor: COLORS.PRIMARY_BLUE }} disabled={isSaving}>
          {isSaving ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : (activeId ? "Update Changes" : "Save Changes")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
