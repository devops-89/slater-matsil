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
  onDelete,
  onEdit,
}: INSIGHTS_DATA_PROPS & { onDelete?: (e?: any) => void; onEdit?: () => void }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isPreview = pathname?.includes("/pages") || pathname?.includes("/manage-");
  const linkHref = isPreview ? "/pages/insights" : `/insights/${slug}`;

  const cardContent = (
    <Box
      component={motion.div}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={(e) => {
        if (onEdit) {
          e.preventDefault();
          onEdit();
          return;
        }
        if (slug) {
          e.preventDefault();
          router.push(linkHref);
          window.scrollTo(0, 0);
        }
      }}
      sx={{
        position: "relative",
        cursor: "pointer",
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
          height: "347px",
          borderRadius: "20px",
          p: { xs: 3, sm: 4 },
          transition: "box-shadow 0.3s ease",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          // Circular notch at top-right
          maskImage:
            "radial-gradient(circle at 100% 0%, transparent 45px, black 46.5px)",
          WebkitMaskImage:
            "radial-gradient(circle at 100% 0%, transparent 45px, black 46.5px)",
        }}
      >
        <Box
          sx={{
            width: "fit-content",
            height: "36px",
            px: 3,
            borderRadius: "54px",
            backgroundColor: "#DFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: COLORS.BLACK,
            fontFamily: adelle.style.fontFamily,
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          {category}
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: { xs: 16, sm: title.length > 150 ? 18 : 24 },
              fontFamily: adelle.style.fontFamily,
              fontWeight: 600,
              lineHeight: 1.3,
              mb: 2,
              color: bgColor === COLORS.PRIMARY_BLUE ? COLORS.WHITE : "#14363F",
              display: { xs: "-webkit-box", md: "block" },
              WebkitLineClamp: { xs: 5, md: "unset" },
              WebkitBoxOrient: "vertical",
              overflow: { xs: "hidden", md: "visible" },
            }}
          >
            {title}
          </Typography>
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

      {/* Top Right Arrow Circle */}
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

  if (slug && !onEdit) {
    return (
      <Link href={linkHref} style={{ textDecoration: "none" }}>
        {cardContent}
      </Link>
    );
  }
  return cardContent;
};

export default InsightsCard;
