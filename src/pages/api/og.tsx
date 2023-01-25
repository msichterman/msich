/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import avatarImage from "@/images/avatar.jpg";

export const config = {
  runtime: "experimental-edge",
};

// Make sure the font exists in the specified path:
const calSans = fetch(
  new URL("../../../public/CalSans-SemiBold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  try {
    const [calSansFont] = await Promise.all([calSans]);
    const { origin, searchParams } = new URL(req.url);

    // dynamic params
    const preface = searchParams.get("preface") || "Matt Sichterman";
    const title = searchParams.has("title")
      ? searchParams.get("title")?.slice(0, 100)
      : "Software engineer, entrepreneur, and former hogmollie.";
    const subtitle = searchParams.has("title")
      ? searchParams.get("title")?.slice(0, 100)
      : "I create and manage thriving websites for growing businesses.";
    const image = searchParams.get("image") || `${origin}${avatarImage.src}`;

    return new ImageResponse(
      (
        <div tw="h-full w-full flex items-start justify-start bg-neutral-900 p-20">
          <div tw="flex h-full items-center w-full">
            <svg
              // @ts-expect-error
              tw="absolute bottom-[-500px] left-[-200px] opacity-20"
              id="visual-2"
              viewBox="0 0 900 600"
              width="1200"
              height="800"
              version="1.1"
              style={{ zIndex: "0" }}
            >
              <g transform="translate(444.3593826782917 273.8643784322123)">
                <path
                  fill="#0ea5e9"
                  d="M186.1 -166.4C230.8 -141.4 249.4 -70.7 237.7 -11.7C226 47.4 184.1 94.8 139.4 139.9C94.8 185.1 47.4 228 -2.2 230.3C-51.9 232.5 -103.7 194 -149.2 148.9C-194.7 103.7 -233.9 51.9 -229.5 4.4C-225.1 -43.1 -177.3 -86.3 -131.8 -111.3C-86.3 -136.3 -43.1 -143.1 13.8 -156.9C70.7 -170.7 141.4 -191.4 186.1 -166.4"
                ></path>
              </g>
            </svg>
            <div tw="flex-1 flex flex-col mr-20" style={{ zIndex: "50" }}>
              <p tw="text-sky-400 text-xl uppercase font-bold">{preface}</p>
              <h1 tw="text-[2.7rem] text-white">{title}</h1>
              <p tw="text-neutral-100 text-lg">{subtitle}</p>
            </div>
            {image ? (
              <div tw="flex relative">
                <svg
                  // @ts-expect-error
                  tw="absolute top-[-300px] left-[-100px] opacity-20"
                  id="visual"
                  viewBox="0 0 900 600"
                  width="900"
                  height="600"
                  version="1.1"
                >
                  <g transform="translate(444.3593826782917 273.8643784322123)">
                    <path
                      fill="#0ea5e9"
                      d="M186.1 -166.4C230.8 -141.4 249.4 -70.7 237.7 -11.7C226 47.4 184.1 94.8 139.4 139.9C94.8 185.1 47.4 228 -2.2 230.3C-51.9 232.5 -103.7 194 -149.2 148.9C-194.7 103.7 -233.9 51.9 -229.5 4.4C-225.1 -43.1 -177.3 -86.3 -131.8 -111.3C-86.3 -136.3 -43.1 -143.1 13.8 -156.9C70.7 -170.7 141.4 -191.4 186.1 -166.4"
                    ></path>
                  </g>
                </svg>
                <img
                  alt=""
                  tw="mx-auto border-8 border-sky-500 w-[300px] h-[300px] rounded-full"
                  src={image}
                />
              </div>
            ) : null}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 627,
        fonts: [
          {
            name: "Cal Sans",
            data: calSansFont,
            style: "normal",
            weight: 400,
          },
          {
            name: "Cal Sans",
            data: calSansFont,
            style: "normal",
            weight: 700,
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
