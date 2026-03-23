import type { CSSVariablesResolver } from "@mantine/core"
import { createTheme } from "@mantine/core"

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
    white: [
      "#ffffffff", // shade 0
      "#ffffffff", // shade 1
      "#ffffffff", // shade 2
      "#ffffffff", // shade 3
      "#ffffffff", // shade 4
      "#ffffffff", // shade 5
      "#ffffffff", // shade 6
      "#ffffffff", // shade 7
      "#ffffffff", // shade 8
      "#ffffffff", // shade 9
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
  },

  primaryColor: "white",
})

export const cssResolver: CSSVariablesResolver = () => ({
  variables: {
    "--mantine-color-body": "black",
    "--mantine-color-text": "white",
  },
  light: {
    "--mantine-color-body": "black",
    "--mantine-color-text": "white",
  },
  dark: {
    "--mantine-color-body": "black",
    "--mantine-color-text": "white",
  },
})
