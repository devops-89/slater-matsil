import React from "react";
import { Box, Stack, TextField, Typography, Divider, Button, IconButton } from "@mui/material";
import { Delete, Upload } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";

import slide1 from "@/career/slider/slide1.jpg";
import slide2 from "@/career/slider/slide2.jpg";
import slide3 from "@/career/slider/slide3.jpg";
import slide10 from "@/career/slider/slider10.jpg";
import slide4 from "@/career/slider/slider4.jpg";
import slide5 from "@/career/slider/slider5.jpg";
import slide6 from "@/career/slider/slider6.jpg";
import slide8 from "@/career/slider/slider8.jpg";
import slide9 from "@/career/slider/slider9.jpg";

const DEFAULT_SLIDER_IMAGES = [
  slide1.src, slide2.src, slide3.src, slide4.src, 
  slide5.src, slide6.src, slide8.src, slide9.src, slide10.src
];

export function CareersHeroEditor({ data, onChange }: any) {
  const currentImages = (data?.carouselImages && data.carouselImages.length > 0) 
    ? data.carouselImages 
    : (data?.carouselImages === undefined ? DEFAULT_SLIDER_IMAGES : []);

  const handleChange = (field: string, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleCarouselUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newImages: string[] = [];
      let loaded = 0;
      Array.from(files).forEach((file, i) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages[i] = reader.result as string;
          loaded++;
          if (loaded === files.length) {
            onChange({ ...data, carouselImages: [...currentImages, ...newImages] });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeCarouselImage = (index: number) => {
    const updatedImages = [...currentImages];
    updatedImages.splice(index, 1);
    onChange({ ...data, carouselImages: updatedImages });
  };

  return (
    <Stack spacing={3}>
      {/* 1. Hero Title */}
      <TextField
        fullWidth
        label="Hero Title"
        value={data?.title || ""}
        onChange={(e) => handleChange("title", e.target.value)}
      />

      {/* 2. Short Description */}
      <TextField
        fullWidth
        label="Short Description"
        value={data?.shortDescription || ""}
        onChange={(e) => handleChange("shortDescription", e.target.value)}
      />

      <Divider sx={{ my: 1 }} />
      
      {/* 3. Image Carousel File Inputs & Preview */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle2" color="text.secondary">Carousel Images</Typography>
          <Button component="label" variant="outlined" startIcon={<Upload />} size="small" sx={{ color: COLORS.PRIMARY_BLUE }}>
            Add Images
            <input type="file" hidden accept="image/*" multiple onChange={handleCarouselUpload} />
          </Button>
        </Box>
        {currentImages.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
            {currentImages.map((img: any, i: number) => (
              <Box key={i} sx={{ position: 'relative', width: 80, height: 80, borderRadius: 1, overflow: 'hidden', border: '1px solid #ddd' }}>
                <img src={typeof img === 'string' ? img : img.src} alt={`Carousel ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <IconButton 
                  size="small" 
                  color="error" 
                  onClick={() => removeCarouselImage(i)}
                  sx={{ position: 'absolute', top: 2, right: 2, backgroundColor: 'rgba(255,255,255,0.8)', padding: '2px', '&:hover': { backgroundColor: 'white' } }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <Divider sx={{ my: 1 }} />

      {/* 4. Description */}
      <TextField
        fullWidth
        multiline
        rows={3}
        label="Description"
        value={data?.description || ""}
        onChange={(e) => handleChange("description", e.target.value)}
      />
    </Stack>
  );
}

