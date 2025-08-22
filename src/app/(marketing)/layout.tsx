import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AiOverlay from "@/components/AiOverlay";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TriggerBy - AI Automation for Shopify | Turn Your Store Into an AI Revenue Machine",
  description: "Deploy 10 proven AI automations that recover lost revenue, optimize performance, and protect your profits. Get a free AI audit of your Shopify store in 30 minutes.",
  keywords: "Shopify AI, ecommerce automation, cart recovery, Shopify optimization, AI revenue, Shopify tools",
  authors: [{ name: "TriggerBy" }],
  creator: "TriggerBy",
  publisher: "TriggerBy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://triggerby.ai'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "TriggerBy - AI Automation for Shopify",
    description: "Deploy 10 proven AI automations that recover lost revenue, optimize performance, and protect your profits.",
    url: 'https://triggerby.ai',
    siteName: 'TriggerBy',
    images: [
      {
        url: '/brand/og.png',
        width: 1200,
        height: 630,
        alt: 'TriggerBy - AI Automation for Shopify',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "TriggerBy - AI Automation for Shopify",
    description: "Deploy 10 proven AI automations that recover lost revenue, optimize performance, and protect your profits.",
    images: ['/brand/og.png'],
    creator: '@triggerby',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <AiOverlay />
      </body>
    </html>
  );
}