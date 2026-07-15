import { Box, Container, Typography, Stack, Avatar, Chip } from "@mui/material";
import { BLOG_DETAIL_PROPS } from "@/utils/types";
import { COLORS } from "@/utils/enum";
import { tradeGothic, adelle } from "@/utils/fonts";
import { CalendarMonth, AccessTime } from "@mui/icons-material";
import React from "react";

import { motion } from "framer-motion";

const BlogDetailsHeroSection = ({ data }: { data: BLOG_DETAIL_PROPS }) => {
  const { hero } = data;

  return (
    <Box
      sx={{
        backgroundColor: "#ECF8F8",
        pt: { lg: 12, xs: 8 },
        pb: { lg: 10, xs: 6 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Blur Elements */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(115, 183, 43, 0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Stack spacing={3} alignItems="flex-start">
          <Stack
            component={motion.div}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <Chip
              label={hero.category}
              sx={{
                backgroundColor: COLORS.PRIMARY_BLUE,
                color: "white",
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                fontSize: 14,
                textTransform: "uppercase",
                borderRadius: 1,
                px: 1,
              }}
            />
            {hero.badge && (
              <Chip
                label={hero.badge}
                variant="outlined"
                sx={{
                  borderColor: COLORS.PRIMARY_GREEN,
                  color: COLORS.PRIMARY_GREEN,
                  fontFamily: tradeGothic.style.fontFamily,
                  fontWeight: 700,
                  fontSize: 14,
                  textTransform: "uppercase",
                  borderRadius: 1,
                }}
              />
            )}
          </Stack>

          <Typography
            component={motion.h1}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            sx={{
              fontSize: { lg: 64, md: 52, xs: 36 },
              fontFamily: tradeGothic.style.fontFamily,
              fontWeight: 700,
              lineHeight: 1.1,
              color: COLORS.PRIMARY_BLUE,
              maxWidth: 900,
            }}
          >
            {hero.title}
          </Typography>

          <Stack
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 4 }}
            sx={{
              color: "rgba(13, 95, 110, 0.7)",
              fontFamily: adelle.style.fontFamily,
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <CalendarMonth fontSize="small" />
              <Typography>{hero.date}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTime fontSize="small" />
              <Typography>{hero.readTime} read</Typography>
            </Stack>
          </Stack>

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            sx={{ pt: 2 }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                src={typeof hero.authorImage === 'string' ? hero.authorImage : hero.authorImage?.src}
                sx={{
                  width: 64,
                  height: 64,
                  border: `2px solid ${COLORS.WHITE}`,
                }}
              />
              <Box>
                <Typography
                  sx={{
                    fontFamily: tradeGothic.style.fontFamily,
                    fontWeight: 700,
                    fontSize: 18,
                    color: COLORS.PRIMARY_BLUE,
                  }}
                >
                  {hero.author}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: adelle.style.fontFamily,
                    fontSize: 14,
                    color: "rgba(13, 95, 110, 0.6)",
                  }}
                >
                  {hero.authorTitle}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default BlogDetailsHeroSection;
