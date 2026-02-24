"use client";

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { BLOG_DETAILS_DATA } from "@/public/data/blog-details-data";
import BlogDetailsHeroSection from "./BlogDetailsHeroSection";
import BlogDetailsContentSection from "./BlogDetailsContentSection";
import { BLOG_DETAIL_PROPS } from "@/utils/types";

import { motion } from "framer-motion";

const BlogDetailsLayout = () => {
  const { slug } = useParams();
  const [data, setData] = useState<BLOG_DETAIL_PROPS | null>(null);

  useEffect(() => {
    const blog = BLOG_DETAILS_DATA.find((item) => item.slug === slug);
    if (!blog) {
      // notFound(); // Should usually use notFound() but let's be careful with client components
      return;
    }
    setData(blog);
  }, [slug]);

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
