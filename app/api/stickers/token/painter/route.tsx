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
  const src = new URL("stickers/token/painter.png", origin).href;

  const token = decodeURI(
    searchParams.get("token") || new URL("sample-token.png", origin).href
  );

  return new ImageResponse(
    (
      <div {...{ style: { display: "flex" } }}>
        <img {...{ src, width: size, height: size }} />

        <img
          {...{
            src: token,
            width: 200,
            height: 200,
            style: {
              position: "absolute",
              top: 147,
              left: -39,
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
