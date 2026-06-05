import React from "react";
import { Card, CardMedia, CardContent, Typography, Stack, Box, IconButton, Grid } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";

interface BlogCardItemProps {
  blog: any;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function BlogCardItem({ blog, onEdit, onDelete }: BlogCardItemProps) {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }} sx={{ display: 'flex' }}>
      <Card
        onClick={() => onEdit(blog.id)}
        sx={{
          borderRadius: 4,
          boxShadow: "0 10px 30px rgba(13, 95, 110, 0.05)",
          overflow: "hidden",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          "&:hover": {
            transform: "translateY(-10px)",
            boxShadow: "0 15px 35px rgba(13, 95, 110, 0.1)",
            borderColor: COLORS.PRIMARY_GREEN,
          },
        }}
      >
        <Box sx={{ overflow: "hidden", height: 200, backgroundColor: "#0D5F6E" }}>
          {blog.cardImageDownloadUrl || blog.cardImageUrl ? (
            <CardMedia
              component="img"
              image={blog.cardImageDownloadUrl || blog.cardImageUrl}
              alt={blog.title}
              sx={{
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.5s ease",
                "&:hover": { transform: "scale(1.1)" },
              }}
            />
          ) : (
            <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="white" fontWeight={700} fontSize={32}>{blog.title?.charAt(0) || "B"}</Typography>
            </Box>
          )}
        </Box>
        <CardContent
          sx={{
            flex: 1,
            p: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{
              mb: 2,
              color: "rgba(13, 95, 110, 0.6)",
              fontSize: 12,
              fontWeight: 700,
              textTransform: 'uppercase'
            }}
          >
            <Typography sx={{ fontSize: "inherit", fontWeight: "inherit" }}>
              {blog.datePublished}
            </Typography>
            <Box component="span" sx={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: COLORS.PRIMARY_GREEN }} />
            <Typography sx={{ fontSize: "inherit", fontWeight: "inherit" }}>
              {blog.readTime}
            </Typography>
          </Stack>
          <Typography sx={{ fontSize: 18, fontWeight: 700, color: COLORS.PRIMARY_BLUE, lineHeight: 1.3, mb: 1.5 }}>
            {blog.title}
          </Typography>
          <Typography sx={{ fontSize: 14, color: "rgba(0, 0, 0, 0.6)", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", flex: 1 }}>
            {blog.listingDescription}
          </Typography>

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <IconButton color="error" size="small" onClick={(e) => { e.stopPropagation(); onDelete(blog.id); }}>
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
