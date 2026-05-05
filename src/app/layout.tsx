import type { Metadata } from "next";
import { Figtree, Geist_Mono, Geist } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({
  variable: "--font-sans",
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
  "One curated coffee intro a week to someone worth knowing in Melbourne's tech and creative scene.";

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
    "co-founder",
    "mentor",
    "collaborator",
    "creative partner",
    "one on one introductions",
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
      className={cn("h-full", "antialiased", geist.variable, figtree.variable, geistMono.variable, "font-sans")}
    >
      <body className="min-h-full flex flex-col">{children}</body>
      <GoogleAnalytics gaId="G-SD3VX9MZXQ" />
      <Script id="ms-clarity" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "wlos7hk9sb");`}
      </Script>
    </html>
  );
}
