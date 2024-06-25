/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from "next/og";

import type { Route } from "@/types";

const size = 512;

let origin = process.env.APP_URL;
if (!origin) throw new Error("missing APP_URL");

if (process.env.NODE_ENV === "development") origin = `http://${origin}`;
else origin = `https://${origin}`;

export const GET: Route = async ({ nextUrl: { searchParams } }) => {
  const base = new URL("stickers/token/just-landed.png", origin).href;

  const token = decodeURI(
    searchParams.get("token") || new URL("sample-token.png", origin).href
  );

  return new ImageResponse(
    (
      <div {...{ style: { display: "flex" } }}>
        <img
          {...{
            src: token,
            width: 109,
            height: 109,
            style: {
              position: "absolute",
              left: 386,
              top: 193,
              objectFit: "cover",
            },
          }}
        />

        <img
          {...{
            src: token,
            width: 26,
            height: 26,
            style: {
              position: "absolute",
              left: 257,
              top: 269,
              objectFit: "cover",
            },
          }}
        />

        <img {...{ src: base, width: size, height: size }} />
      </div>
    ),
    { width: size, height: size }
  );
};
