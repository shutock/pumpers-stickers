"use client";

import { Box, Button, Flex, Text, TextField } from "@radix-ui/themes";

import { useSearchParams, useRouter } from "next/navigation";
import { useId, useRef } from "react";

export const Input: React.FC = () => {
  const ref = useRef<HTMLInputElement>(null);

  const { push } = useRouter();

  const searchParams = useSearchParams();
  let token = searchParams.get("token") || `https://pumpers.tg/favicon.png`;
  if (token) token = decodeURI(token);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let value = ref.current?.value || "https://pumpers.tg/favicon.png";
    value = encodeURIComponent(value);

    push(`?token=${value}`);
  };

  const id = useId();

  return (
    <Flex
      {...{ direction: "column", gap: "2", align: "center", mb: "8", mt: "6" }}
    >
      <Flex
        {...{
          gap: "4",
          justify: "center",
          align: "center",
          style: { inlineSize: "100%", maxInlineSize: "20rem" },
        }}
        asChild
      >
        <form {...{ onSubmit }}>
          <TextField.Root
            {...{
              defaultValue: token,
              placeholder: "https://...",
              ref,
              id,
              style: { inlineSize: "100%" },
            }}
          />

          <Button {...{ variant: "classic" }}>Submit</Button>
        </form>
      </Flex>
      <Text {...{ size: "2", color: "gray" }}>Enter an image URL here.</Text>
    </Flex>
  );
};
