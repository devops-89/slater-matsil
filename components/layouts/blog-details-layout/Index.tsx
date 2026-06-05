"use client";

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { BLOG_DETAIL_PROPS } from "@/utils/types";
import { BlogControllers } from "@/api/blogControllers";
import { useLoading } from "@/components/providers/LoadingProvider";
import BlogDetailsHeroSection from "./BlogDetailsHeroSection";
import BlogDetailsContentSection from "./BlogDetailsContentSection";

import { motion } from "framer-motion";

const BlogDetailsLayout = () => {
  const { id } = useParams();
  const { startLoading, stopLoading } = useLoading();
  const [data, setData] = useState<BLOG_DETAIL_PROPS | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      try {
        startLoading();
        const res = await BlogControllers.getBlogById(id as string);
        const blog = res.data?.data?.data || res.data?.data;
        if (!blog) {
          // notFound();
          return;
        }

        const mappedData: any = {

          hero: {
            title: blog.heroTitle || blog.title,
            category: blog.category,
            date: blog.datePublished,
            readTime: blog.readTime,
            author: blog.authorName,
            authorTitle: blog.authorTitle,
            authorImage: blog.downloadAuthorImageUrl || blog.authorImageDownloadUrl || blog.authorImageUrl,
            badge: blog.badge,
          },
          content: {
            intro: blog.introduction,
            sections: blog.sections
          }
        };

        setData(mappedData);
      } catch (err) {
        console.error("Failed to fetch blog details", err);
      } finally {
        stopLoading();
      }
    };

    fetchBlog();
  }, [id, startLoading, stopLoading]);

  if (!data)
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Simple loader or empty state */}
      </Box>
    );

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      sx={{ bgcolor: "white", minHeight: "100vh" }}
    >
      <BlogDetailsHeroSection data={data} />
      <BlogDetailsContentSection data={data} />
    </Box>
  );
};

export default BlogDetailsLayout;
