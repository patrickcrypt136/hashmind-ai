import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/layout/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HashGenius — Mine Smarter. Earn Faster.",
  description: "AI-powered strategy assistant for Club HashCash players.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0A0A0A] text-white antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}