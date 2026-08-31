import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://trielts.com"),

  title: "TRIELTS | Private IELTS Coaching & Preparation",

  description:
    "Private IELTS coaching and preparation for individuals, professionals, families, organisations, and government clients. Targeted support for IELTS Reading, Writing, Listening and Speaking.",

  openGraph: {
    siteName: "TRIELTS",
    title: "TRIELTS | Private IELTS Coaching & Preparation",
    description:
      "Private IELTS coaching and preparation for individuals, professionals, families, organisations, and government clients.",
    type: "website",
    locale: "en_GB",
  },

  twitter: {
    card: "summary_large_image",
    title: "TRIELTS | Private IELTS Coaching & Preparation",
    description:
      "Private IELTS coaching and preparation for individuals, professionals, families, organisations, and government clients.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
