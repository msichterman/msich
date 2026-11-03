import type { Metadata } from "next";
import { CONTACT_DESCRIPTION } from "@/data/profile";
import { pageMetadata } from "@/lib/metadata";
import ContactForm from "./contact-form";

export const metadata: Metadata = pageMetadata({
  title: "Contact - Matt Sichterman",
  description: CONTACT_DESCRIPTION,
  path: "/contact",
  ogPreface: "Matt Sichterman \u2023 Contact",
});

export default function ContactPage() {
  return <ContactForm />;
}
