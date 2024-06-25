/* eslint-disable @next/next/no-img-element */
"use client";

import Img from "next/image";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";

export const Image: React.FC<React.ComponentProps<typeof Img>> = (props) => {
  const searchParams = useSearchParams();
  const token = decodeURI(
    searchParams.get("token") || "https://pumpers.tg/favicon.png"
  );

  const ref = useRef<HTMLImageElement>(null);

  const onMouseDown = async () => {
    const el = ref.current;
    if (!el) return;

    const { left, top, width, height } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;

    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
    el.style.position = "fixed";
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.style.zIndex = "2";
    el.style.cursor = "unset";
    document.body.style.cursor = "grabbing";
    el.style.pointerEvents = "none";

    const backdrop = document.createElement("div");
    backdrop.style.position = "fixed";
    backdrop.style.top = "0";
    backdrop.style.left = "0";
    backdrop.style.width = "100%";
    backdrop.style.height = "100%";
    backdrop.style.zIndex = "1";
    backdrop.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
    backdrop.style.backdropFilter = "blur(0)";
    backdrop.style.transition = "all 200ms ease-in-out";
    el.parentElement?.appendChild(backdrop);

    await new Promise((resolve) => setTimeout(resolve, 0));

    backdrop.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    backdrop.style.backdropFilter = "blur(0.5rem)";

    el.style.transition = "all 200ms ease-in-out";
    el.style.left = `${(innerWidth - width) / 2}px`;
    el.style.top = `${(innerHeight - height) / 2}px`;
    el.style.scale = "2";

    window.addEventListener(
      "mouseup",
      async () => {
        el.style.pointerEvents = "";
        el.style.transition = "all 200ms ease-in-out";
        el.style.left = `${left}px`;
        el.style.top = `${top}px`;
        backdrop.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
        backdrop.style.backdropFilter = "blur(0)";
        el.style.scale = "1";
        await new Promise((resolve) => setTimeout(resolve, 200));
        document.body.style.cursor = "unset";
        el.style.position = "absolute";
        el.style.transition = "";
        el.style.left = "0";
        el.style.top = "0";
        el.style.width = "100%";
        el.style.height = "100%";
        el.style.zIndex = "";
        el.style.cursor = "grab";
        el.parentElement?.removeChild(backdrop);
      },
      { once: true }
    );
  };

  return (
    <img
      {...{
        ...props,
        src: `${props.src}?token=${token}`,
        alt: "Sticker",
        ref,
        onMouseDown,
        style: {
          cursor: "grab",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        },
      }}
    />
  );
};
