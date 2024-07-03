import {
  AspectRatio,
  Box,
  Container,
  Grid,
  Heading,
  Text,
} from "@radix-ui/themes";
import { readdirSync } from "fs";
import type { Metadata } from "next";

import { Image } from "./image";
import { Input } from "./input";
import { Suspense } from "react";

const path = "app/api/stickers/token";
const files = readdirSync(path);

export const metadata: Metadata = {
  title: "Pumpers Stickers",
  description:
    "Preview sandbox for token-generated sticker packs launched on Pumpers",
};

const HomePage: React.FC = () => {
  return (
    <Container {...{ px: "4", py: "8" }}>
      <Heading {...{ align: "center", size: "8" }}>
        Pumpers Stickers generator
      </Heading>

      <Suspense>
        <Input />
      </Suspense>

      <Grid {...{ gap: "4", columns: { initial: "3", sm: "4", md: "5" } }}>
        {files.map((file, id) => {
          let name = file.replaceAll("-", " ");
          name = name.charAt(0).toUpperCase() + name.slice(1);

          return (
            <Box key={`${file}${id}`}>
              <AspectRatio {...{ ratio: 1 / 1 }} asChild>
                <Suspense>
                  <Image
                    {...{
                      src: `${path.replace("app", "")}/${file}`,
                      alt: `${name} sticker`,
                      loading: "lazy",
                      fill: true,
                      sizes: "512,256,128",
                      priority: false,
                    }}
                  />
                </Suspense>
              </AspectRatio>

              <Text
                {...{
                  align: "center",
                  mt: "1",
                  size: { initial: "1", sm: "2", md: "3" },
                }}
                asChild
              >
                <div>{name}</div>
              </Text>
            </Box>
          );
        })}
      </Grid>
    </Container>
  );
};

export default HomePage;
