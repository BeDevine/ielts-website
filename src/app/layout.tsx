import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TRIELTS — If you try you shall succeed",
  description:
    "Private IELTS coaching for individuals, organisations, and government clients. Focused, results-driven preparation with a clear path to your target band.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
