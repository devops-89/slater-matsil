import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

interface LeaderCardProps {
  img: any;
  name: string;
  designation: string;
  slug?: string;
  email?: string;
  isAdmin?: boolean;
}

const LeaderCard = ({
  img,
  name,
  designation,
  slug,
  email,
  isAdmin = false,
}: LeaderCardProps) => {
  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: "4px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        backgroundColor: isAdmin ? COLORS.PRIMARY_LIGHT_GREEN : COLORS.WHITE,
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          pt: "100%",
          overflow: "hidden",
        }}
      >
        {img ? (
          <Image
            src={img}
            alt={name}
            fill
            unoptimized={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: "cover",
              objectPosition: "top center",
            }}
          />
        ) : null}
      </Box>
      <Box
        sx={{
          p: 2,
          backgroundColor: isAdmin ? "transparent" : COLORS.OFF_WHITE,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: isAdmin ? "center" : "flex-start",
          textAlign: isAdmin ? "center" : "left",
          borderBottom: !isAdmin
            ? `1px solid ${COLORS.PRIMARY_LIGHT_GREEN}`
            : "none",
        }}
      >
        <Typography
          sx={{
            fontSize: { lg: 20, xs: 16 },
            fontFamily: tradeGothic.style.fontFamily,
            fontWeight: 700,
            color: COLORS.PRIMARY_BLUE,
            mb: 0.5,
            textTransform: isAdmin ? "uppercase" : "none",
          }}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            fontSize: { lg: 14, xs: 12 },
            fontFamily: tradeGothic.style.fontFamily,
            fontWeight: 700,
            color: COLORS.PRIMARY_GREEN,
            mb: isAdmin ? 2 : 0,
            textTransform: "uppercase",
          }}
        >
          {designation}
        </Typography>
        {isAdmin && email && (
          <Button
            href={`mailto:${email}`}
            variant="contained"
            sx={{
              backgroundColor: COLORS.PRIMARY_GREEN,
              color: COLORS.WHITE,
              fontSize: "10px",
              fontWeight: 700,
              borderRadius: "0",
              px: 2,
              py: 0.5,
              textTransform: "uppercase",
              "&:hover": {
                backgroundColor: COLORS.PRIMARY_BLUE,
              },
            }}
          >
            SEND EMAIL »
          </Button>
        )}
      </Box>
    </Box>
  );

  if (slug) {
    return (
      <Link
        href={`/firm-professionals/professionals/${slug}`}
        style={{ textDecoration: "none" }}
      >
        {content}
      </Link>
    );
  }

  return content;
};

export default LeaderCard;
