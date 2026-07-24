import React from "react";
import ContactSupportAdminLayout from "@/components/layouts/admin-layout/ContactSupportAdminLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support Inquiries | Admin Panel",
  description: "View contact support inquiries",
};

const ContactSupportPage = () => {
  return <ContactSupportAdminLayout />;
};

export default ContactSupportPage;
