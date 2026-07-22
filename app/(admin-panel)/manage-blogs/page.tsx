import BlogsAdminLayout from "@/components/layouts/admin-layout/BlogsAdminLayout";
export const revalidate = 60;

export default function ManageBlogsPage() {
  return <BlogsAdminLayout />;
}
