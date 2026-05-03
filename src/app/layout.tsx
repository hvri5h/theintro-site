import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const SITE_URL = "https://theintro-site.vercel.app";
const TITLE = "The Intro — Meet interesting people over coffee";
const DESCRIPTION =
  "A members-only offline social network. The Intro pairs you one-on-one with curious, thoughtful people in your city — for real conversations, in real life, over coffee.";

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
    "offline social network",
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
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
