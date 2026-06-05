"use client";

import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { BlogControllers } from "@/api/blogControllers";
import { useLoading } from "@/components/providers/LoadingProvider";

const BlogSection = () => {
  const { details } = usePageData();
  const pathname = usePathname();
  const { startLoading, stopLoading } = useLoading();
  const blogSection = details?.insightsPage?.blogSection;

  const [pastWebinars, setPastWebinars] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        startLoading();
        const res = await BlogControllers.getAllBlogs({ limit: 100 });
        let allBlogs = res.data?.data?.data || res.data?.data || [];
        const totalPages = res.data?.data?.meta?.totalPages || res.data?.meta?.totalPages || 1;
        
        if (totalPages > 1) {
          const promises = [];
          for (let i = 2; i <= totalPages; i++) {
            promises.push(BlogControllers.getAllBlogs({ page: i, limit: 100 }));
          }
          const results = await Promise.all(promises);
          results.forEach(r => {
            allBlogs = [...allBlogs, ...(r.data?.data?.data || r.data?.data || [])];
          });
        }
        setPastWebinars(allBlogs);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      } finally {
        stopLoading();
      }
    };
    fetchBlogs();
  }, [startLoading, stopLoading]);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  const totalPages = Math.ceil(
    pastWebinars.length / cardsPerPage
  );

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  const currentBlogs = pastWebinars.slice(
    startIndex,
    endIndex
  );

  return (
    <Box sx={{ mb: { lg: 10, xs: 6 } }}>


      {/* Watch Past Webinars */}
      <Container maxWidth="lg" sx={{ mt: { lg: 12, xs: 8 } }}>
        <Typography
          component={motion.h2}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          sx={{
            fontSize: { lg: 42, md: 34, xs: 26 },
            fontWeight: 700,
            color: COLORS.PRIMARY_BLUE,
            mb: { lg: 6, xs: 4 },
          }}
        >
          {blogSection?.watchPastTitle || "Blogs"}
        </Typography>

        <Grid container spacing={4}>
          {currentBlogs.map((webinar, index) => (
            <Grid key={webinar.id} size={{ lg: 4, md: 6, xs: 12 }}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                sx={{ height: "100%" }}
              >
                <Link
                  href={pathname?.includes("/pages") || pathname?.includes("/manage-") ? "/pages/blogs" : `/blogs/${webinar.id}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    height: "100%",
                  }}
                >
                  <Card
                    sx={{
                      borderRadius: 3,
                      border: "1px solid #EAEAEA",
                      boxShadow: "0 5px 20px rgba(0,0,0,0.02)",
                      height: "100%",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                      transition:
                        "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: "0 15px 35px rgba(13, 95, 110, 0.1)",
                        borderColor: COLORS.PRIMARY_GREEN,
                      },
                    }}
                  >
                    <Box sx={{ overflow: "hidden", height: 240, backgroundColor: "#0D5F6E" }}>
                      {webinar.cardImageDownloadUrl || webinar.cardImageUrl ? (
                        <CardMedia
                          component="img"
                          image={webinar.cardImageDownloadUrl || webinar.cardImageUrl}
                          alt={webinar.title}
                          sx={{
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.5s ease",
                            "&:hover": { transform: "scale(1.1)" },
                          }}
                        />
                      ) : (
                        <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Typography color="white" fontWeight={700} fontSize={32}>{webinar.title?.charAt(0) || "B"}</Typography>
                        </Box>
                      )}
                    </Box>
                    <CardContent
                      sx={{
                        flex: 1,
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                        sx={{
                          mb: 2,
                          color: "rgba(13, 95, 110, 0.6)",
                          fontSize: 13,
                          fontWeight: 700,
                          textTransform: 'uppercase'
                        }}
                      >
                        <Typography
                          sx={{ fontSize: "inherit", fontWeight: "inherit" }}
                        >
                          {webinar.datePublished}
                        </Typography>
                        <Box
                          component="span"
                          sx={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            backgroundColor: COLORS.PRIMARY_GREEN,
                          }}
                        />
                        <Typography
                          sx={{ fontSize: "inherit", fontWeight: "inherit" }}
                        >
                          {webinar.readTime}
                        </Typography>
                      </Stack>
                      <Typography
                        sx={{
                          fontSize: 22,
                          fontWeight: 700,
                          color: COLORS.PRIMARY_BLUE,
                          lineHeight: 1.3,
                          mb: 1.5,
                        }}
                      >
                        {webinar.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 15,
                          color: "rgba(0, 0, 0, 0.6)",
                          lineHeight: 1.6,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          flex: 1,
                        }}
                      >
                        {webinar.listingDescription}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
          sx={{ mt: { lg: 10, xs: 6 } }}
        >
          <Typography
            onClick={() =>
              currentPage > 1 &&
              setCurrentPage(currentPage - 1)
            }
            sx={{
              cursor:
                currentPage === 1
                  ? "not-allowed"
                  : "pointer",
              fontWeight: 700,
              fontSize: 14,
              color: COLORS.PRIMARY_BLUE,
              opacity: currentPage === 1 ? 0.5 : 1,
              "&:hover": {
                opacity: currentPage === 1 ? 0.5 : 1,
              },
            }}
          >
            PREVIOUS
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            {Array.from({ length: totalPages }).map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  backgroundColor:
                    currentPage === index + 1
                      ? COLORS.PRIMARY_BLUE
                      : "transparent",
                  color:
                    currentPage === index + 1
                      ? "white"
                      : COLORS.PRIMARY_BLUE,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow:
                    currentPage === index + 1
                      ? "0 4px 10px rgba(13, 95, 110, 0.2)"
                      : "none",
                  "&:hover": {
                    backgroundColor:
                      currentPage === index + 1
                        ? COLORS.PRIMARY_BLUE
                        : "rgba(13, 95, 110, 0.05)",
                  },
                }}
              >
                {index + 1}
              </Box>
            ))}
          </Stack>

          <Typography
            onClick={() =>
              currentPage < totalPages &&
              setCurrentPage(currentPage + 1)
            }
            sx={{
              cursor:
                currentPage === totalPages
                  ? "not-allowed"
                  : "pointer",
              fontWeight: 700,
              fontSize: 14,
              color: COLORS.PRIMARY_BLUE,
              "&:hover": {
                color:
                  currentPage === totalPages
                    ? COLORS.PRIMARY_BLUE
                    : COLORS.PRIMARY_GREEN,
              },
            }}
          >
            NEXT
          </Typography>
        </Stack>
      </Container>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ mt: { lg: 15, xs: 10 } }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          sx={{
            borderRadius: 6,
            px: { lg: 10, md: 6, xs: 4 },
            py: { lg: 10, md: 8, xs: 6 },
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            background:
              "linear-gradient(135deg, #0D5F6E 0%, #24735F 50%, #73B72B 100%)",
            color: COLORS.WHITE,
            boxShadow: "0 20px 50px rgba(13, 95, 110, 0.2)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "-50%",
              right: "-10%",
              width: "50%",
              height: "200%",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
              transform: "rotate(25deg)",
              pointerEvents: "none",
            }}
          />

          <Typography
            sx={{
              fontSize: { lg: 48, md: 38, xs: 30 },
              fontWeight: 700,
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            {blogSection?.ctaTitle ||
              "Ready to Safeguard Your Innovation?"}
          </Typography>

          <Typography
            sx={{
              fontSize: { lg: 22, md: 20, xs: 18 },
              maxWidth: 850,
              mx: "auto",
              mb: { lg: 6, xs: 4 },
              opacity: 0.9,
              lineHeight: 1.6,
            }}
          >
            {blogSection?.ctaDescription ||
              "At Slater Matsil, our patent professionals provide strategic guidance to protect your intellectual property and support your long-term growth."}
          </Typography>

          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              px: { lg: 6, xs: 4 },
              py: 2.25,
              borderRadius: 3,
              backgroundColor: COLORS.WHITE,
              color: COLORS.PRIMARY_BLUE,
              fontWeight: 800,
              fontSize: 16,
              textTransform: "uppercase",
              letterSpacing: "1px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
                backgroundColor: COLORS.PRIMARY_BLUE,
                color: COLORS.WHITE,
              },
            }}
          >
            {blogSection?.ctaButtonText ||
              "SCHEDULE A CONSULTATION"}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BlogSection;