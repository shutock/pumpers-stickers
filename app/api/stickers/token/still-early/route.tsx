/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from "next/og";

import type { Route } from "@/types";

const size = 512;

let origin = process.env.VERCEL_URL;
if (!origin) throw new Error("missing VERCEL_URL");

if (process.env.NODE_ENV === "development") origin = `http://${origin}`;
else origin = `https://${origin}`;

export const GET: Route = async ({ nextUrl: { searchParams } }) => {
  const base = new URL("stickers/token/still-early.png", origin).href;

  const token = decodeURI(
    searchParams.get("token") || new URL("sample-token.png", origin).href
  );

  return new ImageResponse(
    (
      <div {...{ style: { display: "flex" } }}>
        <img {...{ src: base, width: size, height: size }} />

        <img
          {...{
            src: token,
            width: 56,
            height: 56,
            style: {
              position: "absolute",
              left: 324,
              top: 232,
              objectFit: "cover",
              borderRadius: "50%",
            },
          }}
        />
      </div>
    ),
    { width: size, height: size }
  );
};
