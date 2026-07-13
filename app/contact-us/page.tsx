import type { Metadata } from "next";
import ContactLayout from "@/components/layouts/contact-layout";
import React from "react";

export const metadata: Metadata = {
  title: "Slater Matsil | Contact Us",
  description: "Contact our offices in Dallas, Texas to consult with our intellectual property legal professionals.",
};

const ContactUs = () => {
  return (
    <div>
      <ContactLayout />
    </div>
  );
};

export default ContactUs;
