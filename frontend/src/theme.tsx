import type { CSSVariablesResolver } from "@mantine/core";
import { createTheme } from "@mantine/core";
export type colorScheme = "light" | "dark";

import { useColorMode } from "./components/ui/color-mode";
export const theme = createTheme({
  colors: {
    light: [
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
    ],
    purple: [
      "#fffb00",
      "#fffb00",
      "#fffb00",
      "#fffb00",
      "#a200ffff", // dark mode links
      "#fffb00",
      "#000000ff", // light mode links/buttons
      "#6e6e6eff", // hover buttons light mode
      "#a200ffff", // dark mode buttons
      "#8000caff", //hover buttons dark mode
    ],
  },

  primaryColor: "purple",
});

export const cssVariablesResolver: CSSVariablesResolver = (theme) => ({
  variables: {
    "--mantine-color-text-primary":
      useColorMode().colorMode === "dark" ? theme.white : theme.black,
    "--mantine-color-text-secondary":
      useColorMode().colorMode === "dark"
        ? theme.colors.gray[4]
        : theme.colors.gray[6],
  },
  light: {
    "--mantine-color-text-primary": theme.black,
    "--mantine-color-text-secondary": theme.colors.gray[6],
  },
  dark: {
    "--mantine-color-text-primary": theme.white,
    "--mantine-color-text-secondary": theme.colors.gray[4],
  },
});
