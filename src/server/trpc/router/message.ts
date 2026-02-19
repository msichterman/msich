import { router, procedure } from "../trpc";
import { z } from "zod";
import nodemailer from "nodemailer";
import { env } from "../../../env/server.mjs";

export const messageRouter = router({
  contactForm: procedure
    .input(
      z.object({
        firstName: z.string().min(2).max(32),
        lastName: z.string().min(2).max(32),
        email: z.string().email(),
        phone: z.string().min(10).max(20).optional().or(z.literal("")),
        subject: z.string().min(2).max(120),
        message: z.string().min(2).max(500),
      })
    )
    .mutation(async ({ input }) => {
      if (!env.GMAIL_APP_PASSWORD) {
        throw new Error("Contact form is temporarily unavailable. Please try again later.");
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "msichterman1@gmail.com",
          pass: env.GMAIL_APP_PASSWORD,
        },
      });

      const { firstName, lastName, email, phone, subject, message } = input;

      await transporter.sendMail({
        from: `"${firstName} ${lastName}" <msichterman1@gmail.com>`,
        replyTo: email,
        to: "msichterman1+website@gmail.com",
        subject: `Contact Form: ${subject}`,
        text: [
          `Name: ${firstName} ${lastName}`,
          `Email: ${email}`,
          phone ? `Phone: ${phone}` : null,
          `Subject: ${subject}`,
          `\nMessage:\n${message}`,
        ]
          .filter(Boolean)
          .join("\n"),
      });

      return { firstName };
    }),
});
