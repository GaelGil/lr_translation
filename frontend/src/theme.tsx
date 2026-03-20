import { createTheme } from "@mantine/core";
import type { CSSVariablesResolver } from "@mantine/core";

export const theme = createTheme({
  colors: {
    red: [
      "#ff0033ff",
      "#ff0033ff",
      "#ff0033ff",
      "#ff2f59ff",
      "#ff0033ff",
      "#ff0033ff",
      "#ff0033ff",
      "#ff0033ff",
      "#ff0033ff",
      "#ff0033ff",
    ],
    dark: [
      "#ffffffff", // shade 0
      "#000000ff", // shade 1
      "#000000ff", // shade 2
      "#f6f6f6ff", // shade 3
      "#000000ff", // shade 4
      "#000000ff", // shade 5
      "#000000ff", // shade 6
      "#000000ff", // shade 7
      "#000000ff", // shade 8
      "#000000ff", // shade 9
    ],
    black: [
      "#ffffffff", // shade 0
      "#000000ff", // shade 1
      "#000000ff", // shade 2
      "#f6f6f6ff", // shade 3
      "#000000ff", // shade 4
      "#000000ff", // shade 5
      "#000000ff", // shade 6
      "#000000ff", // shade 7
      "#000000ff", // shade 8
      "#000000ff", // shade 9
    ],
  },

  primaryColor: "red",

  components: {}, // default theme (can be 'dark')
});

export const cssResolver: CSSVariablesResolver = () => ({
  variables: {
    // "--mantine-color-body": "black",
    "--mantine-color-text": "white",
  },
  light: {
    // "--mantine-color-body": "black",
    "--mantine-color-text": "white",
  },
  dark: {
    // "--mantine-color-body": "black",
    "--mantine-color-text": "white",
  },
});
