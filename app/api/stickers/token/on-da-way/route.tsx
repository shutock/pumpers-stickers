/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from "next/og";

import type { Route } from "@/types";

const size = 512;

let origin = process.env.VERCEL_URL;
if (!origin) throw new Error("missing VERCEL_URL");

if (process.env.NODE_ENV === "development") origin = `http://${origin}`;
else origin = `https://${origin}`;

export const GET: Route = async (req) => {
  const base = new URL("stickers/token/on-da-way.png", origin).href;

  return new ImageResponse(
    (
      <div {...{ style: { display: "flex" } }}>
        <img {...{ src: base, width: size, height: size }} />
      </div>
    ),
    { width: size, height: size }
  );
};
