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
  title: "Tarot BPJS - Arcana Mystica | Modern Tarot & Divination",
  description: "Tarot BPJS (Bacaan Petunjuk Jiwa Sejati) oleh Arcana Mystica. Platform ramalan modern untuk panduan harian, asmara, dan karir dengan antarmuka esoteris yang indah.",
  keywords: ["tarot bpjs", "bacaan petunjuk jiwa sejati", "tarot indonesia", "daily tarot", "ramalan kartu", "arcana mystica"],
  verification: {
    google: "wjVywy-HvCzYXe6LiZS6HQxN1iAbipVLPyE8tYxH5e8",
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "Tarot BPJS - Arcana Mystica | Modern Tarot & Divination",
    description: "Tarot BPJS (Bacaan Petunjuk Jiwa Sejati) oleh Arcana Mystica. Platform ramalan modern untuk panduan harian, asmara, dan karir.",
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
    title: "Tarot BPJS - Arcana Mystica | Modern Tarot & Divination",
    description: "Tarot BPJS (Bacaan Petunjuk Jiwa Sejati) oleh Arcana Mystica. Platform ramalan modern.",
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
