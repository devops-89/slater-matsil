"use client";

import { BlogControllers } from "@/api/blogControllers";
import { useLoading } from "@/components/providers/LoadingProvider";
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
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const BlogSection = () => {
  const { details, blogsPage, setBlogsPage } = usePageData();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startLoading, stopLoading } = useLoading();
  const blogSection = details?.insightsPage?.blogSection;

  const [pastWebinars, setPastWebinars] = useState<any[]>(
    blogSection?.pastWebinars || [],
  );

  useEffect(() => {
    if (blogSection?.pastWebinars && blogSection.pastWebinars.length > 0) {
      setPastWebinars(blogSection.pastWebinars);
    }
  }, [blogSection?.pastWebinars]);

  // PAGINATION
  const getInitialPage = () => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      const p = parseInt(pageParam, 10);
      if (!isNaN(p) && p > 0) return p;
    }
    if (blogsPage && blogsPage > 1) {
      return blogsPage;
    }
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("blogs_current_page");
      const sp = saved ? parseInt(saved, 10) : NaN;
      if (!isNaN(sp) && sp > 0) return sp;
    }
    return 1;
  };

  const [currentPage, setCurrentPage] = useState<number>(getInitialPage);
  const [totalPages, setTotalPages] = useState(1);
  const cardsPerPage = 6;

  // Sync with searchParams if user navigates with browser back/forward buttons
  useEffect(() => {
    const pageParam = searchParams.get("page");
    const target = pageParam ? parseInt(pageParam, 10) : 1;
    if (!isNaN(target) && target > 0 && target !== currentPage) {
      setCurrentPage(target);
      setBlogsPage(target);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("blogs_current_page", String(target));
      }
    }
  }, [searchParams]);

  // Also listen for native window popstate for immediate history navigation
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const pageParam = urlParams.get("page");
      const target = pageParam ? parseInt(pageParam, 10) : 1;
      if (!isNaN(target) && target > 0 && target !== currentPage) {
        setCurrentPage(target);
        setBlogsPage(target);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("blogs_current_page", String(target));
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [currentPage, setBlogsPage]);

  // Ensure URL reflects current page on initial load if restored from store/session
  useEffect(() => {
    if (currentPage > 1 && !searchParams.get("page") && typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("page", String(currentPage));
      window.history.replaceState(null, "", url.toString());
    }
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);
    setBlogsPage(newPage);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("blogs_current_page", String(newPage));
      const url = new URL(window.location.href);
      if (newPage === 1) {
        url.searchParams.delete("page");
      } else {
        url.searchParams.set("page", String(newPage));
      }
      window.history.pushState(null, "", url.toString());
      window.scrollTo({ top: 350, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        startLoading();
        const res = await BlogControllers.getAllBlogs({
          page: currentPage,
          limit: cardsPerPage,
        });
        const responseData = res.data?.data;
        const blogsList =
          responseData?.data ||
          (Array.isArray(responseData) ? responseData : []);
        const meta = responseData?.meta || res.data?.meta;

        let computedTotalPages = 1;
        if (meta?.totalPages) {
          computedTotalPages = meta.totalPages;
        } else if (meta?.itemCount) {
          computedTotalPages = Math.ceil(meta.itemCount / cardsPerPage);
        } else {
          computedTotalPages = Math.ceil(blogsList.length / cardsPerPage) || 1;
        }

        setPastWebinars(blogsList);
        setTotalPages(computedTotalPages);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      } finally {
        stopLoading();
      }
    };
    fetchBlogs();
  }, [currentPage, startLoading, stopLoading]);

  const currentBlogs =
    pastWebinars.length > cardsPerPage
      ? pastWebinars.slice(
          (currentPage - 1) * cardsPerPage,
          currentPage * cardsPerPage,
        )
      : pastWebinars;

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
          {blogSection?.watchPastTitle || "Blog"}
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
                  href={
                    pathname?.includes("/pages") ||
                    pathname?.includes("/manage-")
                      ? "/pages/blogs"
                      : `/blogs/${webinar.id}${currentPage > 1 ? `?page=${currentPage}` : ""}`
                  }
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
                    <Box
                      sx={{
                        overflow: "hidden",
                        height: 240,
                        backgroundColor: "#0D5F6E",
                      }}
                    >
                      {webinar.cardImageDownloadUrl || webinar.cardImageUrl ? (
                        <CardMedia
                          component="img"
                          image={
                            webinar.cardImageDownloadUrl || webinar.cardImageUrl
                          }
                          alt={webinar.title}
                          sx={{
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.5s ease",
                            "&:hover": { transform: "scale(1.1)" },
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            color="white"
                            fontWeight={700}
                            fontSize={32}
                          >
                            {webinar.title?.charAt(0) || "B"}
                          </Typography>
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
                          textTransform: "uppercase",
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
                          display: "block",
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
            onClick={() => handlePageChange(currentPage - 1)}
            sx={{
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
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
                onClick={() => handlePageChange(index + 1)}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  backgroundColor:
                    currentPage === index + 1
                      ? COLORS.PRIMARY_BLUE
                      : "transparent",
                  color:
                    currentPage === index + 1 ? "white" : COLORS.PRIMARY_BLUE,
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
            onClick={() => handlePageChange(currentPage + 1)}
            sx={{
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
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
            {blogSection?.ctaTitle || "Ready to Safeguard Your Innovation?"}
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

          <Link href="/contact" style={{ textDecoration: "none" }}>
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
              {blogSection?.ctaButtonText || "SCHEDULE A CONSULTATION"}
            </Box>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default BlogSection;
