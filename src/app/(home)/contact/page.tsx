import type { Metadata } from "next";
import ContactForm from "./contact-form";

export const metadata: Metadata = {
  title: "Contact - Matt Sichterman",
  description:
    "I'm Matt Sichterman. CTO at Flamel.ai, living in Cincinnati, OH. Get in touch.",
  openGraph: {
    images: [{ url: "https://msich.dev/api/og?preface=Matt+Sichterman+%E2%80%A3+Contact" }],
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
