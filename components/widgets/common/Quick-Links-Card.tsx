import { adelle, tradeGothic } from "@/utils/fonts";
import { QUICK_LINKS_CARD_PROPS } from "@/utils/types";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { COLORS } from "@/utils/enum";
const QuickLinksCard = ({ title, img, href }: QUICK_LINKS_CARD_PROPS) => {
  const content = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={2}
      sx={{
        transition: "all 0.3s ease",
        "&:hover": href
          ? {
              transform: "translateX(8px)",
              "& .title": { color: COLORS.PRIMARY_GREEN },
            }
          : {},
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15px",
          borderRadius: "4.87px",
          backgroundColor: "#ECF8F8",
          flexShrink: 0,
        }}
      >
        {img ? <Image src={img} alt={title || "link"} width={24} height={24} /> : null}
      </Box>
      <Typography
        className="title"
        sx={{
          fontSize: "14px",
          fontWeight: 700,
          color: COLORS.PRIMARY_BLUE,
          fontFamily: tradeGothic.style.fontFamily,
          transition: "color 0.3s ease",
        }}
      >
        {title}
      </Typography>
    </Stack>
  );

  if (href) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        {content}
      </Link>
    );
  }

  return <Box>{content}</Box>;
};

export default QuickLinksCard;
