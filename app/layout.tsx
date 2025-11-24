"use client";

import Navbar from "@/components/widgets/navbar";
import type { Metadata } from "next";
import "./globals.css";
import "swiper/css";
import Footer from "@/components/widgets/Footer";
import { usePageData } from "@/store/usePageData";
import { useEffect } from "react";
import { WEBSITE_DATA } from "@/public/data/website-data";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setDetails } = usePageData();
  useEffect(() => {
    setDetails(WEBSITE_DATA);
  }, []);

  return (
    <html lang="en">
      <body>
        <Navbar />

        {children}
        <Footer />
      </body>
    </html>
  );
}
