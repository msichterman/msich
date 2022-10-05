import { createRouter } from "./context";
import { z } from "zod";
import { env } from "../../env/server.mjs";
import { resolveObjectURL } from "buffer";

export const newsletterRouter = createRouter()
  .mutation("subscribe", {
    input: z.object({
      email: z.string().email({ message: "Invalid email address." }),
    }),
    async resolve({ input }) {
      const result = await fetch("https://www.getrevue.co/api/v2/subscribers", {
        method: "POST",
        headers: {
          Authorization: `Token ${env.REVUE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const data = await result.json();

      const responseSchema = z.object({
        email: z.string().email().nullable(),
        error: z.string().nullable(),
      });

      type SubscribeResponseType = z.infer<typeof responseSchema>;

      const response: SubscribeResponseType = !result.ok
        ? {
            email: null,
            error: data.error.email[0],
          }
        : {
            email: input.email,
            error: null,
          };

      return response;
    },
  })
  .query("subscribers", {
    async resolve() {
      const result = await fetch("https://www.getrevue.co/api/v2/subscribers", {
        method: "GET",
        headers: {
          Authorization: `Token ${env.REVUE_API_KEY}`,
        },
      });

      const data = await result.json();

      if (!result.ok) {
        return new Response(
          JSON.stringify({ error: "Error retrieving subscribers" }),
          {
            status: 500,
            headers: {
              "content-type": "application/json",
            },
          }
        );
      }

      return new Response(JSON.stringify({ count: data.length }), {
        status: 200,
        headers: {
          "content-type": "application/json",
          "cache-control": "public, s-maxage=1200, stale-while-revalidate=600",
        },
      });
    },
  });
