import { NextResponse } from "next/server";
import { readdirSync } from "fs";

import type { Route } from "@/types";

export const GET: Route<{ pack: string }> = async (_, { params: { pack } }) => {
  try {
    const packs = readdirSync(`app/api/stickers`);
    if (!packs.includes(pack)) throw new Error(`Pack ${pack} not found`);

    const stickers = readdirSync(`app/api/stickers/${pack}`);

    return NextResponse.json({
      isSuccess: true,
      data: { stickers },
    });
  } catch (error) {
    return NextResponse.json({
      isSuccess: false,
      message: (error as Error).message,
    });
  }
};
