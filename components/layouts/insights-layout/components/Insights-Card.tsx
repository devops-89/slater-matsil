"use client";

import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import { INSIGHTS_DATA_PROPS } from "@/utils/types";
import { ArrowForward, CallMade, Delete } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const InsightsCard = ({
  bgColor,
  category,
  title,
  slug,
  url,
  externalUrl,
  onDelete,
  onEdit,
}: INSIGHTS_DATA_PROPS & { onDelete?: (e?: any) => void; onEdit?: () => void }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isPreview = pathname?.includes("/pages") || pathname?.includes("/manage-");
  const rawUrl = (externalUrl || url)?.trim() || "";
  const isExternal = rawUrl.startsWith("http://") || rawUrl.startsWith("https://");
  const linkHref = isPreview ? "/pages/insights" : (rawUrl || `/insights/${slug}`);

  const cardContent = (
    <Box
      component={motion.div}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={(e) => {
        if (onEdit) {
          e.preventDefault();
          onEdit();
        }
      }}
      sx={{
        position: "relative",
        cursor: "pointer",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          "& .main-card": {
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          },
          "& .arrow-icon": {
            transform: "translateX(5px)",
          },
          "& .top-icon-box": {
            backgroundColor: COLORS.PRIMARY_BLUE,
            transform: "rotate(45deg) scale(1.1)",
          },
          "& .top-icon": {
            color: COLORS.WHITE,
          },
        },
      }}
    >
      <Box
        className="main-card"
        sx={{
          backgroundColor: bgColor,
          height: "360px",
          minHeight: "360px",
          width: "100%",
          borderRadius: "20px",
          p: { xs: 2.5, sm: 3 },
          transition: "box-shadow 0.3s ease",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
          overflow: "hidden",
          // Circular notch at top-right
          maskImage:
            "radial-gradient(circle at 100% 0%, transparent 45px, black 46.5px)",
          WebkitMaskImage:
            "radial-gradient(circle at 100% 0%, transparent 45px, black 46.5px)",
        }}
      >
        {/* Top: Category Pill with right clearance for the notch */}
        <Box sx={{ pr: 6, flexShrink: 0 }}>
          <Box
            sx={{
              width: "fit-content",
              height: "32px",
              px: 2.5,
              borderRadius: "54px",
              backgroundColor: "#DFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: COLORS.BLACK,
              fontFamily: adelle.style.fontFamily,
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {category}
          </Box>
        </Box>

        {/* Center: Title with dynamic scaling and line clamp */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            my: 1.5,
            overflow: "hidden",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 15,
                sm: title.length > 110 ? 16 : title.length > 70 ? 18 : 20,
                xl: title.length > 110 ? 17 : title.length > 70 ? 19 : 22,
              },
              fontFamily: adelle.style.fontFamily,
              fontWeight: 600,
              lineHeight: 1.35,
              color: bgColor === COLORS.PRIMARY_BLUE ? COLORS.WHITE : "#14363F",
              display: "-webkit-box",
              WebkitLineClamp: 5,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              wordBreak: "normal",
              overflowWrap: "break-word",
            }}
          >
            {title}
          </Typography>
        </Box>

        {/* Bottom: Learn More */}
        <Box sx={{ pt: 0.5, flexShrink: 0 }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            className="arrow-icon"
            sx={{
              color:
                bgColor === COLORS.PRIMARY_BLUE
                  ? COLORS.WHITE
                  : COLORS.PRIMARY_BLUE,
              transition: "transform 0.3s ease",
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                fontFamily: adelle.style.fontFamily,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Learn More
            </Typography>
            <ArrowForward sx={{ fontSize: 18 }} />
          </Stack>
        </Box>
      </Box>

      {/* Top Right Action Circle */}
      <Box
        sx={{
          position: "absolute",
          top: -8,
          right: -8,
          width: 65,
          height: 65,
          backgroundColor: COLORS.WHITE,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        <Box
          className="top-icon-box"
          onClick={(e) => {
            if (onDelete) {
              e.preventDefault();
              e.stopPropagation();
              onDelete(e);
            }
          }}
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: onDelete ? "red" : COLORS.BLACK,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            cursor: onDelete ? "pointer" : "inherit",
          }}
        >
          {onDelete ? (
            <Delete
              className="top-icon"
              sx={{
                color: COLORS.WHITE,
                fontSize: 20,
                transition: "color 0.3s ease",
              }}
            />
          ) : (
            <CallMade
              className="top-icon"
              sx={{
                color: COLORS.WHITE,
                fontSize: 20,
                transition: "color 0.3s ease",
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );

  if ((slug || rawUrl) && !onEdit) {
    if (isExternal) {
      return (
        <a
          href={linkHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit", display: "block", width: "100%", height: "100%" }}
        >
          {cardContent}
        </a>
      );
    }
    return (
      <Link href={linkHref} style={{ textDecoration: "none", display: "block", width: "100%", height: "100%" }}>
        {cardContent}
      </Link>
    );
  }
  return cardContent;
};

export default InsightsCard;
