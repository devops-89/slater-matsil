import React from "react";
import { Card, CardContent, Typography, Box, IconButton, Grid } from "@mui/material";
import { Delete } from "@mui/icons-material";
import Image from "next/image";
import { COLORS } from "@/utils/enum";
import { tradeGothic, adelle } from "@/utils/fonts";
import { PROFESSIONAL_API_ITEM } from "@/utils/types";

interface ProfessionalCardItemProps {
  prof: PROFESSIONAL_API_ITEM;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onImageLoad?: () => void;
}

export default function ProfessionalCardItem({ prof, onEdit, onDelete, onImageLoad }: ProfessionalCardItemProps) {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} sx={{ display: 'flex' }}>
      <Card
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRadius: 4,
          cursor: "pointer",
          transition: "all 0.2s",
          "&:hover": { transform: "translateY(-4px)", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" },
          position: 'relative'
        }}
      >
        <IconButton
          size="small"
          color="error"
          onClick={(e) => { e.stopPropagation(); onDelete(prof.id); }}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 10,
            bgcolor: 'rgba(255,255,255,0.8)',
            '&:hover': { bgcolor: 'white' }
          }}
        >
          <Delete fontSize="small" />
        </IconButton>
        <CardContent onClick={() => onEdit(prof.id)} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ height: 180, mb: 2, borderRadius: 2, overflow: 'hidden', backgroundColor: '#f0f0f0', position: 'relative' }}>
            {prof.img ? (
              <Image
                onLoad={onImageLoad}
                onError={onImageLoad}
                src={prof.img}
                alt={prof.name || "Professional Profile"}
                fill
                priority
                unoptimized
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="caption" color="textSecondary">No Image</Typography>
              </Box>
            )}
          </Box>
          <Typography sx={{ fontFamily: tradeGothic.style.fontFamily, fontWeight: 700, fontSize: 18, color: COLORS.PRIMARY_BLUE }}>
            {prof.name}
          </Typography>
          <Typography sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.TEXT_PRIMARY_4, fontSize: 14, mt: 'auto' }}>
            {prof.designation}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
