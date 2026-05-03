import type { Metadata } from "next";
import { Figtree, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://theintro-site.vercel.app";
const TITLE = "The Intro — Meet interesting people over coffee";
const DESCRIPTION =
  "The Intro pairs you one-on-one with curious, thoughtful people in your city — for real conversations, in real life, over coffee.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · The Intro",
  },
  description: DESCRIPTION,
  applicationName: "The Intro",
  keywords: [
    "The Intro",
    "coffee meetups",
    "meet new people",
    "one on one introductions",
    "Cranbourne East",
    "Melbourne",
    "tech and creative community",
  ],
  authors: [{ name: "The Intro" }],
  creator: "The Intro",
  publisher: "The Intro",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "The Intro",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "social",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${figtree.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
