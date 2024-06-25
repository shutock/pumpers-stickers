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
  const base = new URL("stickers/token/never-selling-base.png", origin).href;
  const text = new URL("stickers/token/never-selling-text.png", origin).href;

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
            width: 204,
            height: 204,
            style: {
              position: "absolute",
              left: 114,
              top: 62,
              objectFit: "cover",
              borderRadius: "50%",
            },
          }}
        />

        <img
          {...{
            src: text,
            width: 411,
            height: 356,
            style: {
              position: "absolute",
              left: 68,
              top: 121,
              objectFit: "contain",
            },
          }}
        />
      </div>
    ),
    { width: size, height: size }
  );
};
