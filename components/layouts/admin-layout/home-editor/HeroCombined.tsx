import { MediaControllers } from "@/api/mediaControllers";
import { useNotification } from "@/components/providers/NotificationProvider";
import slider4 from "@/public/images/home/slider/slider4.webp";
import slider5 from "@/public/images/home/slider/slider5.webp";
import slider6 from "@/public/images/home/slider/slider6.webp";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { Delete, Upload } from "@mui/icons-material";
import { Box, Button, CircularProgress, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

export const HeroCombined = ({ banners, onChange, onDeleteMedia }: { banners: any; onChange: (newData: any) => void; onDeleteMedia?: (key: string) => void }) => {
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const [deletingIdx, setDeletingIdx] = useState<number | null>(null);
  const { showNotification } = useNotification();
  const defaultBanners = [
    {
      title: "Protecting the Ideas That Change the World.",
      description: "Partnering with the world’s leading innovators to protect their most valuable intellectual property and secure their competitive advantage globally. ",
      image: slider4.src,
    },
    {
      title: "Leadership for the Technologies of Tomorrow",
      description: "Strategic IP counsel for innovations derived from the world's largest R&D investments.",
      image: slider5.src,
    },
    {
      title: "IP Without Borders. Strategy Without Compromise.",
      description: "Delivering intellectual property solutions for clients across more than 50 countries.",
      image: slider6.src,
    },
  ];
  
  const safeBanners = defaultBanners.map((def: any, idx: number) => {
    const apiSlide = Array.isArray(banners) ? banners[idx] : null;
    return apiSlide ? { ...def, ...apiSlide } : def;
  });

  React.useEffect(() => {
    if (!banners || !Array.isArray(banners) || banners.length < 3) {
      onChange(defaultBanners);
    }
  }, [banners, onChange]);


  const handleImageUpload = async (idx: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploadingIdx(idx);
      const formData = new FormData();
      formData.append("image", file);
      
      const res = await MediaControllers.uploadMedia(formData);
      const responseData = res.data?.data?.data || res.data?.data;
      const uploadedUrl = responseData?.imgUrl || responseData?.videoUrl || responseData?.url;
      const uploadedKey = responseData?.key || uploadedUrl;
      if (uploadedUrl) {
        const newBanners = [...safeBanners];
        newBanners[idx] = { ...newBanners[idx], image: uploadedUrl, imageUrl: uploadedKey, imageDownloadUrl: uploadedUrl };
        delete newBanners[idx].key;
        onChange(newBanners);
        showNotification("Image uploaded successfully", "success");
      }
    } catch (error) {
      console.error("Failed to upload image", error);
      showNotification("Failed to upload image", "error");
    } finally {
      setUploadingIdx(null);
    }
  };

  return (
    <Stack spacing={6}>
      {safeBanners.map((banner: any, idx: number) => (
        <Box key={idx} sx={{ position: "relative", boxShadow: "0 10px 40px rgba(0,0,0,0.1)", borderRadius: 4, overflow: "hidden", backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.05)" }}>
          <Box sx={{ position: "absolute", top: 0, left: 0, zIndex: 10, backgroundColor: COLORS.PRIMARY_BLUE, color: COLORS.WHITE, px: 3, py: 1, borderBottomRightRadius: 16 }}>
            <Typography sx={{ fontFamily: tradeGothic.style.fontFamily, fontWeight: 700, fontSize: 16 }}>SLIDE {idx + 1}</Typography>
          </Box>
          <Box sx={{ p: 4 }}>
            <Stack spacing={3}>
              <TextField 
                fullWidth label="Title" value={banner.title || ""}
                onChange={(e) => {
                  const newBanners = [...safeBanners];
                  newBanners[idx] = { ...newBanners[idx], title: e.target.value };
                  onChange(newBanners);
                }}
              />
              <TextField 
                fullWidth label="Description" multiline rows={3} value={banner.description || ""}
                onChange={(e) => {
                  const newBanners = [...safeBanners];
                  newBanners[idx] = { ...newBanners[idx], description: e.target.value };
                  onChange(newBanners);
                }}
              />
              
              <Divider sx={{ my: 1 }} />

              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="subtitle2" color="text.secondary">Slide Image</Typography>
                  <Button component="label" variant="outlined" startIcon={uploadingIdx === idx ? <CircularProgress size={16} /> : <Upload />} size="small" sx={{ color: COLORS.PRIMARY_BLUE }} disabled={uploadingIdx === idx}>
                    {uploadingIdx === idx ? "Uploading..." : "Upload Image"}
                    <input type="file" hidden accept="image/*" onChange={(e) => handleImageUpload(idx, e)} />
                  </Button>
                </Box>

                <Box sx={{ mt: 2, position: "relative", width: 96, height: 96, borderRadius: 1, overflow: "hidden", border: "1px solid #ddd" }}>
                  {(banner.image && banner.image !== "deleted") || (banner.imageDownloadUrl && banner.imageDownloadUrl !== "deleted") ? (
                    <>
                      <Image 
                        src={banner.imageDownloadUrl || banner.image} 
                        alt="preview" 
                        fill 
                        unoptimized 
                        style={{ objectFit: "cover" }} 
                      />
                      
                      <IconButton
                        size="small"
                        color="error"
                        disabled={deletingIdx === idx}
                        onClick={async () => {
                          const imgToDelete = banner.image || defaultBanners[idx]?.image;
                          if (!imgToDelete) return;
                          
                          try {
                            setDeletingIdx(idx);
                            
                            let key = imgToDelete;
                            try {
                              const urlObj = new URL(imgToDelete);
                              key = decodeURIComponent(urlObj.pathname.substring(1));
                            } catch(e) {}

                            if (onDeleteMedia) {
                              onDeleteMedia(key);
                            }
                            
                            const newBanners = [...safeBanners];
                            newBanners[idx] = { ...newBanners[idx], imageUrl: "deleted", image: "deleted", imageDownloadUrl: "" };
                            delete newBanners[idx].key;
                            onChange(newBanners);
                            showNotification("Image removed from preview (Save to apply)", "info");
                          } catch (err) {
                            console.error("Failed to process image removal", err);
                            const newBanners = [...safeBanners];
                            newBanners[idx] = { ...newBanners[idx], imageUrl: "deleted", image: "deleted", imageDownloadUrl: "" };
                            delete newBanners[idx].key;
                            onChange(newBanners);
                          } finally {
                            setDeletingIdx(null);
                          }
                        }}
                        sx={{ position: "absolute", top: 2, right: 2, backgroundColor: "rgba(255,255,255,0.8)", padding: "2px", "&:hover": { backgroundColor: "white" } }}
                      >
                        {deletingIdx === idx ? <CircularProgress size={16} /> : <Delete fontSize="small" />}
                      </IconButton>
                    </>
                  ) : (
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
                      <Typography variant="caption" color="text.secondary">No Image</Typography>
                    </Box>
                  )}
                  {banner.image === "deleted" && (
                    <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5', zIndex: 10 }}>
                      <Typography variant="caption" color="text.secondary">No Image</Typography>
                    </Box>
                  )}
                </Box>
              </Box>

            </Stack>
          </Box>
        </Box>
      ))}
    </Stack>
  );
};

