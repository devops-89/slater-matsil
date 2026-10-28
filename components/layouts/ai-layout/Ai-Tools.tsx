"use client";

import HeadingStar from "@/components/widgets/Heading-star";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Chip, Container, Grid, Typography } from "@mui/material";
import { DescriptionOutlined, FindInPageOutlined, TaskAltOutlined } from "@mui/icons-material";
import React from "react";

const TOOL_ICONS = [
  <FindInPageOutlined key={0} sx={{ fontSize: 36, color: COLORS.PRIMARY_GREEN }} />,
  <DescriptionOutlined key={1} sx={{ fontSize: 36, color: COLORS.PRIMARY_GREEN }} />,
  <TaskAltOutlined key={2} sx={{ fontSize: 36, color: COLORS.PRIMARY_GREEN }} />,
];

const AiTools = () => {
  const { details } = usePageData();
  const tools = details?.aiPage?.toolsSection;

  const defaultItems = [
    {
      title: "Office Action Response.",
      description:
        "Our tools review each Office Action and the cited references and map every rejection against your claims. They also flag where the examiner’s reasoning may be most open to challenge. Your practitioner then decides which arguments and amendments best serve your goals.",
      tag: "Prosecution Strategy",
    },
    {
      title: "Application Drafting.",
      description:
        "Our drafting tool turns invention disclosures, drawings, and inventor notes into a structured starting point. The claims and the overall strategy always come from your practitioner, informed by the technology and your business.",
      tag: "Claim Drafting",
    },
    {
      title: "Filing Support.",
      description:
        "Our paralegal team uses custom-built tools to prepare and check each filing. These tools handle the routine work so that our staff can focus on the details that need a careful human eye.",
      tag: "Formalities & Quality",
    },
  ];

  const items = tools?.items?.length ? tools.items : defaultItems;

  return (
    <Box
      id="tools"
      sx={{
        py: { lg: 11, md: 9, xs: 7 },
        backgroundColor: COLORS.PRIMARY_BLUE,
        color: COLORS.WHITE,
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 7 } }}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 0.6,
                borderRadius: "50px",
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: COLORS.PRIMARY_GREEN,
                }}
              />
              <Typography
                sx={{
                  fontFamily: adelle.style.fontFamily,
                  fontSize: 13,
                  fontWeight: 600,
                  color: COLORS.PRIMARY_LIGHT_GREEN,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                {tools?.sectionTitle || "PROPRIETARY TECHNOLOGY"}
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="h2"
            sx={{
              fontSize: { lg: 40, md: 34, xs: 28 },
              fontFamily: tradeGothic.style.fontFamily,
              fontWeight: 700,
              color: COLORS.WHITE,
              mb: 2,
            }}
          >
            {tools?.heading || "Our Tools"}
          </Typography>

          <Typography
            sx={{
              fontSize: { lg: 18, xs: 15 },
              fontFamily: adelle.style.fontFamily,
              color: COLORS.FOOTER_TEXT_COLOR,
              maxWidth: 760,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            {tools?.description ||
              "Patent attorneys and agents built our tools around their own practice and the problems they solve every day."}
          </Typography>
        </Box>

        <Grid container spacing={{ lg: 4, xs: 3 }}>
          {items.map((tool, index) => (
            <Grid size={{ lg: 4, md: 4, xs: 12 }} key={index}>
              <Box
                sx={{
                  height: "100%",
                  p: { lg: 4.5, md: 3.5, xs: 3 },
                  borderRadius: 4,
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  backdropFilter: "blur(12px)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderColor: COLORS.PRIMARY_GREEN,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 3,
                  }}
                >
                  <Box
                    sx={{
                      width: 58,
                      height: 58,
                      borderRadius: "16px",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                    }}
                  >
                    {TOOL_ICONS[index % TOOL_ICONS.length]}
                  </Box>
                  {tool.tag && (
                    <Chip
                      label={tool.tag}
                      size="small"
                      sx={{
                        backgroundColor: "rgba(114, 181, 43, 0.18)",
                        color: COLORS.PRIMARY_LIGHT_GREEN,
                        border: "1px solid rgba(114, 181, 43, 0.35)",
                        fontFamily: tradeGothic.style.fontFamily,
                        fontWeight: 600,
                        fontSize: 12,
                      }}
                    />
                  )}
                </Box>

                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: tradeGothic.style.fontFamily,
                    fontSize: { lg: 24, xs: 20 },
                    fontWeight: 700,
                    color: COLORS.WHITE,
                    mb: 2,
                    lineHeight: "30px",
                  }}
                >
                  {tool.title}
                </Typography>

                <Typography
                  sx={{
                    fontFamily: adelle.style.fontFamily,
                    fontSize: { lg: 15, xs: 14 },
                    color: COLORS.FOOTER_TEXT_COLOR,
                    lineHeight: "25px",
                    flexGrow: 1,
                  }}
                >
                  {tool.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AiTools;
