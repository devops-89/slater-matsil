import type { Metadata } from "next";
import BlogDetailsLayout from "@/components/layouts/blog-details-layout/Index";
import { Box } from "@mui/material";
import { BLOG_DETAILS_DATA } from "@/public/data/blog-details-data";
export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const blog = BLOG_DETAILS_DATA.find((item) => item.slug === slug);

  if (!blog) {
    return {
      title: "Blog Details | Slater Matsil",
      description: "Read our latest blog posts and articles.",
    };
  }

  const title = blog.hero?.title || "Blog Details";
  const desc = blog.content?.intro || "Read our latest blog posts and articles.";
  return {
    title: `${title} | Slater Matsil`,
    description: desc.length > 155 ? `${desc.slice(0, 155)}...` : desc,
  };
}

export default function BlogDetailPage() {
  return (
    <Box>
      <BlogDetailsLayout />
    </Box>
  );
}
