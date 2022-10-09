import { t } from "../trpc";
import { z } from "zod";
import { env } from "@/env/server.mjs";
import { TRPCError } from "@trpc/server";

export const newsletterRouter = t.router({
  subscribe: t.procedure
    .input(
      z.object({
        email: z.string().email({ message: "Invalid email address." }),
      })
    )
    .mutation(async ({ input }) => {
      const result = await fetch("https://www.getrevue.co/api/v2/subscribers", {
        method: "POST",
        headers: {
          Authorization: `Token ${env.REVUE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const data = await result.json();

      if (!result.ok) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: data.error.email[0],
        });
      }

      return input;
    }),
  getSubscribers: t.procedure.query(async () => {
    const result = await fetch("https://www.getrevue.co/api/v2/subscribers", {
      method: "GET",
      headers: {
        Authorization: `Token ${env.REVUE_API_KEY}`,
      },
    });

    const data = await result.json();

    const responseSchema = z.object({
      count: z.number().nullable(),
      error: z.string().nullable(),
    });

    type SubscribersResponseType = z.infer<typeof responseSchema>;

    const response: SubscribersResponseType = !result.ok
      ? {
          count: null,
          error: data.error.email[0],
        }
      : {
          count: data.length,
          error: null,
        };

    return response;
  }),
});
