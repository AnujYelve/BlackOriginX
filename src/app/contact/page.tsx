import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Connect with BlackOriginX. Submit partnership inquiries, investment proposals, and general requests to contact@blackoriginx.com.",
  keywords: ["contact", "investment", "partnership", "email", "address", "gurugram", "haryana"],
};

export default function Contact() {
  return <ContactContent />;
}
