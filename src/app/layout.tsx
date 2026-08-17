import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IELTS with [Your Name] — Focused, honest IELTS coaching",
  description:
    "One-to-one and small-group IELTS preparation. Straight feedback, real practice materials, and a clear path to your target band.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
