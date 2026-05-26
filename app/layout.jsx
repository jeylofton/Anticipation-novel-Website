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
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://anticipationnovel.com";
const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Anticipation by Jey Lofton | Literary Fiction Novel",
  description:
    "Anticipation by Jey Lofton is a literary fiction novel about love, timing, regret, and the quiet decisions that change everything. Read the opening pages before release.",
  keywords: [
    "literary fiction novel",
    "psychological romance novel",
    "tragic love story",
    "contemporary literary fiction",
    "relationship drama novel",
    "cinematic fiction",
    "literary tragedy",
    "Jey Lofton",
    "Anticipation novel",
  ],
  authors: [{ name: "Jey Lofton" }],
  creator: "Jey Lofton",
  openGraph: {
    title: "Anticipation by Jey Lofton | A Literary Tragedy",
    description:
      "A literary fiction novel about love, timing, and regret. He had eight weeks to say it. He spent them waiting.",
    url: siteUrl,
    siteName: "Anticipation",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Anticipation — a literary fiction novel by Jey Lofton",
      },
    ],
    type: "book",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anticipation by Jey Lofton | A Literary Tragedy",
    description:
      "A literary fiction novel about love, timing, and regret. He had eight weeks to say it. He spent them waiting.",
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
  author: {
    "@type": "Person",
    name: site.author,
    jobTitle: "Filmmaker and Novelist",
    description:
      "Jey Lofton is a filmmaker and literary fiction author known for cinematic, psychologically restrained storytelling.",
  },
  genre: [
    "Literary Fiction",
    "Psychological Romance",
    "Contemporary Literary Fiction",
    "Relationship Drama",
  ],
  keywords:
    "literary fiction novel, psychological romance, tragic love story, contemporary literary fiction, literary tragedy, cinematic fiction",
  inLanguage: "en",
  bookFormat: "https://schema.org/EBook",
  datePublished: "2026",
  url: siteUrl,
  description:
    "Anticipation by Jey Lofton is a literary fiction novel about love, timing, regret, and the quiet decisions that change everything.",
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
