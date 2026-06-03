import React from "react";
import { Box, Stack, TextField, Typography, Divider, Button } from "@mui/material";
import { Upload } from "@mui/icons-material";
import { adelle } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";
import { FaLinkedinIn, FaTwitter, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { MenuItem, Select, FormControl, InputLabel, IconButton as MuiIconButton } from "@mui/material";
import { Delete, Add } from "@mui/icons-material";

const handleFileUpload = (field: string, data: any, onChange: any, event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange({ ...data, [field]: reader.result });
    };
    reader.readAsDataURL(file);
  }
};

const ContactHeroEditor = ({ data, onChange, onDeleteMedia }: any) => {
  const { showNotification } = require("@/components/providers/NotificationProvider").useNotification();
  const [isUploading, setIsUploading] = React.useState(false);

  const handleChange = (field: string, value: string) => onChange({ ...data, [field]: value });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const { MediaControllers } = require("@/api/mediaControllers");
        const formData = new FormData();
        formData.append("image", file);
        const res = await MediaControllers.uploadMedia(formData);
        const responseData = res.data?.data?.data || res.data?.data;
        const uploadedUrl = responseData?.imgUrl || responseData?.videoUrl || responseData?.url;
        const uploadedKey = responseData?.key || uploadedUrl;
        
        if (uploadedUrl) {
          onChange({ 
            ...data, 
            img: uploadedUrl,
            imageUrl: uploadedKey,
            imageDownloadUrl: uploadedUrl,
            key: uploadedKey
          });
          showNotification("Image uploaded successfully", "success");
        }
      } catch (error) {
        showNotification("Failed to upload image", "error");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const removeHeroImage = () => {
    if (data?.key && onDeleteMedia) {
      onDeleteMedia(data.key);
    }
    
    onChange({ 
      ...data, 
      img: "",
      imageUrl: "",
      imageDownloadUrl: "",
      key: "" 
    });
    showNotification("Image removed from preview. Click Save Changes to delete it.", "info");
  };

  const srcUrl = data?.imageDownloadUrl || data?.imgUrl || data?.img || (typeof data?.img === 'string' ? data.img : data?.img?.src);

  return (
    <Stack spacing={3}>
      <TextField fullWidth label="Heading" value={data?.heading || ""} onChange={(e) => handleChange("heading", e.target.value)} />
      <TextField fullWidth multiline rows={3} label="Description" value={data?.description || ""} onChange={(e) => handleChange("description", e.target.value)} />
      <Box>
        <Typography variant="caption" display="block" gutterBottom>Hero Image</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-start' }}>
          {srcUrl && (
            <Box sx={{ width: 120, height: 80, borderRadius: 1, overflow: 'hidden', border: '1px solid #ddd', position: 'relative' }}>
              <img src={srcUrl} alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <MuiIconButton 
                size="small" 
                color="error" 
                onClick={removeHeroImage}
                sx={{ position: 'absolute', top: 2, right: 2, backgroundColor: 'rgba(255,255,255,0.8)', padding: '2px', '&:hover': { backgroundColor: 'white' } }}
              >
                <Delete fontSize="small" />
              </MuiIconButton>
            </Box>
          )}
          <Button component="label" variant="outlined" startIcon={<Upload />} size="small" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload New"}
            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

const ContactFormSectionEditor = ({ data, onChange }: any) => {
  const handleChange = (field: string, value: string) => onChange({ ...data, [field]: value });
  return (
    <Stack spacing={3}>
      <TextField fullWidth label="Heading 1" value={data?.heading1 || ""} onChange={(e) => handleChange("heading1", e.target.value)} />
      <TextField fullWidth label="Heading 2" value={data?.heading2 || ""} onChange={(e) => handleChange("heading2", e.target.value)} />
      <TextField fullWidth multiline rows={3} label="Description" value={data?.description || ""} onChange={(e) => handleChange("description", e.target.value)} />
    </Stack>
  );
};

const ContactCardEditor = ({ data, onChange }: any) => {
  const handleChange = (field: string, value: string) => onChange({ ...data, [field]: value });
  
  const handleCardDataChange = (index: number, value: string) => {
    const newData = [...(data?.contact_card_data || [])];
    if (newData[index]) {
      newData[index] = { ...newData[index], value };
      onChange({ ...data, contact_card_data: newData });
    }
  };

  return (
    <Stack spacing={3}>
      <TextField fullWidth label="Heading" value={data?.heading || ""} onChange={(e) => handleChange("heading", e.target.value)} />
      <TextField fullWidth label="Subtitle" value={data?.subTitle || ""} onChange={(e) => handleChange("subTitle", e.target.value)} />
      
      <Divider sx={{ my: 1 }} />
      <Typography variant="subtitle2" color="text.secondary">Contact Details</Typography>
      
      <TextField fullWidth multiline rows={2} label="Address" value={data?.contact_card_data?.[0]?.value || ""} onChange={(e) => handleCardDataChange(0, e.target.value)} />
      <TextField fullWidth label="Phone Number" value={data?.contact_card_data?.[1]?.value || ""} onChange={(e) => handleCardDataChange(1, e.target.value)} />
      <TextField fullWidth label="Email Address" value={data?.contact_card_data?.[2]?.value || ""} onChange={(e) => handleCardDataChange(2, e.target.value)} />
    </Stack>
  );
};

const AVAILABLE_ICONS = [
  { name: 'LinkedIn', component: FaLinkedinIn },
  { name: 'Twitter', component: FaTwitter },
  { name: 'Facebook', component: FaFacebookF },
  { name: 'Instagram', component: FaInstagram },
  { name: 'YouTube', component: FaYoutube },
];

const ContactFollowEditor = ({ data, onChange }: any) => {
  const handleChange = (field: string, value: string) => onChange({ ...data, [field]: value });
  
  const addSocialLink = () => {
    const currentLinks = data?.social_icons || [];
    onChange({ ...data, social_icons: [...currentLinks, { Icon: FaLinkedinIn, href: "" }] });
  };

  const removeSocialLink = (index: number) => {
    const currentLinks = [...(data?.social_icons || [])];
    currentLinks.splice(index, 1);
    onChange({ ...data, social_icons: currentLinks });
  };

  const updateSocialLink = (index: number, field: string, value: any) => {
    const currentLinks = [...(data?.social_icons || [])];
    currentLinks[index] = { ...currentLinks[index], [field]: value };
    onChange({ ...data, social_icons: currentLinks });
  };

  return (
    <Stack spacing={3}>
      <TextField fullWidth label="Title" value={data?.title || ""} onChange={(e) => handleChange("title", e.target.value)} />
      
      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle2" color="text.secondary">Social Links</Typography>
        <Button size="small" startIcon={<Add />} onClick={addSocialLink}>Add Link</Button>
      </Box>

      {data?.social_icons?.map((social: any, index: number) => {
         const currentIconName = AVAILABLE_ICONS.find(icon => icon.component === social.Icon || icon.component.name === social.Icon?.name)?.name || 'LinkedIn';
         
         return (
           <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center', p: 2, border: '1px solid #eee', borderRadius: 1 }}>
             <FormControl sx={{ minWidth: 150 }}>
               <InputLabel>Platform Icon</InputLabel>
               <Select
                 value={currentIconName}
                 label="Platform Icon"
                 onChange={(e) => {
                   const selected = AVAILABLE_ICONS.find(icon => icon.name === e.target.value);
                   updateSocialLink(index, 'Icon', selected?.component || FaLinkedinIn);
                 }}
               >
                 {AVAILABLE_ICONS.map((icon) => (
                   <MenuItem key={icon.name} value={icon.name}>{icon.name}</MenuItem>
                 ))}
               </Select>
             </FormControl>
             
             <TextField 
               fullWidth 
               label="URL Link" 
               value={social.href || ""} 
               onChange={(e) => updateSocialLink(index, 'href', e.target.value)} 
             />
             
             <MuiIconButton color="error" onClick={() => removeSocialLink(index)}>
               <Delete />
             </MuiIconButton>
           </Box>
         );
      })}
    </Stack>
  );
};

export const ContactPageForms = ({ activeSection, websiteData, updateContactPage, onDeleteMedia }: any) => {
  switch (activeSection) {
    case 0:
      return <ContactHeroEditor data={websiteData?.contactPage?.hero_section_data} onChange={(newData: any) => updateContactPage('hero_section_data', newData)} onDeleteMedia={onDeleteMedia} />;
    case 1:
      return <ContactFormSectionEditor data={websiteData?.contactPage?.form_section} onChange={(newData: any) => updateContactPage('form_section', newData)} />;
    case 2:
      return <ContactCardEditor data={websiteData?.contactPage?.contact_card_props} onChange={(newData: any) => updateContactPage('contact_card_props', newData)} />;
    case 3:
      return <ContactFollowEditor data={websiteData?.contactPage?.follow_props} onChange={(newData: any) => updateContactPage('follow_props', newData)} />;
    default:
      return <Typography sx={{ fontFamily: adelle.style.fontFamily }}>Select a section to edit.</Typography>;
  }
};
