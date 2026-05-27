import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import { INSIGHTS_DATA_PROPS } from "@/utils/types";
import { ArrowForward, CallMade } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const InsightsCard = ({
  bgColor,
  category,
  title,
  slug,
}: INSIGHTS_DATA_PROPS) => {
  const pathname = usePathname();
  const isPreview = pathname?.includes("/pages") || pathname?.includes("/manage-");
  const linkHref = isPreview ? "/manage-insights" : `/insights/${slug}`;

  const cardContent = (
    <Box
      component={motion.div}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
          p: 4,
          transition: "box-shadow 0.3s ease",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          // Circular notch at top-right
          maskImage:
            "radial-gradient(circle at 100% 0%, transparent 55px, black 56px)",
          WebkitMaskImage:
            "radial-gradient(circle at 100% 0%, transparent 55px, black 56px)",
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
              fontSize: title.length > 150 ? 18 : 24,
              fontFamily: adelle.style.fontFamily,
              fontWeight: 600,
              lineHeight: 1.3,
              mb: 3,
              color: bgColor === COLORS.PRIMARY_BLUE ? COLORS.WHITE : "#14363F",
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
          top: -10,
          right: -10,
          width: 80,
          height: 80,
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
          sx={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            backgroundColor: COLORS.BLACK,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
          }}
        >
          <CallMade
            className="top-icon"
            sx={{
              color: COLORS.WHITE,
              fontSize: 20,
              transition: "color 0.3s ease",
            }}
          />
        </Box>
      </Box>
    </Box>
  );

  if (slug) {
    return (
      <Link href={linkHref} style={{ textDecoration: "none" }}>
        {cardContent}
      </Link>
    );
  }
  return cardContent;
};

export default InsightsCard;
