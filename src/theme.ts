import { createTheme } from "@mui/material/styles";

/**
 * How to augment MUI Palette in TS.
 * @see {@link https://mui.com/material-ui/customization/palette/#typescript}
 */
declare module "@mui/material/styles" {
  interface Palette {
    grass: Palette["primary"];
    ground: Palette["primary"];
  }

  interface PaletteOptions {
    grass?: PaletteOptions["primary"];
    ground?: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  cssVariables: true,
  palette: {
    grass: {
      main: "#C8E19A",
      light: "#DDEBBC",
      dark: "#B5D57D",
      contrastText: "#242105",
    },
    ground: {
      main: "#F5E1C8",
      light: "#FAF0E6",
      dark: "#D2B48C",
      contrastText: "#242105",
    },
    secondary: {
      main: "#FFF4B1",
      light: "#FFF9D6",
      dark: "#FFEB57",
      contrastText: "#242105",
    },
  },
});

export default theme;
