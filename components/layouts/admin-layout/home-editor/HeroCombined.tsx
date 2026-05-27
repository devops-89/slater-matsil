import slider4 from "@/public/images/home/slider/slider4.jpg";
import slider5 from "@/public/images/home/slider/slider5.jpg";
import slider6 from "@/public/images/home/slider/slider6.jpg";
import React from "react";
import { Box, Button, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import { Delete, Upload } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";


export const HeroCombined = ({ banners, onChange }: { banners: any; onChange: (newData: any) => void }) => {
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
  
  const safeBanners = Array.isArray(banners) && banners.length > 0 ? banners : defaultBanners;

  const handleImageUpload = (idx: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newBanners = [...safeBanners];
      newBanners[idx] = { ...newBanners[idx], image: reader.result as string };
      onChange(newBanners);
    };
    reader.readAsDataURL(file);
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
                  <Button component="label" variant="outlined" startIcon={<Upload />} size="small" sx={{ color: COLORS.PRIMARY_BLUE }}>
                    Upload Image
                    <input type="file" hidden accept="image/*" onChange={(e) => handleImageUpload(idx, e)} />
                  </Button>
                </Box>

                <Box sx={{ mt: 2, position: "relative", width: 96, height: 96, borderRadius: 1, overflow: "hidden", border: "1px solid #ddd" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={banner.image || defaultBanners[idx]?.image} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => {
                      const newBanners = [...safeBanners];
                      newBanners[idx] = { ...newBanners[idx], image: "" };
                      onChange(newBanners);
                    }}
                    sx={{ position: "absolute", top: 2, right: 2, backgroundColor: "rgba(255,255,255,0.8)", padding: "2px", "&:hover": { backgroundColor: "white" } }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

            </Stack>
          </Box>
        </Box>
      ))}
    </Stack>
  );
};

