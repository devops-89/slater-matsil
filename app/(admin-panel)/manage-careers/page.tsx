import React from "react";
import ManageCareersAdminLayout from "@/components/layouts/admin-layout/ManageCareersAdminLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers Applications | Admin Panel",
  description: "View and manage career applications",
};

const ManageCareersPage = () => {
  return <ManageCareersAdminLayout />;
};

export default ManageCareersPage;
