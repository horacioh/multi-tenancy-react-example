import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

// import ThemeInterface from "./theme";

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<any>;

export { styled, css, createGlobalStyle, keyframes, ThemeProvider };
