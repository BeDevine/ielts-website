import type { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Request a Consultation | TRIELTS",
  description:
    "Get in touch about private IELTS coaching for yourself, your family, or your organisation. Discreet, one-to-one preparation with a clear path to your target band.",
  openGraph: {
    title: "Request a Consultation | TRIELTS",
    description:
      "Get in touch about private IELTS coaching for yourself, your family, or your organisation.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
