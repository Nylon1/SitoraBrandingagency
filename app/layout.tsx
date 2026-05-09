import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://sitora.co.uk"),

  title: {
    default: "Sitora | Global Web & Corporate Branding Agency",
    template: "%s | Sitora",
  },

  description:
    "Sitora is a global web design and corporate branding agency creating cinematic corporate websites, premium brand identities and SEO-led digital platforms for ambitious businesses.",

  keywords: [
    "Sitora",
    "global web design agency",
    "corporate website design",
    "corporate branding agency",
    "premium website design",
    "SEO website design",
    "lead generation websites",
    "web design London",
    "web design Dubai",
    "web design New York",
    "corporate branding London",
    "premium business websites",
  ],

  authors: [{ name: "Sitora" }],
  creator: "Sitora",
  publisher: "Sitora",
  applicationName: "Sitora",

  alternates: {
    canonical: "https://sitora.co.uk",
  },

  manifest: "/site.webmanifest",

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  openGraph: {
    title: "Sitora | Global Web & Corporate Branding Agency",
    description:
      "Cinematic corporate websites, premium brand identities and SEO-led digital platforms for ambitious businesses.",
    url: "https://sitora.co.uk",
    siteName: "Sitora",
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/images/sitora-global-poster.jpg?v=3",
        width: 1200,
        height: 630,
        alt: "Sitora global web and corporate branding agency",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sitora | Global Web & Corporate Branding Agency",
    description:
      "Cinematic corporate websites, premium brand identities and SEO-led digital platforms for ambitious businesses.",
    images: ["/images/sitora-global-poster.jpg?v=3"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#03050a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-[#03050a] font-sans text-white antialiased selection:bg-[#d8b66d] selection:text-[#070910]">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}