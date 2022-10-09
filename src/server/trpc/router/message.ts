import { t } from "../trpc";
import { z } from "zod";

export const messageRouter = t.router({
  contactForm: t.procedure
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
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.contact.create({
        data: input,
      });
    }),
});
