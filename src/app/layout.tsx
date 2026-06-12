import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body-md" });
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-display-lg"
});

export const metadata: Metadata = {
  title: "Arcana Mystica | Modern Tarot & Divination Platform",
  description: "Unveil your destiny with Arcana Mystica. Experience modern tarot readings, daily guidance, and a comprehensive card encyclopedia for your spiritual journey.",
  keywords: ["tarot", "divination", "daily reading", "spiritual guidance", "tarot cards", "mysticism"],
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "Arcana Mystica | Modern Tarot & Divination Platform",
    description: "Unveil your destiny with Arcana Mystica. Experience modern tarot readings and daily guidance.",
    url: "https://tarot-bpjs.vercel.app",
    siteName: "Arcana Mystica",
    images: [
      {
        url: "/logo (1).png",
        width: 512,
        height: 512,
        alt: "Arcana Mystica logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arcana Mystica | Modern Tarot & Divination Platform",
    description: "Unveil your destiny with Arcana Mystica. Experience modern tarot readings.",
    images: ["/logo (1).png"],
  },
};

import { SettingsProvider } from "@/context/SettingsContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <SettingsProvider>
          <Header />
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}

