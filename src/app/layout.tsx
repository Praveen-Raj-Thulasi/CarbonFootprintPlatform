import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CarbonIQ | AI-Powered Climate Intelligence",
  description: "Predict and reduce your environmental impact with your personal Climate Copilot.",
  openGraph: {
    title: "CarbonIQ | AI-Powered Climate Intelligence",
    description: "Predict and reduce your environmental impact with your personal Climate Copilot.",
    url: "https://carboniq.app",
    siteName: "CarbonIQ",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CarbonIQ",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CarbonIQ | AI-Powered Climate Intelligence",
    description: "Predict and reduce your environmental impact with your personal Climate Copilot.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F5F5F7] text-[#1D1D1F] selection:bg-primary/30">
        <main className="flex flex-col flex-1">{children}</main>
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
