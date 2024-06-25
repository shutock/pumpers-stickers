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
  const base = new URL("stickers/token/pls-x100.png", origin).href;

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
            width: 144,
            height: 144,
            style: {
              position: "absolute",
              left: 47,
              top: 18,
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
