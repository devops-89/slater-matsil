import HeadingStar from "@/components/widgets/Heading-star";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { BLOG_DETAIL_PROPS } from "@/utils/types";
import { ArrowForward } from "@mui/icons-material";
import {
  Box,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";

const BlogDetailsContentSection = ({ data }: { data: BLOG_DETAIL_PROPS }) => {
  const { content, relatedPosts } = data;

  return (
    <Box sx={{ py: { lg: 10, xs: 6 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={8}>
          {/* Main Content */}
          <Grid
            size={{ lg: 8, xs: 12 }}
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              sx={{
                fontFamily: adelle.style.fontFamily,
                fontSize: { xs: 20, md: 24 },
                lineHeight: 1.6,
                color: COLORS.TEXT_PRIMARY_4,
                mb: 6,
                fontWeight: 500,
                fontStyle: "italic",
              }}
            >
              {content.intro}
            </Typography>

            <Stack spacing={6}>
              {content.sections.map((section, idx) => (
                <Stack key={idx} spacing={2.5}>
                  {section.heading && (
                    <Typography
                      variant="h3"
                      sx={{
                        fontFamily: tradeGothic.style.fontFamily,
                        fontSize: { xs: 22, md: 26 },
                        fontWeight: 700,
                        color: COLORS.PRIMARY_BLUE,
                        textAlign: "left",
                        lineHeight: 1.35,
                      }}
                    >
                      {section.heading}
                    </Typography>
                  )}
                  {Array.isArray(section.content) ? (
                    section.content.map((item, i) => (
                      <Typography
                        key={i}
                        sx={{
                          fontFamily: adelle.style.fontFamily,
                          fontSize: { xs: 18, md: 20 },
                          lineHeight: 1.7,
                          color: COLORS.TEXT_PRIMARY,
                          textAlign: "left",
                        }}
                        dangerouslySetInnerHTML={{ __html: item }}
                      />
                    ))
                  ) : (
                    (typeof section.content === "string" ? section.content.split(/\n+/).filter(Boolean) : [section.content]).map((item, i) => (
                      <Typography
                        key={i}
                        sx={{
                          fontFamily: adelle.style.fontFamily,
                          fontSize: { xs: 18, md: 20 },
                          lineHeight: 1.7,
                          color: COLORS.TEXT_PRIMARY,
                          textAlign: "left",
                        }}
                        dangerouslySetInnerHTML={{ __html: item }}
                      />
                    ))
                  )}

                  {/* Render Table if Present */}
                  {section.table && section.table.headers && section.table.headers.length > 0 && (
                    <Box
                      sx={{
                        my: 4,
                        width: "100%",
                        overflowX: "auto",
                        borderRadius: 3,
                        border: "1px solid #E2E8F0",
                        boxShadow: "0 4px 12px rgba(15, 23, 42, 0.05)",
                        bgcolor: "#FFFFFF",
                        "&::-webkit-scrollbar": { height: 6 },
                        "&::-webkit-scrollbar-thumb": { bgcolor: "#CBD5E1", borderRadius: 3 },
                      }}
                    >
                      <Box
                        component="table"
                        sx={{
                          width: "100%",
                          minWidth: { xs: 550, md: "100%" },
                          borderCollapse: "separate",
                          borderSpacing: 0,
                          textAlign: "left",
                          fontSize: { xs: 14, md: 16 },
                          fontFamily: adelle.style.fontFamily,
                        }}
                      >
                        <Box component="thead" sx={{ backgroundColor: "#F8FAFC" }}>
                          <Box component="tr">
                            {section.table.headers.map((header, hIdx) => (
                              <Box
                                key={hIdx}
                                component="th"
                                sx={{
                                  py: { xs: 1.75, md: 2.25 },
                                  px: { xs: 2, md: 2.5 },
                                  fontWeight: 700,
                                  fontFamily: tradeGothic.style.fontFamily,
                                  color: COLORS.PRIMARY_BLUE,
                                  fontSize: { xs: 14, md: 16 },
                                  letterSpacing: "0.02em",
                                  borderBottom: "2px solid #CBD5E1",
                                  borderRight: hIdx < section.table!.headers.length - 1 ? "1px solid #E2E8F0" : "none",
                                }}
                              >
                                {header || `Header ${hIdx + 1}`}
                              </Box>
                            ))}
                          </Box>
                        </Box>
                        <Box component="tbody">
                          {section.table.rows.map((row, rIdx) => (
                            <Box
                              key={rIdx}
                              component="tr"
                              sx={{
                                backgroundColor: rIdx % 2 === 0 ? "#FFFFFF" : "#F8FAFC",
                                "&:hover": { backgroundColor: "#F1F5F9" },
                                transition: "background-color 0.15s ease-in-out",
                              }}
                            >
                              {row.map((cell, cIdx) => (
                                <Box
                                  key={cIdx}
                                  component="td"
                                  sx={{
                                    py: { xs: 1.75, md: 2.25 },
                                    px: { xs: 2, md: 2.5 },
                                    color: cIdx === 0 ? COLORS.PRIMARY_BLUE : COLORS.TEXT_PRIMARY,
                                    fontWeight: cIdx === 0 ? 700 : 400,
                                    borderBottom: rIdx < section.table!.rows.length - 1 ? "1px solid #E2E8F0" : "none",
                                    borderRight: cIdx < row.length - 1 ? "1px solid #E2E8F0" : "none",
                                    whiteSpace: "pre-line",
                                    lineHeight: 1.6,
                                  }}
                                  dangerouslySetInnerHTML={{ __html: cell }}
                                />
                              ))}
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Stack>
              ))}
            </Stack>
          </Grid>

          {/* Sidebar */}
          <Grid
            size={{ lg: 4, xs: 12 }}
            component={motion.div}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Box
              sx={{
                position: "sticky",
                top: 120,
                p: 4,
                borderRadius: 4,
                backgroundColor: "#F9FBFB",
                border: "1px solid #E4EDED",
              }}
            >
              <Typography
                sx={{
                  fontFamily: tradeGothic.style.fontFamily,
                  fontWeight: 700,
                  fontSize: 24,
                  color: COLORS.PRIMARY_BLUE,
                  mb: 4,
                  textTransform: "uppercase",
                }}
              >
                Related Posts
              </Typography>

              <Stack spacing={4}>
                {relatedPosts?.map((post, i) => (
                  <Link
                    key={i}
                    href={`/blogs/${post.slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Stack
                      spacing={2}
                      sx={{
                        "&:hover .post-title": { color: COLORS.PRIMARY_GREEN },
                      }}
                    >
                      <Box
                        sx={{
                          height: 180,
                          borderRadius: 2,
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          component="img"
                          src={post.img.src}
                          alt={post.title}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.3s ease",
                            "&:hover": { transform: "scale(1.05)" },
                          }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          className="post-title"
                          sx={{
                            fontFamily: tradeGothic.style.fontFamily,
                            fontWeight: 700,
                            fontSize: 18,
                            color: COLORS.PRIMARY_BLUE,
                            lineHeight: 1.3,
                            mb: 1,
                            transition: "color 0.2s ease",
                          }}
                        >
                          {post.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: adelle.style.fontFamily,
                            fontSize: 14,
                            color: "rgba(13, 95, 110, 0.6)",
                          }}
                        >
                          {post.date}
                        </Typography>
                      </Box>
                    </Stack>
                  </Link>
                ))}
              </Stack>

              <Divider sx={{ my: 4 }} />

              <Box sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    fontFamily: adelle.style.fontFamily,
                    fontSize: 16,
                    fontWeight: 600,
                    color: COLORS.PRIMARY_BLUE,
                    mb: 2,
                  }}
                >
                  Want to stay updated?
                </Typography>
                <Link href="/contact" style={{ textDecoration: "none" }}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      color: COLORS.PRIMARY_GREEN,
                      fontFamily: tradeGothic.style.fontFamily,
                      fontWeight: 700,
                      fontSize: 14,
                      textTransform: "uppercase",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    <Typography>Contact Us</Typography>
                    <ArrowForward fontSize="small" />
                  </Stack>
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BlogDetailsContentSection;
