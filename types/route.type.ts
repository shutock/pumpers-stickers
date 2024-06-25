import type { NextRequest, NextResponse } from "next/server";
import type { ImageResponse } from "next/og";

export type Route<T = object> = (
  request: NextRequest,
  query: { params: T }
) => Promise<NextResponse | ImageResponse>;
