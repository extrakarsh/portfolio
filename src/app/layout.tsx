import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Digital Craftsman | Web Designer & Automation Specialist",
  description: "Sophisticated web design and n8n automation solutions. Creating beautiful, efficient digital experiences that drive results.",
  keywords: [
    "web designer",
    "automation specialist",
    "n8n workflows",
    "UI/UX design",
    "web development",
    "process automation",
    "digital transformation"
  ],
  authors: [{ name: "Digital Craftsman" }],
  creator: "Digital Craftsman",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://digitalcraftsman.com",
    title: "Digital Craftsman | Web Designer & Automation Specialist",
    description: "Sophisticated web design and n8n automation solutions. Creating beautiful, efficient digital experiences that drive results.",
    siteName: "Digital Craftsman Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Craftsman | Web Designer & Automation Specialist",
    description: "Sophisticated web design and n8n automation solutions. Creating beautiful, efficient digital experiences that drive results.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="site-bg" aria-hidden="true">
          <div className="mesh-layer">
            <span className="blob b1" />
            <span className="blob b2" />
            <span className="blob b3" />
          </div>
          <div className="particles" />
          <div className="noise" />
        </div>
        {children}
      </body>
    </html>
  );
}
