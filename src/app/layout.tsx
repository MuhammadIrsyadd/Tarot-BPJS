import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body-md" });
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-display-lg"
});

export const metadata: Metadata = {
  title: "Aetherial Oracle",
  description: "Mystical Tarot Reading",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

