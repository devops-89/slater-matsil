import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import { INSIGHTS_DATA_PROPS } from "@/utils/types";
import { ArrowForward, CallMade } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { motion } from "framer-motion";

const InsightsCard = ({ bgColor, category, title, slug }: INSIGHTS_DATA_PROPS) => {
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
          borderRadius: "10px",
          p: 3,
          transition: "box-shadow 0.3s ease",
        }}
      >
        <Box
          sx={{
            width: "72px",
            height: "26px",
            padding: "10px",
            borderRadius: "54px",
            backgroundColor: category ? "#DFFFFF" : "",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: COLORS.BLACK,
            fontFamily: adelle.style.fontFamily,
            fontWeight: 600,
            fontSize: 14,
            textTransform: "capitalize",
          }}
        >
          {category}
        </Box>
        <Box sx={{ height: "90%", display: "grid", alignItems: "end" }}>
          <Box>
            <Typography
              sx={{
                fontSize: 20,
                fontFamily: adelle.style.fontFamily,
                fontWeight: 500,
                color:
                  bgColor === COLORS.PRIMARY_BLUE ? COLORS.WHITE : COLORS.BLACK,
              }}
            >
              {title}
            </Typography>
            <Button
              className="arrow-icon"
              sx={{
                color:
                  bgColor === COLORS.PRIMARY_BLUE
                    ? COLORS.WHITE
                    : COLORS.PRIMARY_BLUE,
                fontSize: 16,
                fontFamily: adelle.style.fontFamily,
                fontWeight: 500,
                mt: 3,
                transition: "transform 0.3s ease",
              }}
              endIcon={<ArrowForward />}
            >
              Learn More
            </Button>
          </Box>
        </Box>
      </Box>
      <Stack
        sx={{
          position: "absolute",
          top: -5,
          right: -10,
          backgroundColor: COLORS.WHITE,
          borderRadius: 6,
          padding: "10px",
        }}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box
          className="top-icon-box"
          sx={{
            width: 20,
            height: 20,
            padding: "13px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            aspectRatio: "20/20",
            borderRadius: "50%",
            backgroundColor: COLORS.BLACK,
            transition: "all 0.3s ease",
          }}
        >
          <CallMade
            className="top-icon"
            sx={{ color: COLORS.WHITE, transition: "color 0.3s ease" }}
          />
        </Box>
      </Stack>
    </Box>
  );

  if (slug) {
    return (
      <Link href={`/insights/${slug}`} style={{ textDecoration: "none" }}>
        {cardContent}
      </Link>
    );
  }
  return cardContent;
};

export default InsightsCard;
