import BlogLayout from "@/components/layouts/blog-layout/Index";
import React from "react";
export const revalidate = 60;

const BlogPage = () => {
  return (
    <div>
      <BlogLayout />
    </div>
  );
};

export default BlogPage;
