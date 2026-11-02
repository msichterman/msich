import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import ContactForm from "./contact-form";

export const metadata: Metadata = pageMetadata({
  title: "Contact - Matt Sichterman",
  description:
    "I'm Matt Sichterman. CTO at Flamel.ai, living in Cincinnati, OH. Get in touch.",
  path: "/contact",
  ogPreface: "Matt Sichterman \u2023 Contact",
});

export default function ContactPage() {
  return <ContactForm />;
}
