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
  title: "Tarot BPJS",
  description: "Tarot tarot an by syd",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",    apple: "/logo.svg",
  },
  openGraph: {
    title: "Tarot BPJS",
    description: "Mystical Tarot Reading",
    url: "https://tarot-bpjs.vercel.app",
    siteName: "Tarot BPJS",
    images: [
      {
        url: "/logo.svg",
        width: 512,
        height: 512,
        alt: "Tarot BPJS logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarot BPJS",
    description: "Mystical Tarot Reading",
    images: ["/logo.svg"],  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}

