import Navbar from "@/components/widgets/navbar";
import type { Metadata } from "next";
import "./globals.css";
import "swiper/css";
export const metadata: Metadata = {
  title: "Slater Matsil",
  description: "Slater Matsil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {/* <main
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "80px 16px", // top/bottom spacing
              minHeight: "100vh",
            }}
          >
            {children}
          </main> */}
        {children}
      </body>
    </html>
  );
}
