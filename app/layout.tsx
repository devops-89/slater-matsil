import type { Metadata, Viewport } from "next";
import ClientLayout from "./client-layout";
import "./globals.css";
import "aos/dist/aos.css";
import "swiper/css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Slater Matsil | Intellectual Property Law Firm",
  description: "Slater Matsil is a premier intellectual property law firm specializing in patent prosecution, litigation, and strategic counseling.",
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
  },
};

import { adelle, georgia, inter, tradeGothic } from "@/utils/fonts";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${adelle.className} ${tradeGothic.className} ${inter.className} ${georgia.className}`}>
        <ThemeRegistry>
          <ClientLayout>{children}</ClientLayout>
        </ThemeRegistry>
      </body>
    </html>
  );
}
