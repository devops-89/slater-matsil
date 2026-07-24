"use client";

import { useInsightDetails } from "@/store/useInsightDetails";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Share as ShareIcon,
} from "@mui/icons-material";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const InsightsDetailsHeroSection = () => {
  const { data } = useInsightDetails();
  const hero = data?.hero;
  const contact = data?.contact;

  if (!hero || !contact) return null;

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        pt: { xs: 3, md: 4 },
        pb: { xs: 4, md: 6 },
        background:
          "linear-gradient(to right, rgba(236, 248, 248, 0.9) 0%, rgba(244, 248, 236, 0.5) 50%, #fff 100%)",
      }}
    >
      {/* Subtle blur orbs (kept minimal so gradient shows) */}
      <Box
        sx={{
          position: "absolute",
          left: 72,
          top: 38,
          width: 302,
          height: 302,
          borderRadius: "200px",
          background: "rgba(13, 95, 110, 0.08)",
          filter: "blur(120px)",
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          right: 72,
          top: -19,
          width: 208,
          height: 208,
          borderRadius: "200px",
          background: "rgba(115, 183, 43, 0.15)",
          filter: "blur(120px)",
          display: { xs: "none", md: "block" },
        }}
      />

      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 8 }} justifyContent="center">
          {/* Main content: profile image + name block + badge */}
          <Grid size={12}>
            <Stack
              direction={{ xs: "column", lg: "row" }}
              spacing={{ xs: 5, md: 8 }}
              alignItems="center"
              justifyContent="center"
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 4, md: 6 }}
                alignItems="center"
                justifyContent="center"
              >
                {hero.profileImage ? (
                  <Box
                    sx={{
                      position: "relative",
                      width: { xs: 500, md: 400 },
                      height: { xs: 500, md: 400 },
                      flexShrink: 0,
                      borderRadius: "50%",
                      overflow: "hidden",
                      bgcolor: COLORS.PRIMARY_BLUE,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    }}
                  >
                    <Image
                      src={hero.profileImage}
                      alt={hero.name}
                      fill
                      style={{
                        objectFit: "contain",
                        objectPosition: "center",
                      }}
                      priority
                      unoptimized={true}
                    />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: { xs: 200, md: 280 },
                      height: { xs: 200, md: 280 },
                      flexShrink: 0,
                      borderRadius: "50%",
                      bgcolor: COLORS.PRIMARY_BLUE,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: tradeGothic.style.fontFamily,
                        fontWeight: 700,
                        fontSize: { xs: 56, md: 80 },
                        color: "white",
                        letterSpacing: "-2px",
                      }}
                    >
                      SM
                    </Typography>
                  </Box>
                )}
                <Stack
                  spacing={2}
                  sx={{
                    maxWidth: 500,
                    textAlign: { xs: "center", sm: "left" },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: tradeGothic.style.fontFamily,
                      fontWeight: 700,
                      fontSize: { xs: 28, md: 40 },
                      lineHeight: 1.1,
                      color: COLORS.PRIMARY_BLUE,
                    }}
                  >
                    {hero.name}
                  </Typography>
                  <Stack spacing={1}>
                    <Typography
                      sx={{
                        fontFamily: adelle.style.fontFamily,
                        fontWeight: 600,
                        fontSize: { xs: 18, md: 24 },
                        color: COLORS.TEXT_PRIMARY_4,
                      }}
                    >
                      {hero.band}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: adelle.style.fontFamily,
                        fontWeight: 500,
                        fontSize: { xs: 16, md: 22 },
                        color: COLORS.TEXT_PRIMARY_4,
                        opacity: 0.9,
                      }}
                    >
                      {hero.guide}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: adelle.style.fontFamily,
                        fontWeight: 500,
                        fontSize: { xs: 14, md: 20 },
                        color: COLORS.TEXT_PRIMARY_4,
                        opacity: 0.8,
                      }}
                    >
                      {hero.yearsRanked}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>

              {/* Ranking badge image */}
              {hero.badgeImage && (
                <Box
                  sx={{
                    width: { xs: 240, md: 360 },
                    height: { xs: 180, md: 280 },
                    position: "relative",
                    flexShrink: 0,
                    mt: { xs: 2, lg: 0 },
                  }}
                >
                  <Image
                    src={hero.badgeImage}
                    alt="Ranking badge"
                    fill
                    unoptimized={true}
                    style={{ objectFit: "contain" }}
                  />
                </Box>
              )}
            </Stack>
          </Grid>
        </Grid>

        {/* Contact row — single line, no scroll: Company | Email | Phone | Share + 4 social icons */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          sx={{
            mt: 5,
            gap: { xs: 2, sm: 2.5, md: 4 },
            overflow: "hidden",
          }}
        >
          {/* Company: circular logo (stylized S) + firm name + url */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{ minWidth: 0 }}
          >
            <Box
              sx={{
                width: 50,
                height: 50,
                minWidth: 50,
                borderRadius: "50%",
                bgcolor: COLORS.TEXT_PRIMARY_4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontFamily: tradeGothic.style.fontFamily,
                  fontWeight: 700,
                  fontSize: 22,
                  color: "white",
                }}
              >
                S
              </Typography>
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontFamily: adelle.style.fontFamily,
                  fontWeight: 600,
                  fontSize: { xs: 13, sm: 15, md: 22 },
                  color: COLORS.PRIMARY_BLUE,
                }}
              >
                {contact.firm}
              </Typography>
              <Typography
                component="a"
                href={`https://${contact.firmUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontFamily: adelle.style.fontFamily,
                  fontSize: { xs: 11, sm: 13, md: 18 },
                  color: COLORS.TEXT_PRIMARY_4,
                  textDecoration: "none",
                }}
              >
                {contact.firmUrl}
              </Typography>
            </Box>
          </Stack>

          {/* Email */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{ minWidth: 0 }}
          >
            <Box
              sx={{
                width: 50,
                height: 50,
                minWidth: 50,
                borderRadius: "50%",
                bgcolor: COLORS.TEXT_PRIMARY_4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EmailIcon sx={{ color: "white", fontSize: 24 }} />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontFamily: adelle.style.fontFamily,
                  fontWeight: 600,
                  fontSize: { xs: 13, sm: 15, md: 22 },
                  color: COLORS.PRIMARY_BLUE,
                }}
              >
                Email address
              </Typography>
              <Typography
                component="a"
                href={`mailto:${contact.email}`}
                sx={{
                  fontFamily: adelle.style.fontFamily,
                  fontSize: { xs: 11, sm: 13, md: 18 },
                  color: COLORS.TEXT_PRIMARY_4,
                  textDecoration: "none",
                }}
              >
                {contact.email}
              </Typography>
            </Box>
          </Stack>

          {/* Contact number */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{ minWidth: 0 }}
          >
            <Box
              sx={{
                width: 50,
                height: 50,
                minWidth: 50,
                borderRadius: "50%",
                bgcolor: COLORS.TEXT_PRIMARY_4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PhoneIcon sx={{ color: "white", fontSize: 24 }} />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontFamily: adelle.style.fontFamily,
                  fontWeight: 600,
                  fontSize: { xs: 13, sm: 15, md: 22 },
                  color: COLORS.PRIMARY_BLUE,
                }}
              >
                Contact number
              </Typography>
              <Typography
                component="a"
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                sx={{
                  fontFamily: adelle.style.fontFamily,
                  fontSize: { xs: 11, sm: 13, md: 18 },
                  color: COLORS.TEXT_PRIMARY_4,
                  textDecoration: "none",
                }}
              >
                {contact.phone}
              </Typography>
            </Box>
          </Stack>

          {/* Share + 4 social icons: X, LinkedIn, Facebook, Email */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{ minWidth: 0 }}
          >
            <Box
              sx={{
                width: 50,
                height: 50,
                minWidth: 50,
                borderRadius: "50%",
                bgcolor: COLORS.TEXT_PRIMARY_4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShareIcon sx={{ color: "white", fontSize: 24 }} />
            </Box>
            <Stack spacing={0.5}>
              <Typography
                sx={{
                  fontFamily: adelle.style.fontFamily,
                  fontWeight: 600,
                  fontSize: { xs: 13, sm: 15, md: 22 },
                  color: COLORS.PRIMARY_BLUE,
                }}
              >
                {contact.shareLabel}
              </Typography>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <IconButton
                  size="small"
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    bgcolor: "rgba(114, 181, 43, 0.8)",
                    color: "white",
                    "&:hover": { bgcolor: COLORS.PRIMARY_GREEN },
                  }}
                  onClick={() =>
                    window.open(
                      "https://twitter.com/intent/tweet?url=" +
                        encodeURIComponent(
                          typeof window !== "undefined"
                            ? window.location.href
                            : "",
                        ),
                      "_blank",
                    )
                  }
                  aria-label="Share on X (Twitter)"
                >
                  <FaXTwitter style={{ fontSize: 14 }} />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    bgcolor: "rgba(114, 181, 43, 0.8)",
                    color: "white",
                    "&:hover": { bgcolor: COLORS.PRIMARY_GREEN },
                  }}
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/sharing/share-offsite/?url=" +
                        encodeURIComponent(
                          typeof window !== "undefined"
                            ? window.location.href
                            : "",
                        ),
                      "_blank",
                    )
                  }
                  aria-label="Share on LinkedIn"
                >
                  <FaLinkedinIn style={{ fontSize: 14 }} />
                </IconButton>

                <IconButton
                  size="small"
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    bgcolor: "rgba(114, 181, 43, 0.8)",
                    color: "white",
                    "&:hover": { bgcolor: COLORS.PRIMARY_GREEN },
                  }}
                  onClick={() => {
                    const url =
                      typeof window !== "undefined" ? window.location.href : "";
                    const subject = encodeURIComponent(
                      data?.hero?.name || "Profile",
                    );
                    window.open(
                      `mailto:?subject=${subject}&body=${encodeURIComponent(url)}`,
                      "_blank",
                    );
                  }}
                  aria-label="Share via Email"
                >
                  <EmailIcon sx={{ fontSize: 14 }} />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default InsightsDetailsHeroSection;
