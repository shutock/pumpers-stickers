import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { ScrollArea, Theme, ThemePanel } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";

let origin = process.env.APP_URL;
if (!origin) throw new Error("missing APP_URL");

if (process.env.NODE_ENV === "development") origin = `http://${origin}`;
else origin = `https://${origin}`;

export const metadata: Metadata = {
  openGraph: {
    images: [`${origin}/og.png`],
  },
};

type Props = { children: React.ReactNode };

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html
      {...{ lang: "en", style: { all: "unset", position: "fixed", inset: 0 } }}
      suppressHydrationWarning
    >
      <ThemeProvider>
        <body {...{ style: { all: "unset" } }}>
          <Theme {...{ accentColor: "green", radius: "large" }}>
            <ThemePanel {...{ defaultOpen: false }} />
            <ScrollArea
              {...{ scrollbars: "vertical", style: { blockSize: "100svh" } }}
            >
              <>{children}</>
            </ScrollArea>
          </Theme>
        </body>
      </ThemeProvider>
    </html>
  );
};

export default RootLayout;
