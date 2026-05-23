import { Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import { site } from "@/lib/copy";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://anticipation-novel.com";
const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Anticipation — A Novel by Jey Lofton",
  description:
    "A psychological love story by Jey Lofton. Winter 2026. He had eight weeks to say it. He spent them waiting. Read the Prologue and Chapter One.",
  openGraph: {
    title: "Anticipation — A Psychological Love Story",
    description: "He had eight weeks to say it. He spent them waiting.",
    url: siteUrl,
    siteName: "Anticipation",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Anticipation — A Novel by Jey Lofton",
      },
    ],
    type: "book",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anticipation — A Psychological Love Story",
    description: "He had eight weeks to say it. He spent them waiting.",
    images: ["/images/og-image.png"],
  },
  alternates: { canonical: siteUrl },
};

export const viewport = {
  themeColor: "#0a0e14",
};

const bookJsonLd = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: site.bookTitle,
  author: { "@type": "Person", name: site.author },
  genre: "Psychological Fiction",
  inLanguage: "en",
  bookFormat: "https://schema.org/EBook",
  datePublished: "2026",
  url: siteUrl,
  description:
    "A psychological love story by Jey Lofton. He had eight weeks to say it. He spent them waiting.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd) }}
        />
        {plausibleDomain ? (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        ) : null}
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
