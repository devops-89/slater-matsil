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
                <Stack key={idx} spacing={3}>
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
                      >
                        {item}
                      </Typography>
                    ))
                  ) : (
                    <Typography
                      sx={{
                        fontFamily: adelle.style.fontFamily,
                        fontSize: { xs: 18, md: 20 },
                        lineHeight: 1.7,
                        color: COLORS.TEXT_PRIMARY,
                        textAlign: "left",
                      }}
                    >
                      {section.content}
                    </Typography>
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
