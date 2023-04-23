import { router, procedure } from "../trpc";
import { z } from "zod";
import { env } from "@/env/server.mjs";
import { TRPCError } from "@trpc/server";

const BASE_URL = "https://connect.mailerlite.com/api";

export const newsletterRouter = router({
  subscribe: procedure
    .input(
      z.object({
        email: z.string().email({ message: "Invalid email address." }),
      })
    )
    .mutation(async ({ input }) => {
      const result = await fetch(`${BASE_URL}/subscribers`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.MAILERLITE_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...input, groups: ["86273922106918208"] }),
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
  getSubscribers: procedure.query(async () => {
    const result = await fetch(`${BASE_URL}/subscribers?limit=0`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${env.MAILERLITE_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await result.json();

    const responseSchema = z.object({
      total: z.number().nullable(),
      error: z.string().nullable(),
    });

    type SubscribersResponseType = z.infer<typeof responseSchema>;

    const response: SubscribersResponseType = !result.ok
      ? {
          total: null,
          error: result.statusText,
        }
      : {
          total: data.total,
          error: null,
        };

    return response;
  }),
});
