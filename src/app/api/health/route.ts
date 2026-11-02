export const dynamic = "force-static";

export function GET() {
  return Response.json(
    { ok: true },
    {
      headers: {
        "cache-control": "public, max-age=60, s-maxage=60",
      },
    }
  );
}
